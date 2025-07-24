import type { SourceProps } from '@/components/Image';
import { ResponsiveContentImageGrid } from '@/components/Image';
import type { ProseBlockProps } from '@/components/ProseBlock';
import ProseBlock from '@/components/ProseBlock';
import { SectionSpacer } from '@/components/Spacer';
import React from 'react';

interface BlogSectionProps {
  /** Unique ID for the section anchor */
  id: string;
  /** Optional title for the section */
  title?: string;
  /** Optional subtitle for the section */
  subtitle?: string;
  /** Image source for the content grid */
  imageSrc?: string;
  /** Optional responsive image sources */
  sources?: SourceProps[];
  /** Alt text for the image */
  imageAlt?: string;
  /** Whether image should be on the right side */
  imageOnRight?: boolean;
  /** Aspect ratio for the image */
  aspectRatio?: number;
  /** Caption for the image */
  caption?: string;
  /** Gap between image and content */
  gap?: number;
  /** Whether to show mobile image first */
  mobileImageFirst?: boolean;
  /** Custom grid columns (e.g., "2fr 1fr", "1fr 2fr") */
  columns?: string;
  /** Object fit for images */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Main content of the section */
  children?: React.ReactNode;
  /** Options for title styling */
  titleOptions?: ProseBlockProps['options'];
  /** Whether to add bottom spacing */
  spacingBottom?: boolean; // Default to true for spacing
}

/**
 * Semantic component for major blog sections.
 * Combines SectionSpacer, optional title, and optional ResponsiveContentImageGrid.
 */
export function BlogSection({
  id,
  title,
  subtitle,
  imageSrc,
  sources,
  imageAlt,
  imageOnRight = true,
  aspectRatio = 4 / 3,
  caption,
  gap = 2,
  mobileImageFirst,
  columns,
  objectFit,
  children,
  titleOptions,
  spacingBottom = false, // Default to true for spacing
}: BlogSectionProps): JSX.Element {
  // Determine the image configuration
  // Priority: sources (if provided) > imageSrc (fallback)
  const hasImage = !!(sources?.length || imageSrc);
  const defaultImageSrc = imageSrc || '';
  const imageSources = sources?.length ? sources : undefined;

  return (
    <>
      <SectionSpacer id={id} />

      {/* Content with image */}
      {hasImage ? (
        <ResponsiveContentImageGrid
          imageSrc={defaultImageSrc}
          sources={imageSources}
          imageAlt={imageAlt || title || 'Section image'}
          imageOnRight={imageOnRight}
          gap={gap}
          aspectRatio={aspectRatio}
          caption={caption}
          mobileImageFirst={mobileImageFirst}
          columns={columns}
          objectFit={objectFit}
        >
          {/* Title inside image grid */}
          {title && (
            <ProseBlock
              title={title}
              subtitle={subtitle}
              options={titleOptions}
            />
          )}
          {children}
        </ResponsiveContentImageGrid>
      ) : title || typeof children === 'string' ? (
        <ProseBlock
          title={title}
          subtitle={subtitle}
          options={titleOptions}
          spacingBottom={spacingBottom}
        >
          {children}
        </ProseBlock>
      ) : (
        children
      )}
    </>
  );
}

export default BlogSection;
