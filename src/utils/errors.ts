export class AppError extends Error {
  code: string;
  status: number;
  details?: any;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', status: number = 500, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND_ERROR', 404);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends AppError {
  constructor(message: string) {
    super(message, 'SERVER_ERROR', 500);
    this.name = 'ServerError';
  }
}

export const handleApiError = (error: any): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error.response) {
    // Erreur de réponse du serveur
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return new ValidationError(data.message || 'Données invalides');
      case 401:
        return new AuthenticationError(data.message || 'Non authentifié');
      case 403:
        return new AuthorizationError(data.message || 'Non autorisé');
      case 404:
        return new NotFoundError(data.message || 'Ressource non trouvée');
      case 500:
        return new ServerError(data.message || 'Erreur serveur');
      default:
        return new AppError(data.message || 'Une erreur est survenue', 'UNKNOWN_ERROR', status);
    }
  }

  if (error.request) {
    // Erreur de requête (pas de réponse du serveur)
    return new NetworkError('Impossible de se connecter au serveur');
  }

  if (error instanceof Error) {
    if (error.message.includes('Network Error')) {
      return new NetworkError('Impossible de se connecter au serveur');
    }
    return new AppError(error.message);
  }

  // Erreur inconnue
  return new AppError('Une erreur inconnue est survenue');
};

export const isAppError = (error: any): error is AppError => {
  return error instanceof AppError;
};

export const getErrorMessage = (error: any): string => {
  if (isAppError(error)) {
    return error.message;
  }
  return 'Une erreur inattendue s\'est produite';
};

export const getErrorCode = (error: any): string | undefined => {
  if (isAppError(error)) {
    return error.code;
  }
  return undefined;
};

export const getErrorStatus = (error: any): number | undefined => {
  if (isAppError(error)) {
    return error.status;
  }
  return undefined;
};

export const getErrorDetails = (error: any): any => {
  if (isAppError(error)) {
    return error.details;
  }
  return null;
}; 