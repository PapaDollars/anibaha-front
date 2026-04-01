import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import {
  retirerDuPanier,
  modifierQuantite,
  viderPanier,
} from "@/store/slices/cartSlice";
import { formatFCFA } from "@/utils/formatPrix";
import { ROUTES } from "@/utils/url/url_frontend";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, chargement } = useSelector((state: RootState) => state.cart);

  // Calcul du total en FCFA
  const total = items.reduce(
    (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
    0
  );

  const gererRetrait = (productId: string) => {
    dispatch(retirerDuPanier(productId));
  };

  const gererQuantite = (productId: string, quantite: number) => {
    if (quantite < 1) {
      dispatch(retirerDuPanier(productId));
    } else {
      dispatch(modifierQuantite({ productId, quantite }));
    }
  };

  const gererCommande = () => {
    navigate(ROUTES.USER.SHOPPING.CHECKOUT);
  };

  if (items.length === 0) {
    return (
      <div className="panier-vide">
        <div className="panier-vide-icone">🛒</div>
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos produits et ajoutez-les à votre panier</p>
        <Link to={ROUTES.PUBLIC.CATALOG.PRODUCTS} className="bouton-primaire">
          Parcourir les produits
        </Link>

        <style>{`
          .panier-vide {
            text-align: center;
            padding: 80px 20px;
            font-family: system-ui, sans-serif;
          }
          .panier-vide-icone { font-size: 64px; margin-bottom: 16px; }
          .panier-vide h2 { font-size: 22px; font-weight: 700; color: #111; margin: 0 0 8px; }
          .panier-vide p { color: #6b7280; margin-bottom: 24px; }
          .bouton-primaire {
            display: inline-block;
            background: #ff6b35;
            color: #fff;
            padding: 11px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-panier">
      <h1 className="page-titre">Mon panier ({items.length} article{items.length > 1 ? "s" : ""})</h1>

      <div className="panier-grille">
        {/* Liste des articles */}
        <div className="panier-articles">
          {items.map((item) => (
            <div key={item.productId} className="article-carte">
              <img
                src={item.product!.images?.[0]?.url || "/placeholder.png"}
                alt={item.product!.name}
                className="article-image"
              />
              <div className="article-info">
                <Link
                  to={ROUTES.GENERATORS.getProductDetails(item.product!.id)}
                  className="article-nom"
                >
                  {item.product!.name}
                </Link>
                <div className="article-vendeur">
                  Par{" "}
                  <Link to={ROUTES.GENERATORS.getBrandProducts(item.product!.company?.slug ?? '')}>
                    {item.product!.company?.name}
                  </Link>
                </div>
                {/* Prix unitaire en FCFA */}
                <div className="article-prix">{formatFCFA(item.product!.price)}</div>
              </div>
              <div className="article-actions">
                {/* Contrôle de quantité */}
                <div className="controle-quantite">
                  <button
                    onClick={() => gererQuantite(item.productId, item.quantity - 1)}
                    className="bouton-quantite"
                  >
                    −
                  </button>
                  <span className="quantite-valeur">{item.quantity}</span>
                  <button
                    onClick={() => gererQuantite(item.productId, item.quantity + 1)}
                    className="bouton-quantite"
                    disabled={item.quantity >= (item.product!.stock ?? Infinity)}
                  >
                    +
                  </button>
                </div>
                {/* Sous-total en FCFA */}
                <div className="article-sous-total">
                  {formatFCFA(item.product!.price * item.quantity)}
                </div>
                <button
                  className="bouton-retirer"
                  onClick={() => gererRetrait(item.productId)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          {/* Vider le panier */}
          <button
            className="bouton-vider"
            onClick={() => dispatch(viderPanier())}
          >
            Vider le panier
          </button>
        </div>

        {/* Résumé de commande */}
        <div className="panier-resume">
          <h2 className="resume-titre">Récapitulatif</h2>

          <div className="resume-lignes">
            <div className="resume-ligne">
              <span>Sous-total</span>
              <span>{formatFCFA(total)}</span>
            </div>
            <div className="resume-ligne">
              <span>Livraison</span>
              <span className="gratuit">À définir</span>
            </div>
            <div className="resume-ligne total">
              <span>Total</span>
              <span>{formatFCFA(total)}</span>
            </div>
          </div>

          {/* Paiement à la livraison */}
          <div className="info-paiement">
            <span className="paiement-icone">💵</span>
            <div>
              <div className="paiement-titre">Paiement à la livraison</div>
              <div className="paiement-desc">
                Payez en espèces lors de la réception de votre commande
              </div>
            </div>
          </div>

          <button
            className="bouton-commander"
            onClick={gererCommande}
            disabled={chargement}
          >
            Passer la commande
          </button>

          <Link to="/produits" className="lien-continuer">
            Continuer les achats
          </Link>
        </div>
      </div>

      <style>{`
        .page-panier { font-family: system-ui, sans-serif; max-width: 1100px; margin: 0 auto; padding: 24px; }
        .page-titre { font-size: 24px; font-weight: 700; color: #111; margin: 0 0 24px; }

        .panier-grille { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        @media (max-width: 900px) { .panier-grille { grid-template-columns: 1fr; } }

        .panier-articles { display: flex; flex-direction: column; gap: 16px; }

        .article-carte {
          display: flex;
          gap: 16px;
          background: #fff;
          border-radius: 10px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          align-items: flex-start;
        }
        .article-image { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
        .article-info { flex: 1; min-width: 0; }
        .article-nom {
          font-size: 15px;
          font-weight: 600;
          color: #111;
          text-decoration: none;
          display: block;
          margin-bottom: 4px;
        }
        .article-nom:hover { color: #ff6b35; }
        .article-vendeur { font-size: 13px; color: #9ca3af; margin-bottom: 6px; }
        .article-vendeur a { color: #6b7280; text-decoration: none; }
        .article-vendeur a:hover { color: #ff6b35; }
        .article-prix { font-size: 15px; font-weight: 600; color: #ff6b35; }

        .article-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }

        .controle-quantite { display: flex; align-items: center; gap: 8px; }
        .bouton-quantite {
          width: 30px; height: 30px;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.15s;
        }
        .bouton-quantite:hover:not(:disabled) { border-color: #ff6b35; }
        .bouton-quantite:disabled { opacity: 0.4; cursor: not-allowed; }
        .quantite-valeur { font-size: 15px; font-weight: 600; min-width: 20px; text-align: center; }

        .article-sous-total { font-size: 15px; font-weight: 700; color: #111; }

        .bouton-retirer {
          background: none;
          border: none;
          color: #dc2626;
          font-size: 12px;
          cursor: pointer;
          padding: 2px 0;
          text-decoration: underline;
        }

        .bouton-vider {
          align-self: flex-start;
          background: none;
          border: 1px solid #d1d5db;
          color: #6b7280;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .bouton-vider:hover { border-color: #dc2626; color: #dc2626; }

        /* Résumé */
        .panier-resume {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          height: fit-content;
          position: sticky;
          top: 20px;
        }
        .resume-titre { font-size: 17px; font-weight: 700; color: #111; margin: 0 0 16px; }
        .resume-lignes { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .resume-ligne {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #374151;
          padding-bottom: 10px;
          border-bottom: 1px solid #f3f4f6;
        }
        .resume-ligne:last-child { border-bottom: none; }
        .resume-ligne.total { font-size: 16px; font-weight: 700; color: #111; }
        .gratuit { color: #059669; font-weight: 600; }

        .info-paiement {
          display: flex;
          gap: 10px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          align-items: flex-start;
        }
        .paiement-icone { font-size: 20px; flex-shrink: 0; }
        .paiement-titre { font-size: 13px; font-weight: 600; color: #065f46; }
        .paiement-desc { font-size: 12px; color: #059669; margin-top: 2px; }

        .bouton-commander {
          width: 100%;
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 13px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s;
          margin-bottom: 10px;
        }
        .bouton-commander:hover { opacity: 0.88; }
        .bouton-commander:disabled { opacity: 0.5; cursor: not-allowed; }

        .lien-continuer {
          display: block;
          text-align: center;
          color: #6b7280;
          font-size: 13px;
          text-decoration: none;
        }
        .lien-continuer:hover { color: #ff6b35; }
      `}</style>
    </div>
  );
}