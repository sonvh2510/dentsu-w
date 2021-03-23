import PerfectScrollbar from 'perfect-scrollbar';
// import Swiper from 'swiper';

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
		slidesPerView: 3,
		loop: true,
		centeredSlides: true,
		effect: 'coverflow',
		spaceBetween: 40,
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
	});
};

const projectMasonry = () => {
	var galleryGrid = $(".js-mansonry")
  galleryGrid.imagesLoaded(function () {
    galleryGrid.isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
    });
  })
  galleryGrid.imagesLoaded().progress(function () {
    galleryGrid.isotope('layout');
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
					const $oldItems = galleryGrid.find(".grid-item")
					const $items = $(res).find('.grid-item')
					galleryGrid.isotope('remove', $oldItems)
					galleryGrid.append($items).isotope('appended', $items)
					galleryGrid.imagesLoaded().progress(function () {
						galleryGrid.isotope()
					});
				},
			});
		});
	});
};

document.addEventListener('DOMContentLoaded', () => {
	headerSiteMenuScrollbar();
	toggleHeader();

	highlightProjectsSlider();
	projectMasonry();
});
