import type { ImageKey } from './imageRegistry';
import { getDefaultImageSrc } from './images';

interface OpenGraphConfig {
  title: string;
  description: string;
  imageKey?: ImageKey;
  url?: string;
  type?: 'website' | 'article';
  siteName?: string;
  author?: string;
  publishedTime?: string;
}

const SITE_NAME = 'Justin Wright';
const BASE_URL = 'https://justinwright.io'; // Update this to your actual domain
const DEFAULT_AUTHOR = 'Justin Wright';

export function generateOpenGraphMeta(config: OpenGraphConfig) {
  const {
    title,
    description,
    imageKey,
    url,
    type = 'article',
    siteName = SITE_NAME,
    author = DEFAULT_AUTHOR,
    publishedTime,
  } = config;

  // Determine asset category based on the image key or type
  const assetCategory = imageKey?.includes('home') ? 'home' : 'blog';

  // Get the full image URL for the specified image key
  const imageUrl = imageKey
    ? `${BASE_URL}${getDefaultImageSrc(imageKey, assetCategory).replace('@/', '/')}`
    : `${BASE_URL}/assets/20250701-image-20250723-home1-medium.webp`; // Fallback image

  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  const meta: Array<{ name?: string; property?: string; content: string }> = [
    // Basic meta tags
    { name: 'description', content: description },

    // Open Graph tags
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: imageUrl },
    { property: 'og:url', content: fullUrl },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: siteName },

    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:creator', content: '@your_twitter_handle' }, // Update this
  ];

  // Add article-specific tags if it's an article
  if (type === 'article') {
    meta.push({ property: 'article:author', content: author });

    if (publishedTime) {
      meta.push({ property: 'article:published_time', content: publishedTime });
    }
  }

  return meta;
}

export function generateBlogPostMeta(config: {
  title: string;
  description: string;
  imageKey: ImageKey;
  route: string;
  publishedDate: string;
  author?: string;
}) {
  return generateOpenGraphMeta({
    title: config.title,
    description: config.description,
    imageKey: config.imageKey,
    url: config.route,
    type: 'article',
    author: config.author,
    publishedTime: new Date(config.publishedDate).toISOString(),
  });
}
