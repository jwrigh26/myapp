import React from 'react';
import ProseBlock, { ProseBlockProps } from '@/components/ProseBlock';

interface BlogSubsectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  dense?: boolean;
  spacingBottom?: boolean;
}

/**
 * Semantic component for blog subsections - replaces the repeated SubSectionStarter pattern.
 * Uses the exact same styling as your current SubSectionStarter function.
 */
export function BlogSubsection({
  children,
  title,
  subtitle,
  dense = false,
  spacingBottom = false,
}: BlogSubsectionProps): JSX.Element {
  return (
    <ProseBlock
      title={title}
      subtitle={subtitle}
      options={{ titleVariant: 'h6', subtitleVariant: 'subtitle1' }}
      dense={dense}
      spacingBottom={spacingBottom}
    >
      {children}
    </ProseBlock>
  );
}

export default BlogSubsection;
