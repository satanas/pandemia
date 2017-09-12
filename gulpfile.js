var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var chalk = require('chalk');
var config = require('./config');
var execSync = require('child_process').execSync;

gulp.task('minify_js', function() {
  gulp.src(config.sourceFiles)
  .pipe(concat('all.min.js'))
  .pipe(uglify({
    mangle: {
      toplevel: true,
    },
    // Based on https://davidwalsh.name/compress-uglify
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true,
      unsafe_math: true,
      //unsafe: true
    }
  }))
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest('min'));
});

gulp.task('minify_css', function() {
  gulp.src('style.css')
  .pipe(minifyCSS())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('min'));
});

//gulp.task('minify_html', ['minify_js', 'minify_css'], function() {
gulp.task('minify_html', function() {
  var pattern = /<!-- Begin imports -->([\s\S]*)<!-- End imports -->/;

  gulp.src(['index.html'])
  .pipe(replace(pattern, '<script src="all.min.js"></script>'))
  .pipe(replace(/style.css/, 'style.min.css'))
  .pipe(gulp.dest('min'))
  .on('end', function() {
    return gulp.src('min/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('min'));
  });
});

gulp.task('clean', function() {
  gulp.src('min/*.zip', {read: false})
  .pipe(clean());
  gulp.src('min/*.css', {read: false})
  .pipe(clean());
  gulp.src('min/*.js', {read: false})
  .pipe(clean());
  gulp.src('min/*.html', {read: false})
  .pipe(clean());
});

gulp.task('zip', function() {
  gulp.src(['min/all.min.js', 'min/index.html', 'min/style.min.css'])
  .pipe(zip(config.appName + '.zip'))
  .pipe(gulp.dest('min'))
  .on('end', reportSize);
});

function reportSize() {
  var fd = fs.openSync('min/' + config.appName + '.zip', 'r');
  var stats = fs.fstatSync(fd);
  fs.closeSync(fd);
  var r = (13312 - stats.size) + ' bytes';
  var time = new Date().toTimeString().slice(0, 8);
  var sizeText;
  if (r < 0)
    sizeText = chalk.red(r);
  else
    sizeText = chalk.green(r);
  console.log('[' + chalk.gray(time) + '] ' + chalk.yellow('Remaining size: ') + sizeText);
}

gulp.task('minify_js_closure', function() {
  execSync('java -jar closure-compiler.jar --compilation_level ADVANCED --js js/ --js_output_file min/all.min.js');
});

gulp.task('build', ['minify_html', 'minify_css', 'minify_js', 'zip'], function() {
});

gulp.task('build_closure', ['minify_html', 'minify_css', 'minify_js_closure', 'zip'], function() {
});

// brew install advancecomp
// https://www.systutorials.com/docs/linux/man/1-advzip/
