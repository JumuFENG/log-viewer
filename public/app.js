let allLogs = [];
let errorLines = [];
let currentErrorIndex = -1;

async function loadFileList() {
  const res = await fetch('/api/files');
  const data = await res.json();
  const select = document.getElementById('fileSelect');
  select.innerHTML = data.files.map(f => `<option value="${f}">${f}</option>`).join('');
  loadLogs();
}

async function loadLogs() {
  const file = document.getElementById('fileSelect').value;
  if (!file) return;
  const res = await fetch(`/api/logs?file=${file}`);
  const data = await res.json();
  allLogs = data.logs || [];
  applyFilters();
}

  function applyFilters() {
    const q = document.getElementById('search').value.toLowerCase();
    const level = document.getElementById('levelSelect').value.toUpperCase();
    const levelPriority = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const selectedLevelIdx = levelPriority.indexOf(level);
  
    const filtered = allLogs.filter(line => {
      const lowerLine = line.toLowerCase();
      const matchesKeyword = !q || lowerLine.includes(q);
      const matchesLevel = selectedLevelIdx === -1 || levelPriority.some((lvl, idx) =>
        idx >= selectedLevelIdx && new RegExp(`\\b${lvl}\\b`, 'i').test(line)
      );
      return matchesKeyword && matchesLevel;
    });
  
    const logBox = document.getElementById('logBox');
    logBox.innerHTML = '';
    errorLines = [];
    currentErrorIndex = -1;
  
    filtered.forEach((line, i) => {
      const div = document.createElement('div');
      div.textContent = line;
  
      if (/error|exception|traceback/i.test(line)) {
        div.style.backgroundColor = '#ffd6d6';
        errorLines.push({ index: i, element: div });
      }
  
      logBox.appendChild(div);
    });
  
    document.getElementById('errorCount').textContent = errorLines.length;
  }
  
function scrollToError(direction) {
  if (errorLines.length === 0) return;

  if (direction === 'next') {
    currentErrorIndex = (currentErrorIndex + 1) % errorLines.length;
  } else if (direction === 'prev') {
    currentErrorIndex = (currentErrorIndex - 1 + errorLines.length) % errorLines.length;
  }

  const el = errorLines[currentErrorIndex].element;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.style.outline = '2px solid red';
  setTimeout(() => el.style.outline = '', 1000);
}

function shouldAutoRefresh() {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1 ...
  const hour = now.getHours();
  const minute = now.getMinutes();

  const isWeekday = day >= 1 && day <= 5;
  const inMorning = hour >= 9 && (hour < 11 || (hour === 11 && minute <= 30));
  const inAfternoon = hour >= 13 && (hour < 15 || (hour === 15 && minute <= 30));
  return isWeekday && (inMorning || inAfternoon);
}

function setupAutoRefresh() {
  setInterval(() => {
    if (shouldAutoRefresh()) {
      loadLogs();
    }
  }, 60 * 1000);
}

document.getElementById('fileSelect').addEventListener('change', loadLogs);
document.getElementById('levelSelect').addEventListener('change', applyFilters);
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('refreshButton').addEventListener('click', loadLogs);
document.getElementById('nextError').addEventListener('click', () => scrollToError('next'));
document.getElementById('prevError').addEventListener('click', () => scrollToError('prev'));

loadFileList();
setupAutoRefresh();
