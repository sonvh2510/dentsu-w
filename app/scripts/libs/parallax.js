export class Parallax {
	constructor(selector, options = {}) {
		this.selector = selector;
		this.options = { ...options };
		try {
			this.dom = document.querySelector(selector);
			this.target = document.querySelector(this.options.target);
			this.documentHeight = document.body.clientHeight;
			// Initialize
			this.init();
		} catch (err) {
			throw err;
		}
	}
	scrollHandler() {
		const scrolled = window.scrollY;
		this.target.setAttribute(
			'style',
			`transform: translateY(${scrolled / 3}px)`,
		);
	}
	run() {
		window.addEventListener('scroll', () => this.scrollHandler());
		this.scrollHandler();
	}
	init() {
		this.run();
	}
}
