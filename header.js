// Dark mode toggle functionality

// Create and inject the theme toggle header
function createHeader() {
	const header = document.createElement('header');

	const toggleContainer = document.createElement('div');
	toggleContainer.className = 'toggle-container';

	const toggleButton = document.createElement('button');
	toggleButton.className = 'toggle-button';
	toggleButton.id = 'darkModeToggle';
	toggleButton.onclick = toggleDarkMode;

	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('id', 'toggleIcon');
	svg.setAttribute('viewBox', '0 0 512 512');

	toggleButton.appendChild(svg);
	toggleContainer.appendChild(toggleButton);
	header.appendChild(toggleContainer);

	// Insert header as first child of body
	document.body.insertBefore(header, document.body.firstChild);
}

function setInitialMode() {
	// Theme class is already set by inline script, just update the icon
	setToggleButtonIcon();
}

const SUN_ICON = `<path fill="currentcolor" d="M408.19 256c0-83.92-68.27-152.19-152.19-152.19S103.81 172.08 103.81 256 172.08 408.19 256 408.19 408.19 339.92 408.19 256zM256 376.19c-66.27 0-120.19-53.92-120.19-120.19S189.73 135.81 256 135.81 376.19 189.73 376.19 256 322.27 376.19 256 376.19zM240 43.5v26.52c0 8.84 7.16 16 16 16s16-7.16 16-16V43.5c0-8.84-7.16-16-16-16s-16 7.16-16 16zM417.57 94.43c-6.25-6.25-16.38-6.25-22.63 0l-18.75 18.75c-6.25 6.25-6.25 16.38 0 22.63 3.12 3.12 7.22 4.69 11.31 4.69s8.19-1.56 11.31-4.69l18.75-18.75c6.26-6.25 6.26-16.39.01-22.63zM441.98 272h26.52c8.84 0 16-7.16 16-16s-7.16-16-16-16h-26.52c-8.84 0-16 7.16-16 16s7.16 16 16 16zM394.95 417.57c3.12 3.12 7.22 4.69 11.31 4.69s8.19-1.56 11.31-4.69c6.25-6.25 6.25-16.38 0-22.63l-18.75-18.75c-6.25-6.25-16.38-6.25-22.63 0s-6.25 16.38 0 22.63l18.76 18.75zM240 441.98v26.52c0 8.84 7.16 16 16 16s16-7.16 16-16v-26.52c0-8.84-7.16-16-16-16s-16 7.16-16 16zM105.74 422.26c4.09 0 8.19-1.56 11.31-4.69l18.75-18.75c6.25-6.25 6.25-16.38 0-22.63s-16.38-6.25-22.63 0l-18.75 18.75c-6.25 6.25-6.25 16.38 0 22.63 3.13 3.13 7.23 4.69 11.32 4.69zM43.5 272h26.52c8.84 0 16-7.16 16-16s-7.16-16-16-16H43.5c-8.84 0-16 7.16-16 16s7.16 16 16 16zM94.43 94.43c-6.25 6.25-6.25 16.38 0 22.63l18.75 18.75c3.12 3.12 7.22 4.69 11.31 4.69s8.19-1.56 11.31-4.69c6.25-6.25 6.25-16.38 0-22.63l-18.75-18.75c-6.24-6.25-16.38-6.25-22.62 0z"/>`;

const MOON_ICON = `<circle cx="256" cy="256" r="200" fill="currentcolor"/>`;

function setToggleButtonIcon() {
	const isDarkMode = document.body.classList.contains('dark');
	const toggleIcon = document.getElementById('toggleIcon');
	toggleIcon.innerHTML = isDarkMode ? SUN_ICON : MOON_ICON;
}

function toggleDarkMode() {
	const isDark = document.body.classList.toggle('dark');

	// Save preference to localStorage
	localStorage.setItem('theme', isDark ? 'dark' : 'light');

	setToggleButtonIcon();
}

// Custom accordion implementation
function initAccordions() {
	const accordions = document.querySelectorAll('.collapsible-code');

	accordions.forEach(accordion => {
		const header = accordion.querySelector('.accordion-header');

		if (!header) return;

		header.addEventListener('click', () => {
			accordion.classList.toggle('is-open');
		});
	});
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	createHeader();
	setInitialMode();
	initAccordions();
});
