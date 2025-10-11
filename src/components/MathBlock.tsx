import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { resolveThemeColor } from '@/utils/utils';

// KaTeX renderer (fast, great for app UIs)
import 'katex/dist/katex.min.css';
import {
  InlineMath as KaTeXInline,
  BlockMath as KaTeXBlock,
} from 'react-katex';

// Utility function to clean up math strings
function preprocessMath(math: string): string {
  // Remove \require{cancel} from display as it clutters the output
  // Note: KaTeX cancel extension is automatically available
  return math.replace(/\\require\{cancel\}/g, '');
}

// ---------------------------------------------
// Public API
// ---------------------------------------------
export interface MathInlineProps {
  /** LaTeX string. Use \\frac{a}{b}, \\text{kg}, etc. */
  math: string;
  bold?: boolean;
  /** Color token or any CSS color (defaults to `inherit`). */
  color?: string;
  /** MUI Typography variant for surrounding text context. */
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';
  /** Add left/right padding so the inline math breathes in prose. */
  padded?: boolean;
}

export const MathInline = React.memo(function MathInline({
  math,
  color,
  variant = 'body1',
  padded = false,
  bold = false,
}: MathInlineProps) {
  // Helper to make math bold appropriately
  const makeBold = (mathStr: string): string => {
    if (!bold) return mathStr;
    
    // If the math contains \text{}, we need special handling for mixed content
    if (mathStr.includes('\\text{')) {
      // For mixed content, wrap everything in \boldsymbol{} but also convert \text{} to \textbf{}
      const processedMath = mathStr.replace(/\\text\{([^}]+)\}/g, '\\textbf{$1}');
      return `\\boldsymbol{${processedMath}}`;
    } else {
      // For pure mathematical content, use \boldsymbol{}
      return `\\boldsymbol{${mathStr}}`;
    }
  };

  return (
    <Typography
      component="span"
      variant={variant}
      color={color}
      sx={{ px: padded ? 0.5 : 0 }}
    >
      {/* KaTeX renders only the math span; Typography keeps font sizing consistent with prose */}
      <KaTeXInline
        math={preprocessMath(makeBold(math))}
        renderError={(error) => <span>{error.message}</span>}
      />
    </Typography>
  );
});

export interface MathBlockProps {
  /** LaTeX string. You may pass a single expression or an aligned environment. */
  math: string;
  /** Optional caption shown below the math (e.g., “Area = length × width”). */
  caption?: string;
  /** Center align (default) or left align (useful inside lists). */
  align?: 'center' | 'left';
  /** Tone helpers */
  color?: string; // text color
  backgroundColor?: string; // subtle background panel
  /** Anchor support for navigation */
  anchor?: boolean;
  id?: string;
  title?: string;
}

export const MathBlock = React.memo(function MathBlock({
  math,
  caption,
  align = 'center',
  color,
  backgroundColor,
  anchor = false,
  id,
  title,
}: MathBlockProps) {
  return (
    <BlockRoot
      align={align}
      backgroundColor={backgroundColor}
      id={id}
      className={anchor && id ? 'anchor-section' : undefined}
    >
      {title && (
        <>
          <Box sx={{ width: '100%', display: 'flex' }}>
            <Typography
              variant="h6"
              component="h2"
              color="primary.main"
              className={anchor ? 'anchor-title' : undefined}
              sx={{ 
                fontWeight: 'fontWeightMedium',
                fontSize: '1.1rem',
                lineHeight: 1.2,
                padding: 2,
                mb: 0,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Divider sx={{ width: '100%', mb: 4 }} />
        </>
      )}
      <Box sx={{ width: '100%', padding: 2 }}>
        <Typography component="div" color={color} sx={{ textAlign: align }}>
          <KaTeXBlock math={preprocessMath(math)} />
        </Typography>
        {caption && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: align, mt: 4 }}
          >
            {caption}
          </Typography>
        )}
      </Box>
    </BlockRoot>
  );
});

export interface EquationStepsProps {
  /** Array of LaTeX lines; will be joined with \\ to make an aligned block. */
  steps: string[];
  /** Optional title above the steps. */
  title?: string;
  /** Optional subtitle below the title. */
  subtitle?: string;
  /** Align equals vertically using amsmath aligned env. */
  alignEquals?: boolean;
  /** Visual chrome */
  outlined?: boolean;
  /** Header color (e.g., 'primary.main', 'secondary.main') */
  headerColor?: string;
  /** Anchor support for navigation */
  anchor?: boolean;
  id?: string;
}

