---

title: "LaTeX Math Cheatsheet (for React + KaTeX)"
description: "Practical LaTeX math you’ll actually use in a blog/app UI. Works great with react-katex and MUI."
---------------------------------------------------------------------------------------------------------------

> **TL;DR** Use KaTeX via `react-katex` for fast, beautiful math in React. This page shows the LaTeX you’ll use 90% of the time, with React-ready snippets.

## Quick Start (React + KaTeX)

```bash
npm i katex react-katex
```

```tsx
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function Demo() {
  return (
    <div>
      <InlineMath math="E = mc^2" />
      <BlockMath math={String.raw`\frac{20\,\text{m}^2}{4\,\text{m}} = 5\,\text{m}`} />
    </div>
  );
}
```

**Tip:** Use `String.raw` for long expressions so you don’t double-escape backslashes.

---

## Essentials

### Fractions, Exponents, Subscripts

```latex
\frac{a}{b}   % a/b
x^{2}          % x squared
x_{i}          % subscript i
x_{i}^{2}      % subscript + superscript
```

### Roots

```latex
\sqrt{x}      % √x
\sqrt[n]{x}   % n-th root of x
```

### Text + Units (inside math)

```latex
\text{kg},\ \text{m},\ \text{area}
```

Use thin spaces around units:

```latex
20\,\text{m}^2 \div 4\,\text{m} = 5\,\text{m}
```

### Operators & Relations

```latex
\cdot \times \div       % · × ÷
\pm \mp                  % ± ∓
\leq \geq \neq           % ≤ ≥ ≠
\approx \equiv           % ≈ ≡
\to \rightarrow \mapsto  % → ↦
```

### Brackets & Sizing

```latex
( a ), [ a ], \{ a \}
\lvert x \rvert,\ \lVert x \rVert
\left( \frac{a}{b} \right)   % auto-sized parens
```

### Greek Letters (common)

```latex
\alpha \beta \gamma \Gamma \pi \Pi \phi \varphi \theta \Theta \mu \sigma
```

---

## Multi‑Line & Alignment

Use **amsmath** environments (supported by KaTeX) to align at `&`.

```latex
\begin{aligned}
A &= \ell \cdot w \\
  &= \frac{20\,\text{m}^2}{4\,\text{m}} \\
  &= 5\,\text{m}
\end{aligned}
```

**React example:**

```tsx
<BlockMath math={String.raw`\begin{aligned}
A &= \ell \cdot w \\
  &= \frac{20\,\text{m}^2}{4\,\text{m}} \\
  &= 5\,\text{m}
\end{aligned}`}
/>
```

---

## Sums, Products, Integrals (display vs inline)

```latex
\sum_{i=1}^{n} i \quad \prod_{k=1}^{m} x_k
\int_{a}^{b} f(x)\,dx \quad \iint \quad \oint
```

> In **inline** math, limits sit to the side; in **block** math they appear above/below.

---

## Matrices & Cases

```latex
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
```

```latex
f(x) = \begin{cases}
  x^2, & x \ge 0 \\
  -x,  & x < 0
\end{cases}
```

---

## Spacing Cheats

```latex
\, \; \: \quad \qquad   % increasing spaces
\!                         % thin negative space
```

---

## Common Patterns for Word Problems

**“of” means multiply**

```latex
\text{Native area} = \tfrac{5}{6} \cdot g
```

**“is r as” (multiplicative comparison)**

```latex
L = r \cdot S \quad \Rightarrow \quad S = \frac{L}{r}
```

**Rectangle area**

```latex
A = \ell \cdot w,\quad \; \frac{A}{\ell} = w
```

**Divide by a fraction (flip‑and‑multiply)**

```latex
\frac{21}{10} \div \frac{14}{5} = \frac{21}{10}\cdot\frac{5}{14}
```

---

## React + MUI Tips

* Wrap KaTeX output in MUI `Typography` to inherit font sizing/colors.
* Prefer a light **panel** background in light mode and a subtle **hover** tint in dark mode.
* Example (from a reusable `MathBlock`):

```tsx
<Typography component="div" sx={{ '& .katex': { color: 'inherit' } }}>
  <BlockMath math={String.raw`\frac{20\,\text{m}^2}{4\,\text{m}} = 5\,\text{m}`} />
</Typography>
```

---

## Escaping in JS/TS Strings

* In normal string literals, write `"\\frac{a}{b}"`.
* Prefer template literals with `String.raw`:

```tsx
const expr = String.raw`\frac{a}{b}`;
<BlockMath math={expr} />
```

---

## Debugging Render Errors

* Check the **KaTeX Supported Functions** list for the command you used.
* Ensure braces `{ ... }` are balanced.
* For alignment, you must include `&` before the alignment point and `\\` for newlines.
* If something renders inline too small, switch to a **block** equation.

---

## Handy References

* **KaTeX Supported Functions:** [https://katex.org/docs/supported.html](https://katex.org/docs/supported.html)
* **Overleaf Math Guide:** [https://www.overleaf.com/learn/latex/Mathematical\_expressions](https://www.overleaf.com/learn/latex/Mathematical_expressions)
* **Detexify (draw a symbol → LaTeX code):** [http://detexify.kirelabs.org/classify.html](http://detexify.kirelabs.org/classify.html)
* **LaTeX Math Symbols PDF:** [https://wch.github.io/latexsheet/latexsheet.pdf](https://wch.github.io/latexsheet/latexsheet.pdf)

---

## Copy‑Ready Snippets

```latex
% Units
\frac{20\,\text{m}^2}{4\,\text{m}} = 5\,\text{m}

% Comparison
L = \tfrac{4}{5}S \quad \Rightarrow \quad S = \tfrac{L}{\tfrac{4}{5}} = \tfrac{3}{2}\cdot\tfrac{5}{4}

% Flip & multiply
\frac{21}{10} \div \frac{14}{5} = \frac{21}{10}\cdot\frac{5}{14} = \frac{3}{4}

% Brackets sizing
\left( \frac{a}{b} \right)
```

> Want this page themed exactly like your blog? Wrap the page body in your `ThemeProvider` and use your MUI `Typography` variants for headings and paragraphs.
