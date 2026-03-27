import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faExclamationCircle,
  faTimes,
  faRedo,
  faBug,
  faWifi,
  faServer,
  faLock,
  faEye,
  faEyeSlash,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import { ErrorInfo, ErrorType, ErrorSeverity } from '@/types/error';

interface ErrorDisplayProps {
    error: ErrorInfo;
    onRetry?: () => void;
    onDismiss?: () => void;
    className?: string;
    variant?: 'toast' | 'inline' | 'modal' | 'banner' | 'card';
    showDetails?: boolean;
  }
  
  export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    error,
    onRetry,
    onDismiss,
    className = '',
    variant = 'inline',
    showDetails = false
  }) => {
    const [showErrorDetails, setShowErrorDetails] = useState(false);
  
    const getErrorIcon = (type: ErrorType, severity: ErrorSeverity) => {
      if (severity === 'success') return faCheckCircle;
      
      switch (type) {
        case 'network':
          return faWifi;
        case 'server':
          return faServer;
        case 'authentication':
        case 'authorization':
        case 'forbidden':
          return faLock;
        case 'not_found':
          return faExclamationCircle;
        case 'payment':
          return faTimesCircle;
        case 'timeout':
          return faExclamationTriangle;
        default:
          return severity === 'critical' ? faExclamationTriangle : faExclamationCircle;
      }
    };
  
    const getErrorColors = (severity: ErrorSeverity) => {
      switch (severity) {
        case 'success':
          return {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            icon: 'text-green-600',
            button: 'bg-green-600 hover:bg-green-700'
          };
        case 'info':
          return {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: 'text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700'
          };
        case 'warning':
          return {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-800',
            icon: 'text-yellow-600',
            button: 'bg-yellow-600 hover:bg-yellow-700'
          };
        case 'error':
          return {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            icon: 'text-red-600',
            button: 'bg-red-600 hover:bg-red-700'
          };
        case 'critical':
          return {
            bg: 'bg-red-100',
            border: 'border-red-300',
            text: 'text-red-900',
            icon: 'text-red-700',
            button: 'bg-red-700 hover:bg-red-800'
          };
        default:
          return {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-800',
            icon: 'text-gray-600',
            button: 'bg-gray-600 hover:bg-gray-700'
          };
      }
    };
  
    const colors = getErrorColors(error.severity);
    const icon = getErrorIcon(error.type, error.severity);
  
    const baseClasses = `rounded-lg border ${colors.border} ${colors.bg} ${colors.text}`;
  
    const variantClasses = {
      toast: 'p-4 shadow-lg max-w-md animate-slide-in-right',
      inline: 'p-4',
      modal: 'p-6 max-w-lg mx-auto shadow-xl',
      banner: 'p-3 border-l-4',
      card: 'p-6 shadow-md'
    };
  
    const handleRetry = () => {
      if (onRetry) {
        onRetry();
      } else if (error.actionButton?.action) {
        error.actionButton.action();
      }
    };
  
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className={`flex-shrink-0 ${colors.icon}`}>
            <FontAwesomeIcon 
              icon={icon} 
              className={`${variant === 'banner' ? 'text-lg' : 'text-xl'}`}
            />
          </div>
  
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Title */}
                <h3 className={`font-semibold ${variant === 'banner' ? 'text-sm' : 'text-base'}`}>
                  {error.title}
                </h3>
  
                {/* Message */}
                <p className={`mt-1 ${variant === 'banner' ? 'text-xs' : 'text-sm'} opacity-90`}>
                  {error.message}
                </p>
  
                {/* Error Code */}
                {error.code && (
                  <p className="mt-1 text-xs opacity-75 font-mono">
                    Code: {error.code}
                  </p>
                )}
  
                {/* Timestamp */}
                {error.timestamp && variant !== 'banner' && (
                  <p className="mt-1 text-xs opacity-60">
                    {new Date(error.timestamp).toLocaleString('fr-FR')}
                  </p>
                )}
  
                {/* Details Toggle */}
                {(error.details || showDetails) && (
                  <button
                    onClick={() => setShowErrorDetails(!showErrorDetails)}
                    className="mt-2 text-xs underline opacity-75 hover:opacity-100 transition-opacity flex items-center space-x-1"
                  >
                    <FontAwesomeIcon icon={showErrorDetails ? faEyeSlash : faEye} />
                    <span>
                      {showErrorDetails ? 'Masquer les détails' : 'Voir les détails'}
                    </span>
                  </button>
                )}
  
                {/* Error Details */}
                {showErrorDetails && error.details && (
                  <div className="mt-3 p-3 bg-black bg-opacity-10 rounded-md">
                    <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto max-h-32 overflow-y-auto">
                      {error.details}
                    </pre>
                  </div>
                )}
              </div>
  
              {/* Dismiss Button */}
              {(error.canDismiss || onDismiss) && (
                <button
                  onClick={onDismiss}
                  className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
                  aria-label="Fermer"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              )}
            </div>
  
            {/* Action Buttons */}
            {(error.canRetry || error.actionButton || onRetry) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {(error.canRetry || onRetry) && (
                  <button
                    onClick={handleRetry}
                    className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-md text-white text-sm font-medium transition-colors ${colors.button}`}
                  >
                    <FontAwesomeIcon icon={faRedo} className="text-xs" />
                    <span>Réessayer</span>
                  </button>
                )}
  
                {error.actionButton && (
                  <button
                    onClick={error.actionButton.action}
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      error.actionButton.variant === 'danger'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : error.actionButton.variant === 'secondary'
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        : `${colors.button} text-white`
                    }`}
                  >
                    {error.actionButton.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ErrorDisplay;