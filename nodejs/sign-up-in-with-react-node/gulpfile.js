var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('jade', function () {
	gulp.src('./src/jade/index.jade')
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
	gulp.src('./src/sass/index.scss')
			.pipe(sass())
			.pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('default', ['serve']);

gulp.task('serve', ['jade', 'sass'], function () {
	browserSync.init({
		server: './'
	});
	gulp.watch('./src/sass/index.scss', ['sass']);
	gulp.watch('./src/jade/index.jade', ['jade']);
	gulp.watch("./index.html").on('change', reload);
	gulp.watch("./build/stylesheets/index.css").on('change', reload);
});