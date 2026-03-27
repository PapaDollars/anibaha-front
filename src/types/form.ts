export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    validation?: {
      min?: number;
      max?: number;
      pattern?: string;
      custom?: (value: any) => string | null;
    };
  }
  
  export interface FormData {
    [key: string]: any;
  }
  
  export interface FormErrors {
    [key: string]: string;
  }