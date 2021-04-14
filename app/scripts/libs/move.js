export default class MoveElement {
	constructor(selector, options = {}) {
		try {
			const { mobile, desktop, breakpoint } = options;
			this.selector = selector;
			this.node = document.querySelector(selector);
			this.mobile = mobile;
			this.desktop = desktop;
			this.breakpoint = breakpoint ? breakpoint : 1025;
			this.screenListender = window.matchMedia(
				`(min-width: ${this.breakpoint}px)`,
			);
			this.init();
		} catch (error) {
			throw error;
		}
	}

	static Actions = {
		insertBefore(node, target) {
			target.parentNode.insertBefore(node, target.previousSibling);
		},
		insertAfter(node, target) {
			target.parentNode.insertBefore(node, target.nextSibling);
		},
		appendTo(node, target) {
			target.appendChild(node);
		},
		prependTo(node, target) {
			target.prepend(node);
		},
	};

	dispatch(name, { node, target }) {
		const fnc = MoveElement.Actions[name];
		return fnc(node, target);
	}

	move(method, target) {
		return this.dispatch(method, {
			node: this.node,
			target: document.querySelector(target),
		});
	}

	screenResizeHandler(screenListender) {
		let screen = screenListender.matches ? 'desktop' : 'mobile';
		this.move(this[screen].method, this[screen].node);
	}

	init() {
		this.screenResizeHandler(this.screenListender);
		this.screenListender.addEventListener('change', () => {
			this.screenResizeHandler(this.screenListender);
		});
	}
}
