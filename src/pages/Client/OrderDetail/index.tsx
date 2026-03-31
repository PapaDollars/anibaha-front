import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { fetchOrderById } from "@/store/slices/orderSlice";
import { formatFCFA } from "@/utils/formatPrix";

const STATUTS: Record<string, { label: string; couleur: string; fond: string }> = {
  pending:    { label: "En attente",    couleur: "#92400e", fond: "#fef3c7" },
  confirmed:  { label: "Confirmée",     couleur: "#1d4ed8", fond: "#eff6ff" },
  processing: { label: "En traitement", couleur: "#6d28d9", fond: "#f5f3ff" },
  shipped:    { label: "Expédiée",      couleur: "#0369a1", fond: "#e0f2fe" },
  delivered:  { label: "Livrée",        couleur: "#065f46", fond: "#d1fae5" },
  cancelled:  { label: "Annulée",       couleur: "#7f1d1d", fond: "#fee2e2" },
  refunded:   { label: "Remboursée",    couleur: "#374151", fond: "#f3f4f6" },
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedOrder: commande, chargement, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [id, dispatch]);

  if (chargement) {
    return <div className="chargement">Chargement de la commande...</div>;
  }

  if (error || !commande) {
    return (
      <div className="erreur-page">
        <p>{error || "Commande introuvable"}</p>
        <Link to="/user/orders" className="lien-retour">
          ← Retour à mes commandes
        </Link>
      </div>
    );
  }

  const statut = STATUTS[commande.status] || {
    label: commande.status,
    couleur: "#374151",
    fond: "#f3f4f6",
  };

  const totals = commande.totals;

  return (
    <div className="page-detail">
      {/* Fil d'Ariane */}
      <nav className="fil-ariane">
        <Link to="/user/orders">Mes commandes</Link>
        <span className="sep">›</span>
        <span className="actif">
          Commande #{commande.id.slice(-8).toUpperCase()}
        </span>
      </nav>

      {/* En-tête */}
      <div className="detail-header">
        <div>
          <h1 className="detail-titre">
            Commande #{commande.id.slice(-8).toUpperCase()}
          </h1>
          <p className="detail-date">
            Passée le{" "}
            {new Date(commande.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className="badge-statut"
          style={{ color: statut.couleur, background: statut.fond }}
        >
          {statut.label}
        </span>
      </div>

      <div className="detail-corps">
        {/* Articles */}
        <div className="section-card">
          <h2 className="section-titre">Articles commandés</h2>
          <div className="liste-articles">
            {commande.items?.map((item: any) => (
              <div key={item.id} className="article-ligne">
                <img
                  src={item.product?.images?.[0]?.url || "/placeholder.png"}
                  alt={item.product?.name}
                  className="article-img"
                />
                <div className="article-info">
                  <div className="article-nom">{item.product?.name}</div>
                  {item.variant && (
                    <div className="article-variante">{item.variant.name}</div>
                  )}
                  <div className="article-pu">
                    {formatFCFA(item.unitPrice ?? item.price ?? 0)} × {item.quantity}
                  </div>
                </div>
                <div className="article-total">
                  {formatFCFA((item.unitPrice ?? item.price ?? 0) * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Résumé + Adresse */}
        <div className="detail-lateral">
          {/* Récapitulatif financier */}
          <div className="section-card">
            <h2 className="section-titre">Récapitulatif</h2>
            <div className="recap-ligne">
              <span>Sous-total</span>
              <span>{formatFCFA(totals?.subtotal ?? 0)}</span>
            </div>
            {totals?.tax !== undefined && totals.tax > 0 && (
              <div className="recap-ligne">
                <span>Taxes ({totals.taxRate ?? 0}%)</span>
                <span>{formatFCFA(totals.tax)}</span>
              </div>
            )}
            <div className="recap-ligne">
              <span>Livraison</span>
              <span>
                {totals?.shipping === 0
                  ? "Gratuite"
                  : formatFCFA(totals?.shipping ?? 0)}
              </span>
            </div>
            <div className="recap-ligne total">
              <span>Total</span>
              <span>{formatFCFA(totals?.total ?? 0)}</span>
            </div>
            <div className="paiement-mode">
              <span className="paiement-icone">💵</span>
              <span>Espèces à la livraison</span>
            </div>
          </div>

          {/* Adresse de livraison */}
          {commande.shippingAddress && (
            <div className="section-card">
              <h2 className="section-titre">Adresse de livraison</h2>
              <div className="adresse-bloc">
                <div className="adresse-label">
                  {commande.shippingAddress.firstName} {commande.shippingAddress.lastName}
                </div>
                <div className="adresse-detail">
                  {commande.shippingAddress.street}
                </div>
                {commande.shippingAddress.region && (
                  <div className="adresse-detail">
                    {commande.shippingAddress.region}
                  </div>
                )}
                <div className="adresse-detail">
                  {commande.shippingAddress.city}
                  {commande.shippingAddress.postalCode && `, ${commande.shippingAddress.postalCode}`}
                </div>
                {commande.shippingAddress.phone && (
                  <div className="adresse-tel">
                    📞 {commande.shippingAddress.phone}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suivi */}
          {commande.shipping?.trackingNumber && (
            <div className="section-card">
              <h2 className="section-titre">Suivi</h2>
              <p className="tracking">
                N° de suivi : <strong>{commande.shipping.trackingNumber}</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .page-detail { font-family: system-ui, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px; }
        .chargement { text-align: center; padding: 60px; color: #9ca3af; font-family: system-ui, sans-serif; }
        .erreur-page { text-align: center; padding: 60px; font-family: system-ui, sans-serif; color: #6b7280; }
        .lien-retour { display: inline-block; margin-top: 12px; color: #ff6b35; text-decoration: none; font-weight: 500; }

        /* Fil d'ariane */
        .fil-ariane { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 20px; }
        .fil-ariane a { color: #6b7280; text-decoration: none; }
        .fil-ariane a:hover { color: #ff6b35; }
        .fil-ariane .actif { color: #111; font-weight: 500; }
        .sep { color: #d1d5db; }

        /* En-tête */
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: #fff;
          border-radius: 10px;
          padding: 20px 24px;
          border: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }
        .detail-titre { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 4px; }
        .detail-date { font-size: 13px; color: #9ca3af; margin: 0; }
        .badge-statut {
          font-size: 13px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 20px;
          white-space: nowrap;
        }

        /* Corps */
        .detail-corps {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 768px) { .detail-corps { grid-template-columns: 1fr; } }

        /* Cards */
        .section-card {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          margin-bottom: 16px;
        }
        .section-card:last-child { margin-bottom: 0; }
        .section-titre { font-size: 15px; font-weight: 700; color: #111; margin: 0 0 14px; }

        /* Articles */
        .liste-articles { display: flex; flex-direction: column; gap: 12px; }
        .article-ligne {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f3f4f6;
        }
        .article-ligne:last-child { border-bottom: none; padding-bottom: 0; }
        .article-img { width: 56px; height: 56px; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
        .article-info { flex: 1; }
        .article-nom { font-size: 14px; font-weight: 600; color: #111; }
        .article-variante { font-size: 12px; color: #9ca3af; }
        .article-pu { font-size: 12px; color: #6b7280; margin-top: 2px; }
        .article-total { font-size: 15px; font-weight: 700; color: #ff6b35; white-space: nowrap; }

        /* Récapitulatif */
        .recap-ligne {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #374151;
          padding: 6px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .recap-ligne:last-of-type { border-bottom: none; }
        .recap-ligne.total {
          font-size: 16px;
          font-weight: 700;
          color: #111;
          padding-top: 10px;
          border-top: 2px solid #e5e7eb;
          border-bottom: none;
          margin-top: 4px;
        }
        .recap-ligne.total span:last-child { color: #ff6b35; }
        .paiement-mode {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 13px;
          color: #6b7280;
        }
        .paiement-icone { font-size: 16px; }

        /* Adresse */
        .adresse-bloc { font-size: 14px; }
        .adresse-label { font-weight: 600; color: #111; margin-bottom: 4px; }
        .adresse-detail { color: #374151; }
        .adresse-tel { color: #9ca3af; font-size: 13px; margin-top: 4px; }

        /* Suivi */
        .tracking { font-size: 14px; color: #374151; }

        /* Lateral */
        .detail-lateral { display: flex; flex-direction: column; }
      `}</style>
    </div>
  );
}
