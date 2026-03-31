import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchProfil,
  mettreAJourProfil,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
  effacerErreur,
  effacerMessageSucces,
} from "@/store/slices/userSlice";
import { formatFCFA } from "@/utils/formatPrix";

// Onglets disponibles
type Onglet = "profil" | "adresses" | "securite" | "points";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    profil,
    chargement,
    chargementMdp,
    chargementAdresse,
    erreur,
    messageSucces,
  } = useSelector((state: RootState) => state.users);

  const [ongletActif, setOngletActif] = useState<Onglet>("profil");

  // Formulaire profil
  const [formProfil, setFormProfil] = useState({
    name: "",
    phone: "",
  });

  // Formulaire mot de passe
  const [formMdp, setFormMdp] = useState({
    ancienMotDePasse: "",
    nouveauMotDePasse: "",
    confirmationMotDePasse: "",
  });

  // Modal adresse
  const [modalAdresseOuverte, setModalAdresseOuverte] = useState(false);
  const [adresseEnEdition, setAdresseEnEdition] = useState<any>(null);
  const [formAdresse, setFormAdresse] = useState({
    label: "",
    rue: "",
    ville: "",
    quartier: "",
    telephone: "",
    estPrincipale: false,
  });

  useEffect(() => {
    dispatch(fetchProfil());
  }, [dispatch]);

  useEffect(() => {
    if (profil) {
      setFormProfil({ name: profil.name, phone: profil.phone || "" });
    }
  }, [profil]);

  // Effacer les messages après 4 secondes
  useEffect(() => {
    if (messageSucces || erreur) {
      const minuterie = setTimeout(() => {
        dispatch(effacerErreur());
        dispatch(effacerMessageSucces());
      }, 4000);
      return () => clearTimeout(minuterie);
    }
  }, [messageSucces, erreur, dispatch]);

  const sauvegarderProfil = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(mettreAJourProfil(formProfil));
  };

  const changerMotDePasse = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultat = await dispatch(changePassword(formMdp));
    if (changePassword.fulfilled.match(resultat)) {
      setFormMdp({
        ancienMotDePasse: "",
        nouveauMotDePasse: "",
        confirmationMotDePasse: "",
      });
    }
  };

  const ouvrirModalAdresse = (adresse?: any) => {
    if (adresse) {
      setAdresseEnEdition(adresse);
      setFormAdresse({
        label: adresse.label,
        rue: adresse.rue,
        ville: adresse.ville,
        quartier: adresse.quartier || "",
        telephone: adresse.telephone || "",
        estPrincipale: adresse.estPrincipale,
      });
    } else {
      setAdresseEnEdition(null);
      setFormAdresse({
        label: "",
        rue: "",
        ville: "",
        quartier: "",
        telephone: "",
        estPrincipale: false,
      });
    }
    setModalAdresseOuverte(true);
  };

  const soumettreAdresse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adresseEnEdition) {
      await dispatch(updateAddress({ id: adresseEnEdition.id, donnees: formAdresse }));
    } else {
      await dispatch(addAddress(formAdresse));
    }
    setModalAdresseOuverte(false);
  };

  const supprimerAdresse = async (id: string) => {
    if (confirm("Supprimer cette adresse ?")) {
      await dispatch(deleteAddress(id));
    }
  };

  if (chargement && !profil) {
    return <div className="chargement">Chargement du profil...</div>;
  }

  if (!profil) {
    return <div className="erreur-page">Impossible de charger le profil</div>;
  }

  const onglets: { id: Onglet; label: string; icone: string }[] = [
    { id: "profil",    label: "Mon profil",     icone: "👤" },
    { id: "adresses",  label: "Mes adresses",   icone: "📍" },
    { id: "securite",  label: "Sécurité",       icone: "🔒" },
    { id: "points",    label: "Mes points",     icone: "⭐" },
  ];

  return (
    <div className="page-profil">
      {/* En-tête du profil */}
      <div className="profil-header">
        <div className="avatar-bloc">
          <div className="avatar">
            {profil.avatar ? (
              <img src={profil.avatar} alt={profil.name} />
            ) : (
              <span>{profil.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="header-info">
            <h1 className="header-nom">{profil.name}</h1>
            <p className="header-email">{profil.email}</p>
            <div className="header-points">
              <span className="points-icone">⭐</span>
              <span>{profil.points} points de fidélité</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages globaux */}
      {messageSucces && (
        <div className="alerte succes">{messageSucces}</div>
      )}
      {erreur && <div className="alerte erreur-alerte">{erreur}</div>}

      {/* Navigation par onglets */}
      <div className="onglets-nav">
        {onglets.map((onglet) => (
          <button
            key={onglet.id}
            className={`onglet-bouton ${ongletActif === onglet.id ? "actif" : ""}`}
            onClick={() => setOngletActif(onglet.id)}
          >
            <span>{onglet.icone}</span>
            <span>{onglet.label}</span>
          </button>
        ))}
      </div>

      {/* ── Onglet Profil ── */}
      {ongletActif === "profil" && (
        <div className="section-card">
          <h2 className="section-titre">Informations personnelles</h2>
          <form onSubmit={sauvegarderProfil}>
            <div className="grille-form">
              <div className="groupe-champ">
                <label>Nom complet</label>
                <input
                  type="text"
                  value={formProfil.name}
                  onChange={(e) =>
                    setFormProfil((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="groupe-champ">
                <label>Email</label>
                <input
                  type="email"
                  value={profil.email}
                  disabled
                  className="champ-desactive"
                />
              </div>
              <div className="groupe-champ">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={formProfil.phone}
                  onChange={(e) =>
                    setFormProfil((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+237 6XX XXX XXX"
                />
              </div>
              <div className="groupe-champ">
                <label>Rôle</label>
                <input
                  type="text"
                  value={
                    profil.role === "client"
                      ? "Client"
                      : profil.role === "company_admin"
                      ? "Vendeur"
                      : "Super Admin"
                  }
                  disabled
                  className="champ-desactive"
                />
              </div>
            </div>
            <div className="actions-form">
              <button type="submit" className="bouton-primaire" disabled={chargement}>
                {chargement ? "Sauvegarde..." : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Onglet Adresses ── */}
      {ongletActif === "adresses" && (
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-titre">Mes adresses de livraison</h2>
            <button
              className="bouton-primaire"
              onClick={() => ouvrirModalAdresse()}
            >
              + Ajouter
            </button>
          </div>

          {profil.adresses.length === 0 ? (
            <div className="vide-bloc">
              <p>Aucune adresse enregistrée.</p>
              <button
                className="bouton-primaire"
                onClick={() => ouvrirModalAdresse()}
              >
                Ajouter une adresse
              </button>
            </div>
          ) : (
            <div className="liste-adresses">
              {profil.adresses.map((adresse) => (
                <div
                  key={adresse.id}
                  className={`adresse-carte ${adresse.estPrincipale ? "principale" : ""}`}
                >
                  {adresse.estPrincipale && (
                    <span className="badge-principale">Principale</span>
                  )}
                  <div className="adresse-label">{adresse.label}</div>
                  <div className="adresse-detail">
                    {adresse.rue}
                    {adresse.quartier && `, ${adresse.quartier}`}
                  </div>
                  <div className="adresse-ville">{adresse.ville}</div>
                  {adresse.telephone && (
                    <div className="adresse-tel">📞 {adresse.telephone}</div>
                  )}
                  <div className="adresse-actions">
                    <button
                      className="bouton-action modifier"
                      onClick={() => ouvrirModalAdresse(adresse)}
                    >
                      Modifier
                    </button>
                    <button
                      className="bouton-action supprimer"
                      onClick={() => supprimerAdresse(adresse.id)}
                      disabled={chargementAdresse}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Onglet Sécurité ── */}
      {ongletActif === "securite" && (
        <div className="section-card">
          <h2 className="section-titre">Changer le mot de passe</h2>
          <form onSubmit={changerMotDePasse} style={{ maxWidth: 420 }}>
            <div className="groupe-champ">
              <label>Mot de passe actuel *</label>
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
              <label>Nouveau mot de passe *</label>
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
              <label>Confirmer le nouveau mot de passe *</label>
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
            <div className="actions-form">
              <button
                type="submit"
                className="bouton-primaire"
                disabled={chargementMdp}
              >
                {chargementMdp ? "Modification..." : "Changer le mot de passe"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Onglet Points ── */}
      {ongletActif === "points" && (
        <div className="section-card">
          <h2 className="section-titre">Programme de fidélité</h2>

          {/* Solde de points */}
          <div className="points-solde">
            <div className="points-valeur">{profil.points}</div>
            <div className="points-unite">points de fidélité</div>
          </div>

          <div className="points-info">
            <div className="info-ligne">
              <span className="info-icone">🛍️</span>
              <div>
                <div className="info-titre">Comment gagner des points ?</div>
                <div className="info-desc">
                  Vous recevez <strong>100 points</strong> automatiquement lorsque
                  chaque commande est livrée.
                </div>
              </div>
            </div>
            <div className="info-ligne">
              <span className="info-icone">⭐</span>
              <div>
                <div className="info-titre">Votre solde actuel</div>
                <div className="info-desc">
                  Vous avez accumulé <strong>{profil.points} points</strong> grâce à vos
                  commandes.
                </div>
              </div>
            </div>
          </div>

          {/* Historique simplifié */}
          <div className="points-historique">
            <h3 className="historique-titre">Dernières transactions</h3>
            <p className="historique-vide">
              L'historique détaillé de vos points sera disponible prochainement.
            </p>
          </div>
        </div>
      )}

      {/* Modal adresse */}
      {modalAdresseOuverte && (
        <div className="modal-overlay" onClick={() => setModalAdresseOuverte(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{adresseEnEdition ? "Modifier l'adresse" : "Nouvelle adresse"}</h3>
              <button
                className="modal-fermer"
                onClick={() => setModalAdresseOuverte(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={soumettreAdresse} className="modal-form">
              <div className="groupe-champ">
                <label>Libellé *</label>
                <input
                  type="text"
                  required
                  value={formAdresse.label}
                  onChange={(e) =>
                    setFormAdresse((f) => ({ ...f, label: e.target.value }))
                  }
                  placeholder="Ex : Maison, Bureau..."
                />
              </div>
              <div className="groupe-champ">
                <label>Rue / Adresse *</label>
                <input
                  type="text"
                  required
                  value={formAdresse.rue}
                  onChange={(e) =>
                    setFormAdresse((f) => ({ ...f, rue: e.target.value }))
                  }
                  placeholder="Ex : Avenue Kennedy, N°42"
                />
              </div>
              <div className="grille-2">
                <div className="groupe-champ">
                  <label>Ville *</label>
                  <input
                    type="text"
                    required
                    value={formAdresse.ville}
                    onChange={(e) =>
                      setFormAdresse((f) => ({ ...f, ville: e.target.value }))
                    }
                    placeholder="Ex : Yaoundé"
                  />
                </div>
                <div className="groupe-champ">
                  <label>Quartier</label>
                  <input
                    type="text"
                    value={formAdresse.quartier}
                    onChange={(e) =>
                      setFormAdresse((f) => ({
                        ...f,
                        quartier: e.target.value,
                      }))
                    }
                    placeholder="Ex : Bastos"
                  />
                </div>
              </div>
              <div className="groupe-champ">
                <label>Téléphone de contact</label>
                <input
                  type="tel"
                  value={formAdresse.telephone}
                  onChange={(e) =>
                    setFormAdresse((f) => ({
                      ...f,
                      telephone: e.target.value,
                    }))
                  }
                  placeholder="+237 6XX XXX XXX"
                />
              </div>
              <div className="groupe-champ-check">
                <label>
                  <input
                    type="checkbox"
                    checked={formAdresse.estPrincipale}
                    onChange={(e) =>
                      setFormAdresse((f) => ({
                        ...f,
                        estPrincipale: e.target.checked,
                      }))
                    }
                  />
                  Définir comme adresse principale
                </label>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="bouton-secondaire"
                  onClick={() => setModalAdresseOuverte(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bouton-primaire"
                  disabled={chargementAdresse}
                >
                  {chargementAdresse
                    ? "En cours..."
                    : adresseEnEdition
                    ? "Enregistrer"
                    : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .page-profil { font-family: system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 24px; }
        .chargement { text-align: center; padding: 60px; color: #9ca3af; font-family: system-ui, sans-serif; }
        .erreur-page { color: #dc2626; padding: 20px; font-family: system-ui, sans-serif; }

        /* En-tête */
        .profil-header {
          background: #fff;
          border-radius: 10px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          margin-bottom: 20px;
        }
        .avatar-bloc { display: flex; align-items: center; gap: 16px; }
        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #ff6b35;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          overflow: hidden;
          flex-shrink: 0;
        }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .header-nom { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 4px; }
        .header-email { font-size: 14px; color: #6b7280; margin: 0 0 6px; }
        .header-points { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #374151; }
        .points-icone { font-size: 16px; }

        /* Messages */
        .alerte {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: 500;
        }
        .alerte.succes { background: #d1fae5; color: #065f46; }
        .alerte.erreur-alerte { background: #fee2e2; color: #7f1d1d; }

        /* Onglets */
        .onglets-nav {
          display: flex;
          gap: 4px;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 10px;
          margin-bottom: 20px;
          overflow-x: auto;
        }
        .onglet-bouton {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: none;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: #6b7280;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .onglet-bouton:hover { background: rgba(255,255,255,0.7); color: #111; }
        .onglet-bouton.actif { background: #fff; color: #111; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

        /* Section card */
        .section-card {
          background: #fff;
          border-radius: 10px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .section-titre { font-size: 16px; font-weight: 700; color: #111; margin: 0 0 16px; }
        .section-header .section-titre { margin: 0; }

        /* Formulaires */
        .grille-form { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
        .grille-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .groupe-champ { margin-bottom: 0; }
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

        .groupe-champ-check { margin-top: 8px; }
        .groupe-champ-check label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #374151; cursor: pointer; }
        .groupe-champ-check input[type="checkbox"] { width: 16px; height: 16px; }

        .actions-form { margin-top: 16px; display: flex; justify-content: flex-end; }

        /* Adresses */
        .vide-bloc { text-align: center; padding: 40px; color: #9ca3af; }
        .vide-bloc p { margin-bottom: 14px; }
        .liste-adresses { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
        .adresse-carte {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 14px;
          position: relative;
        }
        .adresse-carte.principale { border-color: #ff6b35; }
        .badge-principale {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ff6b35;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
        }
        .adresse-label { font-size: 14px; font-weight: 700; color: #111; margin-bottom: 6px; }
        .adresse-detail { font-size: 13px; color: #374151; }
        .adresse-ville { font-size: 13px; color: #6b7280; }
        .adresse-tel { font-size: 12px; color: #9ca3af; margin-top: 4px; }
        .adresse-actions { display: flex; gap: 8px; margin-top: 12px; }

        /* Points */
        .points-solde {
          text-align: center;
          padding: 32px;
          background: linear-gradient(135deg, #fff7ed, #fff);
          border-radius: 10px;
          border: 2px solid #fdba74;
          margin-bottom: 20px;
        }
        .points-valeur { font-size: 56px; font-weight: 800; color: #ff6b35; }
        .points-unite { font-size: 16px; color: #9ca3af; }
        .points-info { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
        .info-ligne { display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: #f9fafb; border-radius: 8px; }
        .info-icone { font-size: 20px; flex-shrink: 0; }
        .info-titre { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 2px; }
        .info-desc { font-size: 13px; color: #6b7280; }
        .points-historique { border-top: 1px solid #f3f4f6; padding-top: 16px; }
        .historique-titre { font-size: 14px; font-weight: 600; color: #111; margin: 0 0 8px; }
        .historique-vide { font-size: 13px; color: #9ca3af; }

        /* Boutons */
        .bouton-primaire {
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 9px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .bouton-primaire:hover { opacity: 0.88; }
        .bouton-primaire:disabled { opacity: 0.5; cursor: not-allowed; }
        .bouton-secondaire {
          background: #f3f4f6;
          color: #374151;
          border: none;
          padding: 9px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
        .bouton-action {
          padding: 5px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .bouton-action:hover { opacity: 0.8; }
        .bouton-action.modifier { background: #eff6ff; color: #1d4ed8; }
        .bouton-action.supprimer { background: #fee2e2; color: #7f1d1d; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .modal {
          background: #fff;
          border-radius: 12px;
          width: 480px;
          max-width: 95vw;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 22px;
          border-bottom: 1px solid #e5e7eb;
        }
        .modal-header h3 { margin: 0; font-size: 16px; font-weight: 700; }
        .modal-fermer {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #9ca3af;
        }
        .modal-form { padding: 20px 22px; }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 8px;
        }
      `}</style>
    </div>
  );
}