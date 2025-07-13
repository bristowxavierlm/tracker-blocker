document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(["whitelist", "blacklist"], (items) => {
    document.getElementById('whitelist').value = (items.whitelist || []).join("\n");
    document.getElementById('blacklist').value = (items.blacklist || []).join("\n");
  });

  document.getElementById('save').addEventListener('click', () => {
    const whitelist = document.getElementById('whitelist').value.split('\n').map(s => s.trim()).filter(Boolean);
    const blacklist = document.getElementById('blacklist').value.split('\n').map(s => s.trim()).filter(Boolean);
    chrome.storage.sync.set({ whitelist, blacklist }, () => {
      alert('? Saved!');
    });
  });
});
