
let panel = null;
let panelVisible = false;
let refreshPanel = () => {};

function createPanel(buttons) {
	const panel = document.createElement('div');
	panel.style.position = 'fixed';
	panel.style.top = '20px';
	panel.style.right = '20px';
	panel.style.background = '#fff';
	panel.style.border = '2px solid #000';
	panel.style.borderRadius = '16px';
	panel.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 0 #fff inset';
	panel.style.zIndex = 99999;
	panel.style.padding = '24px 32px 24px 32px';
	panel.style.display = 'flex';
	panel.style.flexDirection = 'column';
	panel.style.alignItems = 'center';

	// Button row container
	const buttonRow = document.createElement('div');
	buttonRow.style.display = 'flex';
	buttonRow.style.width = '100%';
	buttonRow.style.justifyContent = 'center';
	buttonRow.style.alignItems = 'center';
	buttonRow.style.gap = '24px';
	buttonRow.style.marginBottom = '0';

	// Apple-like button style
	const buttonClass = 'fancy-btn';
	const style = document.createElement('style');
	style.textContent = `
	  .fancy-btn {
		padding: 12px 24px;
		font-size: 1.1em;
		border-radius: 12px;
		border: 1px solid #d1d5db;
		background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
		box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1.5px 0 #fff inset;
		color: #222;
		font-weight: 500;
		transition: background 0.2s, box-shadow 0.2s;
		cursor: pointer;
	  }
	  .fancy-btn:active {
		background: linear-gradient(180deg, #e2e8f0 0%, #f8fafc 100%);
		box-shadow: 0 1px 4px rgba(0,0,0,0.10);
	  }
	  .fancy-btn.selected {
		background: linear-gradient(180deg, #ffe066 0%, #ffd700 100%);
		color: #222;
		box-shadow: 0 2px 12px rgba(255, 215, 0, 0.15);
	  }
	`;
	document.head.appendChild(style);

	// Get current playback rate
	let currentRate = 1;
	const video = document.querySelector('video');
	if (video && typeof video.playbackRate === 'number') {
		currentRate = video.playbackRate;
	}

	const btns = [];
	buttons.forEach(({ label, onClick }) => {
		const btn = document.createElement('button');
		btn.textContent = label;
		btn.className = buttonClass;
		btn.onclick = function() {
			onClick();
			refreshPanel();
		};
		// Highlight if matches current rate
		const rate = parseFloat(label);
		if (!isNaN(rate) && rate === currentRate) {
			btn.classList.add('selected');
		}
		buttonRow.appendChild(btn);
		btns.push(btn);
	});

	// Helper to update button styles after click or keybind
	refreshPanel = function() {
		const video = document.querySelector('video');
		const rate = video ? video.playbackRate : 1;
		btns.forEach((btn) => {
			const btnRate = parseFloat(btn.textContent);
			if (!isNaN(btnRate) && btnRate === Math.round(rate)) {
				btn.classList.add('selected');
			} else {
				btn.classList.remove('selected');
			}
		});
	};

	panel.appendChild(buttonRow);
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
		if (panelVisible && typeof refreshPanel === 'function') {
			refreshPanel();
		}
	}
}

// Listen for Shift+5 keydown
window.addEventListener('keydown', (e) => {
	if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
		let handled = false;
		switch (e.key) {
			case '!': // Shift+1
				setPlaybackRate(1);
				handled = true;
				break;
			case '@': // Shift+2
				setPlaybackRate(2);
				handled = true;
				break;
			case '#': // Shift+3
				setPlaybackRate(3);
				handled = true;
				break;
			case '$': // Shift+4
				setPlaybackRate(4);
				handled = true;
				break;
			case '%': // Shift+5
				e.preventDefault();
				togglePanel();
				handled = true;
				break;
		}
		if (handled && panelVisible && typeof refreshPanel === 'function') {
			refreshPanel();
		}
	}
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === 'togglePanel') {
		togglePanel();
	} else if (msg.action === 'setSpeed' && typeof msg.rate === 'number') {
		setPlaybackRate(msg.rate);
	} else if (msg.action === 'getSpeed') {
		const video = document.querySelector('video');
		sendResponse({ rate: video && typeof video.playbackRate === 'number' ? video.playbackRate : 1 });
	}
});
