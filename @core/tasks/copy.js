const { src, dest } = require('gulp');
const { readVendors } = require('../utils/vendors');

const copyFavicon = () => src('public/favicon.ico').pipe(dest('_dist'));

const copyImages = () =>
	src('public/images/**.{jpg,png,svg,gif,jpeg,webp,ico}').pipe(dest('_dist'));

const copyFonts = () => {
	const { fonts } = readVendors('./vendors.json');
	if (fonts.length <= 0) {
		return console.log('Không có đường dẫn fonts để copy');
	}
	return src(fonts, {
		allowEmpty: true,
	}).pipe(dest('_dist/fonts'));
};

const copyPublic = () =>
	src('public/**', { allowEmpty: true }).pipe(dest('_dist'));

module.exports = {
	copyFavicon,
	copyImages,
	copyFonts,
	copyPublic,
};
