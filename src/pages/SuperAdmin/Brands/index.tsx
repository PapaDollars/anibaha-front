//superAdmin brands
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
  createCompany, 
  updateBrand, 
  deleteBrand,
  selectCompanies,
  selectCompanyLoading,
  selectCompanyError
} from '@/store/slices-test/brandSlice';
import { Company } from '@/types/company';

const Companys: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector(selectCompanies) as Company[];
  const loading = useSelector(selectCompanyLoading);
  const error = useSelector(selectCompanyError);
  const isSuperAdmin = useSelector((state: RootState) => state.auth.user?.role === 'superAdmin');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
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
      if (selectedCompany) {
        await dispatch(updateBrand({
  ...selectedCompany,
  name: formData.name,
  description: formData.description || '',
  logo: formData.logo || '',
  banner: formData.banner || '',
  slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
  status: selectedCompany.status || 'approved',
  isActive: selectedCompany.isActive ?? true,
  isVerified: selectedCompany.isVerified ?? false,
  ownerId: selectedCompany.ownerId || '',
  settings: selectedCompany.settings || {
    theme: { primaryColor: '#000000', secondaryColor: '#FFFFFF' },
    policies: {
      returnPolicy: '',
      shippingPolicy: '',
      privacyPolicy: '',
      termsOfService: ''
    },
    integrations: { paymentGateways: [], shippingProviders: [] }
  },
  businessInfo: selectedCompany.businessInfo || {
    businessType: 'company',
    registrationNumber: '',
    vatNumber: '',
    legalName: '',
    website: ''
  },
  contactInfo: selectedCompany.contactInfo || {
    email: '',
    phone: '',
    address: { street: '', city: '', postalCode: '', country: '' }
  },
  updatedAt: new Date().toISOString(),
})).unwrap();
        toast.success(t('companies.updateSuccess', 'Marque mise à jour avec succès'));
      } else {
        await dispatch(createCompany({
  ...formData,
  slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
  status: 'approved',
  isActive: true,
  isVerified: false,
  ownerId: '',
  settings: {
    theme: { primaryColor: '#000000', secondaryColor: '#FFFFFF' },
    policies: {
      returnPolicy: '',
      shippingPolicy: '',
      privacyPolicy: '',
      termsOfService: ''
    },
    integrations: { paymentGateways: [], shippingProviders: [] },
  },
  businessInfo: {
  businessType: 'company',
  registrationNumber: '',
  taxNumber: '',
  foundedYear: undefined,
  employeeCount: '',
  annualRevenue: '',
  industry: '',
  website: ''
},
  contactInfo: {
  email: '',
  phone: '',
  whatsapp: '',
  address: { id: '', isDefault: false, street: '', city: '', postalCode: '', country: '' },
  workingHours: undefined
},
  banner: formData.banner || '',
  logo: formData.logo || '',
  description: formData.description || '',
})).unwrap();
        toast.success(t('companies.createSuccess', 'Marque créée avec succès'));
      }
      setIsModalOpen(false);
      setSelectedCompany(null);
      setFormData({ name: '', description: '', logo: '', banner: '' });
    } catch (error) {
      toast.error(t('companies.error', 'Une erreur est survenue'));
    }
  };

  const handleDelete = async (brandId: string) => {
    if (window.confirm(t('companies.confirmDelete', 'Êtes-vous sûr de vouloir supprimer cette marque ?'))) {
      try {
        await dispatch(deleteBrand(brandId)).unwrap();
        toast.success(t('companies.deleteSuccess', 'Marque supprimée avec succès'));
      } catch (error) {
        toast.error(t('companies.error', 'Une erreur est survenue'));
      }
    }
  };

  const handleEdit = (brand: Company) => {
    setSelectedCompany(brand);
    setFormData({
      name: brand.name,
      description: brand.description,
      logo: brand.logo || '',
      banner: brand.banner || '',
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
              {t('companies.title', 'Gestion des marques')}
            </h1>
            <p className="mt-2 text-gray-600">
              {t('companies.subtitle', 'Gérez les marques et leurs administrateurs')}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCompany(null);
              setFormData({ name: '', description: '', logo: '', banner: '' });
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            {t('companies.add', 'Ajouter une marque')}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((brand: Company) => (
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
                        {t('companies.owner', 'Propriétaire')}: {brand.ownerId}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{brand.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faBox} className="mr-1" />
                      <span>{t('companies./* produits (à implémenter si besoin) */', 'produits')}</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCheck} className="mr-1" />
                      <span>{brand.isActive ? t('companies.active', 'Active') : t('companies.inactive', 'Inactive')}</span>
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
              {selectedCompany ? t('companies.edit', 'Modifier la marque') : t('companies.create', 'Créer une marque')}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('companies.name', 'Nom')}
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
                    {t('companies.description', 'Description')}
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
                    {t('companies.logo', 'Logo URL')}
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
                    {t('companies.banner', 'Bannière URL')}
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
                  {selectedCompany ? t('common.save', 'Enregistrer') : t('common.create', 'Créer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companys; 