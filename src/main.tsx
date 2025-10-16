import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Defer service worker registration to not block initial load
if ('serviceWorker' in navigator) {
  // Use requestIdleCallback for better performance
  const registerSW = () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(registerSW, { timeout: 3000 });
  } else {
    window.addEventListener('load', () => {
      setTimeout(registerSW, 1000);
    });
  }
}

// Render immediately - no StrictMode in production for slightly better performance
createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
