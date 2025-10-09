import { useEffect, useState } from 'react';

export const useImagePreload = (imageUrls: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        if (isMounted) {
          setImagesPreloaded(true);
        }
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
        if (isMounted) {
          setImagesPreloaded(true); // Still set to true to not block rendering
        }
      });

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return imagesPreloaded;
};

// Preload images without waiting for completion (fire and forget)
export const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

// Preload images with priority (high priority images first)
export const preloadImagesWithPriority = (highPriorityUrls: string[], lowPriorityUrls: string[]) => {
  // Load high priority images immediately
  highPriorityUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });

  // Load low priority images after a short delay
  setTimeout(() => {
    lowPriorityUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, 500);
};
