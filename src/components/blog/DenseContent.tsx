import React from 'react';
import ProseBlock from '@/components/ProseBlock';

interface DenseContentProps {
  /** Array of content paragraphs */
  paragraphs: React.ReactNode[];
  /** Whether to add bottom spacing to the last paragraph */
  spacingBottom?: boolean;
}

/**
 * Semantic component for grouped dense content paragraphs.
 * Automatically applies dense spacing to all but optionally the last paragraph.
 */
export function DenseContent({
  paragraphs,
  spacingBottom = false,
}: DenseContentProps): JSX.Element {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <ProseBlock
          key={index}
          dense
          spacingBottom={
            index === paragraphs.length - 1 ? spacingBottom : false
          }
        >
          {paragraph}
        </ProseBlock>
      ))}
    </>
  );
}
