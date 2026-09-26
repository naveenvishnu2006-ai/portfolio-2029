const fs = require('fs');

function audit() {
  let issues = [];
  
  if (!fs.existsSync('index.html')) {
    issues.push('index.html missing');
    return issues;
  }
  
  const html = fs.readFileSync('index.html', 'utf8');
  
  // 1. Check for placeholder links
  if (html.includes('href="#"') || html.includes('href=""')) {
    issues.push('Found placeholder href="#" or href="" (Note: Some might be smooth scroll anchors)');
  }
  
  // 2. Check for missing images
  if (html.includes('src=""') || html.includes('src="#"')) {
    issues.push('Found empty src attribute');
  }

  // 3. Check for 2024
  if (html.includes('2024')) {
    issues.push('Found "2024" in the HTML. Might want to review.');
  }

  // 4. Check for console.logs in main.js
  if (fs.existsSync('main.js')) {
    const js = fs.readFileSync('main.js', 'utf8');
    if (js.includes('console.log')) {
      issues.push('Found console.log in main.js');
    }
  }
  
  // 5. Check if project can be built
  if (!fs.existsSync('package.json')) {
    issues.push('package.json missing - cannot build');
  }

  return issues;
}

const results = audit();
console.log('--- Audit Results ---');
if (results.length === 0) {
  console.log('No major issues found!');
} else {
  results.forEach(i => console.log('- ' + i));
}
