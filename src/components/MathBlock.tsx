import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// KaTeX renderer (fast, great for app UIs)
import 'katex/dist/katex.min.css';
import { InlineMath as KaTeXInline, BlockMath as KaTeXBlock } from 'react-katex';

// ---------------------------------------------
// Public API
// ---------------------------------------------
export interface MathInlineProps {
  /** LaTeX string. Use \\frac{a}{b}, \\text{kg}, etc. */
  math: string;
  /** Color token or any CSS color (defaults to `inherit`). */
  color?: string;
  /** MUI Typography variant for surrounding text context. */
  variant?: 'body1' | 'body2' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2';
  /** Add left/right padding so the inline math breathes in prose. */
  padded?: boolean;
}

export function MathInline({ math, color, variant = 'body1', padded = false }: MathInlineProps) {
  return (
    <Typography component="span" variant={variant} color={color} sx={{ px: padded ? 0.5 : 0 }}>
      {/* KaTeX renders only the math span; Typography keeps font sizing consistent with prose */}
      <KaTeXInline math={math} />
    </Typography>
  );
}

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
  dense?: boolean; // tighter padding
}

export function MathBlock({
  math,
  caption,
  align = 'center',
  color,
  backgroundColor,
  dense = false,
}: MathBlockProps) {
  return (
    <BlockRoot align={align} dense={dense} backgroundColor={backgroundColor}>
      <Typography component="div" color={color} sx={{ textAlign: align }}>
        <KaTeXBlock math={math} />
      </Typography>
      {caption && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: align, mt: 0.5 }}>
          {caption}
        </Typography>
      )}
    </BlockRoot>
  );
}

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
}

export function EquationSteps({ steps, title, subtitle, alignEquals = true, outlined = true }: EquationStepsProps) {
  const joined = steps
    .map((line) => (alignEquals ? toAlignedLine(line) : line))
    .join(' \\ ');

  const math = String.raw`\begin{aligned} ${joined} \end{aligned}`;

  return (
    <Card variant={outlined ? 'outlined' : undefined} sx={{ overflowX: 'auto' }}>
      {(title || subtitle) && (
        <CardHeader
          title={title}
          subheader={subtitle}
          sx={{ '& .MuiCardHeader-title': { fontWeight: 600 } }}
        />
      )}
      {(title || subtitle) && <Divider />}
      <CardContent>
        <KaTeXBlock math={math} />
      </CardContent>
    </Card>
  );
}

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
  footer?: React.ReactNode; // e.g., explanation text
}

export function EquationCard({ title, subtitle, equations, footer }: EquationCardProps) {
  return (
    <Card variant="outlined" sx={{ overflowX: 'auto' }}>
      {(title || subtitle) && (
        <CardHeader title={title} subheader={subtitle} sx={{ '& .MuiCardHeader-title': { fontWeight: 600 } }} />
      )}
      {(title || subtitle) && <Divider />}
      <CardContent>
        <Stack spacing={2}>
          {equations.map((eq, i) => (
            <Typography component="div" key={i}>
              <KaTeXBlock math={eq} />
            </Typography>
          ))}
          {footer}
        </Stack>
      </CardContent>
    </Card>
  );
}

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
}

export function ProseMathBlock({ title, subtitle, children, equation, caption }: ProseMathBlockProps) {
  return (
    <Box>
      {title && (
        <Typography variant="h4" component="h2" color="primary.main" gutterBottom>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
      {children && (
        <Typography variant="body1" component="div" color="text.primary" sx={{ mb: equation ? 1 : 0 }}>
          {children}
        </Typography>
      )}
      {equation && <MathBlock math={equation} caption={caption} />}
    </Box>
  );
}

// ---------------------------------------------
// Styled Components (kept below, per your preference)
// ---------------------------------------------
interface BlockRootProps {
  align: 'center' | 'left';
  dense: boolean;
  backgroundColor?: string;
}

const BlockRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'align' && prop !== 'dense' && prop !== 'backgroundColor',
})<BlockRootProps>(({ theme, align, dense, backgroundColor }) => {
  const defaultBg = backgroundColor ??
    (theme.palette.mode === 'dark' ? theme.palette.action.hover : theme.palette.action.selected);
  return {
    display: 'block',
    textAlign: align,
    padding: theme.spacing(dense ? 1 : 2, dense ? 1 : 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: defaultBg,
    border: `1px solid ${theme.palette.divider}`,
    overflowX: 'auto',
    '& .katex-display': {
      margin: 0, // KaTeX adds margin; we manage spacing via Box
    },
  };
});

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
        When reading story problems, write one equation that matches the sentence. Use
        <MathInline math={String.raw`\,\text{m}^2\,`} padded /> for area and
        <MathInline math={String.raw`\,\text{m}\,`} padded /> for length, then simplify.
      </ProseMathBlock>

      <EquationCard
        title="Divide by a fraction"
        subtitle="Flip-and-multiply shows up naturally"
        equations={[
          String.raw`\frac{21}{10} \div \frac{14}{5} = \frac{21}{10} \cdot \frac{5}{14}`,
          String.raw`= \frac{105}{140} = \frac{3}{4}`,
        ]}
        footer={<Typography variant="body2">So each shift was \(\tfrac{3}{4}\) hours (45 minutes).</Typography>}
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
 * \div               % division symbol ÷
 * \leq, \geq         % ≤, ≥
 * \approx, \equiv    % ≈, ≡
 * 
 * <MathBlock math={String.raw`\frac{20\,\text{m}^2}{4\,\text{m}} = 5\,\text{m}`} />
 */
