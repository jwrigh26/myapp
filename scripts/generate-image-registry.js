import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function scanImageAssets() {
  const assetsPath = path.join(__dirname, '../src/assets/blog');
  const registry = {};

  // Check if blog assets directory exists
  if (!fs.existsSync(assetsPath)) {
    console.log('Blog assets directory not found, creating empty registry');
    return registry;
  }

  try {
    // Walk through blog/YYYY/MM folders
    const years = fs
      .readdirSync(assetsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    years.forEach((year) => {
      const yearPath = path.join(assetsPath, year);

      try {
        const months = fs
          .readdirSync(yearPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);

        months.forEach((month) => {
          const monthPath = path.join(yearPath, month);

          try {
            const files = fs
              .readdirSync(monthPath)
              .filter((file) => file.match(/\.(webp|jpg|jpeg|png)$/i));

            // Group files by base name (everything before -large/-medium/-small)
            const imageGroups = {};

            files.forEach((file) => {
              const match = file.match(
                /^(.+?)-(large|medium|small)\.(webp|jpg|jpeg|png)$/i
              );
              if (match) {
                const [, baseName, size, ext] = match;
                if (!imageGroups[baseName]) imageGroups[baseName] = {};
                imageGroups[baseName][size.toLowerCase()] =
                  `@/assets/blog/${year}/${month}/${file}`;
              }
            });

            // Add to registry
            Object.entries(imageGroups).forEach(([baseName, sizes]) => {
              // Only include if we have at least large and medium sizes
              if (sizes.large && sizes.medium) {
                registry[baseName] = sizes;
              }
            });
          } catch (err) {
            console.warn(
              `Could not read month directory ${monthPath}:`,
              err.message
            );
          }
        });
      } catch (err) {
        console.warn(`Could not read year directory ${yearPath}:`, err.message);
      }
    });
  } catch (err) {
    console.warn(`Could not read assets directory ${assetsPath}:`, err.message);
  }

  return registry;
}

function generateRegistry() {
  console.log('🖼️  Generating image registry...');

  // Delete existing registry if it exists
  const outputPath = path.join(__dirname, '../src/utils/imageRegistry.ts');
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
    console.log('🗑️  Removed existing registry file');
  }

  const registry = scanImageAssets();
  const registryKeys = Object.keys(registry);

  console.log(`Found ${registryKeys.length} image sets:`);
  registryKeys.forEach((key) => {
    const sizes = Object.keys(registry[key]).join(', ');
    console.log(`  - ${key} (${sizes})`);
  });

  // Generate the TypeScript file content
  const output = `// Auto-generated image registry - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Images found: ${registryKeys.length}

${registryKeys
  .map((key) => {
    const sizes = registry[key];
    const varName = 'img_' + key.replace(/[-]/g, '_');
    return `import ${varName}_large from '${sizes.large}';
import ${varName}_medium from '${sizes.medium}';
import ${varName}_small from '${sizes.small}';`;
  })
  .join('\n')}

export const imageRegistry = {
${registryKeys
  .map((key) => {
    const varName = 'img_' + key.replace(/[-]/g, '_');
    return `  "${key}": {
    "large": ${varName}_large,
    "medium": ${varName}_medium,
    "small": ${varName}_small
  }`;
  })
  .join(',\n')}
} as const;

export type ImageKey = keyof typeof imageRegistry;

export type ImageSizes = {
  large?: string;
  medium?: string;
  small?: string;
};
`;

  // Write the registry file
  fs.writeFileSync(outputPath, output);

  console.log(`✅ Image registry generated at: ${outputPath}`);

  return registry;
}

// Run the generator
generateRegistry();
