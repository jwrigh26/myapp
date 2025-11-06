# Open Graph Implementation Guide

## Summary

I've implemented Open Graph meta tags for your blog posts and home page so that when you share links on LinkedIn and other social media platforms, they will display rich previews with images, titles, and descriptions.

## What Was Added

### 1. Open Graph Utility (`src/utils/openGraph.ts`)

Created a utility function that generates proper Open Graph and Twitter Card meta tags:

- **`generateOpenGraphMeta()`** - General purpose Open Graph generator
- **`generateBlogPostMeta()`** - Specialized for blog posts with article-specific tags

Key features:

- Automatically handles different asset categories (blog vs home images)
- Includes Twitter Card support
- Supports article-specific metadata (author, published time)
- Provides fallback to default image when specific image isn't found

### 2. Updated Routes

Enhanced the following routes with proper Open Graph meta tags:

#### Home Page (`/home`)

- Title: "Justin Wright - Senior Frontend Engineer with UX + Product Brain"
- Description: Professional summary
- Image: `20250701-image-20250723-home1` (your home image)
- Type: `website`

#### Blog Posts

- **Part 1**: Uses `20250601-image-slide0`
- **Part 2**: Uses `20250601-image-slide10`
- **Part 3**: Uses `20250601-image-slide19`

All blog posts include:

- Descriptive titles and summaries
- Relevant images from your image registry
- Article metadata (author: "Justin Wright", published dates)
- Type: `article`

## How It Works

### Meta Tags Generated

For each page, the system generates these essential meta tags:

```html
<!-- Basic SEO -->
<meta name="description" content="..." />
<title>Page Title</title>

<!-- Open Graph (Facebook, LinkedIn, etc.) -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://yourdomain.com/path/to/image.webp" />
<meta property="og:url" content="https://yourdomain.com/current-page" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Justin Wright" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />

<!-- Article-specific (for blog posts) -->
<meta property="article:author" content="Justin Wright" />
<meta property="article:published_time" content="2025-03-15T00:00:00Z" />
```

### Image Handling

The system automatically:

1. Uses images from your image registry when available
2. Selects the appropriate asset category (`blog` vs `home`)
3. Falls back to a default Open Graph image (`/public/default-og-image.jpg`)
4. Generates full URLs for social media platforms

## Configuration Needed

### 1. Update Base URL

In `src/utils/openGraph.ts`, update this line to your actual domain:

```typescript
const BASE_URL = 'https://justinwright.dev'; // Update this to your actual domain
```

### 2. Add Default Open Graph Image

Create and add a default Open Graph image at:

```
/public/default-og-image.jpg
```

**Image specifications:**

- **Size**: 1200 x 630 pixels (recommended)
- **Aspect ratio**: 1.91:1
- **File size**: Under 8MB
- **Format**: JPG, PNG, or WebP

### 3. Update Twitter Handle (Optional)

In `src/utils/openGraph.ts`, update this line if you have a Twitter account:

```typescript
{ name: 'twitter:creator', content: '@your_twitter_handle' }, // Update this
```

## Testing Your Implementation

### 1. Local Testing

- Build and deploy your site: `npm run build`
- Use tools like:
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. What Social Platforms Will Show

When you share your links, platforms will display:

- **Title**: Your page title
- **Description**: Your page description
- **Image**: The specific image for that page (or your default)
- **URL**: Clean, formatted URL

### 3. Debug Common Issues

If previews don't show up:

1. **Check image URLs**: Make sure images are publicly accessible
2. **Validate meta tags**: Use browser dev tools to verify tags are rendered
3. **Clear cache**: Social platforms cache previews; use their debugging tools to refresh
4. **Test image sizes**: Ensure images meet platform requirements

## Adding to New Pages

For new blog posts, use this pattern:

```typescript
import { generateBlogPostMeta } from '@/utils/openGraph';

export const Route = createFileRoute('/blog/posts/your-new-post')({
  component: YourComponent,
  head: () => ({
    title: 'Your Post Title - Justin Wright',
    meta: generateBlogPostMeta({
      title: 'Your Post Title',
      description: 'Brief description of your post content...',
      imageKey: 'your-image-key-from-registry',
      route: '/blog/posts/your-new-post',
      publishedDate: '2025-XX-XX',
    }),
  }),
});
```

For non-blog pages:

```typescript
import { generateOpenGraphMeta } from '@/utils/openGraph';

export const Route = createFileRoute('/your-page')({
  component: YourComponent,
  head: () => ({
    title: 'Your Page Title - Justin Wright',
    meta: generateOpenGraphMeta({
      title: 'Your Page Title',
      description: 'Page description...',
      imageKey: 'optional-image-key',
      url: '/your-page',
      type: 'website', // or 'article'
    }),
  }),
});
```

## Result

Now when you share links to your blog posts or home page on LinkedIn, Twitter, Facebook, or other social platforms, they will display rich, professional-looking previews with your content's title, description, and relevant images. This significantly improves engagement and click-through rates from social media.
