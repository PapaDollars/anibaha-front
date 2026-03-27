import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faArrowLeft,
  faPhoneAlt,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

import { useError } from '@/context/ErrorContext';

export const NotFoundPage: React.FC<{ 
  onGoHome?: () => void;
  onGoBack?: () => void;
}> = ({ onGoHome, onGoBack }) => {
  const { addError } = useError();

  const handleContactSupport = () => {
    addError({
      type: 'network',
      severity: 'info',
      title: 'Contact Support',
      message: 'Redirection vers le support client...',
      actionButton: {
        text: 'Envoyer un email',
        action: () => window.open('mailto:support@africommerce.com'),
        variant: 'primary'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page introuvable
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onGoHome || (() => window.location.href = '/')}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Retour à l'accueil
            </button>
            
            <button
              onClick={onGoBack || (() => window.history.back())}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Page précédente
            </button>
          </div>

          <div className="pt-4">
            <button
              onClick={handleContactSupport}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Contacter le support
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-4 bg-white rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-2">Besoin d'aide ?</h3>
          <p className="text-sm text-gray-600 mb-3">
            Notre équipe est là pour vous aider à trouver ce que vous cherchez.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <a href="tel:+237677123456" className="flex items-center text-blue-600 hover:text-blue-700">
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-1" />
              +237 677 123 456
            </a>
            <span className="text-gray-300">|</span>
            <a href="mailto:support@africommerce.com" className="flex items-center text-blue-600 hover:text-blue-700">
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};