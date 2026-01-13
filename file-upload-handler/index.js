const fs = require('fs').promises;
const path = require('path');

async function initializeProject() {
  const folderPath = path.join(__dirname, 'my_uploads');

  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log('Success: Directory created or already exists');
    console.log('Location: ' + folderPath);
  } catch (error) {
    console.log('Error code: ' + error.code);
    console.log('Error message: ' + error.message);
  }
}

initializeProject();
