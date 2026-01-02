// This script runs in the popup and sets playback speed on the active tab's first video element

function setSpeed(rate) {
    // Send a message to the content script to set playback rate
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log('[Dev Tools][Popup] Sending setSpeed message:', rate);
        chrome.tabs.sendMessage(tabs[0].id, {action: 'setSpeed', rate: rate});
    });
}

document.getElementById('btn1x').onclick = function() { setSpeed(1); };
document.getElementById('btn2x').onclick = function() { setSpeed(2); };
document.getElementById('btn3x').onclick = function() { setSpeed(3); };
document.getElementById('btn4x').onclick = function() { setSpeed(4); };
