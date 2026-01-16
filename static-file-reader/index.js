const fs = require('fs').promises;
const path = require('path');

// Dictionary to map extensions to MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.txt': 'text/plain',
  '.json': 'application/json',
};

async function startFileReader() {
  // 1. Get raw input from terminal
  let urlPath = process.argv[2] || '/';

  // 2. Logic: Handle the root path
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  // 3. Logic: Add .html extension if missing
  if (!path.extname(urlPath)) {
    urlPath += '.html';
  }

  // 4. Logic: Remove leading slash to get the local filename
  const fileName = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
  const filePath = path.resolve(__dirname, fileName);

  // 5. Identify the file type
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    // 6. Safety Check: Does the file exist?
    await fs.access(filePath);

    // 7. Execution: Read the file content
    const content = await fs.readFile(filePath, 'utf-8');

    // 8. Output results
    console.log('--- FILE INFO ---');
    console.log(`Requested: ${urlPath}`);
    console.log(`MIME Type: ${contentType}`);
    console.log('--- CONTENT ---');
    console.log(content);
  } catch (error) {
    // 9. Error Handling for ENOENT and EACCES
    if (error.code === 'ENOENT') {
      console.log(`❌ Error: File not found at ${fileName}`);
    } else if (error.code === 'EACCES') {
      console.log(`❌ Error: Permission denied for ${fileName}`);
    } else {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

startFileReader();
