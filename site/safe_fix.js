const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const sitemap = 'sitemap.xml';

// Replace in sitemap
if (fs.existsSync(sitemap)) {
  let content = fs.readFileSync(sitemap, 'utf8');
  content = content.replace(/https:\/\/axion\.com\.br/g, 'https://agent-ia.tech');
  fs.writeFileSync(sitemap, content, 'utf8');
}

const replacements = {
  'â€”': '—',
  'Ã©': 'é',
  'Ã£': 'ã',
  'Ã§': 'ç',
  'Ã ': 'à',
  'Ã¡': 'á',
  'Ãª': 'ê',
  'Ã³': 'ó',
  'Ãµ': 'õ',
  'Ãº': 'ú',
  'Ã­': 'í',
  'Ã¢': 'â',
  'Ã§Ã£o': 'ção',
  'Ãµes': 'ões',
  'Ã©s': 'és',
  'https://axion.tec.br': 'https://agent-ia.tech',
  'axion.tec.br': 'agent-ia.tech'
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Safe string replacements
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }

  // Ensure charset is first
  if (content.includes('<meta charset="UTF-8">')) {
     content = content.replace(/<meta charset="UTF-8">\n?\s*/g, '');
  }
  content = content.replace('<head>', '<head>\n  <meta charset="UTF-8">');

  // Video preloads
  content = content.replace(/<video(.*?)autoplay loop muted playsinline>/g, '<video$1autoplay loop muted playsinline preload="metadata">');

  // accessibility
  content = content.replace('alt="Logo AXION"', 'alt="Logo AXION - Agentes de IA e Automação no Rio de Janeiro"');
  content = content.replace('<button id="menu-btn" class="', '<button id="menu-btn" aria-label="Abrir Menu" class="');
  content = content.replace('<button id="close-menu-btn" class="', '<button id="close-menu-btn" aria-label="Fechar Menu" class="');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixes em ${file}`);
}
