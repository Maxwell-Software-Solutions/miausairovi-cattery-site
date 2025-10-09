import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cats from './pages/Cats';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { preloadImages } from './hooks/useImagePreload';

const queryClient = new QueryClient();

// All images to preload
const imagesToPreload = [
  // Pukis
  '/assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg',
  '/assets/cats/Pukis/TICATSJAN25-3796-Edit.jpg',
  '/assets/cats/Pukis/TICATSJAN25-3791-Edit.jpg',
  // Afina
  '/assets/cats/Afina/thumbnail_DSC_7997.jpg',
  '/assets/cats/Afina/thumbnail_DSC_7546.jpg',
  '/assets/cats/Afina/aUntitled-1.png',
  // Esmy
  '/assets/cats/Esmy/thumbnail_DSC_7929.jpg',
  '/assets/cats/Esmy/thumbnail_DSC_6854-Edit.jpg',
  // Kittens
  '/assets/cats/Kittens/thumbnail_DSC_0020.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_0099.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_1422.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_2533.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_2787.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_9882.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_9909.jpg',
];

const App = () => {
  // Preload all images when app mounts
  useEffect(() => {
    preloadImages(imagesToPreload);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
