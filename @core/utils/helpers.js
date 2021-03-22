const { src, dest } = require('gulp');
const argv = require('minimist');
const del = require('del');

const isProduction = () => {
	const argvs = argv(process.argv.slice(2));
	return argvs.mode == 'production';
};

const imageChangeTask = (path, stats) => {
	const filePathnameGlob = path.replace(/[\/\\]/g, '/');
	const destPathname = filePathnameGlob
		.replace('public', '_dist')
		.replace(
			filePathnameGlob.split('/')[filePathnameGlob.split('/').length - 1],
			'',
		);
	console.log(`Copy: '${filePathnameGlob}'   =====>   '${destPathname}'`);
	return src(filePathnameGlob).pipe(dest(destPathname));
};

const imageRemoveTask = (path, stats) => {
	const filePathnameGlob = path.replace(/[\/\\]/g, '/');
	const destPathname = filePathnameGlob.replace('public', '_dist');
	console.log(`Deleted: '${destPathname}'`);
	return del(destPathname);
};

module.exports = {
	isProduction,
	imageChangeTask,
	imageRemoveTask,
};
