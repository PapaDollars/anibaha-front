import { ErrorInfo } from '@/types/error';
import { useError } from '@/context/ErrorContext';

export const useApiError = () => {
  const { addError } = useError();

  const handleApiError = (error: any, context?: string) => {
    let errorInfo: Omit<ErrorInfo, 'id' | 'timestamp'>;

    if (error.response) {
      // Erreur de réponse HTTP
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          errorInfo = {
            type: 'validation',
            severity: 'error',
            title: 'Données invalides',
            message: data?.message || 'Les données soumises ne sont pas valides.',
            code: `HTTP_${status}`,
            canRetry: false
          };
          break;
        case 401:
          errorInfo = {
            type: 'authentication',
            severity: 'error',
            title: 'Non authentifié',
            message: 'Veuillez vous connecter pour continuer.',
            code: `HTTP_${status}`,
            canRetry: false,
            actionButton: {
              text: 'Se connecter',
              action: () => window.location.href = '/login',
              variant: 'primary'
            }
          };
          break;
        case 403:
          errorInfo = {
            type: 'forbidden',
            severity: 'error',
            title: 'Accès interdit',
            message: 'Vous n\'avez pas les permissions nécessaires.',
            code: `HTTP_${status}`,
            canRetry: false
          };
          break;
        case 404:
          errorInfo = {
            type: 'not_found',
            severity: 'error',
            title: 'Ressource introuvable',
            message: context ? `${context} introuvable.` : 'La ressource demandée n\'existe pas.',
            code: `HTTP_${status}`,
            canRetry: false
          };
          break;
        case 500:
          errorInfo = {
            type: 'server',
            severity: 'critical',
            title: 'Erreur serveur',
            message: 'Une erreur s\'est produite sur nos serveurs. Veuillez réessayer.',
            code: `HTTP_${status}`,
            canRetry: true
          };
          break;
        default:
          errorInfo = {
            type: 'server',
            severity: 'error',
            title: 'Erreur inattendue',
            message: data?.message || 'Une erreur inattendue s\'est produite.',
            code: `HTTP_${status}`,
            canRetry: true
          };
      }
    } else if (error.request) {
      // Erreur réseau
      errorInfo = {
        type: 'network',
        severity: 'error',
        title: 'Problème de connexion',
        message: 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
        canRetry: true
      };
    } else {
      // Autre erreur
      errorInfo = {
        type: 'generic',
        severity: 'error',
        title: 'Erreur',
        message: error.message || 'Une erreur inattendue s\'est produite.',
        details: error.stack,
        canRetry: true
      };
    }

    addError(errorInfo);
  };

  return { handleApiError };
};