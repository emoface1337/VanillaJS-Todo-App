"use strict"

const autoprefixer = require("gulp-autoprefixer")
const gulp = require("gulp")
const rename = require("gulp-rename")
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const purgecss = require('gulp-purgecss')
var ts = require("gulp-typescript")
var tsProject = ts.createProject("tsconfig.json")

const paths = {
    html: ['index.html'],
    sass: ['./sass/**/*.sass'],
    ts: ['./scripts/**/*.ts']
}

const css = () => {
    return gulp
        .src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(
            ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            {cascade: false}
            )
        )
        // .pipe(purgecss({
        //     content: ['index.html']
        // }))
        .pipe(postcss([cssnano()]))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./css/"))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./scripts"))
        .pipe(browserSync.stream())
}

const watch = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8081,
        open: true,
        notify: false
    })
    gulp.watch(paths.sass, css)
    gulp.watch(paths.ts, scripts)
    gulp.watch("./*.html").on('change', browserSync.reload)
}

gulp.task('css', css)
gulp.task('scripts', scripts)
gulp.task('watch', watch)
gulp.task('build', gulp.series(gulp.parallel(css, scripts)))

gulp.task('default', gulp.series('build', 'watch'))