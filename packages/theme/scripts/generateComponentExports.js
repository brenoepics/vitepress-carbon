import path from 'node:path';
import * as fs from 'node:fs';

const componentsDir = 'dist/theme/components/';
const outputFile = path.join(componentsDir, 'index.js');
const outputDtsFile = path.join(componentsDir, 'index.d.ts');

fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  const vueFiles = files.filter(file => file.endsWith('.vue'));
  const exports = vueFiles.map(file => {
    const name = path.basename(file, '.vue');
    return `export { default as ${name} } from './${file}';`;
  }).join('\n');

  const typeExports = vueFiles.map(file => {
    const name = path.basename(file, '.vue');
    return `export const ${name}: typeof import('./${file}').default;`;
  }).join('\n');

  fs.writeFile(outputFile, exports, (err) => {
    if (err) {
      console.error('Error writing index.js file:', err);
    } else {
      console.log('index.js file generated successfully.');
    }
  });

  fs.writeFile(outputDtsFile, typeExports, (err) => {
    if (err) {
      console.error('Error writing index.d.ts file:', err);
    } else {
      console.log('index.d.ts file generated successfully.');
    }
  });
});
