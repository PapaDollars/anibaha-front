import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCode } from '@fortawesome/free-solid-svg-icons';

interface CopyrightProps {
  companyName?: string;
  showDeveloperInfo?: boolean;
  theme?: 'light' | 'dark';
}

const Copyright: React.FC<CopyrightProps> = ({
  companyName = 'ANIBAHA',
  showDeveloperInfo = true,
  theme = 'light'
}) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const themeClasses = {
    light: {
      container: 'bg-gray-50',
      text: 'text-gray-600',
      link: 'text-blue-600 hover:text-blue-700',
      divider: 'border-gray-300'
    },
    dark: {
      container: 'bg-gray-900',
      text: 'text-gray-400',
      link: 'text-blue-400 hover:text-blue-300',
      divider: 'border-gray-600'
    }
  };

  const styles = themeClasses[theme];

  return (
    <div className={`${styles.container} bg-gray-800 py-6`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright Text */}
          <div className="flex items-center space-x-2">
            <p className={`${styles.text} text-sm text-gray-200`}>
              © {currentYear} {companyName}. {t('footer.allRightsReserved', 'Tous droits réservés')}.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faHeart} className="text-green-500" />
              <span className="text-sm text-gray-300">{t('footer.freeShipping', 'Livraison gratuite dès 50€')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faHeart} className="text-blue-500" />
              <span className="text-sm text-gray-300">{t('footer.customerService24h', 'Service client 24h/7j')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faHeart} className="text-purple-500" />
              <span className="text-sm text-gray-300">{t('footer.satisfactionGuarantee', 'Garantie satisfaction')}</span>
            </div>
          </div>

          {/* Developer Info */}
          {showDeveloperInfo && (
            <div className="flex items-center space-x-2">
              <span className={`${styles.text} text-sm flex items-center space-x-1 text-gray-300`}>
                <FontAwesomeIcon icon={faCode} className="text-xs text-gray-300" />
                <span className="text-gray-300">{t('footer.madeWith', 'Fait avec')}</span>
                <FontAwesomeIcon icon={faHeart} className="text-red-500 text-xs animate-pulse" />
                <span className="text-gray-300">{t('footer.by', 'par')}</span>
              </span>
              <Link
                to="/developer"
                className={`${styles.link} text-sm font-medium text-gray-300 transition-colors`}
              >
                {t('footer.developerName', 'Notre équipe')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Copyright;