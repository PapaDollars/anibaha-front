export interface SearchFilters {
    query?: string;
    category?: string;
    companyId?: string;
    priceRange?: {
      min: number;
      max: number;
    };
    rating?: number;
    inStock?: boolean;
    onSale?: boolean;
    location?: string;
    sortBy?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular';
    page?: number;
    limit?: number;
  }
  
  export interface SearchResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    filters?: {
      categories: { name: string; count: number }[];
      priceRanges: { min: number; max: number; count: number }[];
      ratings: { rating: number; count: number }[];
      companies: { id: string; name: string; count: number }[];
    };
  }
  