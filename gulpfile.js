var gulp = require('gulp'), // Сообственно Gulp JS
    sass = require('gulp-sass');
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('js', function() {
    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('images', function() {
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("assets/sass/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('prefix', function () {
    var postcss      = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./public/styles/*.css')
        .pipe(postcss([ autoprefixer({ browsers:
          ['and_chr 46', 'chrome > 3', 'edge 12', 'firefox > 35', 'ie 11', 'ie_mob 11', 'ios_saf > 1', 'opera > 25', 'safari > 1'] }) ]))
        .pipe(gulp.dest('./public/styles/'));
});

gulp.task('default', function() {

    gulp.run('sass');
    gulp.run('images');
    gulp.run('js');
    gulp.run('browser-sync');

    gulp.watch('assets/sass/**/*.scss', function() {
        gulp.run('sass');
    });

    gulp.watch('assets/img/**/*', function() {
        gulp.run('images');
    });

    gulp.watch('assets/js/**/*', function() {
        gulp.run('js');
    });
});

gulp.task('build', function() {

    gulp.src('./public/styles/**/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./build/styles'));

    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
});
