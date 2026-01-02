// Shared logic for DOM manipulation and UI
// This will be imported by both Chrome and Firefox extension scripts

export function setPlaybackRate(rate) {
    // Try to find a video element on the page
    const video = document.querySelector('video');
    if (video) {
        console.warn(`DEV-TOOL: Found video. Setting to ${rate}`);
        video.playbackRate = rate;
    } else {
        console.warn('DEV-TOOL: No video element found on the page.');
    }
}

export function createPanel(buttons) {
    // Create a floating panel
    const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '20px';
    panel.style.right = '20px';
    panel.style.background = 'white';
    panel.style.border = '1px solid #ccc';
    panel.style.zIndex = 99999;
    panel.style.padding = '10px';
    panel.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    panel.style.borderRadius = '8px';
    panel.style.display = 'flex';
    panel.style.flexDirection = 'column';
    panel.style.gap = '8px';

    buttons.forEach(({ label, onClick }) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.onclick = onClick;
        btn.style.margin = '2px 0';
        panel.appendChild(btn);
    });

    document.body.appendChild(panel);
    return panel;
}
