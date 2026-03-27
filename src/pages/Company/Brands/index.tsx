//company brands
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faStore,
  faUser,
  faBox,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '@/store';
import { 
  fetchBrands, 
  updateBrand, 
  toggleBrandStatus, 
  deleteBrand, 
  createCompany, 
  selectCompanies, 
  selectCompanyLoading, 
  selectCompanyError 
} from '@/store/slices-test/brandSlice';
import { Company } from '@/types/company';
// import { updateUserRole } from '@/store/slices/authSlice';

const AdminBrands: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const brands: Company[] = useSelector(selectCompanies) as Company[];
  const loading = useSelector(selectCompanyLoading);
  const error = useSelector(selectCompanyError);
  const isSuperAdmin = useSelector((state: RootState) => state.auth.user?.role === 'superAdmin');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Company | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    banner: '',
  });

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedBrand) {
        await dispatch(updateBrand({ ...selectedBrand, ...formData })).unwrap();
        toast.success(t('brands.updateSuccess', 'Marque mise à jour avec succès'));
      } else {
        await dispatch(createCompany(formData as any)).unwrap();
        toast.success(t('brands.createSuccess', 'Marque créée avec succès'));
      }
      setIsModalOpen(false);
      setSelectedBrand(null);
      setFormData({ name: '', description: '', logo: '', banner: '' });
    } catch (error) {
      toast.error(t('brands.error', 'Une erreur est survenue'));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('brands.confirmDelete', 'Êtes-vous sûr de vouloir supprimer cette marque ?'))) {
      try {
        await dispatch(deleteBrand(id)).unwrap();
        toast.success(t('brands.deleteSuccess', 'Marque supprimée avec succès'));
      } catch (error) {
        toast.error(t('brands.error', 'Une erreur est survenue'));
      }
    }
  };

  const handleEdit = (company: Company) => {
    setSelectedBrand(company);
    setFormData({
      name: company.name,
      description: company.description,
      logo: company.logo || '',
      banner: company.banner || '',
    });
    setIsModalOpen(true);
  };

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('common.unauthorized', 'Accès non autorisé')}
            </h1>
            <p className="text-gray-600">
              {t('common.unauthorizedMessage', 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('brands.title', 'Gestion des marques')}
            </h1>
            <p className="mt-2 text-gray-600">
              {t('brands.subtitle', 'Gérez les marques et leurs administrateurs')}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedBrand(null);
              setFormData({ name: '', description: '', logo: '', banner: '' });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            {t('brands.add', 'Ajouter une marque')}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            {typeof error === 'string' || React.isValidElement(error) ? error : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand: Company) => (
              <div key={brand.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {brand.banner ? (
                    <img
                      src={brand.banner}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faStore} className="text-gray-400 text-4xl" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <FontAwesomeIcon icon={faStore} className="text-gray-400 text-2xl" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {t('brands.owner', 'Propriétaire')}: {brand.ownerId}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{brand.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faBox} className="mr-1" />
                      <span>{brand.stats?.totalProducts ?? 0} {t('brands.products', 'produits')}</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCheck} className="mr-1" />
                      <span>{brand.isActive ? t('brands.active', 'Active') : t('brands.inactive', 'Inactive')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedBrand ? t('brands.edit', 'Modifier la marque') : t('brands.create', 'Créer une marque')}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('brands.name', 'Nom')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('brands.description', 'Description')}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('brands.logo', 'Logo URL')}
                  </label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('brands.banner', 'Bannière URL')}
                  </label>
                  <input
                    type="url"
                    value={formData.banner}
                    onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {t('common.cancel', 'Annuler')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {selectedBrand ? t('common.save', 'Enregistrer') : t('common.create', 'Créer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrands; 