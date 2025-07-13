import CallToAction from '@/components/CallToAction';
import type { SourceProps } from '@/components/Image';
import IntroBlock from '@/components/IntroBlock';
import TitleBlock from '@/components/TitleBlock';
import React from 'react';

interface ArticleLayoutProps {
  /** Main article title */
  title: string;
  /** Article subtitle */
  subtitle: string;
  /** Optional pre-subtitle (e.g., "Part 1:", "Series:") */
  preSubtitle?: string;
  /** Optional image source for CallToAction */
  imageSrc?: string;
  /** Optional responsive image sources for CallToAction */
  sources?: SourceProps[];
  /** Optional image alt text for CallToAction */
  imageAlt?: string;
  /** Optional date for CallToAction */
  date?: string;
  /** Section title below the call to action */
  sectionTitle: string;
  /** Section subtitle */
  sectionSubtitle?: string;
  /** Introduction content */
  introContent: React.ReactNode;
  /** Main article content */
  children: React.ReactNode;
}

/**
 * Semantic component for standard blog article layout.
 * Provides consistent header structure: CallToAction + TitleBlock + IntroBlock + content.
 */
export function ArticleLayout({
  title,
  subtitle,
  preSubtitle,
  imageSrc,
  sources,
  imageAlt,
  date,
  sectionTitle,
  sectionSubtitle,
  introContent,
  children,
}: ArticleLayoutProps): JSX.Element {
  return (
    <>
      <CallToAction
        title={title}
        preSubtitle={preSubtitle}
        subtitle={subtitle}
        imageSrc={imageSrc}
        sources={sources}
        imageAlt={imageAlt}
        date={date}
      />

      <TitleBlock subtitle={sectionSubtitle}>{sectionTitle}</TitleBlock>

      <IntroBlock>{introContent}</IntroBlock>

      {children}
    </>
  );
}
