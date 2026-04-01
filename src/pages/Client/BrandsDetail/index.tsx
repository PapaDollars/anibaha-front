import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faStore,
  faBox,
  faStar,
  faShieldAlt,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faGlobe,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faTiktok,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

import { AppDispatch, RootState } from '@/store';
import { fetchBrandParSlug } from '@/store/slices/brandSlice';
import { ROUTES } from '@/utils/url/url_frontend';

const CompanyDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { brandActuel, brands, erreur: error } = useSelector((state: RootState) => state.brand) as any;
  const [fetching, setFetching] = useState(true);

  // Fallback immédiat depuis la liste déjà chargée pendant le fetch
  const companyFromList = brands?.find((b: any) => b.id === id || b.slug === id);
  const company = (brandActuel?.id === id ? brandActuel : null) ?? companyFromList;

  useEffect(() => {
    if (id) {
      setFetching(true);
      dispatch(fetchBrandParSlug(id)).finally(() => setFetching(false));
    }
  }, [dispatch, id]);

  // Spinner pendant le fetch initial (pas de fallback disponible)
  if (fetching && !company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="text-blue-600 text-4xl animate-spin mb-4" />
          <p className="text-gray-600 text-lg">{t('common.loading', 'Chargement...')}</p>
        </div>
      </div>
    );
  }

  // État d'erreur ou entreprise introuvable
  if (!fetching && (error || !company)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faStore} className="text-gray-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t('brands.notFound', 'Entreprise introuvable')}
          </h2>
          <p className="text-gray-500 mb-6">
            {error || t('brands.notFoundDesc', "Cette entreprise n'existe pas ou a été supprimée.")}
          </p>
          <Link
            to={ROUTES.PUBLIC.CATALOG.BRANDS}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            {t('brands.backToList', 'Voir toutes les marques')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Bouton retour vers la liste des marques */}
        <Link
          to={ROUTES.PUBLIC.CATALOG.BRANDS}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 my-6 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          <span>{t('brands.backToList', 'Retour aux marques')}</span>
        </Link>

        {/* En-tête de l'entreprise */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">

          {/* Bannière */}
          <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-100 to-blue-200">
            {company.banner ? (
              <img
                src={company.banner}
                alt={company.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FontAwesomeIcon icon={faStore} className="text-blue-300 text-8xl" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Informations principales */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">

              {/* Logo */}
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border flex items-center justify-center flex-shrink-0 -mt-16 relative z-10">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-20 h-20 object-contain rounded-xl"
                  />
                ) : (
                  <FontAwesomeIcon icon={faStore} className="text-gray-400 text-4xl" />
                )}
              </div>

              {/* Nom, description, badges */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                  {company.isVerified && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-xs" />
                      Vérifié
                    </span>
                  )}
                  {/* Badge statut */}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    company.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : company.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {company.status === 'approved' ? 'Actif'
                      : company.status === 'pending' ? 'En attente'
                      : company.status === 'suspended' ? 'Suspendu'
                      : 'Rejeté'}
                  </span>
                </div>

                <p className="text-gray-600 text-lg mb-4 leading-relaxed">{company.description}</p>

                {/* Statistiques */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-2xl font-bold text-blue-700">
                      {company.stats?.totalProducts ?? 0}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">Produits</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-700 flex items-center justify-center gap-1">
                      <FontAwesomeIcon icon={faStar} className="text-lg" />
                      {company.stats?.averageRating?.toFixed(1) ?? 'N/A'}
                    </div>
                    <div className="text-sm text-yellow-600 font-medium">Note</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-2xl font-bold text-green-700">
                      {company.stats?.totalOrders ?? 0}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Commandes</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-2xl font-bold text-purple-700">
                      {company.businessInfo?.foundedYear ?? 'N/A'}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">Fondée</div>
                  </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="flex flex-wrap gap-3">
                  {company.socialMedia?.facebook && (
                    <a
                      href={company.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all shadow-md"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  )}
                  {company.socialMedia?.instagram && (
                    <a
                      href={company.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-md"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  )}
                  {company.socialMedia?.twitter && (
                    <a
                      href={company.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-sky-400 text-white rounded-full flex items-center justify-center hover:bg-sky-500 hover:scale-110 transition-all shadow-md"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  )}
                  {company.socialMedia?.tiktok && (
                    <a
                      href={company.socialMedia.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all shadow-md"
                    >
                      <FontAwesomeIcon icon={faTiktok} />
                    </a>
                  )}
                  {company.socialMedia?.whatsapp && (
                    <a
                      href={`https://wa.me/${company.socialMedia.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all shadow-md"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                  )}
                  {company.businessInfo?.website && (
                    <a
                      href={company.businessInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600 hover:scale-110 transition-all shadow-md"
                    >
                      <FontAwesomeIcon icon={faGlobe} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations de contact et entreprise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de contact</h2>
            <div className="space-y-3">
              {company.contactInfo?.email && (
                <div className="flex items-center gap-3 text-gray-600">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 w-5" />
                  <a href={`mailto:${company.contactInfo.email}`} className="hover:text-blue-600 transition-colors">
                    {company.contactInfo.email}
                  </a>
                </div>
              )}
              {company.contactInfo?.phone && (
                <div className="flex items-center gap-3 text-gray-600">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-500 w-5" />
                  <a href={`tel:${company.contactInfo.phone}`} className="hover:text-blue-600 transition-colors">
                    {company.contactInfo.phone}
                  </a>
                </div>
              )}
              {company.contactInfo?.address && (
                <div className="flex items-start gap-3 text-gray-600">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 w-5 mt-1" />
                  <div>
                    <p>{company.contactInfo.address.street}</p>
                    <p>{company.contactInfo.address.city}, {company.contactInfo.address.country}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informations commerciales */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informations commerciales</h2>
            <div className="space-y-3">
              {company.businessInfo?.industry && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Secteur</span>
                  <span className="font-medium text-gray-900">{company.businessInfo.industry}</span>
                </div>
              )}
              {company.businessInfo?.businessType && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 capitalize">{company.businessInfo.businessType}</span>
                </div>
              )}
              {company.businessInfo?.employeeCount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Employés</span>
                  <span className="font-medium text-gray-900">{company.businessInfo.employeeCount}</span>
                </div>
              )}
              {company.subscription?.plan && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Abonnement</span>
                  <span className={`font-medium capitalize px-2 py-0.5 rounded-full text-xs ${
                    company.subscription.plan === 'premium' || company.subscription.plan === 'enterprise'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {company.subscription.plan}
                  </span>
                </div>
              )}
              {company.stats?.responseRate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taux de réponse</span>
                  <span className="font-medium text-green-600">{company.stats.responseRate}%</span>
                </div>
              )}
              {company.stats?.responseTime && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Temps de réponse</span>
                  <span className="font-medium text-gray-900">~{company.stats.responseTime} min</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section produits */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faBox} className="text-blue-500" />
              Produits ({company.stats?.totalProducts ?? 0})
            </h2>
            <Link
              to={`/products?brand=${company.id}`}
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Voir tous les produits
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            Utilisez le lien ci-dessus pour explorer tous les produits de cette marque.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CompanyDetail;