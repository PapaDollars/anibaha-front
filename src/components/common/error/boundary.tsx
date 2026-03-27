// src/components/common/Error/ErrorBoundary.tsx
import React, { Component, ReactNode, ErrorInfo as ReactErrorInfo } from 'react';

import { ErrorInfo } from '@/types/error';
import { ErrorDisplay } from '@/components/common/error/error-display';

interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: ErrorInfo; retry: () => void }>;
  onError?: (error: Error, errorInfo: ReactErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: {
        id: 'boundary-error',
        type: 'generic',
        severity: 'critical',
        title: 'Erreur de l\'application',
        message: 'Une erreur critique s\'est produite. Veuillez recharger la page.',
        details: error.stack,
        timestamp: new Date().toISOString(),
        canRetry: true,
        canDismiss: false
      }
    };
  }

  componentDidCatch(error: Error, errorInfo: ReactErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} retry={this.handleRetry} />;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ErrorDisplay
              error={this.state.error}
              onRetry={this.handleRetry}
              variant="modal"
              showDetails
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;