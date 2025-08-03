# Components Documentation

## ComicStrip Component

A responsive comic strip component for displaying sequential images in blog posts.

### Features

- **Responsive Layout**: Single column (mobile) → 2-column grid (tablet) → horizontal strip (desktop)
- **Comic Book Styling**: Borders, shadows, and proper aspect ratios
- **Frame Numbering**: Subtle mobile indicators for reading order
- **Accessibility**: Proper alt text and ARIA labels
- **Performance**: Memoized with stable array references

### Usage

```jsx
const comicFrames = useMemo(
  () => [
    {
      imageName: '20250701-image-frame1',
      alt: 'Description of first frame',
    },
    {
      imageName: '20250701-image-frame2',
      alt: 'Description of second frame',
    },
  ],
  []
);

<ComicStrip frames={comicFrames} title="Comic Title" aspectRatio={4 / 3} />;
```

### Props

- `frames`: Array of `ComicFrame` objects with `imageName` and `alt`
- `title?`: Optional comic title for accessibility
- `aspectRatio?`: Frame aspect ratio (default: 4/3)
- `className?`: Additional CSS classes

---

# Image Component Documentation

## `objectFit` Property Guide

The `objectFit` property controls how the image content fits within its container. This guide explains each available option.

### Available Values

#### 1. `cover` (Default)

- **What it does**: Scales the image to **completely fill** the container while maintaining aspect ratio
- **Behavior**: May crop parts of the image that don't fit the container's aspect ratio
- **Best for**: Hero images, background images, profile pictures, when filling space is more important than showing the entire image
- **Visual effect**: No empty space, image may be partially cropped

#### 2. `contain`

- **What it does**: Scales the image to fit **entirely within** the container while maintaining aspect ratio
- **Behavior**: May leave empty space on sides or top/bottom if aspect ratios don't match
- **Best for**: Product photos, diagrams, logos, when seeing the entire image is more important than filling space
- **Visual effect**: No cropping, possible letterboxing/pillarboxing (empty space)

#### 3. `fill`

- **What it does**: Stretches the image to exactly fit the container's dimensions
- **Behavior**: Ignores aspect ratio, may distort the image
- **Best for**: Rarely used for photos; occasionally useful for abstract graphics or patterns
- **Visual effect**: Image may appear stretched or squished if container's aspect ratio differs from image

#### 4. `none`

- **What it does**: No resizing at all, displays image at its original size
- **Behavior**: May overflow container or leave empty space
- **Best for**: When precise control is needed, usually with overflow: hidden on the container
- **Visual effect**: Image maintains exact original dimensions, may be cropped or have empty space

#### 5. `scale-down`

- **What it does**: Uses either `none` or `contain`, whichever results in a smaller image size
- **Behavior**: If image is larger than container, behaves like `contain`; if smaller, behaves like `none`
- **Best for**: When you want to prevent small images from being enlarged but still want large images to be scaled down
- **Visual effect**: Never enlarges images, but will reduce them if needed

## Usage Examples

```tsx
// For a product image where seeing all details matters
<Image
  defaultSrc={productImage}
  alt="Product detail"
  objectFit="contain"
/>

// For a profile picture where filling the space matters more
<Image
  defaultSrc={profilePic}
  alt="User profile"
  objectFit="cover"
/>

// For a technical diagram that shouldn't be enlarged if small
<Image
  defaultSrc={diagramImage}
  alt="Technical diagram"
  objectFit="scale-down"
/>
```
