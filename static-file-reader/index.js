const fs = require('fs').promises;
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.txt': 'text/plain',
  '.json': 'application/json',
};

const fileName = process.argv[2];

async function startReader() {
  if (!fileName) {
    console.log('Error: Provide a file name to continue');
    return;
  }

  const filePath = path.resolve(__dirname, fileName);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  console.log('MIME Type:', contentType);
}

startReader();
