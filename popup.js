document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage('getBlockedCount', (response) => {
    if (chrome.runtime.lastError) {
      console.warn('Runtime error:', chrome.runtime.lastError.message);
      document.getElementById('count').innerText = 0;
    } else {
      document.getElementById('count').innerText = response && response.count || 0;
    }
  });
});

document.getElementById('reset').addEventListener('click', () => {
  chrome.runtime.sendMessage('resetCount');
  document.getElementById('count').innerText = 0;
});
