document.addEventListener('DOMContentLoaded', () => {
  chrome.declarativeNetRequest.getMatchedRules(
    { ruleIds: [] }, // empty to get all matched rules
    (matchedRules) => {
      if (chrome.runtime.lastError) {
        console.warn('Runtime error:', chrome.runtime.lastError.message);
        document.getElementById('count').innerText = 0;
      } else {
        document.getElementById('count').innerText = matchedRules.rules.length;
      }
    }
  );
});

document.getElementById('reset').addEventListener('click', () => {
  chrome.action.setBadgeText({ text: "0" });
  document.getElementById('count').innerText = 0;
});
