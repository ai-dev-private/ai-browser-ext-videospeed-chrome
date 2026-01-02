// This script runs in the popup and sets playback speed on the active tab's first video element

function setSpeed(rate) {
    // Send a message to the content script to set playback rate
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {action: 'setSpeed', rate});
    });
}

document.getElementById('btn2x').onclick = () => setSpeed(2);
document.getElementById('btn3x').onclick = () => setSpeed(3);
document.getElementById('btn4x').onclick = () => setSpeed(4);
