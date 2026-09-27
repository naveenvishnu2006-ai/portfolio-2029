const fs = require('fs');
let file = fs.readFileSync('src/App.jsx', 'utf8');

const oldTextRegex = /Hi, Iâ€™m <strong className="font-bold underline decoration-2">Naveen Vishnu<\/strong>\. Iâ€™m a Computer Science Engineering student from India, focused on building thoughtful digital experiences at the intersection of software, AI, and visual design\.<br\/>|<br\/>I enjoy transforming ideas into clean, intuitive, and purposeful productsâ€”from interactive interfaces to experimental applications\. Iâ€™m constantly exploring new technologies, refining my craft, and learning how thoughtful engineering and design can turn a simple concept into something meaningful\./g;

// To avoid encoding issues with single quotes and dashes, I'll just replace the inner HTML of that specific p tag.
const startTag = '<p className="font-body-lg text-body-lg text-inverse-on-surface font-normal leading-relaxed mt-space-sm">';
const endTag = '</p>';
const startIndex = file.indexOf(startTag);
if (startIndex !== -1) {
  const contentStart = startIndex + startTag.length;
  const endIndex = file.indexOf(endTag, contentStart);
  
  const newText = `
              Hi! I'm <strong className="font-bold underline decoration-2">Naveen Vishnu</strong>. I’m a Computer Science Engineering student from Tamil Nadu, India, exploring the intersection of software, AI, and design.<br/><br/>I enjoy turning ideas into simple, intuitive digital experiences while continuously learning new technologies and improving my craft.
            `;
  
  file = file.substring(0, contentStart) + newText + file.substring(endIndex);
  fs.writeFileSync('src/App.jsx', file);
  console.log('Replaced about me text');
} else {
  console.log('Could not find start tag');
}
