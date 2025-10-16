# Image Optimization Guide

## Current Issues

The lighthouse performance audit shows significant issues with image sizes:

- **Afina/aUntitled-1.png**: 21MB (extremely large!)
- **Pukis images**: 3.5-7.3MB per image
- **Total assets**: ~42MB of images

These large images are the primary cause of:
- **LCP (Largest Contentful Paint)**: 9.9s (target: <2.5s)
- **FCP (First Contentful Paint)**: 6.2s (target: <1.8s)

## Recommendations

### 1. Image Format Optimization

Convert images to modern formats:
- **WebP**: 25-35% smaller than JPEG with similar quality
- **AVIF**: 50% smaller than JPEG (newer format, good browser support)

### 2. Image Compression

Use tools to compress images without visible quality loss:

**Online Tools:**
- [Squoosh](https://squoosh.app/) - Google's image compression tool
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [Compressor.io](https://compressor.io/) - Multi-format compression

**Command Line Tools:**
```bash
# For JPEG compression
jpegoptim --max=85 --strip-all image.jpg

# For PNG compression
optipng -o5 image.png
pngquant --quality=65-80 image.png

# Convert to WebP
cwebp -q 85 input.jpg -o output.webp
```

### 3. Recommended Image Sizes

For cat/kitten photos displayed in carousels:
- **Maximum dimensions**: 1200x1200px (current: some are 4000x4000+)
- **File size target**: <200KB per image
- **Quality**: 80-85 (excellent visual quality, much smaller file)

### 4. Batch Optimization Script

Create a script to optimize all images at once:

```bash
#!/bin/bash
# optimize-images.sh

# Install dependencies first:
# npm install -g sharp-cli

# Optimize all JPEGs in the cats folder
find public/assets/cats -name "*.jpg" -o -name "*.jpeg" | while read img; do
  echo "Optimizing: $img"
  sharp -i "$img" -o "${img%.jpg}_optimized.jpg" resize 1200 1200 --fit inside --quality 85
done

# Convert large PNGs to JPEG
find public/assets/cats -name "*.png" -size +1M | while read img; do
  echo "Converting: $img"
  sharp -i "$img" -o "${img%.png}.jpg" resize 1200 1200 --fit inside --quality 85
done
```

### 5. Implementation Steps

1. **Backup original images** to a separate folder
2. **Use Squoosh or similar tool** to optimize Afina/aUntitled-1.png (21MB → ~150KB)
3. **Optimize Pukis images** (7.3MB → ~150KB each)
4. **Set up a pre-commit hook** to prevent large images from being committed
5. **Update image paths** if filenames changed

### 6. Preventing Future Issues

Add to `.githooks/pre-commit`:
```bash
#!/bin/bash
# Check for large files
MAX_SIZE=500000 # 500KB

large_files=$(git diff --cached --name-only | grep -E '\.(jpg|jpeg|png|gif)$' | while read file; do
  if [ -f "$file" ]; then
    size=$(wc -c < "$file")
    if [ $size -gt $MAX_SIZE ]; then
      echo "$file is too large: $(($size / 1024))KB"
    fi
  fi
done)

if [ -n "$large_files" ]; then
  echo "Error: The following images exceed 500KB:"
  echo "$large_files"
  echo ""
  echo "Please optimize images before committing."
  echo "See docs/IMAGE_OPTIMIZATION.md for guidance."
  exit 1
fi
```

### 7. Expected Results

After optimization:
- **LCP**: Should improve from 9.9s to <2.5s
- **FCP**: Should improve from 6.2s to <1.8s
- **Total page size**: Should reduce from ~42MB to <5MB
- **Performance score**: Should improve from 0-20 to 90+

### 8. Quick Win - Priority Images

Start with these high-priority images that appear first:
1. `/assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg` (6.0MB → target: 150KB)
2. `/assets/cats/Afina/aUntitled-1.png` (21MB → target: 150KB)
3. `/assets/cats/Kittens/thumbnail_DSC_0020.jpg`
4. `/assets/cats/Kittens/thumbnail_DSC_0099.jpg`

These images are loaded first and have the biggest impact on LCP/FCP.

## Automated Solutions

Consider using a CDN with automatic image optimization:
- **Cloudinary**: Free tier with automatic WebP/AVIF conversion
- **Vercel Image Optimization**: Automatic optimization on the fly
- **Cloudflare Images**: CDN with resize and format optimization

Example using Vercel's next/image equivalent for React:
```typescript
// Use a library like react-optimized-image or implement lazy loading
import { LazyLoadImage } from 'react-lazy-load-image-component';

<LazyLoadImage
  src={image}
  alt={alt}
  width={800}
  height={800}
  effect="blur"
/>
```
