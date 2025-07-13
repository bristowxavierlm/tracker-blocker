importScripts('trackers.js');

let blockedCount = 0;

async function getUserLists() {
  return new Promise(resolve => {
    chrome.storage.sync.get(["whitelist", "blacklist"], (items) => {
      resolve(items);
    });
  });
}

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url);
    const hostname = url.hostname;

    const { whitelist = [], blacklist = [] } = await getUserLists();

    if (whitelist.includes(hostname)) return;

    const allTrackers = [...defaultTrackingDomains, ...blacklist];
    if (allTrackers.some(domain => hostname.includes(domain))) {
      blockedCount++;
      chrome.action.setBadgeText({ text: blockedCount.toString() });
      return { cancel: true };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === 'getBlockedCount') {
    sendResponse({ count: blockedCount });
  } else if (msg === 'resetCount') {
    blockedCount = 0;
    chrome.action.setBadgeText({ text: "0" });
  }
});
