const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const LOG_DIR = path.join(__dirname, 'logs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/files', (req, res) => {
  fs.readdir(LOG_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot read log directory' });
    const logFiles = files.filter(f => f.endsWith('.log'));
    res.json({ files: logFiles });
  });
});

app.get('/api/logs', (req, res) => {
  const filename = req.query.file;
  if (!filename) return res.status(400).json({ error: 'Missing log file name' });

  const filePath = path.join(LOG_DIR, filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Log file not found' });

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading file' });

    let lines = data.split('\n').filter(Boolean);
    res.json({ logs: lines });
  });
});

const PORT = process.env.LOGVIEWER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Log viewer running at http://localhost:${PORT}`);
});
