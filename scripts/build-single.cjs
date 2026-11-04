const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, 'dist', name), 'utf8');
const html = read('index.html').replace('<link rel="stylesheet" href="style.css">', '<style>' + read('style.css') + '</style>').replace('<script src="game.js"></script>', '<script>' + read('game.js') + '</script>');
fs.writeFileSync(path.join(root, 'Alex-Team-Racing.html'), html);
console.log('Alex-Team-Racing.html erstellt.');
