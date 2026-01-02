
# Copilot Dev Browser Extension Project
This was created with copilot and LLMs

This project provides browser extensions for Chrome and Firefox to help users address common annoyances on websites. The extensions share code via the `shared/` directory and have separate implementations for each browser in the `chrome/` and `firefox/` folders.

## Features
- Tools to improve website usability and reduce common annoyances
- Cross-browser support: Chrome and Firefox
- Shared logic for easy maintenance and feature parity

---


## Folder Structure
- `chrome/` — Chrome extension files
- `firefox/` — Firefox extension files
- `shared/` — Shared code between extensions

---


## Getting Started

### Chrome Extension (Developer Mode)
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the `chrome/` folder from this project
5. The extension will appear in your extensions list

### Firefox Extension (Developer Mode)
1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select the `manifest.json` file inside the `firefox/` folder
4. The extension will be loaded temporarily for development

---


## Customization
- Add more tools or logic in `shared/` and update the content scripts as needed for each browser.

---

---


