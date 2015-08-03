var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('templates', function() {
  gulp.src('./*.jade')
    .pipe(jade({
      locals: {},
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('styles', function(){
  gulp.src(['stylesheets/**/*.styl'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(stylus())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch("stylesheets/**/*.stylus", ['styles']);
  gulp.watch("*.jade", ['templates']);
  gulp.watch("*.html", ['bs-reload']);
});
