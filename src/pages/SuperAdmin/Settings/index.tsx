import { useEffect, useState } from "react";
import axios from "@/lib/axios";

interface PlatformSettings {
  platformName: string;
  commissionRate: number;
  pointsPerOrder: number;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxProductsPerCompany: number;
  contactEmail: string;
  supportPhone: string;
  timezone: string;
  currency: string;
  currencySymbol: string;
  country: string;
}

export default function AdminSettings() {
  const [parametres, setParametres] = useState<PlatformSettings | null>(null);
  const [chargement, setChargement] = useState(true);
  const [sauvegarde, setSauvegarde] = useState(false);
  const [messageSucces, setMessageSucces] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const reponse = await axios.get("/api/admin/settings");
        setParametres(reponse.data.settings);
      } catch (err: any) {
        setErreur("Impossible de charger les paramètres");
      } finally {
        setChargement(false);
      }
    };
    charger();
  }, []);

  const mettreAJour = (champ: keyof PlatformSettings, valeur: any) => {
    setParametres((p) => (p ? { ...p, [champ]: valeur } : null));
  };

  const sauvegarder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSauvegarde(true);
    setErreur(null);
    setMessageSucces(null);
    try {
      await axios.patch("/api/admin/settings", parametres);
      setMessageSucces("Paramètres sauvegardés avec succès !");
      setTimeout(() => setMessageSucces(null), 4000);
    } catch (err: any) {
      setErreur(err.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setSauvegarde(false);
    }
  };

  if (chargement) return <div className="chargement">Chargement...</div>;
  if (!parametres) return <div className="erreur">Impossible de charger les paramètres</div>;

  return (
    <div className="page-settings">
      <div className="page-header">
        <h2 className="page-titre">Paramètres de la plateforme</h2>
        <p className="page-sous-titre">Configuration globale d'Anibaha</p>
      </div>

      {messageSucces && <div className="alerte succes">{messageSucces}</div>}
      {erreur && <div className="alerte erreur-alerte">{erreur}</div>}

      <form onSubmit={sauvegarder} className="formulaire-settings">
        {/* Section générale */}
        <div className="section-card">
          <h3 className="section-titre">Informations générales</h3>
          <div className="grille-form">
            <div className="groupe-champ">
              <label>Nom de la plateforme</label>
              <input
                type="text"
                value={parametres.platformName}
                onChange={(e) => mettreAJour("platformName", e.target.value)}
              />
            </div>
            <div className="groupe-champ">
              <label>Email de contact</label>
              <input
                type="email"
                value={parametres.contactEmail}
                onChange={(e) => mettreAJour("contactEmail", e.target.value)}
              />
            </div>
            <div className="groupe-champ">
              <label>Téléphone d'assistance</label>
              <input
                type="text"
                value={parametres.supportPhone}
                onChange={(e) => mettreAJour("supportPhone", e.target.value)}
              />
            </div>
            <div className="groupe-champ">
              <label>Fuseau horaire</label>
              <input
                type="text"
                value={parametres.timezone}
                onChange={(e) => mettreAJour("timezone", e.target.value)}
                placeholder="Africa/Douala"
              />
            </div>
          </div>

          {/* Champs en lecture seule */}
          <div className="grille-form" style={{ marginTop: 12 }}>
            <div className="groupe-champ">
              <label>Devise</label>
              <input type="text" value={`${parametres.currencySymbol} (${parametres.currency})`} disabled className="champ-desactive" />
            </div>
            <div className="groupe-champ">
              <label>Pays</label>
              <input type="text" value={parametres.country} disabled className="champ-desactive" />
            </div>
          </div>
        </div>

        {/* Section commerce */}
        <div className="section-card">
          <h3 className="section-titre">Commerce & Fidélité</h3>
          <div className="grille-form">
            <div className="groupe-champ">
              <label>Taux de commission (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={parametres.commissionRate}
                onChange={(e) =>
                  mettreAJour("commissionRate", parseFloat(e.target.value))
                }
              />
              <span className="aide-champ">Commission prélevée sur chaque vente</span>
            </div>
            <div className="groupe-champ">
              <label>Points par commande livrée</label>
              <input
                type="number"
                min="0"
                value={parametres.pointsPerOrder}
                onChange={(e) =>
                  mettreAJour("pointsPerOrder", parseInt(e.target.value))
                }
              />
              <span className="aide-champ">
                Actuellement : {parametres.pointsPerOrder} points par livraison
              </span>
            </div>
            <div className="groupe-champ">
              <label>Max. produits par entreprise</label>
              <input
                type="number"
                min="1"
                value={parametres.maxProductsPerCompany}
                onChange={(e) =>
                  mettreAJour("maxProductsPerCompany", parseInt(e.target.value))
                }
              />
            </div>
          </div>
        </div>

        {/* Section accès & maintenance */}
        <div className="section-card">
          <h3 className="section-titre">Accès & Maintenance</h3>
          <div className="liste-interrupteurs">
            <div className="ligne-interrupteur">
              <div>
                <div className="interrupteur-label">Mode maintenance</div>
                <div className="interrupteur-desc">
                  Le site affichera une page de maintenance aux visiteurs
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={parametres.maintenanceMode}
                  onChange={(e) =>
                    mettreAJour("maintenanceMode", e.target.checked)
                  }
                />
                <span className="slider" />
              </label>
            </div>
            <div className="ligne-interrupteur">
              <div>
                <div className="interrupteur-label">Autoriser les inscriptions</div>
                <div className="interrupteur-desc">
                  Permettre aux nouveaux utilisateurs de s'inscrire
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={parametres.allowRegistration}
                  onChange={(e) =>
                    mettreAJour("allowRegistration", e.target.checked)
                  }
                />
                <span className="slider" />
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="actions-form">
          <button type="submit" className="bouton-primaire" disabled={sauvegarde}>
            {sauvegarde ? "Sauvegarde..." : "Sauvegarder les paramètres"}
          </button>
        </div>
      </form>

      <style>{`
        .page-settings { font-family: system-ui, sans-serif; max-width: 860px; }
        .page-header { margin-bottom: 24px; }
        .page-titre { font-size: 22px; font-weight: 700; color: #111; margin: 0 0 4px; }
        .page-sous-titre { font-size: 14px; color: #666; margin: 0; }

        .alerte {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: 500;
        }
        .alerte.succes { background: #d1fae5; color: #065f46; }
        .alerte.erreur-alerte { background: #fee2e2; color: #7f1d1d; }

        .chargement { text-align: center; padding: 60px; color: #9ca3af; }
        .erreur { color: #dc2626; }

        .formulaire-settings { display: flex; flex-direction: column; gap: 20px; }

        .section-card {
          background: #fff;
          border-radius: 10px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }
        .section-titre { font-size: 15px; font-weight: 600; color: #111; margin: 0 0 16px; }

        .grille-form {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }
        .groupe-champ label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }
        .groupe-champ input {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .groupe-champ input:focus { border-color: #ff6b35; }
        .champ-desactive { background: #f9fafb !important; color: #9ca3af; cursor: not-allowed; }
        .aide-champ { font-size: 12px; color: #9ca3af; margin-top: 4px; display: block; }

        /* Interrupteurs */
        .liste-interrupteurs { display: flex; flex-direction: column; gap: 0; }
        .ligne-interrupteur {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .ligne-interrupteur:last-child { border-bottom: none; }
        .interrupteur-label { font-size: 14px; font-weight: 500; color: #111; }
        .interrupteur-desc { font-size: 12px; color: #9ca3af; margin-top: 2px; }

        .switch { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: #d1d5db;
          border-radius: 24px;
          transition: background 0.2s;
        }
        .slider::before {
          content: "";
          position: absolute;
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background: #fff;
          border-radius: 50%;
          transition: transform 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .switch input:checked + .slider { background: #ff6b35; }
        .switch input:checked + .slider::before { transform: translateX(20px); }

        .actions-form { display: flex; justify-content: flex-end; }
        .bouton-primaire {
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 11px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .bouton-primaire:hover { opacity: 0.88; }
        .bouton-primaire:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}