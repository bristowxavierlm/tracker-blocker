importScripts('trackers.js');

async function getUserLists() {
  return new Promise(resolve => {
    chrome.storage.sync.get(["whitelist", "blacklist"], (items) => {
      resolve(items);
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  initializeRules();
  chrome.action.setBadgeText({ text: "ON" }); // show "ON" badge
  chrome.action.setBadgeBackgroundColor({ color: "#4caf50" });
});

chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === 'sync' && (changes.whitelist || changes.blacklist)) {
    initializeRules();
  }
});

async function initializeRules() {
  const { whitelist = [], blacklist = [] } = await getUserLists();
  const rules = buildRules(defaultTrackingDomains, blacklist, whitelist);
  
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules
  });
}

function buildRules(defaultTrackers, blacklist, whitelist) {
  const allTrackers = [...new Set([...defaultTrackers, ...blacklist])];

  return allTrackers.map((domain, index) => {
    return {
      id: index + 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: domain,
        resourceTypes: ["script", "xmlhttprequest", "sub_frame"]
      }
    };
  });
}

// We no longer keep blockedCount manually;
// the popup will call getMatchedRules to get real blocked number
