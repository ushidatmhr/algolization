var gulp = require('gulp');
var logger = require('gulp-logger');
var less = require('gulp-less');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var ejs = require('gulp-ejs')
var rename = require('gulp-rename')
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

const APP_DIR = './app';
const DIST_DIR = './public';

const LESS_DIR = APP_DIR + '/less';
const TS_DIR = APP_DIR + '/ts';
const EJS_DIR = APP_DIR + '/template';

const CONTEXTPATH = {
    local : '',
    prod : '/AlogrithmVisualization'
}

/**
 * lessコンパイル
 */
gulp.task('less', function () {

    return gulp.src(LESS_DIR + '/*.less')
        .pipe(less())
        .pipe(gulp.dest(DIST_DIR + '/css'))
        .pipe(logger({ beforeEach: '[less] wrote: ' }));

});


/**
 * TypeScriptコンパイル
 */
gulp.task('ts', function () {

    return gulp.src(TS_DIR + '/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'script.js'
        }))
        .pipe(gulp.dest(DIST_DIR + '/js'))
        .pipe(logger({ beforeEach: '[ts] wrote: ' }));
});


/**
 * ejsコンパイル
 */
gulp.task('ejs', function () {
    return gulp.src([EJS_DIR + '/**/*.ejs', '!' + EJS_DIR + '/parts/**/*.ejs'])
        .pipe(ejs({
            baseDir : process.cwd() + '/' + EJS_DIR,
            contextpath : CONTEXTPATH.local,
            version : Date.now()
        }, { ext: '.html', base: 'template' }))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(DIST_DIR));
});


/**
 * watchタスク
 */
gulp.task('watch', function () {
    gulp.watch(TS_DIR + '/**/*.ts', function () {
        gulp.run('ts');
    });

    gulp.watch(LESS_DIR + '/*.less', function () {
        gulp.run('less');
    });

    return gulp.watch(EJS_DIR + '/**/*.ejs', function () {
        gulp.run('ejs');
    });
});


/**
 * クリーンタスク
 */
gulp.task('clean', (cb) => {
    return rimraf(DIST_DIR, cb);
});


gulp.task('default', () => runSequence('clean', ['less', 'ts', 'ejs'], 'watch'));

