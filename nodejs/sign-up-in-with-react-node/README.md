# TODO with React.js and Node.js

## [jade](http://jade-lang.com/)

## [Scss](http://sass-lang.com/)

## [Gulp.js](http://gulpjs.com/)

- 利用`gulp-jade`把`.jade`文件转成`.html`文件
	1. 安装`gulp-jade`插件
	```
	npm install --save-dev gulp-jade
	```	
	2. 在`gulpfile.js`文件里引用`gulp-jade`模块并创建一个`task`
	```javascript
	var jade = require('gulp-jade');
	
	gulp.task('jade', function () {
		gulp.src('./src/jade/index.jade')
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest('./'));
	});
	```
	4. 执行这个`jade`任务
	```
	gulp jade
	```
	
- 利用`gulp-sass`把`.scss`文件转成`.css`文件
	1. 安装`gulp-sass`插件
	```
	npm install --save-dev gulp-sass
	```
	2. 在`gulpfile.js`文件里引用`gulp-sass`模块并创建一个`task` 
	```javascript
	var sass = require('gulp-sass');
	
	gulp.task('sass', function () {
		gulp.src('./src/sass/index.scss')
			.pipe(sass())
			.pipe(gulp.dest('./build/stylesheets'));
	});
	```
	3. 执行这个`sass`任务
	```
	gulp sass
	```

- 利用`browser-sync`实现热加载
	1. 安装`browser-sync`插件
	```
	npm install --save-dev browser-sync
	```
	2. 在`gulpfile.js`里引用
	```javascript
	var browserSync = require('browser-sync').create();
	vat reload = browserSync.reload;
	```
	3. 添加`serve`任务并`watch`两个文件的改变然后`reload`
	```javascript
	gulp.task('serve', ['jade', 'sass'], function () {
		browserSync.init({
			server: './'
		});
		gulp.watch('./src/sass/index.scss', ['sass']);
		gulp.watch('./src/jade/index.jade', ['jade']);
		gulp.watch("./index.html").on('change', reload);
		gulp.watch("./build/stylesheets/index.css").on('change', reload);
	});
	```
	4. 执行`serve`任务
	```
	gulp serve
	```

## [React.js](http://facebook.github.io/react/)

## [Node.js](https://nodejs.org/)