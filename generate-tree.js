const fs = require('fs');
const path = require('path');

const ignoreDirs = ['node_modules', '.next', '.git', 'dist', 'build'];
const ignoreFiles = ['.env.local', '.env', 'package-lock.json'];

function generateTree(dir, prefix = '') {
  let output = [];
  
  try {
    const files = fs.readdirSync(dir).filter(file => {
      return !ignoreDirs.includes(file) && !ignoreFiles.includes(file);
    });
    
    files.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const isLast = index === files.length - 1;
      const connector = isLast ? '└──' : '├──';
      const branch = isLast ? '    ' : '│   ';
      
      output.push(`${prefix}${connector} ${file}`);
      
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          const newPrefix = prefix + branch;
          const subTree = generateTree(filePath, newPrefix);
          output = output.concat(subTree);
        }
      } catch (err) {
        // Skip
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
  
  return output;
}

console.log('Generating project structure...');
const tree = ['simon-designs/', ...generateTree('.')];

// Write with UTF-8 encoding
fs.writeFileSync('PROJECT_STRUCTURE.txt', tree.join('\n'), 'utf8');

console.log('✅ Done! Saved to PROJECT_STRUCTURE.txt');
console.log(`📄 Total lines: ${tree.length}`);