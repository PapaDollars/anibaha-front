import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { fetchCategoryById } from "@/store/slices/categorySlice";
import { fetchProducts } from "@/store/slices/productSlice";
import { formatFCFA } from "@/utils/formatPrix";

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedCategory: categorie, loading: chargementCat } = useSelector(
    (state: RootState) => state.category
  );
  const { products, loading: chargementProduits } = useSelector(
    (state: RootState) => state.product
  );

  const [recherche, setRecherche] = useState("");

  // Charger la catégorie d'abord, puis les produits avec son slug
  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (categorie) {
      dispatch(fetchProducts({ category: categorie.slug }));
    }
  }, [categorie?.slug, dispatch]);

  const produitsFiltres = products.filter((p) =>
    p.name.toLowerCase().includes(recherche.toLowerCase()) ||
    p.description?.toLowerCase().includes(recherche.toLowerCase())
  );

  const chargement = chargementCat || chargementProduits;

  if (chargement && !categorie) {
    return <div className="chargement">Chargement...</div>;
  }

  if (!categorie) {
    return (
      <div className="page-categorie">
        <div className="introuvable">
          <div className="introuvable-icone">📦</div>
          <h2>Catégorie introuvable</h2>
          <p>Cette catégorie n'existe pas ou a été supprimée.</p>
          <Link to="/categories" className="bouton-retour">
            ← Voir toutes les catégories
          </Link>
        </div>
        <style>{`.page-categorie{font-family:system-ui,sans-serif;max-width:1200px;margin:0 auto;padding:24px}.introuvable{text-align:center;padding:60px 20px}.introuvable-icone{font-size:56px;margin-bottom:16px}.introuvable h2{font-size:20px;font-weight:700;color:#111;margin:0 0 8px}.introuvable p{color:#6b7280;margin-bottom:20px}.bouton-retour{display:inline-block;background:#ff6b35;color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:600}`}</style>
      </div>
    );
  }

  return (
    <div className="page-categorie">
      {/* Fil d'Ariane */}
      <nav className="fil-ariane pt-6">
        <Link to="/">Accueil</Link>
        <span className="sep">›</span>
        <Link to="/categories">Catégories</Link>
        <span className="sep">›</span>
        <span className="actif">{categorie.name}</span>
      </nav>

      {/* En-tête */}
      <div className="categorie-header">
        {categorie.image && (
          <img
            src={categorie.image}
            alt={categorie.name}
            className="categorie-img"
          />
        )}
        {!categorie.image && categorie.icon && (
          <span className="categorie-icone">{categorie.icon}</span>
        )}
        <div>
          <h1 className="categorie-titre">{categorie.name}</h1>
          {categorie.description && (
            <p className="categorie-desc">{categorie.description}</p>
          )}
          <span className="categorie-count">
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="barre-recherche">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="champ-recherche"
        />
        <span className="compte-resultats">
          {produitsFiltres.length} résultat{produitsFiltres.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grille produits */}
      {chargementProduits ? (
        <div className="chargement">Chargement des produits...</div>
      ) : produitsFiltres.length === 0 ? (
        <div className="aucun-produit">
          <div className="aucun-icone">🔍</div>
          <p>
            {recherche
              ? `Aucun produit ne correspond à "${recherche}"`
              : "Cette catégorie ne contient pas encore de produits."}
          </p>
          {recherche && (
            <button
              className="bouton-effacer"
              onClick={() => setRecherche("")}
            >
              Voir tous les produits
            </button>
          )}
        </div>
      ) : (
        <div className="grille-produits">
          {produitsFiltres.map((produit) => (
            <Link
              key={produit.id}
              to={`/products/${produit.id}`}
              className="produit-carte"
            >
              <div className="produit-img-conteneur">
                <img
                  src={produit.images?.[0]?.url || "/placeholder.png"}
                  alt={produit.name}
                  className="produit-img"
                />
                {produit.stock === 0 && (
                  <div className="badge-rupture">Rupture de stock</div>
                )}
              </div>
              <div className="produit-infos">
                <div className="produit-nom">{produit.name}</div>
                {produit.description && (
                  <p className="produit-desc">{produit.description}</p>
                )}
                <div className="produit-prix">{formatFCFA(produit.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .page-categorie { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 24px; }
        .chargement { text-align: center; padding: 60px; color: #9ca3af; }

        .fil-ariane { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 20px; }
        .fil-ariane a { color: #6b7280; text-decoration: none; }
        .fil-ariane a:hover { color: #ff6b35; }
        .fil-ariane .actif { color: #111; font-weight: 500; }
        .sep { color: #d1d5db; }

        .categorie-header {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #fff;
          border-radius: 10px;
          padding: 20px 24px;
          border: 1px solid #e5e7eb;
          margin-bottom: 20px;
        }
        .categorie-img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
        .categorie-icone { font-size: 48px; flex-shrink: 0; }
        .categorie-titre { font-size: 22px; font-weight: 700; color: #111; margin: 0 0 4px; }
        .categorie-desc { font-size: 14px; color: #6b7280; margin: 0 0 6px; }
        .categorie-count { font-size: 13px; color: #9ca3af; }

        .barre-recherche { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .champ-recherche {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          max-width: 400px;
        }
        .champ-recherche:focus { border-color: #ff6b35; }
        .compte-resultats { font-size: 14px; color: #6b7280; }

        .aucun-produit { text-align: center; padding: 60px; color: #9ca3af; }
        .aucun-icone { font-size: 48px; margin-bottom: 12px; }
        .bouton-effacer {
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 14px;
        }

        .grille-produits {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 18px;
        }
        .produit-carte {
          background: #fff;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .produit-carte:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); }

        .produit-img-conteneur { position: relative; }
        .produit-img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .badge-rupture {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(0,0,0,0.65);
          color: #fff;
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .produit-infos { padding: 12px; flex: 1; }
        .produit-nom {
          font-size: 14px;
          font-weight: 600;
          color: #111;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .produit-carte:hover .produit-nom { color: #ff6b35; }
        .produit-desc {
          font-size: 12px;
          color: #9ca3af;
          margin: 0 0 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .produit-prix { font-size: 16px; font-weight: 700; color: #ff6b35; }
      `}</style>
    </div>
  );
}
