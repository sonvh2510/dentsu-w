const { readVendors } = require('../utils/vendors');
const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const strip = require('gulp-strip-comments');

const cssCore = () => {
	const { css } = readVendors('./vendors.json');
	if (css.length <= 0) {
		return console.log('Không có đường dẫn thư viện css để copy');
	}
	return src(css, {
		allowEmpty: true,
	})
		.pipe(concat('core.min.css'))
		.pipe(
			cleanCss({
				level: {
					1: {
						all: true,
						normalizeUrls: false,
						specialComments: false,
					},
				},
			}),
		)
		.pipe(dest('./_dist/css'));
};

const jsCore = () => {
	const { js } = readVendors('./vendors.json');
	if (js.length <= 0) {
		return console.log('Không có đường dẫn thư viện js để copy');
	}
	return src(js, {
		allowEmpty: true,
	})
		.pipe(concat('core.min.js'))
		.pipe(strip())
		.pipe(uglify())
		.pipe(dest('./_dist/js'));
};

module.exports = {
	cssCore,
	jsCore,
};
