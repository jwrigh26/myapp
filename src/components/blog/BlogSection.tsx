import type { SourceProps } from '@/components/Image';
import { ResponsiveContentImageGrid } from '@/components/Image';
import type { ProseBlockProps } from '@/components/ProseBlock';
import ProseBlock from '@/components/ProseBlock';
import { SectionSpacer } from '@/components/Spacer';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React from 'react';

const ConditionalImageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hideImageOnMobile',
})<{ hideImageOnMobile?: boolean }>(({ theme, hideImageOnMobile }) => ({
  ...(hideImageOnMobile && {
    // Hide the image container on mobile
    '& > div:first-of-type > div:last-child': {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    // Adjust grid layout on mobile when image is hidden
    '& > div:first-of-type': {
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr !important',
      },
    },
  }),
}));

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
  /** Whether to show mobile image first */
  mobileImageFirst?: boolean;
  /** Whether to hide image on mobile devices */
  hideImageOnMobile?: boolean;
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
const BlogSection = React.memo(
  function BlogSection({
    id,
    title,
    subtitle,
    imageSrc,
    sources,
    imageAlt,
    imageOnRight = true,
    aspectRatio = 4 / 3,
    caption,
    mobileImageFirst,
    hideImageOnMobile = false,
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
        <SectionSpacer id={`${id}-section-spacer`} />

        {/* Content with image */}
        {hasImage ? (
          <ConditionalImageWrapper hideImageOnMobile={hideImageOnMobile}>
            <ResponsiveContentImageGrid
              imageSrc={defaultImageSrc}
              sources={imageSources}
              imageAlt={imageAlt || title || 'Section image'}
              imageOnRight={imageOnRight}
              gap={2}
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
          </ConditionalImageWrapper>
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
  },
  (prevProps, nextProps) => {
    // Custom comparison - only check primitive props and stable references
    // Skip children, sources, and titleOptions as they may be unstable references
    return (
      prevProps.id === nextProps.id &&
      prevProps.title === nextProps.title &&
      prevProps.subtitle === nextProps.subtitle &&
      prevProps.imageSrc === nextProps.imageSrc &&
      prevProps.imageAlt === nextProps.imageAlt &&
      prevProps.imageOnRight === nextProps.imageOnRight &&
      prevProps.aspectRatio === nextProps.aspectRatio &&
      prevProps.caption === nextProps.caption &&
      prevProps.mobileImageFirst === nextProps.mobileImageFirst &&
      prevProps.hideImageOnMobile === nextProps.hideImageOnMobile &&
      prevProps.columns === nextProps.columns &&
      prevProps.objectFit === nextProps.objectFit &&
      prevProps.spacingBottom === nextProps.spacingBottom &&
      // Check array length for sources (shallow check)
      prevProps.sources?.length === nextProps.sources?.length &&
      // Check stable references for complex props
      prevProps.children === nextProps.children &&
      prevProps.titleOptions === nextProps.titleOptions &&
      prevProps.sources === nextProps.sources
    );
  }
);

BlogSection.displayName = 'BlogSection';

export { BlogSection };
export default BlogSection;
