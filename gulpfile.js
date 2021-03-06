'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('styles', function() {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles'))
		.pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('./dev/styles/**/*.scss', ['styles']);
  gulp.watch('./dev/js/*.js', ['scripts']);
  gulp.watch('./public/*.html', reload);
});

gulp.task('scripts', function() {
  gulp.src('./dev/js/main.js')
  .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('./public/js'))
      .pipe(reload({stream: true}));

});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public'  
  })
});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);