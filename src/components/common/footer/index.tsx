import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

import { ROUTES } from '@/utils/url/url_frontend';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: faFacebookF, href: '#', label: 'Facebook' },
    { icon: faTwitter, href: '#', label: 'Twitter' },
    { icon: faInstagram, href: '#', label: 'Instagram' },
    { icon: faYoutube, href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { name: t('navigation.home', 'Accueil'), href: ROUTES.PUBLIC.HOME },
    { name: t('navigation.products', 'Produits'), href: ROUTES.PUBLIC.CATALOG.PRODUCTS },
    { name: t('footer.about', 'À propos'), href: ROUTES.PUBLIC.ABOUT },
    { name: t('footer.contact', 'Contact'), href: ROUTES.PUBLIC.CONTACT },
    { name: t('footer.blog', 'Blog'), href: '/blog' },
    { name: t('footer.careers', 'Carrières'), href: '/careers' },
  ];

  const supportLinks = [
    { name: t('footer.help', 'Centre d\'aide'), href: '/help' },
    { name: t('footer.shipping', 'Livraison'), href: '/shipping' },
    { name: t('footer.returns', 'Retours & Échanges'), href: '/returns' },
    { name: t('footer.sizeGuide', 'Guide des tailles'), href: '/size-guide' },
    { name: t('footer.faq', 'FAQ'), href: '/faq' },
    { name: t('footer.support', 'Support'), href: '/support' },
  ];

  const legalLinks = [
    { name: t('footer.terms', 'Conditions générales'), href: '/terms' },
    { name: t('footer.privacy', 'Politique de confidentialité'), href: '/privacy' },
    { name: t('footer.cookies', 'Politique des cookies'), href: '/cookies' },
    { name: t('footer.legal', 'Mentions légales'), href: '/legal' },
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ABH</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ANIBAHA
                </span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('footer.description', 'Votre boutique en ligne de confiance pour tous vos besoins. Découvrez notre large sélection de produits de qualité à des prix imbattables.')}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600" />
                  <span className="text-sm">123 Avenue des Champs, Paris 75001</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-600" />
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
                  <span className="text-sm">contact@ecommerce.fr</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-300 mb-6">{t('footer.quickLinks', 'Liens rapides')}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-300 mb-6">{t('footer.customerService', 'Service client')}</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Social */}
            <div>

              {/* Legal Links */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-300 mb-4">{t('footer.legal', 'Légal')}</h4>
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-blue-600 transition-colors duration-200 text-xs"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-gray-300 mb-4">{t('footer.followUs', 'Suivez-nous')}</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 text-gray-900 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                      aria-label={social.label}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;