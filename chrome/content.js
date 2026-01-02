
// Shared logic for DOM manipulation and UI
function setPlaybackRate(rate) {
    // Try to find a video element on the page
    video = document.querySelector('video');
    if (video === null) {
        //try again, a different way.
        video = document.getElementsByTagName('video')[0];
    }
    if (video) {
        console.log('[DevTools Extension] Setting playback rate to ', rate);
        video.playbackRate = rate;
    }else{
        console.log('[DevTools Extension] No video element found on the page.');
    }
}

function createPanel(buttons) {
    // Create a floating panel
    const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '20px';
    panel.style.right = '20px';
    panel.style.background = 'white';
    panel.style.border = '2px solid #888';
    panel.style.zIndex = 99999;
    panel.style.padding = '18px';
    panel.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
    panel.style.borderRadius = '12px';
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    panel.style.gap = '14px';

    // Add header in one row
    const header = document.createElement('div');
    header.textContent = 'YouTube Speed Panel';
    header.style.fontWeight = 'bold';
    header.style.fontSize = '1.3em';
    header.style.textAlign = 'center';
    header.style.marginBottom = '10px';
    header.style.whiteSpace = 'nowrap';
    panel.appendChild(header);

    buttons.forEach(function(btnDef) {
        const btn = document.createElement('button');
        btn.textContent = btnDef.label;
        btn.onclick = btnDef.onClick;
        btn.style.margin = '4px 0';
        btn.style.fontSize = '1.2em';
        btn.style.padding = '8px 18px';
        btn.style.borderRadius = '6px';
        btn.style.border = '1px solid #888';
        btn.style.background = '#f8f8f8';
        btn.style.cursor = 'pointer';
        panel.appendChild(btn);
    });

    document.body.appendChild(panel);
    return panel;
}


console.log('[DevTools Extension] YouTube detected, setting up panel...');
function setupPanelAndKeybinds() {
    console.log('[DevTools Extension] DOMContentLoaded event fired. Creating panel.');
    createPanel([
        { label: '1x', onClick: () => { console.log('[DevTools Extension] 1x clicked'); setPlaybackRate(1); } },
        { label: '2x', onClick: () => { console.log('[DevTools Extension] 2x clicked'); setPlaybackRate(2); } },
        { label: '3x', onClick: () => { console.log('[DevTools Extension] 3x clicked'); setPlaybackRate(3); } },
        { label: '4x', onClick: () => { console.log('[DevTools Extension] 4x clicked'); setPlaybackRate(4); } }
    ]);

    // Add Shift+1 to Shift+4 keybinds for speed control
    console.log('[DevTools Extension] Attempting to set up keybinds');
    window.addEventListener('keydown', function(e) {
        if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
            switch (e.key) {
                case '!': // Shift+1
                    setPlaybackRate(1);
                    console.log('[DevTools Extension] Shift+1 pressed: 1x speed');
                    break;
                case '@': // Shift+2
                    setPlaybackRate(2);
                    console.log('[DevTools Extension] Shift+2 pressed: 2x speed');
                    break;
                case '#': // Shift+3
                    setPlaybackRate(3);
                    console.log('[DevTools Extension] Shift+3 pressed: 3x speed');
                    break;
                case '$': // Shift+4
                    setPlaybackRate(4);
                    console.log('[DevTools Extension] Shift+4 pressed: 4x speed');
                    break;
            }
        }
    });
    console.log('[DevTools Extension] Content Loaded Handler done');
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', setupPanelAndKeybinds);
} else {
    setupPanelAndKeybinds();
}
// Only run on YouTube
// if (window.location.hostname.includes('youtube.com')) {
// } else {
//     console.log('[DevTools Extension] Not a YouTube page:', window.location.hostname);
// }

// Listen for messages from the popup to set playback speed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[DevTools Extension] Received message:', message);
    if (message.action === 'setSpeed') {
        console.log('[DevTools Extension] Setting playback rate from popup:', message.rate);
        setPlaybackRate(message.rate);
    }
});
