const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');

function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true
    });
}

function scripts() {
    return src([
        'app/js/main.js',
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream());
}

function styles() {
    return src('app/styles/sass/main.scss')
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss(( {level: { 1: { specialComments: 0 } }/*, format: 'beautify' */ } )))
    .pipe(dest('app/styles/css/'))
    .pipe(browserSync.stream());
}


function images() {
    return src('app/media/src/**/*')
    .pipe(newer('app/media/image/'))
    .pipe(imagemin())
    .pipe(dest('app/media/image/'));
}

function cleanimg() {
    return del('app/media/image/**/*', { force: true });
}

function cleandist() {
    return del('dist/**/*', { force: true });
}

function buildcopy() {
    return src([
        'app/styles/css/**/*min.css',
        'app/fonts/**/*',
        'app/js/**/*.min.js',
        'app/media/image/**/*',
        'app/**/*.html',
        ], { base: 'app' })
        .pipe(dest('dist'));
}

function startwatch() {
    watch('app/**/*.scss', styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/media/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.build       = series(cleandist, styles, scripts, images, buildcopy);

exports.default     = parallel(scripts, styles, browsersync, startwatch);
