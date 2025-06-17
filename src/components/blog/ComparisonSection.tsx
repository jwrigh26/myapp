import React from 'react';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';

interface ComparisonItem {
  /** Title for this comparison item */
  title: string;
  /** List of points */
  items: React.ReactNode[];
  /** Subtitle for the list (e.g., "Pros", "Cons") */
  subTitle?: string;
}

interface ComparisonSectionProps {
  /** Main title for the comparison section */
  title?: string;
  /** Array of comparison items (pros/cons, features, etc.) */
  comparisons: ComparisonItem[];
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
 * Semantic component for comparison sections (pros/cons, feature comparisons).
 * Structures multiple related topic lists with consistent formatting.
 */
export function ComparisonSection({
  title,
  comparisons,
  dense = false,
  spacingBottom = false,
  titleOptions,
}: ComparisonSectionProps): JSX.Element {
  return (
    <>
      {title && <ProseBlock title={title} options={titleOptions} />}
      {comparisons.map((comparison, index) => (
        <React.Fragment key={index}>
          <ProseBlock
            title={comparison.title}
            options={{ titleVariant: 'h5' }}
            dense={dense}
          />
          <ProseList 
            items={comparison.items}
            subTitle={comparison.subTitle}
            dense={dense}
            spacingBottom={index === comparisons.length - 1 ? spacingBottom : false}
          />
        </React.Fragment>
      ))}
    </>
  );
}
