import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import axios from "@/lib/axios";

// Types pour les rapports
interface RapportData {
  overview: {
    totalUtilisateurs: number;
    nouveauxUtilisateurs: number;
    totalEntreprises: number;
    totalProduits: number;
    totalCommandes: number;
    commandesPeriode: number;
    chiffreAffaires: number;
    devise: string;
  };
  commandesParStatut: Record<string, number>;
  topEntreprises: Array<{
    id: string;
    name: string;
    slug: string;
    commandesPeriode: number;
  }>;
  evolution: Array<{ date: string; commandes: number }>;
}

// Formatage en FCFA
const formatFCFA = (montant: number) =>
  `${montant.toLocaleString("fr-FR")} FCFA`;

// Libellés des statuts de commande
const LIBELLES_STATUT: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmées",
  processing: "En traitement",
  shipped: "Expédiées",
  delivered: "Livrées",
  cancelled: "Annulées",
  refunded: "Remboursées",
};

export default function AdminReports() {
  const [periode, setPeriode] = useState<"week" | "month" | "year">("month");
  const [rapports, setRapports] = useState<RapportData | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const chargerRapports = async () => {
      setChargement(true);
      setErreur(null);
      try {
        const reponse = await axios.get(`/api/admin/reports?periode=${periode}`);
        setRapports(reponse.data.rapports);
      } catch (err: any) {
        setErreur(err.response?.data?.message || "Erreur de chargement");
      } finally {
        setChargement(false);
      }
    };
    chargerRapports();
  }, [periode]);

  const cartesStat = rapports
    ? [
        {
          label: "Utilisateurs",
          valeur: rapports.overview.totalUtilisateurs,
          sous: `+${rapports.overview.nouveauxUtilisateurs} nouveaux`,
          couleur: "#3b82f6",
        },
        {
          label: "Entreprises actives",
          valeur: rapports.overview.totalEntreprises,
          sous: "Marques enregistrées",
          couleur: "#8b5cf6",
        },
        {
          label: "Produits",
          valeur: rapports.overview.totalProduits,
          sous: "Produits actifs",
          couleur: "#f59e0b",
        },
        {
          label: "Commandes (période)",
          valeur: rapports.overview.commandesPeriode,
          sous: `Total : ${rapports.overview.totalCommandes}`,
          couleur: "#10b981",
        },
        {
          label: "Chiffre d'affaires",
          valeur: formatFCFA(rapports.overview.chiffreAffaires),
          sous: "Commandes livrées",
          couleur: "#ff6b35",
          grand: true,
        },
      ]
    : [];

  return (
    <div className="page-rapports">
      {/* En-tête */}
      <div className="page-header">
        <div>
          <h2 className="page-titre">Rapports & Statistiques</h2>
          <p className="page-sous-titre">Vue globale de la plateforme Anibaha</p>
        </div>
        {/* Sélecteur de période */}
        <div className="selecteur-periode">
          {(["week", "month", "year"] as const).map((p) => (
            <button
              key={p}
              className={`bouton-periode ${periode === p ? "actif" : ""}`}
              onClick={() => setPeriode(p)}
            >
              {p === "week" ? "7 jours" : p === "month" ? "30 jours" : "1 an"}
            </button>
          ))}
        </div>
      </div>

      {chargement && <div className="chargement">Chargement des rapports...</div>}
      {erreur && <div className="erreur">{erreur}</div>}

      {rapports && !chargement && (
        <>
          {/* Cartes statistiques */}
          <div className="grille-stats">
            {cartesStat.map((carte) => (
              <div
                key={carte.label}
                className={`carte-stat ${carte.grand ? "grand" : ""}`}
                style={{ borderTopColor: carte.couleur }}
              >
                <div className="carte-valeur" style={{ color: carte.couleur }}>
                  {carte.valeur}
                </div>
                <div className="carte-label">{carte.label}</div>
                <div className="carte-sous">{carte.sous}</div>
              </div>
            ))}
          </div>

          <div className="grille-inferieure">
            {/* Répartition des commandes par statut */}
            <div className="section-carte">
              <h3 className="section-titre">Commandes par statut</h3>
              <div className="liste-statuts">
                {Object.entries(rapports.commandesParStatut).map(
                  ([statut, count]) => {
                    const total = Object.values(
                      rapports.commandesParStatut
                    ).reduce((a, b) => a + b, 0);
                    const pourcentage =
                      total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={statut} className="ligne-statut">
                        <div className="statut-info">
                          <span className="statut-nom">
                            {LIBELLES_STATUT[statut] || statut}
                          </span>
                          <span className="statut-count">{count}</span>
                        </div>
                        <div className="barre-progression">
                          <div
                            className="barre-remplie"
                            style={{ width: `${pourcentage}%` }}
                          />
                        </div>
                        <span className="statut-pourcent">{pourcentage}%</span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Top entreprises */}
            <div className="section-carte">
              <h3 className="section-titre">Top entreprises (période)</h3>
              <div className="liste-entreprises">
                {rapports.topEntreprises.map((entreprise, index) => (
                  <div key={entreprise.id} className="ligne-entreprise">
                    <span className="rang">#{index + 1}</span>
                    <div className="entreprise-info">
                      <span className="entreprise-nom">{entreprise.name}</span>
                      <span className="entreprise-slug">
                        /companies/{entreprise.slug}
                      </span>
                    </div>
                    <span className="entreprise-commandes">
                      {entreprise.commandesPeriode} commandes
                    </span>
                  </div>
                ))}
                {rapports.topEntreprises.length === 0 && (
                  <p className="vide">Aucune donnée disponible</p>
                )}
              </div>
            </div>
          </div>

          {/* Évolution des commandes (7 derniers jours) */}
          <div className="section-carte">
            <h3 className="section-titre">Évolution des commandes (7 derniers jours)</h3>
            <div className="graphique-evolution">
              {rapports.evolution.map((jour) => {
                const maxVal = Math.max(
                  ...rapports.evolution.map((j) => j.commandes),
                  1
                );
                const hauteur = Math.max(
                  (jour.commandes / maxVal) * 100,
                  4
                );
                return (
                  <div key={jour.date} className="colonne-graphique">
                    <span className="colonne-valeur">{jour.commandes}</span>
                    <div
                      className="colonne-barre"
                      style={{ height: `${hauteur}%` }}
                    />
                    <span className="colonne-date">
                      {new Date(jour.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                );
              })}
              {rapports.evolution.length === 0 && (
                <p className="vide">Aucune donnée disponible</p>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        .page-rapports { font-family: system-ui, sans-serif; }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .page-titre { font-size: 22px; font-weight: 700; color: #111; margin: 0 0 4px; }
        .page-sous-titre { font-size: 14px; color: #666; margin: 0; }

        .selecteur-periode {
          display: flex;
          background: #f3f4f6;
          border-radius: 8px;
          padding: 3px;
          gap: 2px;
        }
        .bouton-periode {
          padding: 6px 14px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: #6b7280;
          transition: all 0.15s;
        }
        .bouton-periode.actif { background: #fff; color: #111; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

        .chargement { text-align: center; padding: 60px; color: #9ca3af; }
        .erreur {
          background: #fee2e2;
          color: #7f1d1d;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        /* Grille des statistiques */
        .grille-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .carte-stat {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-top: 3px solid;
        }
        .carte-stat.grand { grid-column: span 2; }
        .carte-valeur { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
        .carte-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 2px; }
        .carte-sous { font-size: 12px; color: #9ca3af; }

        /* Grille inférieure */
        .grille-inferieure {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .grille-inferieure { grid-template-columns: 1fr; }
          .carte-stat.grand { grid-column: span 1; }
        }

        .section-carte {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          margin-bottom: 0;
        }
        .section-titre { font-size: 15px; font-weight: 600; color: #111; margin: 0 0 16px; }
        .vide { text-align: center; color: #9ca3af; font-size: 14px; }

        /* Statuts */
        .liste-statuts { display: flex; flex-direction: column; gap: 10px; }
        .ligne-statut { display: flex; align-items: center; gap: 10px; }
        .statut-info { display: flex; justify-content: space-between; width: 160px; flex-shrink: 0; }
        .statut-nom { font-size: 13px; color: #374151; }
        .statut-count { font-size: 13px; font-weight: 600; color: #111; }
        .barre-progression { flex: 1; height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden; }
        .barre-remplie { height: 100%; background: #ff6b35; border-radius: 4px; transition: width 0.5s; }
        .statut-pourcent { font-size: 12px; color: #9ca3af; width: 36px; text-align: right; flex-shrink: 0; }

        /* Top entreprises */
        .liste-entreprises { display: flex; flex-direction: column; gap: 10px; }
        .ligne-entreprise { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
        .ligne-entreprise:last-child { border-bottom: none; }
        .rang { font-size: 14px; font-weight: 700; color: #9ca3af; width: 24px; text-align: center; }
        .entreprise-info { flex: 1; }
        .entreprise-nom { display: block; font-size: 14px; font-weight: 600; color: #111; }
        .entreprise-slug { font-size: 12px; color: #9ca3af; }
        .entreprise-commandes { font-size: 13px; font-weight: 600; color: #ff6b35; white-space: nowrap; }

        /* Graphique évolution */
        .graphique-evolution {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 140px;
          padding-top: 24px;
        }
        .colonne-graphique {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          gap: 4px;
        }
        .colonne-valeur { font-size: 11px; color: #6b7280; font-weight: 600; }
        .colonne-barre {
          width: 100%;
          background: #ff6b35;
          border-radius: 4px 4px 0 0;
          min-height: 4px;
          transition: height 0.4s;
        }
        .colonne-date { font-size: 11px; color: #9ca3af; white-space: nowrap; }
      `}</style>
    </div>
  );
}