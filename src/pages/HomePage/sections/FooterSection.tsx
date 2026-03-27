// src/components/HomePage/FooterSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

import { ROUTES } from '@/utils/url/url_frontend';

export const FooterSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à Transformer Votre Experience Shopping ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez la révolution du e-commerce africain avec notre plateforme intelligente
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.PUBLIC.AUTH.REGISTER}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-3" />
              Commencer Maintenant
            </Link>
            
            <a
              href="https://wa.me/237620256858"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-3" />
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;