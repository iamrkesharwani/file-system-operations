const fs = require('fs').promises;
const path = require('path');

const LOG_FILE_PATH = path.resolve(__dirname, 'app.log');
const BACKUP_FOLDER = path.resolve(__dirname, 'archived_logs');
const MAX_SIZE = 5 * 1024;

const addLog = async (message) => {
  const timeStamp = new Date().toISOString();
  const entry = `[${timeStamp}] ${message}\n`;

  try {
    // Check current size
    let stats;
    try {
      stats = await fs.stat(LOG_FILE_PATH);
    } catch (e) {
      stats = { size: 0 };
    }
    // Rotate if file is too big
    if (stats.size > MAX_SIZE) {
      console.log('Log rotation triggered...');

      await fs.mkdir(BACKUP_FOLDER, { recursive: true });
      const backupName = `app_${Date.now()}.log.old`;
      const backupPath = path.join(BACKUP_FOLDER, backupName);

      await fs.rename(LOG_FILE_PATH, backupPath);
      console.log(`Log archived to: archived_logs/${backupName}`);
    }

    // Append the new entry
    await fs.appendFile(LOG_FILE_PATH, entry);
    console.log('Log written.');
  } catch (error) {
    console.error('Logging failed:', error.message);
  }
};

async function runTest() {
  for (let i = 0; i < 250; i++) {
    await addLog('This is test log entry number ' + i);
  }
}

runTest();
