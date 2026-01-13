const fs = require('fs').promises;
const path = require('path');

async function saveFileAndGetMetadata() {
  const folderPath = path.join(__dirname, 'my_uploads');
  const fileContent = 'Final test content for metadata.';

  try {
    await fs.mkdir(folderPath, { recursive: true });

    const timeStamp = Date.now();
    const fileName = `${timeStamp}_report.txt`;
    const fullPath = path.join(folderPath, fileName);

    await fs.writeFile(fullPath, fileContent);

    const stats = await fs.stat(fullPath);

    const fileMetadata = {
      name: fileName,
      path: fullPath,
      size: stats.size + ' bytes',
      extension: path.extname(fileName),
      createdAt: stats.birthtime,
    };

    console.log('File processing complete.');
    console.log('--- Metadata ---');
    console.log('File Name: ' + fileMetadata.name);
    console.log('File Path: ' + fileMetadata.path);
    console.log('File Size: ' + fileMetadata.size);
    console.log('Extension: ' + fileMetadata.extension);
    console.log('Created At: ' + fileMetadata.createdAt);
  } catch (error) {
    console.log('Error code: ' + error.code);
    console.log('Error message: ' + error.message);
  }
}

saveFileAndGetMetadata();
