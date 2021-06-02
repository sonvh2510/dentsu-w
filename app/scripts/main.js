import PerfectScrollbar from 'perfect-scrollbar';
import Swiper from 'swiper';
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
let headerHeight = $('header').innerHeight();
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

$(window).on('resize', function(e) {
	headerHeight =$('header').innerHeight();
})

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
	new Parallax('.parallax', {
		target: '.parllax__img',
		ratio: 5,
		mobile: false,
		breakpoint: 1025,
		offset: 150,
	});

	new Swiper('.what-we-do-2 .swiper-container', {
		centeredSlides: true,
		loop: true,
		speed: 1000,
		slidesPerView: 1.5,
		spaceBetween: -20,
		breakpoints: {
			1440: {
				slidesPerView: 2.7,
				spaceBetween: -50,
			},
			1200: {
				slidesPerView: 2.7,
				spaceBetween: -40,
			},
			1025: {
				slidesPerView: 2.7,
				spaceBetween: -30,
			},
			768: {
				slidesPerView: 2.7,
				spaceBetween: -20,
			},
		},
	});

	$('#scroll-to-service').on('click', function (e) {
		e.preventDefault();
		const position = $('#our-services').offset().top;
		$('html,body').animate(
			{
				scrollTop: position - headerHeight,
			},
			1000,
		);
	});

	// headerSiteMenuScrollbar();
	toggleHeader();

	// Call fancybox
	// $('[data-fancybox]').fancybox({
	// 	touch: false,
	// });
	$('[data-fancybox]').on('click', function (e) {
		e.preventDefault();
		const content = $(this).find('.celeb-dialog');
		$.fancybox.open(content);
	});

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
