// src/utils/analytics.ts

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

export const initGA = () => {
  if (typeof window === 'undefined') return;

  if (!MEASUREMENT_ID || MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('GA4 Measurement ID is not configured or using placeholder. Analytics tracking is disabled.');
    return;
  }

  if (isInitialized) return;

  // Create the script tag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: false, // We will handle page views manually to prevent duplicates
  });

  isInitialized = true;
};

export const logPageView = (url: string) => {
  if (!isInitialized || !MEASUREMENT_ID || MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
  
  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: document.title,
    page_location: window.location.href
  });
};
