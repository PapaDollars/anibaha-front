// src/utils/toast.tsx
import React from 'react';

import { useError } from '@/context/ErrorContext';
import { ErrorDisplay } from '@/components/common/error/error-display';
import { ErrorInfo, ErrorType, ErrorSeverity } from '@/types/error';

const ErrorToastContainer: React.FC = () => {
  const { errors, removeError } = useError();

  const toastErrors = errors.filter(error => 
    error.severity === 'success' || 
    error.severity === 'info' || 
    error.severity === 'warning' ||
    (error.severity === 'error' && error.canDismiss)
  );

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toastErrors.map((error) => (
        <ErrorDisplay
          key={error.id}
          error={error}
          onDismiss={() => removeError(error.id!)}
          variant="toast"
        />
      ))}
    </div>
  );
};

// ============================================================================
// FONCTIONS UTILITAIRES POUR LES TOASTS
// ============================================================================

// Variable globale pour stocker la fonction addError
let globalAddError: ((error: Omit<ErrorInfo, 'id' | 'timestamp'>) => void) | null = null;

// Hook pour initialiser la fonction globale
export const useToastSetup = () => {
  const { addError } = useError();
  
  React.useEffect(() => {
    globalAddError = addError;
    return () => {
      globalAddError = null;
    };
  }, [addError]);
};

// Fonction showToast pour usage externe
export const showToast = (
  type: ErrorType,
  severity: ErrorSeverity,
  title: string,
  message: string,
  options?: {
    canDismiss?: boolean;
    canRetry?: boolean;
    actionButton?: {
      text: string;
      action: () => void;
      variant?: 'primary' | 'secondary' | 'danger';
    };
    duration?: number;
  }
) => {
  if (!globalAddError) {
    console.warn('showToast called before ErrorProvider is initialized');
    return;
  }

  const error: Omit<ErrorInfo, 'id' | 'timestamp'> = {
    type,
    severity,
    title,
    message,
    canDismiss: options?.canDismiss ?? true,
    canRetry: options?.canRetry ?? false,
    actionButton: options?.actionButton
  };

  globalAddError(error);
};

// Fonctions helper pour les types courants
export const showSuccessToast = (title: string, message: string) => {
  showToast('custom', 'success', title, message);
};

export const showErrorToast = (title: string, message: string, canRetry = false) => {
  showToast('generic', 'error', title, message, { canRetry });
};

export const showWarningToast = (title: string, message: string) => {
  showToast('custom', 'warning', title, message);
};

export const showInfoToast = (title: string, message: string) => {
  showToast('custom', 'info', title, message);
};

// Fonctions spécifiques à l'e-commerce
export const showNetworkErrorToast = () => {
  showToast(
    'network',
    'error',
    'Problème de connexion',
    'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
    { canRetry: true }
  );
};

export const showPaymentSuccessToast = (orderNumber: string) => {
  showToast(
    'payment',
    'success',
    'Paiement confirmé',
    `Votre commande ${orderNumber} a été confirmée avec succès.`
  );
};

export const showPaymentErrorToast = (message?: string) => {
  showToast(
    'payment',
    'error',
    'Erreur de paiement',
    message || 'Une erreur s\'est produite lors du paiement. Veuillez réessayer.',
    { canRetry: true }
  );
};

export const showInventoryWarningToast = (productName: string, stock: number) => {
  showToast(
    'inventory',
    'warning',
    'Stock limité',
    `Il ne reste que ${stock} exemplaire(s) de "${productName}".`
  );
};

export const showAuthErrorToast = () => {
  showToast(
    'authentication',
    'error',
    'Session expirée',
    'Votre session a expiré. Veuillez vous reconnecter.',
    {
      actionButton: {
        text: 'Se connecter',
        action: () => window.location.href = '/login',
        variant: 'primary'
      }
    }
  );
};

export default ErrorToastContainer;