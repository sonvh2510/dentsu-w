const bSync = require('browser-sync');
const compression = require('compression');
const { watch, series, task } = require('gulp');
const { copyFonts } = require('./copy');
const { renderFiles } = require('./render');
const { cssTask, jsTask } = require('./main');
const { jsCore, cssCore } = require('./core');
const { imageChangeTask, imageRemoveTask } = require('../utils/helpers');

task('copyFonts', (cb) => copyFonts());
task('jsCore', (cb) => jsCore());
task('cssCore', (cb) => cssCore());
task('jsTask', (cb) => jsTask());
task('cssTask', (cb) => cssTask());
task('renderAll', (cb) => renderFiles('./app/**.pug'));

const serve = () => {
	bSync.init({
		notify: false,
		server: {
			baseDir: '_dist',
			middleware: [compression()],
		},
		port: 8000,
	});

	watch(['app/views/_**/**.pug'], series('renderAll'));

	watch(['app/**.pug']).on('change', (path, stats) => {
		console.log(`Files changed: '${path}'`);
		let pageName;
		let glob;
		if (path.indexOf('/') >= 0) {
			pageName = path.split('/')[1];
		} else {
			pageName = path.split('\\')[1];
		}
		if (pageName.indexOf('.pug') >= 0) {
			glob = `app/${pageName}`;
		} else {
			glob = `app/${pageName}.pug`;
		}
		console.log(`Rendering: '${path}'`);
		return renderFiles(glob);
	});

	watch(['app/views/**/**.pug', '!app/views/_**/**.pug']).on(
		'change',
		(path, stats) => {
			console.log(`Files changed: '${path}'`);
			let pageName;
			let glob;
			if (path.indexOf('/') >= 0) {
				pageName = path.split('/')[2];
			} else {
				pageName = path.split('\\')[2];
			}
			if (pageName.indexOf('.pug') >= 0) {
				glob = `app/${pageName}`;
			} else {
				glob = `app/${pageName}.pug`;
			}
			console.log(`Rendering: '${path}'`);
			return renderFiles(glob);
		},
	);

	watch(['public/**/**.**'], {
		ignorePermissionErrors: true,
		delay: 300,
		events: 'all',
	})
		.on('add', imageChangeTask)
		.on('change', imageChangeTask)
		.on('unlink', imageRemoveTask)
		.on('unlinkDir', imageRemoveTask);

	watch(['app/scripts/**/**.js'], series('jsTask'));

	watch(
		['app/styles/**/**.scss'],
		{
			delay: 300,
		},
		series('cssTask'),
	);

	watch(
		['vendors.json', 'vendors/**/**.**'],
		series('jsCore', 'cssCore', 'copyFonts'),
	);

	watch(['_dist/**/**.**']).on('change', bSync.reload);
};

module.exports = {
	serve,
};
