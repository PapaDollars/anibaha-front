//client brands
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faBox,
  faArrowRight,
  faSearch,
  faGlobe,
  faCalendarAlt,
  faArrowLeft,
  faTh, // Corrected: was faGrid
  faList
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { RootState, AppDispatch } from '@/store';
import {
  fetchBrands,
  selectCompanies,
  selectCompanyLoading,
  selectCompanyError
} from '@/store/slices-test/brandSlice';
// Corrected imports to use the new modular components
import { ProductCard } from '@/components/common/cards/product-card';
import { CompanyCard } from '@/components/common/cards/company-card';
import { addToCart } from '@/store/slices-test/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices-test/wishlistSlice';
import { Product } from '@/types/product';
import { Company } from '@/types/company';
import { ROUTES } from '@/utils/url/url_frontend';

const Companys: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const companies: Company[] = useSelector(selectCompanies) ?? [];
  const loading = useSelector(selectCompanyLoading) ?? false;
  const error = useSelector(selectCompanyError) ?? null;

  // Redux state for cart and wishlist
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (company.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const selectedCompanyData = selectedCompany
    ? companies.find(company => company.id === selectedCompany)
    : null;

  // Adapt Company for CompanyCard (dummy/fallback for missing fields)
  const adaptCompanyForCard = (company: Company) => ({
    id: company.id,
    name: company.name,
    logo: company.logo || '/placeholder-logo.jpg',
    rating: typeof company.settings === 'object' && 'rating' in company.settings ? (company.settings as any).rating : 4.5,
    products: Array.isArray((company as any).products) ? (company as any).products.length : 0,
    verified: company.isVerified,
    location: company.businessInfo?.industry || '',
    followers: (company as any).followers || 0,
    category: (company as any).category || 'Entreprise',
  });

  // Enhanced product card handlers
  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist({ product, userId: user?.id || '' }));
  };

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item?.product?.id === productId && item?.userId === user?.id);
  };

  const handleFollow = (companyId: string) => {
    // Implement follow logic
    console.log('Follow company:', companyId);
  };

  const handleCompanySelect = (brandId: string) => {
    setSelectedCompany(brandId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">{t('common.loading', 'Chargement...')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faStore} className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-red-800 mb-2">
                {t('common.error', 'Une erreur est survenue')}
              </h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          to={ROUTES.PUBLIC.HOME}
          className="inline-flex pt-6 items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          <span>{t('common.back', 'Retour à l\'accueil')}</span>
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t('brands.title', 'Nos Marques')}
              </h1>
              <p className="text-gray-600 text-lg">
                {t('brands.subtitle', 'Découvrez nos marques partenaires de confiance')}
              </p>
            </div>

            {!selectedCompany && (
              <div className="flex items-center space-x-2 mt-4 md:mt-0 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  title="Vue grille"
                >
                  <FontAwesomeIcon icon={faTh} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'list'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  title="Vue liste"
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
              </div>
            )}
          </div>

          <div className='flex mx-auto justify-between'>
            {/* Back Button */}
            <div
              className="inline-flex px-6"
            >
            </div>
            {/* Search Bar */}
            <div className="relative inline-flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('brands.searchPlaceholder', 'Rechercher une marque...')}
                className="w-full px-4 pt-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm transition-all duration-200"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Company Details View */}
        {selectedCompany ? (
          <div>
            {selectedCompanyData && (
              <div>
                {/* Company Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                  {/* Cover Image */}
                  <div className="relative h-44 md:h-48 bg-gradient-to-br from-primary-100 to-primary-200">
                    {selectedCompanyData.banner ? (
                      <img
                        src={selectedCompanyData.banner}
                        alt={selectedCompanyData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faStore} className="text-primary-300 text-8xl" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  {/* Company Info */}
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start mb-6">
                      {/* Logo */}
                      <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 border">
                        {selectedCompanyData.logo ? (
                          <img
                            src={selectedCompanyData.logo}
                            alt={selectedCompanyData.name}
                            className="w-20 h-20 object-contain"
                          />
                        ) : (
                          <FontAwesomeIcon icon={faStore} className="text-gray-400 text-4xl" />
                        )}
                      </div>

                      {/* Company Details */}
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedCompanyData.name}
                        </h2>
                        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                          {selectedCompanyData.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                            <div className="text-2xl font-bold text-primary-700">
                              {selectedCompanyData.stats?.totalProducts ?? 0}
                            </div>
                            <div className="text-sm text-primary-600 font-medium">Produits</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <div className="text-2xl font-bold text-green-700">
                              {selectedCompanyData.stats?.averageRating ?? 4.5}
                            </div>
                            <div className="text-sm text-green-600 font-medium">Note</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <div className="text-2xl font-bold text-blue-700">
                              {selectedCompanyData.businessInfo?.foundedYear?.toString() ?? 'N/A'}
                            </div>
                            <div className="text-sm text-blue-600 font-medium">Fondée</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                            <div className="text-2xl font-bold text-purple-700">
                              {selectedCompanyData.businessInfo?.industry ?? 'N/A'}
                            </div>
                            <div className="text-sm text-purple-600 font-medium">Pays</div>
                          </div>
                        </div>

                        {/* Links & Social Media */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          {/* Social Media */}
                          <div className="flex space-x-3">
                            {selectedCompanyData.socialMedia?.facebook && (
                              <a
                                href={selectedCompanyData.socialMedia.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-200 shadow-lg"
                              >
                                <FontAwesomeIcon icon={faFacebook} />
                              </a>
                            )}
                            {selectedCompanyData.socialMedia?.instagram && (
                              <a
                                href={selectedCompanyData.socialMedia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 hover:scale-110 transition-all duration-200 shadow-lg"
                              >
                                <FontAwesomeIcon icon={faInstagram} />
                              </a>
                            )}
                            {selectedCompanyData.socialMedia?.twitter && (
                              <a
                                href={selectedCompanyData.socialMedia.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all duration-200 shadow-lg"
                              >
                                <FontAwesomeIcon icon={faTwitter} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Products */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t('brands.products', 'Produits')} ({selectedCompanyData.stats?.totalProducts ?? 0})
                    </h3>
                    <Link
                      to={`/products?brand=${selectedCompanyData.id}`}
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span>Voir tous les produits</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Companys Grid/List View
          <div>
            {/* Results Counter */}
            <div className="mb-6">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-gray-900">{filteredCompanies.length}</span> {t('brands.found', 'marque(s) trouvée(s)')}
                {searchQuery && (
                  <span className="ml-1">
                    pour "<span className="font-medium text-primary-600">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>

            {/* Companys Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  onClick={() => handleCompanySelect(company.id)}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                >
                  <CompanyCard
                    company={adaptCompanyForCard(company)}
                    viewMode={viewMode === 'grid' ? 'detailed' : 'list'}
                    onFollow={handleFollow}
                  />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCompanies.length === 0 && (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('brands.noResults', 'Aucune marque trouvée')}
                </h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto mb-6">
                  {searchQuery
                    ? `Nous n'avons trouvé aucune marque correspondant à "${searchQuery}"`
                    : t('brands.noResultsDescription', 'Essayez avec des mots-clés différents')
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-medium"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2 transform rotate-180" />
                    Voir toutes les marques
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companys;