import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import {
  fetchWishlist,
  retirerWishlist,
  clearWishlist,
} from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { formatFCFA } from "@/utils/formatPrix";

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, chargement } = useSelector(
    (state: RootState) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const gererRetrait = (productId: string) => {
    dispatch(retirerWishlist(productId));
  };

  const gererVider = () => {
    if (confirm("Vider toute votre liste de souhaits ?")) {
      dispatch(clearWishlist());
    }
  };

  const gererAjoutPanier = (produit: any) => {
    dispatch(addToCart({ product: produit, quantity: 1 }));
  };

  if (chargement) {
    return <div className="chargement">Chargement de votre wishlist...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="wishlist-vide">
        <div className="vide-icone">❤️</div>
        <h2>Votre liste de souhaits est vide</h2>
        <p>Ajoutez des produits à votre liste pour les retrouver facilement</p>
        <Link to="/produits" className="bouton-primaire">
          Découvrir des produits
        </Link>

        <style>{`
          .wishlist-vide { text-align: center; padding: 60px 20px; font-family: system-ui, sans-serif; }
          .vide-icone { font-size: 56px; margin-bottom: 16px; }
          .wishlist-vide h2 { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 8px; }
          .wishlist-vide p { color: #6b7280; margin-bottom: 20px; }
          .bouton-primaire {
            display: inline-block;
            background: #ff6b35;
            color: #fff;
            padding: 10px 22px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-wishlist">
      <div className="wishlist-header">
        <h1 className="page-titre">
          Ma liste de souhaits ({items.length} produit{items.length > 1 ? "s" : ""})
        </h1>
        <button className="bouton-vider" onClick={gererVider}>
          Tout supprimer
        </button>
      </div>

      <div className="grille-produits">
        {items.map((item) => {
          const produit = item.product;
          const estDisponible = produit.isActive && produit.stock > 0;

          return (
            <div key={item.id} className="produit-carte">
              {/* Image */}
              <Link to={`/produits/${produit.slug}`} className="produit-image-lien">
                <img
                  src={produit.images?.[0]?.url || "/placeholder.png"}
                  alt={produit.name}
                  className="produit-image"
                />
                {!estDisponible && (
                  <div className="badge-indisponible">Indisponible</div>
                )}
              </Link>

              {/* Infos */}
              <div className="produit-infos">
                <Link to={`/produits/${produit.slug}`} className="produit-nom">
                  {produit.name}
                </Link>
                <Link
                  to={`/companies/${produit.company?.slug}`}
                  className="produit-vendeur"
                >
                  {produit.company?.name}
                </Link>
                {/* Prix en FCFA */}
                <div className="produit-prix">{formatFCFA(produit.price)}</div>
              </div>

              {/* Actions */}
              <div className="produit-actions">
                <button
                  className="bouton-panier"
                  onClick={() => gererAjoutPanier(produit)}
                  disabled={!estDisponible}
                >
                  {estDisponible ? "Ajouter au panier" : "Indisponible"}
                </button>
                <button
                  className="bouton-retirer"
                  onClick={() => gererRetrait(produit.id)}
                  title="Retirer de la wishlist"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .page-wishlist { font-family: system-ui, sans-serif; max-width: 1100px; margin: 0 auto; padding: 24px; }
        .chargement { text-align: center; padding: 60px; color: #9ca3af; font-family: system-ui, sans-serif; }

        .wishlist-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .page-titre { font-size: 22px; font-weight: 700; color: #111; margin: 0; }

        .bouton-vider {
          background: none;
          border: 1px solid #d1d5db;
          color: #6b7280;
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .bouton-vider:hover { border-color: #dc2626; color: #dc2626; }

        .grille-produits {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .produit-carte {
          background: #fff;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s;
        }
        .produit-carte:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

        .produit-image-lien { position: relative; display: block; }
        .produit-image { width: 100%; height: 180px; object-fit: cover; }
        .badge-indisponible {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .produit-infos { padding: 12px 14px; flex: 1; }
        .produit-nom {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #111;
          text-decoration: none;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .produit-nom:hover { color: #ff6b35; }
        .produit-vendeur {
          display: block;
          font-size: 12px;
          color: #9ca3af;
          text-decoration: none;
          margin-bottom: 8px;
        }
        .produit-vendeur:hover { color: #ff6b35; }
        .produit-prix { font-size: 16px; font-weight: 700; color: #ff6b35; }

        .produit-actions {
          display: flex;
          gap: 8px;
          padding: 10px 14px;
          border-top: 1px solid #f3f4f6;
        }
        .bouton-panier {
          flex: 1;
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 8px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .bouton-panier:hover:not(:disabled) { opacity: 0.88; }
        .bouton-panier:disabled { background: #d1d5db; cursor: not-allowed; }

        .bouton-retirer {
          background: none;
          border: 1px solid #e5e7eb;
          color: #9ca3af;
          width: 34px;
          height: 34px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .bouton-retirer:hover { border-color: #dc2626; color: #dc2626; }
      `}</style>
    </div>
  );
}