const { src, dest } = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');

const renderFiles = (glob) => {
	return src(glob)
		.pipe(
			plumber(function (err) {
				console.log(err);
				this.emit('end');
			}),
		)
		.pipe(
			pug({
				pretty: '\t',
			}),
		)
		.pipe(dest('_dist'));
};

module.exports = {
	renderFiles,
};
