var gulp = require('gulp');
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');
var $$ = require('gulp-load-plugins')({
  rename: {
    'gulp-ruby-sass': 'sass'
  }
});

const HTML_FILES = [
  './**/*.html',
  '!./dist/**/*',
  '!./node_modules/**/*',
  '!./bower_components/**/*'
];

gulp.task('default', function() {

});

gulp.task('server', ['watch'], function(){
  return gulp.src('./dist')
  .pipe($$.webserver({
    livereload: false,
    open: true,
  }));
});

gulp.task('watch', function() {
  $$.livereload.listen();
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch(['./js/**/*.js' ,'./bower_components/**/*'], ['compress-js']);
  gulp.watch('index.html', ['compress-html']);
  return gulp.watch('./images/**/*', ['compress-image']);
});

// copy other files to build folder.
gulp.task('copy', function() {
  return gulp.src([
    'robots.txt',
    'humans.txt',
    '.htaccess',
    'CNAME',
  ]).
  pipe(gulp.dest('./dist'));
});

// comporess images and copy to build folder.
gulp.task('compress-image', function() {
  return gulp.src('./images/*')
    .pipe($$.imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })).pipe(gulp.dest('./dist/images'));
});

// compile sass files.
gulp.task('sass', function() {
  return gulp.src([
      './sass/**/*.scss',
    ])
    .pipe($$.plumber())
    .pipe($$.sass({
      style: 'compact',
      compass: true
    }))
    .pipe($$.plumber.stop())
    .pipe($$.minifyCss())
    .pipe(gulp.dest('./dist/css'))
    .pipe($$.livereload());
});

// concat compoonents and compress js
gulp.task('compress-js', function() {
  return gulp.src('./bower.json')
    .pipe($$.mainBowerFiles())
    .pipe($$.addSrc('./js/**/*.js'))
    .pipe($$.concat('all.js'))
    .pipe($$.stripDebug())
    .pipe($$.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe($$.livereload());
});

// compress html files
gulp.task('compress-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals : true
  };

  return gulp.src(HTML_FILES)
    .pipe($$.minifyHtml(opts))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress', ['compress-html', 'compress-js', 'compress-image']);

// inject
gulp.task('inject', () => {
  var target = './dist/**/*.html';
  var sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {read: false});
  return gulp.src(target)
    .pipe($$.inject(sources, {ignorePath: 'dist'}))
    .pipe(gulp.dest('./dist'))
    .pipe($$.livereload());
});

// exec build.
gulp.task('build', function(callback) {
  runSequence([
    'sass',
    'copy',
    'compress'
  ], 'inject',
  callback);
});

gulp.task('deploy', ['build'], function(){
  return gulp.src('./dist/**/*').pipe($$.ghPages());
});