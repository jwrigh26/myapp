# Image File Naming Conventions

This document provides guidelines and examples for naming image files using the standardized format:

```
[YYYYMMDD]-[category]-[slug]-large.webp
```

**Note:** As of November 2025, we use a single `large` variant for all devices. This simplifies asset management while providing high-quality images for modern high-DPI displays and fast internet connections.

---

## 1. Format Overview

- **Date** (`YYYYMMDD`): The date the image was created or published, in year-month-day order.
- **Category** (`category`): A short, descriptive keyword grouping similar images (e.g., `recipes`, `gardening`, `blog-hero`).
- **Slug** (`slug`): A concise, human-readable description of the image content, words separated by hyphens.
- **Size** (`size`): An identifier for the image variant or dimension (e.g., `hero`, `thumb`, `small`, `large`).

Example:

```
20250712-gardening-garden-pathway-hero.jpg
```

---

## 2. Component Guidelines

1. **YYYYMMDD**: Always eight digits, zero-padded:

   - `20250712` (for July 12, 2025)

2. **category**:

   - Lowercase letters only.
   - No spaces, use hyphens to separate words if needed (e.g., `blog-posts`).

3. **slug**:

   - Describes the subject of the image.
   - Keep it between 3–7 words.
   - Use hyphens (`-`) to separate words.
   - Avoid special characters or punctuation.

4. **size**:

   - Always use `large` for the single high-quality variant.
   - Legacy references to `small`, `medium`, `hero`, or `thumb` are deprecated.

5. **Extension**:

   - Always use `.jpg` (or adjust per project standard, e.g., `.png`, `.webp`).
   - Lowercase extension.

---

## 3. Best Practices

- **Use hyphens** between all components; never use spaces or underscores.
- **Stick to lowercase** for everything.
- **Keep slugs concise** but descriptive enough for humans and search engines.
- **Organize files** in folders that mirror categories or dates for easy navigation.
- **Versioning**: If you need multiple rounds of edits, append `-v2`, `-v3`, etc., before the extension.

Example with version:

```
20250712-gardening-garden-pathway-hero-v2.jpg
```

---

## 4. Examples

| Filename                                         | Meaning                                    |
| ------------------------------------------------ | ------------------------------------------ |
| `20250712-recipes-apple-pie-top-view-large.webp` | High-quality image for a top-down pie shot |
| `20250712-blog-sunset-over-city-large.webp`      | Blog post hero image of city sunset        |
| `20250712-gardening-rosemary-plants-large.webp`  | High-quality image of rosemary plants      |

---

## 5. Integration with Terminal App

In your batch-renaming terminal application, parse the format string and replace placeholders. Example pseudocode:

```bash
# Example CLI usage:
rename-images \
  --format "[YYYYMMDD]-[category]-[slug]-large.webp" \
  --date 20250712 \
  --category recipes \
  --slug apple-pie-top-view \
  *.webp
```

Ensure your app:

- Validates date format.
- Converts all inputs to lowercase.
- Replaces spaces or invalid characters in slugs with hyphens.

---

## 6. References

- [SEO Best Practices for Image File Names](https://moz.com/learn/seo/image-seo)
- [Accessibility: Using Descriptive Filenames](https://webaim.org/techniques/alttext/#filename)
