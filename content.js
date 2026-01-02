
let panel = null;
let panelVisible = false;

function createPanel(buttons) {
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

function togglePanel() {
	if (panelVisible) {
		if (panel && panel.parentNode) {
			panel.parentNode.removeChild(panel);
		}
		panelVisible = false;
		panel = null;
	} else {
		panel = createPanel([
			{ label: '1x', onClick: () => setPlaybackRate(1) },
			{ label: '2x', onClick: () => setPlaybackRate(2) },
			{ label: '3x', onClick: () => setPlaybackRate(3) },
			{ label: '4x', onClick: () => setPlaybackRate(4) },
		]);
		panelVisible = true;
	}
}

function setPlaybackRate(rate) {
	const video = document.querySelector('video');
	if (video) {
		video.playbackRate = rate;
	}
}

// Listen for Shift+5 keydown
window.addEventListener('keydown', (e) => {
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
			case '%': // Shift+5
				e.preventDefault();
				togglePanel();
				break;
		}
	}
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === 'togglePanel') {
		togglePanel();
	} else if (msg.action === 'setSpeed' && typeof msg.rate === 'number') {
		setPlaybackRate(msg.rate);
	}
});
