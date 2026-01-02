
let panel = null;
let panelVisible = false;
let refreshPanel = () => {};

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
	panel.style.flexDirection = 'row';
	panel.style.gap = '16px';

	panel.style.alignItems = 'center';

	// Style for bigger buttons
	const buttonStyle = {
		padding: '12px 24px',
		fontSize: '1.1em',
		borderRadius: '6px',
		border: '1px solid #888',
		background: '#f5f5f5',
		cursor: 'pointer',
		fontWeight: 'bold',
	};

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
		btn.onclick = function() {
			onClick();
			refreshPanel();
		};
		Object.assign(btn.style, buttonStyle);

		// Highlight if matches current rate
		const rate = parseFloat(label);
		if (!isNaN(rate) && rate === currentRate) {
			btn.style.background = 'yellow';
		}
		panel.appendChild(btn);
		btns.push(btn);
	});

	// Helper to update button styles after click or keybind
	refreshPanel = function() {
		const video = document.querySelector('video');
		const rate = video ? video.playbackRate : 1;
		btns.forEach((btn) => {
			const btnRate = parseFloat(btn.textContent);
			if (!isNaN(btnRate) && btnRate === rate) {
				btn.style.background = 'yellow';
			} else {
				btn.style.background = buttonStyle.background;
			}
		});
	};

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
	}
});
