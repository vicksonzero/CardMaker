var gulp = require('gulp');
// Plugins
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
	return gulp.src(['./js/**/*.js','!./js/bundle.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// browserify task
gulp.task('b', function() {
    gulp.src('./js/main.js')
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./js/'));
});


// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(['./js/*.js','./js/**/*.js','!./js/bundle.js'], ['lint','b'])
		.on('change',function(event){
			console.log("\n============");
			console.log('File '+event.path+' was '+event.type+', running tasks...');
		});
});

// Watch Files For Changes
gulp.task('autoReload', function() {
	gulp.watch(['./js/bundle.js'])
		.on('change',function(event){
			console.log('File '+event.path+' was '+event.type+', reloading...');
			livereload(35729);
		});
});



// Default Task
gulp.task('default', ['lint','autoReload','watch']);