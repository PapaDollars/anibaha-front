import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { changePassword } from "@/store/slices/userSlice";
import axios from "@/lib/axios";

interface CompanyInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  website: string;
  contactEmail: string;
  phone: string;
}

export default function CompanySettings() {
  const dispatch = useDispatch<AppDispatch>();
  const { chargementMdp, erreur: erreurUser, messageSucces: succesUser } =
    useSelector((state: RootState) => state.users);

  const [companyInfo, setCompanyInfo] = useState<Partial<CompanyInfo>>({});
  const [chargement, setChargement] = useState(true);
  const [sauvegarde, setSauvegarde] = useState(false);
  const [succesCompany, setSuccesCompany] = useState<string | null>(null);
  const [erreurCompany, setErreurCompany] = useState<string | null>(null);

  const [formMdp, setFormMdp] = useState({
    ancienMotDePasse: "",
    nouveauMotDePasse: "",
    confirmationMotDePasse: "",
  });

  useEffect(() => {
    const charger = async () => {
      try {
        const reponse = await axios.get("/api/companies/me");
        setCompanyInfo(reponse.data.company);
      } catch {
        setErreurCompany("Impossible de charger les informations de l'entreprise");
      } finally {
        setChargement(false);
      }
    };
    charger();
  }, []);

  const sauvegarderCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setSauvegarde(true);
    setErreurCompany(null);
    try {
      await axios.patch("/api/companies/me", companyInfo);
      setSuccesCompany("Informations mises à jour avec succès");
      setTimeout(() => setSuccesCompany(null), 4000);
    } catch (err: any) {
      setErreurCompany(err.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setSauvegarde(false);
    }
  };

  const changerMotDePasse = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(changePassword(formMdp));
    if (!erreurUser) {
      setFormMdp({
        ancienMotDePasse: "",
        nouveauMotDePasse: "",
        confirmationMotDePasse: "",
      });
    }
  };

  if (chargement) return <div className="chargement">Chargement...</div>;

  return (
    <div className="page-settings">
      <div className="page-header">
        <h2 className="page-titre">Paramètres de l'entreprise</h2>
        <p className="page-sous-titre">Gérez les informations de votre boutique</p>
      </div>

      {/* Informations de l'entreprise */}
      <div className="section-card">
        <h3 className="section-titre">Informations de la boutique</h3>

        {succesCompany && <div className="alerte succes">{succesCompany}</div>}
        {erreurCompany && <div className="alerte erreur-alerte">{erreurCompany}</div>}

        <form onSubmit={sauvegarderCompany}>
          <div className="grille-form">
            <div className="groupe-champ">
              <label>Nom de la boutique</label>
              <input
                type="text"
                value={companyInfo.name || ""}
                onChange={(e) =>
                  setCompanyInfo((c) => ({ ...c, name: e.target.value }))
                }
              />
            </div>
            <div className="groupe-champ">
              <label>URL de la boutique</label>
              <input
                type="text"
                value={companyInfo.slug || ""}
                disabled
                className="champ-desactive"
              />
              <span className="aide-champ">
                Accessible via /companies/{companyInfo.slug}
              </span>
            </div>
            <div className="groupe-champ">
              <label>Email de contact</label>
              <input
                type="email"
                value={companyInfo.contactEmail || ""}
                onChange={(e) =>
                  setCompanyInfo((c) => ({ ...c, contactEmail: e.target.value }))
                }
              />
            </div>
            <div className="groupe-champ">
              <label>Téléphone</label>
              <input
                type="text"
                value={companyInfo.phone || ""}
                onChange={(e) =>
                  setCompanyInfo((c) => ({ ...c, phone: e.target.value }))
                }
                placeholder="+237 6XX XXX XXX"
              />
            </div>
            <div className="groupe-champ full">
              <label>Description</label>
              <textarea
                value={companyInfo.description || ""}
                onChange={(e) =>
                  setCompanyInfo((c) => ({ ...c, description: e.target.value }))
                }
                rows={4}
                placeholder="Décrivez votre boutique..."
              />
            </div>
            <div className="groupe-champ">
              <label>Site web</label>
              <input
                type="url"
                value={companyInfo.website || ""}
                onChange={(e) =>
                  setCompanyInfo((c) => ({ ...c, website: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="actions-section" style={{ marginTop: 16 }}>
            <button type="submit" className="bouton-primaire" disabled={sauvegarde}>
              {sauvegarde ? "Sauvegarde..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>

      {/* Changement de mot de passe */}
      <div className="section-card">
        <h3 className="section-titre">Sécurité — Mot de passe</h3>

        {succesUser && <div className="alerte succes">{succesUser}</div>}
        {erreurUser && <div className="alerte erreur-alerte">{erreurUser}</div>}

        <form onSubmit={changerMotDePasse}>
          <div className="grille-form">
            <div className="groupe-champ">
              <label>Mot de passe actuel</label>
              <input
                type="password"
                required
                value={formMdp.ancienMotDePasse}
                onChange={(e) =>
                  setFormMdp((f) => ({
                    ...f,
                    ancienMotDePasse: e.target.value,
                  }))
                }
              />
            </div>
            <div className="groupe-champ">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                required
                minLength={8}
                value={formMdp.nouveauMotDePasse}
                onChange={(e) =>
                  setFormMdp((f) => ({
                    ...f,
                    nouveauMotDePasse: e.target.value,
                  }))
                }
              />
              <span className="aide-champ">Minimum 8 caractères</span>
            </div>
            <div className="groupe-champ">
              <label>Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                required
                value={formMdp.confirmationMotDePasse}
                onChange={(e) =>
                  setFormMdp((f) => ({
                    ...f,
                    confirmationMotDePasse: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="actions-section" style={{ marginTop: 16 }}>
            <button type="submit" className="bouton-primaire" disabled={chargementMdp}>
              {chargementMdp ? "Modification..." : "Changer le mot de passe"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .page-settings { font-family: system-ui, sans-serif; max-width: 860px; }
        .page-header { margin-bottom: 24px; }
        .page-titre { font-size: 22px; font-weight: 700; color: #111; margin: 0 0 4px; }
        .page-sous-titre { font-size: 14px; color: #666; margin: 0; }
        .chargement { text-align: center; padding: 60px; color: #9ca3af; }

        .section-card {
          background: #fff;
          border-radius: 10px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          margin-bottom: 20px;
        }
        .section-titre { font-size: 15px; font-weight: 600; color: #111; margin: 0 0 16px; }

        .alerte {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 14px;
          font-size: 14px;
          font-weight: 500;
        }
        .alerte.succes { background: #d1fae5; color: #065f46; }
        .alerte.erreur-alerte { background: #fee2e2; color: #7f1d1d; }

        .grille-form {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }
        .groupe-champ.full { grid-column: 1 / -1; }
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
        .groupe-champ textarea:focus { border-color: #00b496; }
        .champ-desactive { background: #f9fafb !important; color: #9ca3af; cursor: not-allowed; }
        .aide-champ { font-size: 12px; color: #9ca3af; margin-top: 4px; display: block; }

        .actions-section { display: flex; justify-content: flex-end; }
        .bouton-primaire {
          background: #00b496;
          color: #fff;
          border: none;
          padding: 10px 22px;
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