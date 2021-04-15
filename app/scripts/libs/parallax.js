export class Parallax {
	constructor(selector, options = {}) {
		this.selector = selector;
		this.options = { ...options };
		if (document.querySelector(selector)) {
			this.dom = document.querySelector(selector);
			this.target = document.querySelector(this.options.target);
			this.documentHeight = document.body.clientHeight;
			// Initialize
			this.init();
		}
	}
	scrollHandler() {
		const scrolled = window.scrollY;
		const { ratio, offset } = this.options;
		this.target.style.backgroundPosition = `center ${
			offset + -scrolled / ratio
		}px`;
		// this.target.setAttribute(
		// 	'style',
		// 	`background-position: center ${-scrolled / 3}px`,
		// );
	}
	run() {
		window.addEventListener('scroll', () => this.scrollHandler());
		this.scrollHandler();
	}
	init() {
		this.run();
	}
}
