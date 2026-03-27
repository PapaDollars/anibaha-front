// src/context/ErrorContext.tsx
import React, { useState, createContext, useContext, ReactNode } from 'react';

import { ErrorInfo, ErrorContextType } from '@/types/error';
import ErrorToastContainer, { useToastSetup } from '@/utils/toast';

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

// Composant interne qui utilise le hook useToastSetup
const ToastSetupWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  useToastSetup(); // Initialise la fonction globale showToast
  return <>{children}</>;
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);

  const addError = (error: Omit<ErrorInfo, 'id' | 'timestamp'>) => {
    const newError: ErrorInfo = {
      ...error,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      canDismiss: error.canDismiss ?? true
    };

    setErrors(prev => [...prev, newError]);

    // Auto-remove après délai pour certains types
    if (newError.severity === 'success' || newError.severity === 'info') {
      setTimeout(() => {
        removeError(newError.id!);
      }, 5000);
    }
  };

  const removeError = (id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const contextValue: ErrorContextType = {
    errors,
    addError,
    removeError,
    clearErrors
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      <ToastSetupWrapper>
        {children}
      </ToastSetupWrapper>
      <ErrorToastContainer />
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};