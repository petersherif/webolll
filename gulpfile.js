"use strict";

// Load plugins
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const del = require("del");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const htmlreplace = require("gulp-html-replace");


// BrowserSync Initialization
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./src/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean dist
function clean() {
  return del(["./dist/"]);
}

// Update HTML Files in dist
function html() {
  return gulp
    .src("./src/**/*.html")
    .pipe(htmlreplace({
      'css': 'css/main.min.css',
      'js': 'js/main.min.js'
    }))
    .pipe(gulp.dest("./dist/"));
}

// Optimize Images and Move Them to dist
function images() {
  return gulp
    .src("./src/img/**/*")
    .pipe(newer("./dist/img"))
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }]
      })
    )
    .pipe(gulp.dest("./dist/img"));
}

// Compile and Autoprefix sass files and move them to src/css
function sasscompile() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./src/css/"))
    .pipe(browsersync.stream());
}

// Minify and move css files to dist
function css() {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest("./dist/css/"));
}

// Concatinate and minify js files and move them to dist
function js() {
  return gulp
    .src("./src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/js/"))
}
// Watch files to reload the browser on changes
function watchFiles() {
  gulp.watch("./src/sass/**/*.scss", sasscompile);
  gulp.watch("./src/js/**/*.js", browserSyncReload);
  gulp.watch("./src/img/**/*", browserSyncReload);
  gulp.watch("./src/**/*.html", browserSyncReload);
}

// Tasks
gulp.task("clean", clean);
gulp.task("images", images);
gulp.task("sass", sasscompile);
gulp.task("html", html);
gulp.task("js", js);

// build
gulp.task(
  "build",
  gulp.series(clean, gulp.parallel(gulp.series(sasscompile, css), js, images, html))
);

// dev
gulp.task("dev", gulp.parallel(watchFiles, browserSync));