export const EquationSteps = React.memo(function EquationSteps({
  steps,
  title,
  subtitle,
  alignEquals = true,
  outlined = true,
  headerColor,
  anchor = false,
  id,
}: EquationStepsProps) {
  const joined = steps
    .map((line) => (alignEquals ? toAlignedLine(line) : line))
    .join(String.raw`\\[16pt]`);

  const math = String.raw`\begin{aligned} ${joined} \end{aligned}`;

  return (
    <Card
      variant={outlined ? 'outlined' : undefined}
      sx={{ overflowX: 'auto' }}
      id={id}
      className={anchor && id ? 'anchor-section' : undefined}
    >
      {(title || subtitle) && (
        <DenseCardHeader
          title={title}
          subheader={subtitle}
          titleColor={headerColor}
          className={anchor && title ? 'anchor-title' : undefined}
        />
      )}
      {(title || subtitle) && <Divider />}
      <CardContent>
        <KaTeXBlock math={preprocessMath(math)} />
      </CardContent>
    </Card>
  );
});

/**
 * Helper: turn "a = b = c" or "expr" into an amsmath-aligned line like `a &= b = c`.
 * If the user already provided an & alignment marker, we leave it as-is.
 */
function toAlignedLine(src: string): string {
  if (src.includes('&')) return src; // already aligned by author
  const idx = src.indexOf('=');
  if (idx === -1) return src; // nothing to align
  return src.slice(0, idx) + '&' + src.slice(idx); // place & before first '='
}

export interface EquationCardProps {
  title?: string;
  subtitle?: string;
  /** One or more block equations. */
  equations: string[];
  outlined?: boolean;
  footer?: React.ReactNode; // e.g., explanation text
  /** Header color (e.g., 'primary.main', 'secondary.main') */
  headerColor?: string;
  /** Anchor support for navigation */
  anchor?: boolean;
  id?: string;
}

export const EquationCard = React.memo(function EquationCard({
  title,
  subtitle,
  equations,
  outlined = false,
  footer,
  headerColor,
  anchor = false,
  id,
}: EquationCardProps) {
  return (
    <Card
      variant={outlined ? "outlined" : undefined}
      sx={{ overflowX: 'auto' }}
      id={id}
      className={anchor && id ? 'anchor-section' : undefined}
    >
      {(title || subtitle) && (
        <DenseCardHeader
          title={title}
          subheader={subtitle}
          titleColor={headerColor}
          className={anchor && title ? 'anchor-title' : undefined}
        />
      )}
      {(title || subtitle) && <Divider />}
      <CardContent>
        <Stack spacing={2}>
          {equations.map((eq, i) => (
            <Typography component="div" key={i}>
              <KaTeXBlock math={preprocessMath(eq)} />
            </Typography>
          ))}
          {footer}
        </Stack>
      </CardContent>
    </Card>
  );
});

export interface ProseMathBlockProps {
  /** Optional heading and subhead, following your ProseBlock style. */
  title?: string;
  subtitle?: string;
  /** Prose content that can include <MathInline/> sprinkled through. */
  children?: React.ReactNode;
  /** Optional featured equation under the prose. */
  equation?: string;
  /** Caption under the featured equation. */
  caption?: string;
  /** Anchor support for navigation */
  anchor?: boolean;
  id?: string;
}

