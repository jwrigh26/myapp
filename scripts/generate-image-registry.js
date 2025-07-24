import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function scanImageAssets() {
  const assetsBaseDir = path.join(__dirname, '../src/assets');
  const registry = {};
  const assetCategories = ['blog', 'home', 'game', 'default'];
  const categoryStats = {};

  // Check if assets directory exists
  if (!fs.existsSync(assetsBaseDir)) {
    console.log('Assets directory not found, creating empty registry');
    return registry;
  }

  assetCategories.forEach((category) => {
    const categoryPath = path.join(assetsBaseDir, category);

    if (!fs.existsSync(categoryPath)) {
      console.log(`📂 ${category} assets directory not found, skipping`);
      categoryStats[category] = 0;
      return;
    }

    const initialCount = Object.keys(registry).length;
    try {
      scanCategoryAssets(categoryPath, category, registry);
      const finalCount = Object.keys(registry).length;
      categoryStats[category] = finalCount - initialCount;
      console.log(
        `📂 ${category}: found ${categoryStats[category]} image sets`
      );
    } catch (err) {
      console.warn(
        `Could not read ${category} assets directory ${categoryPath}:`,
        err.message
      );
      categoryStats[category] = 0;
    }
  });

  // Log summary
  console.log('\n📊 Summary by category:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    if (count > 0) {
      console.log(`  ${category}: ${count} image sets`);
    }
  });

  return registry;
}

function scanCategoryAssets(categoryPath, category, registry) {
  // Check if this is a structured directory (like blog with YYYY/MM) or flat (like home)
  const entries = fs.readdirSync(categoryPath, { withFileTypes: true });

  // Check if we have year directories (4 digit numbers)
  const hasYearStructure = entries.some(
    (entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name)
  );

  if (hasYearStructure) {
    // Handle structured directories (blog/YYYY/MM)
    scanStructuredAssets(categoryPath, category, registry);
  } else {
    // Handle flat directories (home, game, etc.)
    scanFlatAssets(categoryPath, category, registry);
  }
}

function scanStructuredAssets(categoryPath, category, registry) {
  // Walk through category/YYYY/MM folders
  const years = fs
    .readdirSync(categoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  years.forEach((year) => {
    const yearPath = path.join(categoryPath, year);

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

          processImageFiles(
            files,
            `@/assets/${category}/${year}/${month}`,
            registry
          );
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
}

function scanFlatAssets(categoryPath, category, registry) {
  try {
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.match(/\.(webp|jpg|jpeg|png)$/i));

    processImageFiles(files, `@/assets/${category}`, registry);
  } catch (err) {
    console.warn(`Could not read flat directory ${categoryPath}:`, err.message);
  }
}

function processImageFiles(files, basePath, registry) {
  // Group files by base name (everything before -large/-medium/-small)
  const imageGroups = {};

  files.forEach((file) => {
    const match = file.match(
      /^(.+?)-(large|medium|small)\.(webp|jpg|jpeg|png)$/i
    );
    if (match) {
      const [, baseName, size, ext] = match;
      if (!imageGroups[baseName]) imageGroups[baseName] = {};
      imageGroups[baseName][size.toLowerCase()] = `${basePath}/${file}`;
    }
  });

  // Add to registry
  Object.entries(imageGroups).forEach(([baseName, sizes]) => {
    // Only include if we have at least large and medium sizes
    if (sizes.large && sizes.medium) {
      registry[baseName] = sizes;
    }
  });
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

export type ImageAssetCategory = 'blog' | 'home' | 'game' | 'learn' | 'default';
`;

  // Write the registry file
  fs.writeFileSync(outputPath, output);

  console.log(`✅ Image registry generated at: ${outputPath}`);

  return registry;
}

// Run the generator
generateRegistry();
