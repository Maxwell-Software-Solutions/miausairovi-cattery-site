import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Defer service worker registration to not block initial load
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Wait a bit to ensure the page is fully loaded
    setTimeout(() => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }, 2000); // Defer by 2 seconds
  });
}

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
