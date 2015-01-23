'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    stylus = require('gulp-stylus'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    gulpif = require('gulp-if'),
    transform = require('vinyl-transform'),
    argv = require('yargs').argv,
    paths = {
        src: './client/src/',
        app: './client/src/app/',
        dest: './client/build/',
        templates: './client/src/assets/templates/',
        stylesheets: './client/src/assets/stylesheets/',
        images: './client/src/assets/images/',
        vendor: './client/src/vendor/'
    },
    production;

if (argv.production || argv.prod) {
    production = true;
}

gulp.task('fonts', function () {
    return gulp.src(paths.src + 'assets/font/**')
        .pipe(plumber())
        .pipe(gulp.dest(paths.dest + 'assets/font'));
});

gulp.task('html', function () {
    return gulp.src(paths.templates + '**/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dest + 'assets/templates'));
});

gulp.task('vendor', function () {
    return gulp.src(paths.vendor + '**')
        .pipe(gulp.dest(paths.dest + 'vendor'));
});

gulp.task('jshint', function () {
    return gulp.src(paths.app + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
    var browserified = transform(function (filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src([paths.src + 'app.js'])
        .pipe(plumber())
        .pipe(browserified)
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest(paths.dest + 'assets/scripts'));
});

gulp.task('scripts', ['jshint', 'browserify']);

gulp.task('css', function () {
    return gulp.src(paths.stylesheets + '**/*.css')
        .pipe(plumber())
        .pipe(gulpif(production, cssmin()))
        .pipe(gulp.dest(paths.dest + 'assets/stylesheets'));
});

gulp.task('stylus', function () {
    return gulp.src(paths.stylesheets + '**/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulpif(production, cssmin()))
        .pipe(gulp.dest(paths.dest + 'assets/stylesheets'));
});

gulp.task('stylesheets', ['css', 'stylus']);

gulp.task('images', function () {
    return gulp.src(paths.images + '**')
        .pipe(plumber())
        .pipe(gulp.dest(paths.dest + 'assets/images'));
});

gulp.task('clean', function () {
    return gulp.src(paths.dest, {read: false})
        .pipe(plumber())
        .pipe(clean());
});

gulp.task('serve', function () {
    var app = require('./app');

    app.listen(3000, function () {
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.templates + '**/*.jade', ['html']);
    gulp.watch(paths.app + '**/*.js', ['scripts']);
    gulp.watch(paths.stylesheets + '**/*.css', ['css']);
    gulp.watch(paths.stylesheets + '**/*.styl', ['stylus']);
});

gulp.task('start', ['watch', 'serve']);

gulp.task('build', ['html', 'scripts', 'fonts', 'vendor', 'images', 'stylesheets']);