export const ProseMathBlock = React.memo(function ProseMathBlock({
  title,
  subtitle,
  children,
  equation,
  caption,
  anchor = false,
  id,
}: ProseMathBlockProps) {
  return (
    <Box id={id} className={anchor && id ? 'anchor-section' : undefined}>
      {title && (
        <Typography
          variant="h6"
          component="h2"
          color="primary.main"
          gutterBottom
          className={anchor ? 'anchor-title' : undefined}
          sx={{ 
            fontWeight: 'fontWeightMedium',
            fontSize: '1.1rem',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
      {children && (
        <Typography
          variant="body1"
          component="div"
          color="text.primary"
          sx={{ mb: equation ? 1 : 0 }}
        >
          {children}
        </Typography>
      )}
      {equation && <MathBlock math={equation} caption={caption} />}
    </Box>
  );
});

// ---------------------------------------------
// Styled Components (kept below, per your preference)
// ---------------------------------------------
interface BlockRootProps {
  align: 'center' | 'left';
  backgroundColor?: string;
}

const BlockRoot = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'align' && prop !== 'backgroundColor',
})<BlockRootProps>(({ theme, align, backgroundColor }) => {
  const defaultBg =
    backgroundColor ??
    (theme.palette.mode === 'dark'
      ? theme.palette.action.hover
      : theme.palette.action.selected);
  return {
    display: 'flex',
    padding: 0,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: defaultBg,
    border: `1px solid ${theme.palette.divider}`,
    alignItems: align === 'center' ? 'center' : 'flex-start',
    gap: 0,
    flexDirection: 'column',
    overflowX: 'auto',
    '& .katex-display': {
      margin: 0, // KaTeX adds margin; we manage spacing via Box
    },
  };
});

interface DenseCardHeaderProps {
  titleColor?: string;
}

const DenseCardHeader = styled(CardHeader, {
  shouldForwardProp: (prop) => prop !== 'titleColor',
})<DenseCardHeaderProps>(({ theme, titleColor }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  '& .MuiCardHeader-title': {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightMedium, // Less bold than 600
    lineHeight: 1.2,
    color: resolveThemeColor(titleColor)(theme) || theme.palette.primary.main,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 1.3,
    marginTop: theme.spacing(0.25),
    color: theme.palette.text.secondary
  },
}));

// ---------------------------------------------
// Usage examples (delete or keep in your docs playground)
// ---------------------------------------------
export function _DemoExamples() {
  return (
    <Stack spacing={3}>
      <ProseMathBlock
        title="Area of a rectangle"
        subtitle="Units sanity check: m² ÷ m = m"
        equation={String.raw`\frac{20\,\text{m}^2}{4\,\text{m}} = 5\,\text{m}`}
        caption="Area ÷ side length = other side length"
      >
        When reading story problems, write one equation that matches the
        sentence. Use
        <MathInline math={String.raw`\,\text{m}^2\,`} padded /> for area and
        <MathInline math={String.raw`\,\text{m}\,`} padded /> for length, then
        simplify. Important formulas can be emphasized:
        <MathInline 
          bold 
          math={String.raw`\text{Area} = \text{length} \times \text{width}`} 
          padded 
        />.
      </ProseMathBlock>

      <EquationCard
        title="Divide by a fraction"
        subtitle="Flip-and-multiply shows up naturally"
        equations={[
          String.raw`\frac{21}{10} \div \frac{14}{5} = \frac{21}{10} \cdot \frac{5}{14}`,
          String.raw`= \frac{105}{140} = \frac{3}{4}`,
        ]}
        footer={
          <Typography variant="body2">
            So each shift was \(\tfrac{3}
            {4}\) hours (45 minutes).
          </Typography>
        }
      />

      <EquationSteps
        title="Multiplicative comparison"
        subtitle="\(L = \tfrac{4}{5}S\), given \(L = \tfrac{3}{2}\)"
        steps={[
          String.raw`L = \tfrac{4}{5}S`,
          String.raw`S = \tfrac{L}{\tfrac{4}{5}}`,
          String.raw`S = \tfrac{3}{2} \div \tfrac{4}{5} = \tfrac{15}{8}`,
        ]}
      />
    </Stack>
  );
}

/** Cheat Sheet for KaText: https://katex.org/docs/supported.html */

/**
 * \frac{a}{b}        % fractions → a/b
 * x^{2}              % superscript → x²
 * x_{i}              % subscript → xᵢ
 * \sqrt{x}           % square root
 * \sqrt[n]{x}        % nth root
 * \text{kg}          % text inside math (units, labels)
 * \cdot              % multiplication dot
 * \times            % multiplication ×
 * \pm                % plus-minus ±
 * \times            % multiplication ×
 * \div               % division symbol ÷
 * \leq, \geq         % ≤, ≥
 * \approx, \equiv    % ≈, ≡
 *
 * BOLD MATH (for MathInline component):
 * <MathInline bold math="x^2 + y^2" />           % Mathematical symbols bold
 * <MathInline bold math="\text{Area} = l \times w" />  % Text and symbols bold
 *
 * CANCELLATION (for showing fraction simplification):
 * \cancel{6}                     % diagonal line through 6
 * \bcancel{6}                    % opposite diagonal
 * \xcancel{6}                    % X through 6
 * \cancelto{2}{6}                % shows 6 → 2
 * Note: \require{cancel} is automatically removed from display
 *
 * ANCHOR SUPPORT (for navigation generation):
 * <MathBlock anchor id="section-id" title="Section Title" math="..." />
 * <EquationCard anchor id="equation-id" title="Equation Title" equations={[...]} />
 * <EquationSteps anchor id="steps-id" title="Steps Title" steps={[...]} />
 * <ProseMathBlock anchor id="prose-id" title="Prose Title" equation="..." />
 *
 * <MathBlock math={String.raw`\frac{20\,\text{m}^2}{4\,\text{m}} = 5\,\text{m}`} />
 * <MathBlock math={String.raw`\frac{\cancel{6}}{\cancel{9}} = \frac{2}{3}`} />
 */
