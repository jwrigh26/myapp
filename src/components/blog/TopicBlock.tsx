import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import React from 'react';

interface TopicBlockProps {
  /** Title for the topic */
  title: string;
  /** Array of list items */
  items: React.ReactNode[];
  /** Optional subtitle for the list */
  subTitle?: string;
  /** Whether to use ordered list */
  ordered?: boolean;
  /** Whether to apply dense spacing */
  dense?: boolean;
  /** Whether to add bottom spacing */
  spacingBottom?: boolean;
  /** Title styling options */
  titleOptions?: {
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };
}

/**
 * Semantic component for topic introductions.
 * Combines ProseBlock title with ProseList for consistent topic presentation.
 * Uses h5 styling by default to work well as a subtitle within BlogSections.
 */
export function TopicBlock({
  title,
  items,
  subTitle,
  ordered = false,
  dense = false,
  spacingBottom = false,
  titleOptions = { titleVariant: 'h6' }, // Default to h5 for subtitle styling
}: TopicBlockProps): JSX.Element {
  return (
    <>
      <ProseBlock
        title={title}
        options={titleOptions}
        spacingBottom={spacingBottom}
      />
      <ProseList
        items={items}
        subTitle={subTitle}
        ordered={ordered}
        dense={dense}
        spacingBottom={spacingBottom}
      />
    </>
  );
}
