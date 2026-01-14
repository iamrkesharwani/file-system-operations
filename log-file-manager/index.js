const fs = require('fs').promises;
const path = require('path');

const LOG_FILE_PATH = path.resolve(__dirname, 'app.log');

async function addLog(message) {
  const timeStamp = new Date().toISOString();

  const logEntry = `[${timeStamp}] ${message}\n`;

  try {
    await fs.appendFile(LOG_FILE_PATH, logEntry);
    console.log('Log added successfully.');
  } catch (error) {
    console.error('Failed to write log:', error.message);
  }
}

// addLog('Server started on port 3000');
// addLog('Database connection established');

async function checkSizeOnly() {
  try {
    const stats = await fs.stat(LOG_FILE_PATH);
    console.log('File size is: ' + stats.size + ' bytes');
    if (stats.size > 1000) {
      console.log('Currently full');
    } else {
      console.log("We've got space!");
    }
  } catch (error) {
    console.log("File doesn't exist");
  }
}

// checkSizeOnly()

