import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { passerCommande } from "@/store/slices/orderSlice";
import { viderPanier } from "@/store/slices/cartSlice";
import { formatFCFA } from "@/utils/formatPrix";

export default function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const { chargement } = useSelector((state: RootState) => state.order);

  const [adresse, setAdresse] = useState({
    rue: "",
    ville: "",
    quartier: "",
    telephone: user?.phone || "",
    instructions: "",
  });

  // Calcul du total en FCFA
  const total = items.reduce(
    (acc, item) => acc + (item.product?.price ?? item.unitPrice ?? 0) * item.quantity,
    0
  );

  const soumettreCommande = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultat = await dispatch(
      passerCommande({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        adresseLivraison: adresse,
        modePaiement: "cash_on_delivery",
      })
    );

    if (passerCommande.fulfilled.match(resultat)) {
      dispatch(viderPanier());
      navigate(`/user/orders/${(resultat.payload as any).id ?? (resultat.payload as any).order?.id}`);
    }
  };

  if (items.length === 0) {
    navigate("/panier");
    return null;
  }

  return (
    <div className="page-checkout">
      <h1 className="page-titre">Finaliser la commande</h1>

      <div className="checkout-grille">
        {/* Formulaire d'adresse */}
        <div className="checkout-formulaire">
          <div className="section-card">
            <h2 className="section-titre">Adresse de livraison</h2>
            <form onSubmit={soumettreCommande} id="form-checkout">
              <div className="groupe-champ">
                <label>Rue / Adresse *</label>
                <input
                  type="text"
                  required
                  value={adresse.rue}
                  onChange={(e) =>
                    setAdresse((a) => ({ ...a, rue: e.target.value }))
                  }
                  placeholder="Ex : Avenue Kennedy, face au marché"
                />
              </div>
              <div className="grille-2">
                <div className="groupe-champ">
                  <label>Ville *</label>
                  <input
                    type="text"
                    required
                    value={adresse.ville}
                    onChange={(e) =>
                      setAdresse((a) => ({ ...a, ville: e.target.value }))
                    }
                    placeholder="Ex : Yaoundé"
                  />
                </div>
                <div className="groupe-champ">
                  <label>Quartier</label>
                  <input
                    type="text"
                    value={adresse.quartier}
                    onChange={(e) =>
                      setAdresse((a) => ({ ...a, quartier: e.target.value }))
                    }
                    placeholder="Ex : Bastos"
                  />
                </div>
              </div>
              <div className="groupe-champ">
                <label>Téléphone de contact *</label>
                <input
                  type="tel"
                  required
                  value={adresse.telephone}
                  onChange={(e) =>
                    setAdresse((a) => ({ ...a, telephone: e.target.value }))
                  }
                  placeholder="+237 6XX XXX XXX"
                />
              </div>
              <div className="groupe-champ">
                <label>Instructions de livraison</label>
                <textarea
                  value={adresse.instructions}
                  onChange={(e) =>
                    setAdresse((a) => ({ ...a, instructions: e.target.value }))
                  }
                  placeholder="Informations supplémentaires pour le livreur..."
                  rows={3}
                />
              </div>
            </form>
          </div>

          {/* Mode de paiement — uniquement espèces */}
          <div className="section-card">
            <h2 className="section-titre">Mode de paiement</h2>
            <div className="paiement-option selectionne">
              <span className="paiement-icone">💵</span>
              <div className="paiement-texte">
                <div className="paiement-titre">Paiement en espèces à la livraison</div>
                <div className="paiement-desc">
                  Préparez le montant exact en FCFA lors de la réception
                </div>
              </div>
              <span className="paiement-coche">✓</span>
            </div>
          </div>
        </div>

        {/* Résumé de commande */}
        <div className="checkout-resume">
          <div className="section-card">
            <h2 className="section-titre">Votre commande</h2>

            {/* Articles */}
            <div className="liste-articles">
              {items.map((item) => (
                <div key={item.productId} className="article-ligne">
                  <img
                    src={item.product?.images?.[0]?.url || "/placeholder.png"}
                    alt={item.product?.name}
                    className="article-miniature"
                  />
                  <div className="article-details">
                    <div className="article-nom">{item.product?.name}</div>
                    <div className="article-qte">Qté : {item.quantity}</div>
                  </div>
                  <div className="article-montant">
                    {formatFCFA((item.product?.price ?? item.unitPrice ?? 0) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="separateur" />

            {/* Totaux en FCFA */}
            <div className="total-lignes">
              <div className="total-ligne">
                <span>Sous-total</span>
                <span>{formatFCFA(total)}</span>
              </div>
              <div className="total-ligne">
                <span>Livraison</span>
                <span style={{ color: "#059669", fontWeight: 600 }}>
                  À confirmer
                </span>
              </div>
              <div className="total-ligne grand">
                <span>Total à payer</span>
                <span>{formatFCFA(total)}</span>
              </div>
            </div>

            <div className="note-especes">
              <strong>Rappel :</strong> Préparez{" "}
              <strong>{formatFCFA(total)}</strong> en espèces pour payer le
              livreur à la réception.
            </div>

            {/* Bouton de commande */}
            <button
              type="submit"
              form="form-checkout"
              className="bouton-commander"
              disabled={chargement}
            >
              {chargement ? "Traitement..." : "Confirmer la commande"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .page-checkout { font-family: system-ui, sans-serif; max-width: 1100px; margin: 0 auto; padding: 24px; }
        .page-titre { font-size: 24px; font-weight: 700; color: #111; margin: 0 0 24px; }

        .checkout-grille { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }
        @media (max-width: 900px) { .checkout-grille { grid-template-columns: 1fr; } }

        .checkout-formulaire { display: flex; flex-direction: column; gap: 20px; }

        .section-card {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
        }
        .section-titre { font-size: 16px; font-weight: 700; color: #111; margin: 0 0 16px; }

        .groupe-champ { margin-bottom: 14px; }
        .groupe-champ label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }
        .groupe-champ input,
        .groupe-champ textarea {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
          resize: vertical;
        }
        .groupe-champ input:focus,
        .groupe-champ textarea:focus { border-color: #ff6b35; }

        .grille-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Paiement */
        .paiement-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .paiement-option.selectionne { border-color: #ff6b35; background: #fff7f4; }
        .paiement-icone { font-size: 24px; }
        .paiement-texte { flex: 1; }
        .paiement-titre { font-size: 14px; font-weight: 600; color: #111; }
        .paiement-desc { font-size: 12px; color: #6b7280; margin-top: 2px; }
        .paiement-coche { color: #ff6b35; font-size: 18px; font-weight: 700; }

        /* Résumé */
        .checkout-resume { position: sticky; top: 20px; height: fit-content; }

        .liste-articles { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
        .article-ligne { display: flex; align-items: center; gap: 10px; }
        .article-miniature { width: 50px; height: 50px; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
        .article-details { flex: 1; }
        .article-nom { font-size: 13px; font-weight: 500; color: #111; }
        .article-qte { font-size: 12px; color: #9ca3af; }
        .article-montant { font-size: 14px; font-weight: 600; color: #111; white-space: nowrap; }

        .separateur { height: 1px; background: #f3f4f6; margin: 12px 0; }

        .total-lignes { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
        .total-ligne { display: flex; justify-content: space-between; font-size: 14px; color: #374151; }
        .total-ligne.grand { font-size: 16px; font-weight: 700; color: #111; padding-top: 8px; border-top: 2px solid #e5e7eb; }

        .note-especes {
          background: #fef9c3;
          border: 1px solid #fde047;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13px;
          color: #713f12;
          margin-bottom: 16px;
        }

        .bouton-commander {
          width: 100%;
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .bouton-commander:hover { opacity: 0.88; }
        .bouton-commander:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}