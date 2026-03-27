interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface PageView {
  path: string;
  title: string;
  timestamp: string;
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: {
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

// ✅ Utilisation de import.meta.env pour Vite
export const GA_TRACKING_ID = import.meta.env.VITE_APP_GA_TRACKING_ID || '';

export const initGA = (): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};

export const logPageView = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
    });
  }
};

export const logEvent = ({ action, category, label, value }: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

class Analytics {
  private static instance: Analytics;
  private events: AnalyticsEvent[] = [];
  private pageViews: PageView[] = [];
  private readonly maxEvents: number = 1000;
  private readonly maxPageViews: number = 1000;

  private constructor() {
    this.initializeAnalytics();
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private initializeAnalytics(): void {
    // ✅ Utilisation de import.meta.env pour Vite
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', import.meta.env.VITE_APP_GA_TRACKING_ID || '');
    }
  }

  trackEvent(event: AnalyticsEvent): void {
    this.events.push(event);
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  }

  trackPageView(path: string, title: string): void {
    const pageView: PageView = {
      path,
      title,
      timestamp: new Date().toISOString(),
    };

    this.pageViews.push(pageView);
    if (this.pageViews.length > this.maxPageViews) {
      this.pageViews.shift();
    }

    // ✅ Utilisation de import.meta.env pour Vite
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', import.meta.env.VITE_APP_GA_TRACKING_ID || '', {
        page_path: path,
        page_title: title,
      });
    }
  }

  trackError(error: Error): void {
    this.trackEvent({
      category: 'Error',
      action: 'Error Occurred',
      label: error.message,
    });
  }

  trackUserAction(action: string, label?: string, value?: number): void {
    this.trackEvent({
      category: 'User Action',
      action,
      label,
      value,
    });
  }

  trackProductView(productId: string, productName: string): void {
    this.trackEvent({
      category: 'Product',
      action: 'View',
      label: productName,
      value: parseInt(productId),
    });
  }

  trackAddToCart(productId: string, productName: string, quantity: number): void {
    this.trackEvent({
      category: 'Cart',
      action: 'Add',
      label: productName,
      value: quantity,
    });
  }

  trackPurchase(orderId: string, total: number): void {
    this.trackEvent({
      category: 'Purchase',
      action: 'Complete',
      label: orderId,
      value: total,
    });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getPageViews(): PageView[] {
    return [...this.pageViews];
  }

  clearEvents(): void {
    this.events = [];
  }

  clearPageViews(): void {
    this.pageViews = [];
  }

  getEventsByCategory(category: string): AnalyticsEvent[] {
    return this.events.filter((event) => event.category === category);
  }

  getEventsByAction(action: string): AnalyticsEvent[] {
    return this.events.filter((event) => event.action === action);
  }

  getPageViewsByPath(path: string): PageView[] {
    return this.pageViews.filter((pageView) => pageView.path === path);
  }

  getPageViewsByTimeRange(start: Date, end: Date): PageView[] {
    return this.pageViews.filter(
      (pageView) =>
        new Date(pageView.timestamp) >= start &&
        new Date(pageView.timestamp) <= end
    );
  }
}

export const analytics = Analytics.getInstance();