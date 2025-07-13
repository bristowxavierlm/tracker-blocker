document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage('getBlockedCount', (response) => {
      document.getElementById('count').innerText = response.count || 0;
    });
  
    document.getElementById('reset').addEventListener('click', () => {
      chrome.runtime.sendMessage('resetCount');
      document.getElementById('count').innerText = 0;
    });
  });
  