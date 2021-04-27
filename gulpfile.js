const { series, task } = require('gulp');
const { clean } = require('./@core/tasks/clean');
const { copyPublic, copyFonts } = require('./@core/tasks/copy');
const { renderFiles } = require('./@core/tasks/render');
const { jsCore, cssCore } = require('./@core/tasks/core');
const { jsTask, cssTask } = require('./@core/tasks/main');
const { serve } = require('./@core/tasks/serve');

task('cleanDist', () => clean('_dist'));
task('copyPublic', (cb) => copyPublic());
task('copyFonts', (cb) => copyFonts());
task('jsCore', (cb) => jsCore());
task('cssCore', (cb) => cssCore());
task('jsTask', (cb) => jsTask());
task('cssTask', (cb) => cssTask());
task('renderAll', (cb) => renderFiles('./app/**.pug'));
task('serve', serve);

exports.dev = series(
	'cleanDist',
	'copyPublic',
	'jsCore',
	'cssCore',
	'jsTask',
	'cssTask',
	'renderAll',
	'serve',
);
exports.prod = series(
	'cleanDist',
	'copyPublic',
	'jsCore',
	'cssCore',
	'jsTask',
	'cssTask',
	'renderAll',
);
