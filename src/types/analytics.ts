export interface AnalyticsData {
    period: 'day' | 'week' | 'month' | 'quarter' | 'year';
    startDate: string;
    endDate: string;
    
    metrics: {
      [key: string]: number | string;
    };
    
    trends?: {
      [key: string]: {
        current: number;
        previous: number;
        change: number;
        changePercent: number;
      };
    };
    
    segments?: {
      [key: string]: {
        label: string;
        value: number;
        percentage: number;
      }[];
    };
  }
  