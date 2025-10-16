import { test, expect } from '@playwright/test';

test.describe('UI Visual and Behavior Checks', () => {
  test('homepage loads without DOM overlap', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check that header/navigation doesn't overlap with main content
    const nav = page.locator('nav');
    const main = page.locator('main');
    
    if (await nav.count() > 0 && await main.count() > 0) {
      const navBox = await nav.boundingBox();
      const mainBox = await main.boundingBox();
      
      if (navBox && mainBox) {
        // Main content should start below the navigation
        expect(mainBox.y).toBeGreaterThanOrEqual(navBox.y + navBox.height - 1);
      }
    }
    
    // Check for any elements with negative margins that might cause overlap
    const overlapElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const overlapping = [];
      
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;
        const style = window.getComputedStyle(el);
        const marginTop = parseInt(style.marginTop);
        
        if (marginTop < -50) { // Significant negative margin
          overlapping.push({
            tag: el.tagName,
            class: el.className,
            marginTop
          });
        }
      }
      
      return overlapping;
    });
    
    expect(overlapElements.length).toBe(0);
  });

  test('navigation hover styles work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for navigation to be visible
    await page.waitForSelector('nav', { state: 'visible' });
    
    // Find navigation links
    const navLinks = page.locator('nav a, nav button');
    const count = await navLinks.count();
    
    if (count > 0) {
      const firstLink = navLinks.first();
      
      // Get initial state
      const initialStyle = await firstLink.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          textDecoration: computed.textDecoration
        };
      });
      
      // Hover over the link
      await firstLink.hover();
      
      // Wait a bit for hover styles to apply
      await page.waitForTimeout(100);
      
      // Get hover state
      const hoverStyle = await firstLink.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          textDecoration: computed.textDecoration
        };
      });
      
      // At least one property should change on hover
      const hasHoverEffect = 
        initialStyle.color !== hoverStyle.color ||
        initialStyle.backgroundColor !== hoverStyle.backgroundColor ||
        initialStyle.textDecoration !== hoverStyle.textDecoration;
      
      expect(hasHoverEffect).toBeTruthy();
    }
  });

  test('no DOM overlap at md breakpoint', async ({ page }) => {
    // Set viewport to md breakpoint (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for overlapping elements
    const hasOverlap = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      
      for (let i = 0; i < elements.length; i++) {
        const el1 = elements[i] as HTMLElement;
        const rect1 = el1.getBoundingClientRect();
        
        // Skip invisible elements
        if (rect1.width === 0 || rect1.height === 0) continue;
        
        for (let j = i + 1; j < elements.length; j++) {
          const el2 = elements[j] as HTMLElement;
          
          // Skip if el2 is a child of el1 or vice versa
          if (el1.contains(el2) || el2.contains(el1)) continue;
          
          const rect2 = el2.getBoundingClientRect();
          
          // Skip invisible elements
          if (rect2.width === 0 || rect2.height === 0) continue;
          
          // Check for overlap
          const overlap = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
          );
          
          if (overlap) {
            const zIndex1 = parseInt(window.getComputedStyle(el1).zIndex) || 0;
            const zIndex2 = parseInt(window.getComputedStyle(el2).zIndex) || 0;
            
            // Only report if elements are on same z-index level
            if (Math.abs(zIndex1 - zIndex2) < 2) {
              return {
                el1: { tag: el1.tagName, class: el1.className },
                el2: { tag: el2.tagName, class: el2.className }
              };
            }
          }
        }
      }
      
      return null;
    });
    
    expect(hasOverlap).toBeNull();
  });

  test('all pages load successfully', async ({ page }) => {
    const pages = ['/', '/about', '/cats', '/gallery', '/contact', '/faq'];
    
    for (const pagePath of pages) {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);
      
      // Wait for page to be interactive
      await page.waitForLoadState('domcontentloaded');
      
      // Check that basic structure exists
      const body = await page.locator('body');
      expect(await body.count()).toBe(1);
    }
  });

  test('no PNG logos in header - should use SVG', async ({ page }) => {
    await page.goto('/');
    
    // Check for PNG images in navigation/header
    const pngImages = await page.evaluate(() => {
      const images = document.querySelectorAll('nav img, header img');
      const pngs = [];
      
      for (const img of images) {
        const src = (img as HTMLImageElement).src;
        if (src.toLowerCase().includes('.png') && !src.includes('favicon')) {
          pngs.push(src);
        }
      }
      
      return pngs;
    });
    
    expect(pngImages).toEqual([]);
  });

  test('images have proper dimensions to prevent CLS', async ({ page }) => {
    await page.goto('/');
    
    // Check that images have width/height attributes or CSS dimensions
    const imagesWithoutDimensions = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const issues = [];
      
      for (const img of images) {
        const hasWidthAttr = img.hasAttribute('width');
        const hasHeightAttr = img.hasAttribute('height');
        const style = window.getComputedStyle(img);
        const hasWidthStyle = style.width && style.width !== 'auto';
        const hasHeightStyle = style.height && style.height !== 'auto';
        const hasAspectRatio = style.aspectRatio && style.aspectRatio !== 'auto';
        
        if (!hasWidthAttr && !hasHeightAttr && !hasWidthStyle && !hasHeightStyle && !hasAspectRatio) {
          issues.push({
            src: img.src,
            alt: img.alt
          });
        }
      }
      
      return issues;
    });
    
    // Allow up to 2 images without dimensions (e.g., icons)
    expect(imagesWithoutDimensions.length).toBeLessThanOrEqual(2);
  });
});
