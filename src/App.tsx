import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import { initializeGA, trackPageView } from './config/analytics';

// Lazy load non-critical pages for better initial load performance
const About = lazy(() => import('./pages/About'));
const Cats = lazy(() => import('./pages/Cats'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Preload commonly accessed pages after initial load
const preloadPages = () => {
  // Use requestIdleCallback to preload during idle time
  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => {
        import('./pages/Cats');
        import('./pages/Gallery');
      },
      { timeout: 2000 }
    );
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

/**
 * Analytics Tracker Component
 * Tracks page views on route changes
 */
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

// Loading fallback for lazy-loaded pages
const PageLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-center">
      <div className="text-6xl mb-4">🐱</div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const App = () => {
  // Initialize Google Analytics when app mounts
  useEffect(() => {
    initializeGA();
    // Preload commonly accessed pages after initial render
    preloadPages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker />
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navigation />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navigation />
                    <About />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/cats"
                element={
                  <>
                    <Navigation />
                    <Cats />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/gallery"
                element={
                  <>
                    <Navigation />
                    <Gallery />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Navigation />
                    <Contact />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/faq"
                element={
                  <>
                    <Navigation />
                    <FAQ />
                    <Footer />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Navigation />
                    <NotFound />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
