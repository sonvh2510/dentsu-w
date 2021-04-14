import PerfectScrollbar from 'perfect-scrollbar';
import MoveElement from './libs/move';
import { Parallax } from './libs/parallax';

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

const highlightProjectsSlider = () => {
	return new Swiper('.highlight-projects-bottom .swiper-container', {
		slidesPerView: 2,
		loop: true,
		centeredSlides: true,
		effect: 'coverflow',
		spaceBetween: 10,
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		pagination: {
			el: '.highlight-projects-bottom .swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			768: {
				spaceBetween: 25,
			},
			1025: {
				slidesPerView: 3,
			},
			1200: {
				spaceBetween: 40,
				slidesPerView: 3,
			},
		},
	});
};

const projectMasonry = () => {
	var galleryGrid = $('.js-mansonry');
	galleryGrid.imagesLoaded(function () {
		galleryGrid.isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
		});
	});
	galleryGrid.imagesLoaded().progress(function () {
		galleryGrid.isotope();
	});

	const filterWrapper = $('.filter-wrapper');
	const filterItemLinks = filterWrapper.find('.filter-item .filter-link');
	filterItemLinks.each(function (index) {
		const _this = $(this);
		_this.on('click', function (e) {
			e.preventDefault();
			_this.addClass('active');
			filterWrapper
				.find('.filter-item .filter-link')
				.not(_this)
				.removeClass('active');
			const url = _this.attr('href');
			$.ajax({
				url,
				success: function (res) {
					const $oldItems = galleryGrid.find('.grid-item');
					const $items = $(res).find('.grid-item');
					galleryGrid.isotope('remove', $oldItems);
					galleryGrid.append($items).isotope('appended', $items);
					galleryGrid.imagesLoaded().progress(function () {
						galleryGrid.isotope();
					});
				},
			});
		});
	});
};

const scrollToForm = () => {
	$('.header__contact a').on('click', function (e) {
		e.preventDefault();
		const pos = $('#footer-form').offset().top - header.clientHeight;
		$('html,body').animate({ scrollTop: pos }, 1200, 'swing');
	});
};

document.addEventListener('DOMContentLoaded', () => {
	new MoveElement('.header__nav', {
		mobile: {
			node: '.header__siteMenu__wrapper',
			method: 'prependTo',
		},
		desktop: {
			node: '.header__logo',
			method: 'insertAfter',
		},
	});
	// Parallax
	const p = new Parallax('.parallax', {
		target: '.parllax__img',
		ratio: 3,
		mobile: false,
		breakpoint: 1025,
	});

	headerSiteMenuScrollbar();
	toggleHeader();

	scrollToForm();

	highlightProjectsSlider();
	projectMasonry();

	var wow = new WOW({
		boxClass: 'wow', // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset: 100, // distance to the element when triggering the animation (default is 0)
		mobile: true, // trigger animations on mobile devices (default is true)
		live: true, // act on asynchronously loaded content (default is true)
		callback: function (box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null, // optional scroll container selector, otherwise use window,
		resetAnimation: false, // reset animation on end (default is true)
	});
	wow.init();
});
