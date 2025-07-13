# Image File Naming Conventions

This document provides guidelines and examples for naming image files using the standardized format:

```
[YYYYMMDD]-[category]-[slug]-[size].jpg
```

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

   - Indicates the image variant:

     - `hero` — large, featured image
     - `thumb` — small thumbnail
     - `small`, `medium`, `large` — generic size labels

   - Consistent naming helps batch processing scripts.

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

| Filename                                        | Meaning                                   |
| ----------------------------------------------- | ----------------------------------------- |
| `20250712-recipes-apple-pie-top-view-hero.jpg`  | Hero image for a top-down apple pie shot. |
| `20250712-recipes-apple-pie-top-view-thumb.jpg` | Thumbnail variant of the same image.      |
| `20250712-blog-hero-sunset-over-city-small.jpg` | Small version of a blog post hero image.  |
| `20250712-gardening-rosemary-plants-medium.jpg` | Medium-size image of rosemary plants.     |

---

## 5. Integration with Terminal App

In your batch-renaming terminal application, parse the format string and replace placeholders. Example pseudocode:

```bash
# Example CLI usage:
rename-images \
  --format "[YYYYMMDD]-[category]-[slug]-[size].jpg" \
  --date 20250712 \
  --category recipes \
  --slug apple-pie-top-view \
  --size thumb \
  *.jpg
```

Ensure your app:

- Validates date format.
- Converts all inputs to lowercase.
- Replaces spaces or invalid characters in slugs with hyphens.

---

## 6. References

- [SEO Best Practices for Image File Names](https://moz.com/learn/seo/image-seo)
- [Accessibility: Using Descriptive Filenames](https://webaim.org/techniques/alttext/#filename)
