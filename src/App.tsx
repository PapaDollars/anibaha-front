// ================================================================
// APP.TSX - Point d'entrée principal
// ================================================================
import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/index';

const Routes = React.lazy(() => import('@/route'));

import { fetchMe } from '@/store/slices/authSlice';
import { syncCart } from '@/store/slices/cartSlice';
import { useError } from '@/context/ErrorContext';
import '@/index.css';

const AppLoader: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
      <p className="text-gray-600 text-lg font-medium">Chargement de l'application...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addError } = useError();

  // Vérifier la session au démarrage
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // ✅ accessToken pas token
    if (token) {
      dispatch(fetchMe()).then((result) => {
        if (fetchMe.fulfilled.match(result)) dispatch(syncCart());
      }).catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        addError({
          type: 'authentication',
          severity: 'warning',
          title: 'Session expirée',
          message: 'Votre session a expiré. Veuillez vous reconnecter.',
          canDismiss: true,
        });
      });
    }
  }, [dispatch, addError]);

  // Erreurs globales JS
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
    };
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Suspense fallback={<AppLoader />}>
        <Routes />
      </Suspense>
    </div>
  );
};

export default App;