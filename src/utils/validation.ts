import { ValidationError } from '@/utils/errors';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name: string): boolean => {
  // Au moins 2 caractères, lettres et espaces uniquement
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Format français : 06 12 34 56 78 ou +33612345678
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

export const validatePostalCode = (postalCode: string): boolean => {
  // Code postal français : 5 chiffres
  const postalCodeRegex = /^[0-9]{5}$/;
  return postalCodeRegex.test(postalCode);
};

export const validateAddress = (address: string): boolean => {
  // Au moins 5 caractères
  return address.length >= 5;
};

export const validateQuantity = (quantity: number): boolean => {
  return quantity > 0 && Number.isInteger(quantity);
};

export const validatePrice = (price: number): boolean => {
  return price >= 0 && !isNaN(price);
};

export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateMin = (value: number, min: number): boolean => {
  return value >= min;
};

export const validateMax = (value: number, max: number): boolean => {
  return value <= max;
};

export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export const validatePattern = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

export const validateMatch = (value: string, matchValue: string): boolean => {
  return value === matchValue;
};

export const validateArray = (value: any[]): boolean => {
  return Array.isArray(value) && value.length > 0;
};

export const validateObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const validateDate = (value: string): boolean => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};

export const validateUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const validateFile = (file: File, options: {
  maxSize?: number;
  allowedTypes?: string[];
}): boolean => {
  if (options.maxSize && file.size > options.maxSize) {
    throw new ValidationError(`Le fichier ne doit pas dépasser ${options.maxSize} octets`);
  }

  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    throw new ValidationError(`Le type de fichier ${file.type} n'est pas autorisé`);
  }

  return true;
};

export const validateForm = (values: Record<string, any>, rules: Record<string, any>): void => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const value = values[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = 'Ce champ est requis';
    }

    if (value) {
      if (fieldRules.email && !validateEmail(value)) {
        errors[field] = 'Email invalide';
      }

      if (fieldRules.password && !validatePassword(value)) {
        errors[field] = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
      }

      if (fieldRules.name && !validateName(value)) {
        errors[field] = 'Le nom doit contenir au moins 2 caractères et ne contenir que des lettres et des espaces';
      }

      if (fieldRules.phone && !validatePhoneNumber(value)) {
        errors[field] = 'Numéro de téléphone invalide';
      }

      if (fieldRules.postalCode && !validatePostalCode(value)) {
        errors[field] = 'Code postal invalide';
      }

      if (fieldRules.address && !validateAddress(value)) {
        errors[field] = 'L\'adresse doit contenir au moins 5 caractères';
      }

      if (fieldRules.quantity && !validateQuantity(value)) {
        errors[field] = 'La quantité doit être un nombre entier positif';
      }

      if (fieldRules.price && !validatePrice(value)) {
        errors[field] = 'Le prix doit être un nombre positif';
      }

      if (fieldRules.minLength && !validateMinLength(value, fieldRules.minLength)) {
        errors[field] = `Le champ doit contenir au moins ${fieldRules.minLength} caractères`;
      }

      if (fieldRules.maxLength && !validateMaxLength(value, fieldRules.maxLength)) {
        errors[field] = `Le champ ne doit pas dépasser ${fieldRules.maxLength} caractères`;
      }

      if (fieldRules.min && !validateMin(value, fieldRules.min)) {
        errors[field] = `La valeur doit être supérieure ou égale à ${fieldRules.min}`;
      }

      if (fieldRules.max && !validateMax(value, fieldRules.max)) {
        errors[field] = `La valeur doit être inférieure ou égale à ${fieldRules.max}`;
      }

      if (fieldRules.range && !validateRange(value, fieldRules.range.min, fieldRules.range.max)) {
        errors[field] = `La valeur doit être comprise entre ${fieldRules.range.min} et ${fieldRules.range.max}`;
      }

      if (fieldRules.pattern && !validatePattern(value, fieldRules.pattern)) {
        errors[field] = 'Format invalide';
      }

      if (fieldRules.match && !validateMatch(value, values[fieldRules.match])) {
        errors[field] = 'Les valeurs ne correspondent pas';
      }

      if (fieldRules.array && !validateArray(value)) {
        errors[field] = 'Le champ doit être un tableau non vide';
      }

      if (fieldRules.object && !validateObject(value)) {
        errors[field] = 'Le champ doit être un objet';
      }

      if (fieldRules.date && !validateDate(value)) {
        errors[field] = 'Date invalide';
      }

      if (fieldRules.url && !validateUrl(value)) {
        errors[field] = 'URL invalide';
      }
    }
  });

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed');
  }
}; 