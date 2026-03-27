export type ErrorType = 
  | 'network' 
  | 'server' 
  | 'validation' 
  | 'authentication' 
  | 'authorization' 
  | 'not_found' 
  | 'generic' 
  | 'custom'
  | 'timeout'
  | 'forbidden'
  | 'payment'
  | 'inventory';

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical' | 'success';

export interface ErrorInfo {
  id?: string;
  type: ErrorType;
  severity: ErrorSeverity;
  title: string;
  message: string;
  code?: string;
  details?: string;
  timestamp?: string;
  canRetry?: boolean;
  canDismiss?: boolean;
  actionButton?: {
    text: string;
    action: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  };
  metadata?: Record<string, any>;
}

export interface ErrorContextType {
  errors: ErrorInfo[];
  addError: (error: Omit<ErrorInfo, 'id' | 'timestamp'>) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}