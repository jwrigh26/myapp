import fs from 'fs';

const content = fs.readFileSync('/Users/maneki-neko/myapp/src/routes/learn/math/dividing-fractions/index.tsx', 'utf-8');

// Test the exact patterns
const patterns = {
  proseBlockAnchorSubtitle: /<ProseBlock(?!(?:[^>]|\n)*?\btitle\s*=)(?:[^>]|\n)*?\banchor\b(?:[^>]|\n)*?\bsubtitle="([^"]+)"(?:[^>]|\n)*?\bid="([^"]+)"(?:[^>]|\n)*?>/g,
  proseBlockSubtitleAnchor: /<ProseBlock(?!(?:[^>]|\n)*?\btitle\s*=)(?:[^>]|\n)*?\bsubtitle="([^"]+)"(?:[^>]|\n)*?\banchor\b(?:[^>]|\n)*?\bid="([^"]+)"(?:[^>]|\n)*?>/g,
};

console.log('Testing proseBlockAnchorSubtitle...');
let match;
let count = 0;
while ((match = patterns.proseBlockAnchorSubtitle.exec(content)) !== null) {
  count++;
  console.log(`Match ${count}:`, match[0].substring(0, 100) + '...');
  console.log(`  Subtitle: "${match[1]}"`);
  console.log(`  ID: "${match[2]}"`);
}
console.log(`Total matches: ${count}`);

console.log('\nTesting proseBlockSubtitleAnchor...');
count = 0;
while ((match = patterns.proseBlockSubtitleAnchor.exec(content)) !== null) {
  count++;
  console.log(`Match ${count}:`, match[0].substring(0, 100) + '...');
  console.log(`  Subtitle: "${match[1]}"`);
  console.log(`  ID: "${match[2]}"`);
}
console.log(`Total matches: ${count}`);

// Let's also check a simpler pattern
console.log('\nTesting simple anchor+id+subtitle pattern...');
const simplePattern = /<ProseBlock[^>]*anchor[^>]*id="([^"]+)"[^>]*subtitle="([^"]+)"/g;
count = 0;
while ((match = simplePattern.exec(content)) !== null) {
  count++;
  console.log(`Match ${count}:`, match[0]);
  console.log(`  ID: "${match[1]}"`);
  console.log(`  Subtitle: "${match[2]}"`);
}
console.log(`Total matches: ${count}`);

// Debug: Let's find all ProseBlocks with anchor
console.log('\nFinding all ProseBlocks with anchor...');
const anchorPattern = /<ProseBlock[^>]*anchor[^>]*>/g;
count = 0;
while ((match = anchorPattern.exec(content)) !== null) {
  count++;
  console.log(`Anchor ProseBlock ${count}:`, match[0]);
}
console.log(`Total anchor ProseBlocks: ${count}`);

// Test the new pattern
console.log('\nTesting new allAnchorSubtitlePattern (multiline)...');
const allAnchorSubtitlePattern = /<ProseBlock[\s\S]*?anchor[\s\S]*?id="([^"]+)"[\s\S]*?subtitle="([^"]+)"[\s\S]*?>/g;
count = 0;
while ((match = allAnchorSubtitlePattern.exec(content)) !== null) {
  count++;
  console.log(`Match ${count}:`, match[0].substring(0, 150) + '...');
  console.log(`  ID: "${match[1]}"`);
  console.log(`  Subtitle: "${match[2]}"`);
  
  // Check if this ProseBlock also has a title
  const hasTitle = match[0].includes('title="');
  console.log(`  Has title: ${hasTitle}`);
}
console.log(`Total matches: ${count}`);
