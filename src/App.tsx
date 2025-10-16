import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Cats from './pages/Cats';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import { initializeGA, trackPageView } from './config/analytics';

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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
