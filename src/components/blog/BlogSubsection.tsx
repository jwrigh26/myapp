import ProseBlock from '@/components/ProseBlock';
import { SectionSpacer } from '@/components/Spacer';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

interface BlogSubsectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  dense?: boolean;
  spacingBottom?: boolean;
  spacingTop?: boolean; // Default to true for spacing
}

/**
 * Semantic component for blog subsections - replaces the repeated SubSectionStarter pattern.
 * Uses the exact same styling as your current SubSectionStarter function.
 */
const BlogSubsection = React.memo(function BlogSubsection({
  children,
  title,
  subtitle,
  dense = false,
  spacingBottom = true,
  spacingTop = true,
}: BlogSubsectionProps): JSX.Element {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <>
      {(isMobile || (!isMobile && spacingTop)) && (
        <SectionSpacer size={2} id={`${title}-subsection-spacer`} />
      )}
      <ProseBlock
        title={title}
        subtitle={subtitle}
        options={{ titleVariant: 'h6', subtitleVariant: 'subtitle1' }}
        dense={dense}
        spacingBottom={spacingBottom}
      >
        {children}
      </ProseBlock>
    </>
  );
});

BlogSubsection.displayName = 'BlogSubsection';

export { BlogSubsection };
export default BlogSubsection;
