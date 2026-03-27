import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';

// Import dynamique du composant Routes pour le code splitting
const Routes = React.lazy(() => import('@/route'));

import { getCurrentUser } from '@/store/slices-test/authSlice';
import { useError } from '@/context/ErrorContext';
import '@/index.css';

// Composant de chargement global
const AppLoader: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Chargement de l'application...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { addError } = useError();

  // Initialisation de l'application
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au démarrage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        dispatch(getCurrentUser() as any);
      } catch (error) {
        // En cas d'erreur, nettoyer le token invalide
        localStorage.removeItem('token');
        addError({
          type: 'authentication',
          severity: 'warning',
          title: 'Session expirée',
          message: 'Votre session a expiré. Veuillez vous reconnecter.',
          canDismiss: true
        });
      }
    }
  }, [dispatch, addError]);

  // Gestionnaire d'erreurs globales (optionnel)
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      addError({
        type: 'generic',
        severity: 'error',
        title: 'Erreur inattendue',
        message: 'Une erreur inattendue s\'est produite. Veuillez recharger la page.',
        canRetry: true,
        actionButton: {
          text: 'Recharger',
          action: () => window.location.reload(),
          variant: 'primary'
        }
      });
    };

    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      addError({
        type: 'generic',
        severity: 'error',
        title: 'Erreur JavaScript',
        message: 'Une erreur s\'est produite dans l\'application.',
        details: event.error?.stack,
        canRetry: true
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, [addError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Suspense fallback={<AppLoader />}>
        <Routes />
      </Suspense>
    </div>
  );
};

export default App;