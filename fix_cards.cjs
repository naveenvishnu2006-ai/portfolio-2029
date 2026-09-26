const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update the header containers for EDUCATION, FOCUS AREAS, and SKILLS & STACK
html = html.replace(/<div class="flex items-center justify-between pb-space-md border-b border-surface-container-highest mb-space-lg">/g, 
  '<div class="flex flex-wrap items-start justify-between gap-2 pb-space-md border-b border-surface-container-highest mb-space-lg">');

// Add whitespace-nowrap to the specific spans
html = html.replace(/<span class="font-label-sm text-label-sm text-on-surface-variant font-mono">\[ 01 \/ ACAD \]/g, 
  '<span class="font-label-sm text-label-sm text-on-surface-variant font-mono whitespace-nowrap pt-1">[ 01 / ACAD ]');

html = html.replace(/<span class="font-label-sm text-label-sm text-on-surface-variant font-mono text-right">\[ 02 \/ DOMAINS \]/g, 
  '<span class="font-label-sm text-label-sm text-on-surface-variant font-mono text-right whitespace-nowrap pt-1">[ 02 / DOMAINS ]');

html = html.replace(/<span class="font-label-sm text-label-sm text-on-surface-variant font-mono">\[ PROJECTOR \]/g, 
  '<span class="font-label-sm text-label-sm text-on-surface-variant font-mono whitespace-nowrap pt-1">[ PROJECTOR ]');

fs.writeFileSync('index.html', html);
console.log('Fixed flexbox layout issues in cards');
