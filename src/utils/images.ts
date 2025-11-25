import type { SourceProps } from '@/components/Image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import {
  imageRegistry,
  type ImageAssetCategory,
  type ImageKey,
} from './imageRegistry';

export type { ImageKey };

// Helper function to create responsive image sources from registry data
export function createImageSources(
  imageKey: ImageKey,
  assetCategory: ImageAssetCategory = 'blog'
): SourceProps[] {
  const images = imageRegistry[imageKey];
  if (!images) {
    console.warn(
      `Image key "${imageKey}" not found in registry. Using fallback method.`
    );
    const datePath = extractDatePath(imageKey);
    return createManualImageSources(
      `@/assets/${assetCategory}/${datePath}/${imageKey}-large.webp`
    );
  }

  const imageSizes = images as { large?: string };
  
  // Single high-quality image for all screen sizes
  if (imageSizes.large) {
    return [
      {
        srcSet: imageSizes.large,
        sizes: '100vw',
      },
    ];
  }

  return [];
}

// Fallback function for manual image source creation
export function createManualImageSources(basePath: string): SourceProps[] {
  // Remove the size suffix and extension from the base path
  const baseWithoutSizeAndExt = basePath
    .replace(/-large\.(webp|jpg|jpeg|png)$/, '');

  return [
    {
      srcSet: `${baseWithoutSizeAndExt}-large.webp`,
      sizes: '100vw',
    },
  ];
}

// Helper to get the default fallback image
export function getDefaultImageSrc(
  imageKey: ImageKey,
  assetCategory: ImageAssetCategory = 'blog'
): string {
  const images = imageRegistry[imageKey];
  const datePath = extractDatePath(imageKey);
  if (!images) {
    return `@/assets/${assetCategory}/${datePath}/${imageKey}-large.webp`;
  }

  const imageSizes = images as { large?: string };
  return imageSizes.large || '';
}

// Helper to get the thumbnail image src
export function getThumbImageSrc(
  imageKey: ImageKey,
  assetCategory: ImageAssetCategory = 'blog'
): string {
  const images = imageRegistry[imageKey];
  const datePath = extractDatePath(imageKey);
  if (!images) {
    return `@/assets/${assetCategory}/${datePath}/${imageKey}-large.webp`;
  }

  const imageSizes = images as { large?: string };
  return imageSizes.large || '';
}

// Helper to get the background image src
export function getBackgroundImageSrc(
  imageKey: ImageKey,
  assetCategory: ImageAssetCategory = 'blog'
): string {
  const images = imageRegistry[imageKey];
  const datePath = extractDatePath(imageKey);
  if (!images) {
    return `@/assets/${assetCategory}/${datePath}/${imageKey}-large.webp`;
  }

  const imageSizes = images as { large?: string };
  return imageSizes.large || '';
}

// Hook for background images (simplified for single variant)
export function useBackgroundImageSrc(
  imageKey: ImageKey,
  assetCategory: ImageAssetCategory = 'blog'
): string {
  return useMemo(() => {
    const images = imageRegistry[imageKey];
    const datePath = extractDatePath(imageKey);
    if (!images) {
      return `@/assets/${assetCategory}/${datePath}/${imageKey}-large.webp`;
    }

    const imageSizes = images as { large?: string };
    return imageSizes.large || '';
  }, [imageKey, assetCategory]);
}

// Assuming imageKey format like: "20250712-image-description"
function extractDatePath(imageKey: ImageKey): string {
  const match = imageKey.match(/^(\d{4})(\d{2})(\d{2})-/);
  if (match) {
    const [, year, month] = match;
    return `${year}/${month}`;
  }
  // Fallback to current date or a default
  return '2025/07'; // or use current date
}
