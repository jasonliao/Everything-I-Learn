var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

gulp.task('jade', function () {
	gulp.src('./src/jade/index.jade')
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
	gulp.src('./src/sass/index.sass')
			.pipe(sass())
			.pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('default', ['jade', 'sass']);