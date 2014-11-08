var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var stripDebug = require('gulp-strip-debug');
var path = require('path');

var config = {
  path: {
    build_path: "./build/",
    original: {
      root: './',
      css: './css/',
      js: './js/',
      js_components: './js/components/',
      images: './images/',
    },
    build: (function() {
      var res = {};
      for (var key in this.original) {
        res[key] = this.build_path + this.original[key];
      }
      return res;
    })
  }
};

gulp.task('default', function() {

});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./bower_components/**/*', ['bower', 'inject']);
});

// copy bower components to build folder.
gulp.task('bower', function() {
  return gulp.src(mainBowerFiles({
      paths: config.path.original.root
    }))
    .pipe(gulp.dest(config.path.original.js_components))
    .pipe(gulp.dest(config.path.build().js_components));
});

// copy other files to build folder.
gulp.task('copy', function() {
  return gulp.src([
    'index.html',
    'robots.txt',
    'humans.txt',
    './.htaccess',
  ]).
  pipe(gulp.dest(config.path.build().root));
});

// comporess images  and copy to build folder.
gulp.task('image-compress', function() {
  return gulp.src(config.path.original.images + '*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })).pipe(gulp.dest(config.path.build().images));
});

// compile sass files.
gulp.task('sass', function() {
  return gulp.src([
      './sass/**/*.scss',
      '!./sass/components/**/*'
    ])
    .pipe(plumber())
    .pipe(sass({
      style: 'compressed',
      compass: true
    }))
    .pipe(plumber.stop())
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.path.build().css))
    .pipe(gulp.dest(config.path.original.css));
});

// compress js files and copy to build folder.
gulp.task('js-compress', function() {
  return gulp.src([
      config.path.original.js + '**/*.js',
      '!' + config.path.original.js_components + '**/*',
    ])
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(config.path.build().js));
});

// inject 
gulp.task('inject', function() {
  var bowerFilesStream = gulp.src(mainBowerFiles().map(function(filePath) {
    return config.path.original.js_components + path.basename(filePath);
  }), {
    read: false
  });
  var otherJsFilesStream = gulp.src([
    config.path.original.js + '**/*.js',
    config.path.original.css + 'main.css',
    '!' + config.path.original.js + 'main.js',
    '!' + config.path.original.js_components + '**/*.js'
  ], {
    read: false
  });
  return gulp.src('./index.html')
    .pipe(inject(gulp.src([config.path.original.js_components + 'modernizr.js'], {
      read: false
    }), {
      name: 'head',
      relative: true
    }))
    .pipe(inject(es.merge(bowerFilesStream, otherJsFilesStream), {
      relative: true
    }))
    .pipe(inject(gulp.src(config.path.original.js + 'main.js', {
      read: false
    }), {
      name: 'main',
      relative: true
    }))
    .pipe(gulp.dest(config.path.original.root))
    .pipe(gulp.dest(config.path.build().root));
});

// exec build.
gulp.task('build', [
  'bower',
  'sass',
  'image-compress',
  'js-compress',
  'copy',
  'inject',
], function() {
  console.log('Finished build.');
});