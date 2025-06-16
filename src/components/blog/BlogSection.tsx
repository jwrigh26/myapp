import React from 'react';
import { SectionSpacer } from '@/components/Spacer';
import { ResponsiveContentImageGrid } from '@/components/Image';
import ProseBlock from '@/components/ProseBlock';
import type { ProseBlockProps } from '@/components/ProseBlock';

interface BlogSectionProps {
  /** Unique ID for the section anchor */
  id: string;
  /** Optional title for the section */
  title?: string;
  /** Optional subtitle for the section */
  subtitle?: string;
  /** Image source for the content grid */
  imageSrc?: string;
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
}: BlogSectionProps): JSX.Element {
  return (
    <>
      <SectionSpacer id={id} />
      
      {/* Title block (if no image grid) */}
      {title && !imageSrc && (
        <ProseBlock 
          title={title} 
          subtitle={subtitle}
          options={titleOptions}
        />
      )}
      
      {/* Content with image */}
      {imageSrc ? (
        <ResponsiveContentImageGrid
          imageSrc={imageSrc}
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
      ) : (
        /* Content without image */
        children
      )}
    </>
  );
}

export default BlogSection;
