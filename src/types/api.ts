export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: {
      field?: string;
      message: string;
      code?: string;
    }[];
    meta?: {
      total?: number;
      page?: number;
      limit?: number;
      totalPages?: number;
    };
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }