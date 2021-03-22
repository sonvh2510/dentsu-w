import PerfectScrollbar from 'perfect-scrollbar';

// Define variables
const body = document.body;
const main = document.querySelector('main');
const header = document.querySelector('header');
const backdrop = document.querySelector('.backdrop');
const headerToggle = document.querySelector('.js-header__toggle');
const headerClose = document.querySelector('.js-header__close');
const wrapper = document.querySelector('.header__siteMenu--hidden');

const toggleHeader = () => {
	if (!headerToggle) {
		return;
	}
	headerToggle.addEventListener('click', (e) => {
		e.preventDefault();
		headerToggle.classList.toggle('is-active');
		if (headerToggle.classList.contains('is-active')) {
			wrapper.classList.add('is-showed');
			main.classList.add('is-pushed');
			backdrop.classList.add('is-actived');
		}
	});
	headerClose.addEventListener('click', (e) => {
		headerToggle.classList.remove('is-active');
		wrapper.classList.remove('is-showed');
		main.classList.remove('is-pushed');
		backdrop.classList.remove('is-actived');
	});
};

const headerSiteMenuScrollbar = () => {
	const headerSiteMenu = document.querySelector('.header__siteMenu__wrapper');
	if (!headerSiteMenu) {
		return;
	}
	return new PerfectScrollbar(headerSiteMenu, {
		wheelSpeed: 1,
		wheelPropagation: true,
		minScrollbarLength: 120,
		swipeEasing: true,
	});
};


document.addEventListener('DOMContentLoaded', () => {
	headerSiteMenuScrollbar();
	toggleHeader();
});
