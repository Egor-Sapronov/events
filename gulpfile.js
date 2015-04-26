'use strict';
let gulp = require('gulp');
let jade = require('gulp-jade');
let plumber = require('gulp-plumber');
let stylus = require('gulp-stylus');
let uglify = require('gulp-uglify');
let cssmin = require('gulp-cssmin');
let gulpif = require('gulp-if');
let jshint = require('gulp-jshint');
let gulpIgnore = require('gulp-ignore');
let autoprefixer = require('gulp-autoprefixer');
let transform = require('vinyl-transform');
let browserify = require('browserify');
let del = require('del');
let argv = require('yargs').argv;
let paths = {
    src: './web/src/',
    dist: './web/dist/',
    vendor: './bower_components/'
};
let production = false;

if (argv.production || argv.prod) {
    production = true;
} else {
    production = false;
}

gulp.task('images', function () {
    return gulp.src(paths.src + 'img/**')
        .pipe(gulp.dest(paths.dist + 'assets/img'));
});

gulp.task('clean', function () {
    del([paths.dist + '**']);
});

gulp.task('css', function () {
    return gulp.src(paths.src + 'stylesheets/**/*.css')
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpif(production, cssmin()))
        .pipe(gulp.dest(paths.dist + 'assets/stylesheets'));
});

gulp.task('stylus', function () {
    return gulp.src(paths.src + 'stylesheets/**/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpif(production, cssmin()))
        .pipe(gulp.dest(paths.dist + 'assets/stylesheets'));
});

gulp.task('stylesheets', ['css', 'stylus']);

gulp.task('html', function () {
    return gulp.src(paths.src + '/**/*.html')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('jade', function () {
    return gulp.src(paths.src + '/templates/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: !production
        }))
        .pipe(gulp.dest(paths.dist + '/assets/templates'));
});

gulp.task('templates', ['jade', 'html']);

gulp.task('lib', function () {
    return gulp.src(paths.vendor + '**')
        .pipe(gulpIgnore.exclude('*.json'))
        .pipe(gulp.dest(paths.dist + 'lib/'));
});

gulp.task('jshint', function () {
    return gulp.src(paths.src + 'app/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
    let browserified = transform(function (filename) {
        let b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(paths.src + '/app/*.js')
        .pipe(plumber())
        .pipe(browserified)
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest(paths.dist + 'assets/scripts/'));
});

gulp.task('scripts', ['browserify', 'jshint']);

gulp.task('watch', function () {
    gulp.watch(paths.src + '**/*.jade', ['jade']);
    gulp.watch(paths.src + '**/*.html', ['html']);
    gulp.watch(paths.src + 'stylesheets/**/*.css', ['css']);
    gulp.watch(paths.src + 'stylesheets/**/*.styl', ['stylus']);
    gulp.watch(paths.src + 'img/**', ['images']);
    gulp.watch(paths.src + 'app/**/*.js', ['browserify', 'jshint']);
    gulp.watch(paths.src + 'fonts/**', ['fonts']);
});

gulp.task('build', ['lib', 'scripts', 'images', 'stylesheets', 'templates']);