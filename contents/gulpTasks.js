const tasks = `
'use strict';
import gulp       from 'gulp';
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from 'vinyl-source-stream';
import plumber    from 'gulp-plumber';
import notify     from 'gulp-notify';
import eslint     from 'gulp-eslint';

const paths = {
    js: './src/main.jsx',
    jsx: './src/**/*.jsx',
    dist: './public/jsx',
    html: './public/index.html'
};

const lintOptions = {
    rulePath: './',
    useEslintrc: true
};

gulp.task('lint', function() {
    gulp.src(paths.jsx)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(eslint(lintOptions))  // next 3 are for eslint
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('build', ['lint'], function() {
    browserify({
        entries: paths.js,
        extensions: ['.jsx', '.js'],
        debug: true
    })
        .transform(babelify, {presets: ['es2015', 'react']})
        .on('error', function (err) { console.log('Error : ' + err.message); })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(notify({message: 'Generated file: <%= file.relative %>'}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
    gulp.watch(paths.jsx, ['build']);
});

gulp.task('default', ['build', 'watch']);
`;

export default tasks