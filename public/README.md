# Open Graph Images

This directory should contain your default Open Graph image for social media previews.

## Required Files

1. **default-og-image.jpg** (1200x630px) - Default image for pages without specific images
2. **favicon.ico** - Website favicon
3. Any other static assets you want to serve directly

## Image Specifications for Social Media

### Open Graph (Facebook, LinkedIn, etc.)

- **Recommended size**: 1200 x 630 pixels
- **Minimum size**: 600 x 315 pixels
- **Aspect ratio**: 1.91:1
- **File size**: Under 8MB
- **Formats**: JPG, PNG, WebP, GIF

### Twitter Cards

- **Summary card**: 120 x 120 pixels (minimum)
- **Large image card**: 1200 x 630 pixels (same as OG)

## Implementation Notes

The `generateOpenGraphMeta` utility in `src/utils/openGraph.ts` will automatically use:

- Specific images from your image registry when available
- `default-og-image.jpg` as a fallback for pages without specific images

Make sure to update the `BASE_URL` in `openGraph.ts` to match your actual domain.
