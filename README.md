Tracker Blocker Extension 

A minimalist browser extension (Chrome & Firefox) designed to block tracking scripts and display stats, with a clean macOS‑style interface.

![GitHub release](https://img.shields.io/github/v/release/bristowxavierlm/tracker-blocker)
![GitHub issues](https://img.shields.io/github/issues/bristowxavierlm/tracker-blocker)
![License](https://img.shields.io/github/license/bristowxavierlm/tracker-blocker)

Features

- Blocks requests to known tracking domains  
- Tracks number of blocked scripts per session  
- Minimalist popup with badge counter  
- User-managed whitelist/blacklist settings  
- macOS‑like UI: light background, rounded corners, soft shadows

---

Installation (Unpacked)

1. Clone or download this repo.
2. Open Chrome or Firefox.
3. Navigate to Extensions page:
   - **Chrome**: `chrome://extensions/`
   - **Firefox**: `about:debugging#/runtime/this-firefox`
4. Enable **Developer Mode** or turn on debugging.
5. Click **Load unpacked** or **Load Temporary Add‑on**, then select the `tracker-blocker/` folder.
6. The extension icon (shield) should appear in the toolbar.

---

Usage

- Click the extension icon to open the popup.
- See **Blocked scripts today** counter.
- Click **Reset Counter** to clear stats.
- Click **Settings** to manage whitelist/blacklist.

---

UI Design

Styled with macOS-like aesthetics:
- Rounded 12px corners  
- Soft subtle shadows  
- System font stack (`-apple-system, BlinkMacSystemFont...`)  
- Blue accent button states  

---

Configuration

- Whitelist : domains that should _never_ be blocked.
- Blacklist : additional domains to block in addition to the default list.

Settings are synced via `chrome.storage.sync`.

---

Development Details

- Manifest v3 extension using `service_worker` background script.
- Uses `chrome.webRequest` with `blocking` permission to intercept network requests.
- Default tracker list defined in `trackers.js`:
  ```js
  const defaultTrackingDomains = [
    "doubleclick.net",
    "google-analytics.com",
    "facebook.net",
    "adservice.google.com",
    "ads.yahoo.com",
    "bing.com",
    "scorecardresearch.com",
    "quantserve.com"
  ];
