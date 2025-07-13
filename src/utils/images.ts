import type { SourceProps } from '@/components/Image';
import { imageRegistry, type ImageKey } from './imageRegistry';

export type { ImageKey };

// Helper function to create responsive image sources from registry data
export function createImageSources(imageKey: ImageKey): SourceProps[] {
  const images = imageRegistry[imageKey];
  if (!images) {
    console.warn(
      `Image key "${imageKey}" not found in registry. Using fallback method.`
    );
    return createManualImageSources(
      `@/assets/blog/2025/06/${imageKey}-large.webp`
    );
  }

  // Type assertion to work with the const assertion
  const imageSizes = images as {
    large?: string;
    medium?: string;
    small?: string;
  };
  const sources: SourceProps[] = [];

  // Add large size for desktop
  if (imageSizes.large) {
    sources.push({
      media: '(min-width: 1024px)',
      srcSet: imageSizes.large,
      sizes: '100vw',
    });
  }

  // Add medium size for tablet
  if (imageSizes.medium) {
    sources.push({
      media: '(min-width: 768px)',
      srcSet: imageSizes.medium,
      sizes: '100vw',
    });
  }

  // Add small size for mobile
  if (imageSizes.small) {
    sources.push({
      media: '(max-width: 767px)',
      srcSet: imageSizes.small,
      sizes: '100vw',
    });
  }

  return sources;
}

// Fallback function for manual image source creation
export function createManualImageSources(basePath: string): SourceProps[] {
  // Remove the size suffix and extension from the base path
  const baseWithoutSizeAndExt = basePath
    .replace(/-large\.(webp|jpg|jpeg|png)$/, '')
    .replace(/-medium\.(webp|jpg|jpeg|png)$/, '')
    .replace(/-small\.(webp|jpg|jpeg|png)$/, '');

  return [
    {
      media: '(min-width: 1024px)',
      srcSet: `${baseWithoutSizeAndExt}-large.webp`,
      sizes: '100vw',
    },
    {
      media: '(min-width: 768px)',
      srcSet: `${baseWithoutSizeAndExt}-medium.webp`,
      sizes: '100vw',
    },
    {
      media: '(max-width: 767px)',
      srcSet: `${baseWithoutSizeAndExt}-small.webp`,
      sizes: '100vw',
    },
  ];
}

// Helper to get the default fallback image (medium size preferred)
export function getDefaultImageSrc(imageKey: ImageKey): string {
  const images = imageRegistry[imageKey];
  if (!images) {
    return `@/assets/blog/2025/06/${imageKey}-large.webp`;
  }

  // Type assertion to work with the const assertion
  const imageSizes = images as {
    large?: string;
    medium?: string;
    small?: string;
  };

  // Prefer medium, fallback to large, then small
  return imageSizes.medium || imageSizes.large || imageSizes.small || '';
}

// Helper to get the thumbnail (small) image src
export function getThumbImageSrc(imageKey: ImageKey): string {
  const images = imageRegistry[imageKey];
  if (!images) {
    return `@/assets/blog/2025/06/${imageKey}-small.webp`;
  }

  const imageSizes = images as {
    large?: string;
    medium?: string;
    small?: string;
  };

  // Prefer small, fallback to medium, then large
  return imageSizes.small || imageSizes.medium || imageSizes.large || '';
}
