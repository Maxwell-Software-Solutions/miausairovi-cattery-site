import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Cats from './pages/Cats';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import { preloadImagesWithPriority } from './hooks/useImagePreload';
import { HIGH_PRIORITY_IMAGES, LOW_PRIORITY_IMAGES } from './config/images';
import { initializeGA, trackPageView } from './config/analytics';

const Admin = lazy(() => import('./pages/Admin'));

const queryClient = new QueryClient();

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

const App = () => {
  // Initialize Google Analytics when app mounts
  useEffect(() => {
    initializeGA();
  }, []);

  // Preload images with priority when app mounts
  useEffect(() => {
    preloadImagesWithPriority(HIGH_PRIORITY_IMAGES, LOW_PRIORITY_IMAGES);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker />
          <Routes>
            <Route
              path="/admin/*"
              element={
                <Suspense
                  fallback={
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Loading content management system...</div>
                  }
                >
                  <Admin />
                </Suspense>
              }
            />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
