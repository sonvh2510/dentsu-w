const { isProduction } = require('../utils/helpers');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const Fiber = require('fibers');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const terser = require('gulp-terser');

const cssTask = () =>
	src(['./app/styles/**.scss', '!app/styles/_*.scss'])
		.pipe(gulpif(!isProduction(), sourcemaps.init()))
		.pipe(sass({ fiber: Fiber }).on('error', sass.logError))
		.pipe(
			gulpif(
				isProduction(),
				cleanCss({
					level: {
						1: {
							all: true,
							normalizeUrls: false,
							specialComments: false,
						},
						2: {
							restructureRules: true,
						},
					},
				}),
			),
		)
		.pipe(postcss([autoprefixer({ cascade: false })]))
		.pipe(gulpif(isProduction(), postcss([cssnano()])))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulpif(!isProduction(), sourcemaps.write('.')))
		.pipe(dest('./_dist/css'));

const jsTask = () =>
	browserify({
		basedir: '.',
		entries: ['./app/scripts/main.js'],
		debug: true,
		sourceMaps: true,
	})
		.transform(
			babelify.configure({
				presets: ['@babel/preset-env'],
				plugins: [
					'@babel/plugin-proposal-class-properties',
					'@babel/plugin-transform-async-to-generator',
				],
				extensions: ['.js'],
			}),
		)
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(
			plumber(function (err) {
				console.log(err);
				this.emit('end');
			}),
		)
		.pipe(gulpif(!isProduction(), sourcemaps.init({ loadMaps: true })))
		.pipe(gulpif(isProduction(), terser()))
		.pipe(
			rename({
				suffix: '.min',
			}),
		)
		.pipe(gulpif(!isProduction(), sourcemaps.write('./')))
		.pipe(dest('_dist/js'));

module.exports = {
	cssTask,
	jsTask,
};
