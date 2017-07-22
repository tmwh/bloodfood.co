var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge2 = require('merge2');
var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];
var bowerMain = require('bower-main');
var bowerMainJavaScriptFiles = bowerMain('js','min.js');

gulp.task('vendor', function() {
  return merge2(
    gulp.src(bowerMainJavaScriptFiles.minified),
    gulp.src(bowerMainJavaScriptFiles.minifiedNotFound)
      .pipe(concat('tmp.min.js'))
      .pipe(uglify())
    )
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('js'))
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['vendor', 'sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
