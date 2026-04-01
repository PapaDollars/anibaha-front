import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { fetchOrders } from "@/store/slices/orderSlice";
import { formatFCFA } from "@/utils/formatPrix";

// Correspondance statut → libellé français + couleur
const STATUTS: Record<string, { label: string; couleur: string; fond: string }> = {
  pending:    { label: "En attente",    couleur: "#92400e", fond: "#fef3c7" },
  confirmed:  { label: "Confirmée",     couleur: "#1d4ed8", fond: "#eff6ff" },
  processing: { label: "En traitement", couleur: "#6d28d9", fond: "#f5f3ff" },
  shipped:    { label: "Expédiée",      couleur: "#0369a1", fond: "#e0f2fe" },
  delivered:  { label: "Livrée",        couleur: "#065f46", fond: "#d1fae5" },
  cancelled:  { label: "Annulée",       couleur: "#7f1d1d", fond: "#fee2e2" },
  refunded:   { label: "Remboursée",    couleur: "#374151", fond: "#f3f4f6" },
};

export default function OrderList() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders: commandes, chargement } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrders({}));
  }, [dispatch]);

  if (chargement) {
    return (
      <div className="chargement">Chargement de vos commandes...</div>
    );
  }

  if (commandes.length === 0) {
    return (
      <div className="commandes-vides">
        <div className="vide-icone">📦</div>
        <h2>Aucune commande</h2>
        <p>Vous n'avez pas encore passé de commande.</p>
        <Link to="/produits" className="bouton-primaire">
          Découvrir nos produits
        </Link>

        <style>{`
          .commandes-vides { text-align: center; padding: 60px 20px; font-family: system-ui, sans-serif; }
          .vide-icone { font-size: 56px; margin-bottom: 16px; }
          .commandes-vides h2 { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 8px; }
          .commandes-vides p { color: #6b7280; margin-bottom: 20px; }
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
    <div className="page-commandes">
      <h1 className="page-titre">Mes commandes ({commandes.length})</h1>

      <div className="liste-commandes">
        {commandes.map((commande) => {
          const statut = STATUTS[commande.status] || {
            label: commande.status,
            couleur: "#374151",
            fond: "#f3f4f6",
          };

          return (
            <div key={commande.id} className="commande-carte">
              {/* En-tête de la commande */}
              <div className="commande-header">
                <div className="commande-meta">
                  <span className="commande-numero">
                    Commande #{commande.id.slice(-8).toUpperCase()}
                  </span>
                  <span className="commande-date">
                    {new Date(commande.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span
                  className="badge-statut"
                  style={{
                    color: statut.couleur,
                    background: statut.fond,
                  }}
                >
                  {statut.label}
                </span>
              </div>

              {/* Articles de la commande */}
              <div className="commande-articles">
                {commande.items?.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="article-miniature-bloc">
                    <img
                      src={item.product?.images?.[0]?.url || "/placeholder.png"}
                      alt={item.product?.name}
                      className="miniature-img"
                    />
                    <span className="miniature-nom">{item.product?.name}</span>
                    <span className="miniature-qte">×{item.quantity}</span>
                  </div>
                ))}
                {commande.items?.length > 3 && (
                  <span className="plus-articles">
                    +{commande.items.length - 3} autres
                  </span>
                )}
              </div>

              {/* Pied de la commande */}
              <div className="commande-footer">
                <div className="commande-paiement">
                  <span className="paiement-icone">💵</span>
                  <span className="paiement-mode">Espèces à la livraison</span>
                </div>
                {/* Montant total en FCFA */}
                <div className="commande-total">
                  {formatFCFA(commande.totals?.total ?? 0)}
                </div>
                <Link
                  to={`/user/orders/${commande.id}`}
                  className="lien-details"
                >
                  Voir les détails →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .page-commandes { font-family: system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 24px; }
        .page-titre { font-size: 22px; font-weight: 700; color: #111; margin: 0 0 20px; }
        .chargement { text-align: center; padding: 60px; color: #9ca3af; font-family: system-ui, sans-serif; }

        .liste-commandes { display: flex; flex-direction: column; gap: 16px; }

        .commande-carte {
          background: #fff;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .commande-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
        }
        .commande-meta { display: flex; flex-direction: column; gap: 2px; }
        .commande-numero { font-size: 14px; font-weight: 700; color: #111; }
        .commande-date { font-size: 12px; color: #9ca3af; }

        .badge-statut {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .commande-articles {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          flex-wrap: wrap;
        }
        .article-miniature-bloc {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f9fafb;
          border-radius: 6px;
          padding: 6px 10px;
        }
        .miniature-img { width: 32px; height: 32px; object-fit: cover; border-radius: 4px; }
        .miniature-nom { font-size: 13px; color: #374151; max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .miniature-qte { font-size: 12px; color: #9ca3af; }
        .plus-articles { font-size: 12px; color: #9ca3af; }

        .commande-footer {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 20px;
          border-top: 1px solid #f3f4f6;
          background: #fafafa;
        }
        .commande-paiement { display: flex; align-items: center; gap: 6px; flex: 1; }
        .paiement-icone { font-size: 16px; }
        .paiement-mode { font-size: 13px; color: #6b7280; }
        .commande-total { font-size: 16px; font-weight: 700; color: #ff6b35; }
        .lien-details {
          font-size: 13px;
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          white-space: nowrap;
        }
        .lien-details:hover { color: #ff6b35; }
      `}</style>
    </div>
  );
}