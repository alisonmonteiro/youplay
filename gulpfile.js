const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const iife = require('gulp-iife');

gulp.task('build', () => {
  return gulp.src('./index.js')
    .pipe(babel({presets: ['es2015']}))
    .on('error', console.error.bind(console))
    .pipe(iife({ useStrict: false }))
    .pipe(uglify({ mangle: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', ['build'], () => {
  gulp.watch(['index.js'], ['build']);
});
