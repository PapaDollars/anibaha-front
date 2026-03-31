import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchBrands,
  creerBrand,
  modifierBrand,
  supprimerBrand,
  toggleStatutBrand,
} from "@/store/slices/brandSlice";

export default function AdminBrands() {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, chargement, pagination } = useSelector(
    (state: RootState) => state.brand
  );

  const [recherche, setRecherche] = useState("");
  const [modalOuverte, setModalOuverte] = useState(false);
  const [brandEnEdition, setBrandEnEdition] = useState<any>(null);
  const [formulaire, setFormulaire] = useState({
    name: "",
    description: "",
    website: "",
    adminEmail: "",
  });

  useEffect(() => {
    dispatch(fetchBrands({ page: 1 }));
  }, [dispatch]);

  // Recherche avec délai
  useEffect(() => {
    const minuterie = setTimeout(() => {
      dispatch(fetchBrands({ search: recherche, page: 1 }));
    }, 400);
    return () => clearTimeout(minuterie);
  }, [recherche, dispatch]);

  const ouvrirModal = (brand?: any) => {
    if (brand) {
      setBrandEnEdition(brand);
      setFormulaire({
        name: brand.name,
        description: brand.description || "",
        website: brand.website || "",
        adminEmail: brand.admin?.email || "",
      });
    } else {
      setBrandEnEdition(null);
      setFormulaire({ name: "", description: "", website: "", adminEmail: "" });
    }
    setModalOuverte(true);
  };

  const fermerModal = () => {
    setModalOuverte(false);
    setBrandEnEdition(null);
  };

  const soumettreFormulaire = async (e: React.FormEvent) => {
    e.preventDefault();
    if (brandEnEdition) {
      await dispatch(modifierBrand({ id: brandEnEdition.id, donnees: formulaire }));
    } else {
      await dispatch(creerBrand(formulaire));
    }
    fermerModal();
  };

  const gererSuppression = async (id: string, nom: string) => {
    if (confirm(`Supprimer la marque "${nom}" ? Cette action est irréversible.`)) {
      await dispatch(supprimerBrand(id));
    }
  };

  const gererToggle = async (id: string) => {
    await dispatch(toggleStatutBrand(id));
  };

  return (
    <div className="page-marques">
      {/* En-tête */}
      <div className="page-header">
        <div>
          <h2 className="page-titre">Marques & Entreprises</h2>
          <p className="page-sous-titre">{pagination.total} marque(s) enregistrée(s)</p>
        </div>
        <button className="bouton-primaire" onClick={() => ouvrirModal()}>
          + Nouvelle marque
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="barre-outils">
        <input
          type="text"
          placeholder="Rechercher une marque..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="champ-recherche"
        />
      </div>

      {/* Tableau */}
      {chargement ? (
        <div className="chargement">Chargement...</div>
      ) : (
        <div className="tableau-conteneur">
          <table className="tableau">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Slug</th>
                <th>Produits</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td>
                    <div className="cellule-marque">
                      {brand.logo && (
                        <img src={brand.logo} alt={brand.name} className="logo-marque" />
                      )}
                      <div>
                        <div className="nom-marque">{brand.name}</div>
                        {brand.website && (
                          <a
                            href={brand.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-marque"
                          >
                            {brand.website}
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <code className="badge-slug">/companies/{brand.slug}</code>
                  </td>
                  <td>{brand._count?.products || 0}</td>
                  <td>
                    <span className={`badge-statut ${brand.isActive ? "actif" : "inactif"}`}>
                      {brand.isActive ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td>
                    <div className="actions-groupe">
                      <button
                        className="bouton-action modifier"
                        onClick={() => ouvrirModal(brand)}
                      >
                        Modifier
                      </button>
                      <button
                        className={`bouton-action ${brand.isActive ? "desactiver" : "activer"}`}
                        onClick={() => gererToggle(brand.id)}
                      >
                        {brand.isActive ? "Désactiver" : "Activer"}
                      </button>
                      <button
                        className="bouton-action supprimer"
                        onClick={() => gererSuppression(brand.id, brand.name)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan={5} className="table-vide">
                    Aucune marque trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                className={`bouton-page ${pagination.page === page ? "actif" : ""}`}
                onClick={() => dispatch(fetchBrands({ page, search: recherche }))}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}

      {/* Modal création/édition */}
      {modalOuverte && (
        <div className="modal-overlay" onClick={fermerModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{brandEnEdition ? "Modifier la marque" : "Nouvelle marque"}</h3>
              <button className="modal-fermer" onClick={fermerModal}>✕</button>
            </div>
            <form onSubmit={soumettreFormulaire} className="modal-form">
              <div className="groupe-champ">
                <label>Nom de la marque *</label>
                <input
                  type="text"
                  required
                  value={formulaire.name}
                  onChange={(e) =>
                    setFormulaire((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Ex : Nike Cameroun"
                />
              </div>
              <div className="groupe-champ">
                <label>Description</label>
                <textarea
                  value={formulaire.description}
                  onChange={(e) =>
                    setFormulaire((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Description de la marque..."
                  rows={3}
                />
              </div>
              <div className="groupe-champ">
                <label>Site web</label>
                <input
                  type="url"
                  value={formulaire.website}
                  onChange={(e) =>
                    setFormulaire((f) => ({ ...f, website: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
              {!brandEnEdition && (
                <div className="groupe-champ">
                  <label>Email de l'administrateur *</label>
                  <input
                    type="email"
                    required
                    value={formulaire.adminEmail}
                    onChange={(e) =>
                      setFormulaire((f) => ({ ...f, adminEmail: e.target.value }))
                    }
                    placeholder="admin@marque.cm"
                  />
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="bouton-secondaire" onClick={fermerModal}>
                  Annuler
                </button>
                <button type="submit" className="bouton-primaire" disabled={chargement}>
                  {chargement
                    ? "En cours..."
                    : brandEnEdition
                    ? "Enregistrer"
                    : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .page-marques { font-family: system-ui, sans-serif; }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .page-titre { font-size: 22px; font-weight: 700; color: #111; margin: 0 0 4px; }
        .page-sous-titre { font-size: 14px; color: #666; margin: 0; }

        .barre-outils { margin-bottom: 16px; }
        .champ-recherche {
          width: 300px;
          padding: 8px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .champ-recherche:focus { border-color: #ff6b35; }

        .tableau-conteneur {
          background: #fff;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        .tableau { width: 100%; border-collapse: collapse; }
        .tableau th {
          background: #f9fafb;
          padding: 11px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }
        .tableau td {
          padding: 14px 16px;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
          color: #374151;
        }
        .tableau tr:last-child td { border-bottom: none; }
        .tableau tr:hover td { background: #fafafa; }

        .cellule-marque { display: flex; align-items: center; gap: 12px; }
        .logo-marque { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1px solid #e5e7eb; }
        .nom-marque { font-weight: 600; color: #111; }
        .site-marque { font-size: 12px; color: #6b7280; text-decoration: none; }
        .site-marque:hover { color: #ff6b35; }

        .badge-slug {
          background: #f3f4f6;
          color: #374151;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .badge-statut {
          font-size: 12px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .badge-statut.actif { background: #d1fae5; color: #065f46; }
        .badge-statut.inactif { background: #fee2e2; color: #7f1d1d; }

        .actions-groupe { display: flex; gap: 6px; flex-wrap: wrap; }
        .bouton-action {
          padding: 5px 10px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .bouton-action:hover { opacity: 0.8; }
        .bouton-action.modifier { background: #eff6ff; color: #1d4ed8; }
        .bouton-action.activer { background: #d1fae5; color: #065f46; }
        .bouton-action.desactiver { background: #fef3c7; color: #92400e; }
        .bouton-action.supprimer { background: #fee2e2; color: #7f1d1d; }

        .table-vide { text-align: center; color: #9ca3af; padding: 32px !important; }
        .chargement { text-align: center; padding: 40px; color: #6b7280; }

        .pagination { display: flex; gap: 6px; justify-content: center; margin-top: 16px; }
        .bouton-page {
          padding: 6px 12px;
          border: 1px solid #d1d5db;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.15s;
        }
        .bouton-page:hover { border-color: #ff6b35; color: #ff6b35; }
        .bouton-page.actif { background: #ff6b35; border-color: #ff6b35; color: #fff; }

        .bouton-primaire {
          background: #ff6b35;
          color: #fff;
          border: none;
          padding: 9px 18px;
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
          padding: 9px 18px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

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
          width: 500px;
          max-width: 95vw;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        .modal-header h3 { margin: 0; font-size: 17px; font-weight: 600; }
        .modal-fermer {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #9ca3af;
          padding: 4px;
        }
        .modal-form { padding: 20px 24px; }
        .groupe-champ { margin-bottom: 16px; }
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
        }
        .groupe-champ input:focus,
        .groupe-champ textarea:focus { border-color: #ff6b35; }
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