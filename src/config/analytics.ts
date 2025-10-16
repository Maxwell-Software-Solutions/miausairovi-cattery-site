/**
 * Google Analytics Configuration
 * Handles GA4 tracking initialization and page view tracking
 */

import ReactGA from 'react-ga4';

// Your Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-NSCE0HNZ8P';

/**
 * Initialize Google Analytics
 * Should be called once when the app starts
 * Uses requestIdleCallback to avoid blocking the main thread
 */
export const initializeGA = (): void => {
  // Only initialize in production or if explicitly enabled
  const isDevelopment = import.meta.env.DEV;
  const forceGA = import.meta.env.VITE_FORCE_GA === 'true';

  if (!isDevelopment || forceGA) {
    // Defer GA initialization to not block the main thread
    // Wait until page is fully loaded and idle
    const initGA = () => {
      ReactGA.initialize(GA_MEASUREMENT_ID, {
        gaOptions: {
          // Optional: Configure additional GA options
          siteSpeedSampleRate: 100, // Sample 100% of users for site speed
        },
        gtagOptions: {
          // Optional: Configure gtag options
          anonymize_ip: true, // Anonymize IP addresses for privacy
        },
      });

      console.log('Google Analytics initialized');
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    // Increased delay to ensure it doesn't interfere with critical rendering
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initGA, { timeout: 3000 });
    } else {
      setTimeout(initGA, 2000);
    }
  } else {
    console.log('Google Analytics disabled in development mode');
  }
};

/**
 * Track page view
 * Call this whenever the route changes
 */
export const trackPageView = (path: string, title?: string): void => {
  const isDevelopment = import.meta.env.DEV;
  const forceGA = import.meta.env.VITE_FORCE_GA === 'true';

  if (!isDevelopment || forceGA) {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });

    console.log(`GA Page View: ${path} - ${title || document.title}`);
  }
};

/**
 * Track custom events
 * Use for tracking specific user interactions
 */
export const trackEvent = (category: string, action: string, label?: string, value?: number): void => {
  const isDevelopment = import.meta.env.DEV;
  const forceGA = import.meta.env.VITE_FORCE_GA === 'true';

  if (!isDevelopment || forceGA) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });

    console.log(`GA Event: ${category} - ${action} - ${label || ''}`);
  }
};

/**
 * Common event tracking helpers
 */
export const GAEvents = {
  // Contact form interactions
  contactFormSubmit: () => trackEvent('Contact', 'Form Submit', 'Contact Form'),
  contactFormError: (error: string) => trackEvent('Contact', 'Form Error', error),

  // Click-to-action tracking (emails, phones)
  emailClick: (email: string) => trackEvent('Contact', 'Email Click', email),
  phoneClick: (phone: string) => trackEvent('Contact', 'Phone Click', phone),

  // Navigation & CTA clicks
  ctaClick: (ctaName: string, destination: string) => trackEvent('CTA', 'Click', `${ctaName} -> ${destination}`),
  internalLinkClick: (from: string, to: string) => trackEvent('Navigation', 'Internal Link', `${from} -> ${to}`),
  externalLinkClick: (url: string) => trackEvent('Navigation', 'External Link', url),

  // Gallery interactions
  imageView: (imageName: string) => trackEvent('Gallery', 'Image View', imageName),

  // Kitten/Cat interactions
  kittenCardClick: (kittenName: string) => trackEvent('Engagement', 'Kitten Card Click', kittenName),
  catCardClick: (catName: string) => trackEvent('Engagement', 'Cat Card Click', catName),

  // FAQ interactions
  faqExpand: (question: string) => trackEvent('FAQ', 'Question Expand', question),
  faqCategoryView: (category: string) => trackEvent('FAQ', 'Category View', category),

  // Scroll tracking
  scrollDepth: (depth: number) => trackEvent('Engagement', 'Scroll Depth', `${depth}%`, depth),
};
