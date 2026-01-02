
# Copilot Dev Browser Extension Project
This was created with copilot and LLMs

This project provides a unified browser extension for Chrome and Firefox to help users address common annoyances on websites. All code now lives in the project root for easier maintenance and cross-browser support.

## Features
- Tools to improve website usability and reduce common annoyances
- Cross-browser support: Chrome and Firefox
- Shared logic for easy maintenance and feature parity

---


## Folder Structure
- All extension files are in the project root (e.g. `manifest.json`, `content.js`, `popup.js`, etc.)

---


## Getting Started

### Chrome Extension (Developer Mode)
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the project root folder (where `manifest.json` is)
5. The extension will appear in your extensions list

### Firefox Extension (Developer Mode)
1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select the `manifest.json` file in the project root
4. The extension will be loaded temporarily for development

---


## Customization
- Add more tools or logic in the root directory and update the content scripts as needed for each browser.
## Keyboard Shortcuts
- **Ctrl+Shift+5**: Show/Hide the YouTube Speed Panel on any supported page.
- **Shift+1** to **Shift+4**: Set YouTube playback speed to 1x, 2x, 3x, or 4x.

---

---


