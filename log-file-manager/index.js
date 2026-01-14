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

addLog('Server started on port 3000');
addLog('Database connection established');
