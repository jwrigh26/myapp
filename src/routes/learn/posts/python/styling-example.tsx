import ProseBlock from '@/components/ProseBlock';
import TitleBlock from '@/components/TitleBlock';
import IntroBlock from '@/components/IntroBlock';
import CodeBlock from '@/components/CodeBlock';
import { SectionSpacer } from '@/components/Spacer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/posts/python/styling-example')({
  component: StylingExample,
  head: () => ({
    getTitle: () => 'Styling Flexibility Example',
    meta: [
      {
        name: 'description',
        content: 'Example showing flexible navigation markup patterns',
      },
    ],
  }),
});

function StylingExample() {
  return (
    <>
      <TitleBlock
        title="Styling Flexibility Example"
        subtitle="Different navigation patterns for styling freedom"
      />

      <IntroBlock>
        This example demonstrates multiple ways to mark up navigation sections
        that give you complete styling freedom while maintaining automatic
        table-of-contents generation.
      </IntroBlock>

      <SectionSpacer />

      {/* Method 1: Current Box + Typography approach */}
      <Box id="current-approach" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Current Box + Typography Approach
        </Typography>

        <ProseBlock>
          This is the current approach using MUI Box and Typography components.
          It works but couples your navigation to specific component choices.
        </ProseBlock>

        <CodeBlock
          language="jsx"
          code={`<Box id="section-name" sx={{ mb: 4 }}>
  <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
    Section Title
  </Typography>
  {/* content */}
</Box>`}
        />
      </Box>

      {/* Method 2: className with data attributes - most explicit */}
      <div
        className="anchor-section my-custom-section-styles"
        data-id="explicit-data-attrs"
      >
        <h3 className="anchor-title my-custom-title-styles" data-level="1">
          Method 2: Explicit Data Attributes
        </h3>

        <ProseBlock>
          This approach uses className="anchor-section" with data-id and
          className="anchor-title" with data-level. Most explicit and flexible.
        </ProseBlock>

        <CodeBlock
          language="jsx"
          code={`<div className="anchor-section my-custom-section-styles" data-id="section-name">
  <h3 className="anchor-title my-custom-title-styles" data-level="1">
    Section Title
  </h3>
  {/* content */}
</div>`}
        />
      </div>

      {/* Method 3: className with semantic heading tags */}
      <section className="anchor-section prose-section" id="semantic-headings">
        <h3 className="anchor-title section-heading">
          Method 3: Semantic Heading Tags
        </h3>

        <ProseBlock>
          Use semantic HTML with className markers. The parser infers level from
          the heading tag (h1-h6) and maps to navigation levels.
        </ProseBlock>

        <CodeBlock
          language="jsx"
          code={`<section className="anchor-section prose-section" id="section-name">
  <h3 className="anchor-title section-heading">
    Section Title
  </h3>
  {/* content */}
</section>`}
        />

        {/* Nested subsection */}
        <div className="anchor-section subsection" id="nested-subsection">
          <h4 className="anchor-title subsection-title">
            Nested Subsection Example
          </h4>

          <ProseBlock>
            This subsection will automatically be nested under its parent based
            on the h4 tag (level 2).
          </ProseBlock>
        </div>
      </section>

      {/* Method 4: Article-based semantic markup */}
      <article className="anchor-section content-article" id="article-approach">
        <header>
          <h3 className="anchor-title article-heading">
            Method 4: Article-Based Semantic Markup
          </h3>
        </header>

        <ProseBlock>
          Use semantic HTML5 elements like article, section, header for better
          accessibility and SEO while maintaining navigation parsing.
        </ProseBlock>

        <CodeBlock
          language="jsx"
          code={`<article className="anchor-section content-article" id="section-name">
  <header>
    <h3 className="anchor-title article-heading">
      Section Title
    </h3>
  </header>
  {/* content */}
</article>`}
        />
      </article>

      {/* Styling Benefits Section */}
      <div className="anchor-section" id="styling-benefits">
        <h3 className="anchor-title">Styling Benefits</h3>

        <ProseBlock>
          With className-based navigation markers, you can:
        </ProseBlock>

        <ul>
          <li>Use any HTML element (div, section, article, aside, etc.)</li>
          <li>
            Apply any CSS framework (Tailwind, styled-components, emotion)
          </li>
          <li>Create custom design systems without MUI dependency</li>
          <li>Maintain semantic HTML for accessibility</li>
          <li>Use CSS Grid, Flexbox, or any layout approach</li>
        </ul>

        <div className="anchor-section" id="css-examples">
          <h4 className="anchor-title">CSS Styling Examples</h4>

          <CodeBlock
            language="css"
            code={`/* Custom section styling */
.anchor-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border-left: 4px solid var(--primary-color);
  background: var(--section-bg);
}

.anchor-title {
  color: var(--heading-color);
  font-family: var(--heading-font);
  margin-bottom: 1rem;
  position: relative;
}

.anchor-title::before {
  content: "🔗";
  position: absolute;
  left: -2rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.anchor-section:hover .anchor-title::before {
  opacity: 1;
}

/* Tailwind CSS approach */
.anchor-section {
  @apply mb-8 p-4 border-l-4 border-blue-500 bg-gray-50;
}

.anchor-title {
  @apply text-2xl font-bold text-gray-900 mb-4;
}`}
          />
        </div>
      </div>
    </>
  );
}
