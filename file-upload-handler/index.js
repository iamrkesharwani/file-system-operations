const fs = require('fs').promises;
const path = require('path');

async function saveFileAndGetMetadata() {
  // Target folder path
  const folderPath = path.join(__dirname, 'my_uploads');
  const fileContent = 'Final test content for metadata.';

  try {
    // Create folder if it doesn't exist
    await fs.mkdir(folderPath, { recursive: true });

    // Generate unique file name
    const timeStamp = Date.now();
    const fileName = `${timeStamp}_report.txt`;
    const fullPath = path.join(folderPath, fileName);

    // Write file
    await fs.writeFile(fullPath, fileContent);

    // Get file stats
    const stats = await fs.stat(fullPath);

    // Prepare metadata
    const fileMetadata = {
      name: fileName,
      path: fullPath,
      size: stats.size + ' bytes',
      extension: path.extname(fileName),
      createdAt: stats.birthtime,
    };

    // Output result
    console.log('File processing complete.');
    console.log('--- Metadata ---');
    console.log('File Name: ' + fileMetadata.name);
    console.log('File Path: ' + fileMetadata.path);
    console.log('File Size: ' + fileMetadata.size);
    console.log('Extension: ' + fileMetadata.extension);
    console.log('Created At: ' + fileMetadata.createdAt);
  } catch (error) {
    // Error handling
    console.log('Error code: ' + error.code);
    console.log('Error message: ' + error.message);
  }
}

saveFileAndGetMetadata();
