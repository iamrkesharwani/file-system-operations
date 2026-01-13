const fs = require('fs').promises;
const path = require('path');

async function saveUniqueFile() {
  const folderPath = path.join(__dirname, 'my_uploads');
  const fileContent = 'This is a sample text';

  try {
    await fs.mkdir(folderPath, { recursive: true });

    const timeStamp = Date.now();
    const fileName = `${timeStamp}_user_upload.txt`;

    const fullPath = path.join(folderPath, fileName);
    await fs.writeFile(fullPath, fileContent);

    console.log('File saved successfully');
    console.log('Saved at: ' + fullPath);
  } catch (error) {
    console.log('Error code: ' + error.code);
    console.log('Error message: ' + error.message);
  }
}

saveUniqueFile();
