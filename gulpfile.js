const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const builderSass = () => {
  return gulp.src('./src/assets/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
}

gulp.task('sass', builderSass)

const builderJS = () => {
  return gulp.src('./src/assets/js/scripts/*.js')
  .pipe(concat('app.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('./src/assets/js'))
  .pipe(browserSync.stream())
}

gulp.task('js', builderJS)

const pluginsJS = () => {

  return gulp.src(
    [
      './node_modules/aos/dist/aos.js',
      './node_modules/swiper/swiper-bundle.min.js'
    ]
  )
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('./src/assets/js'))
  .pipe(browserSync.stream())
}

gulp.task('pluginsJS', pluginsJS)

const pluginsCSS = () => {

  return gulp.src(
    [
      './node_modules/aos/dist/aos.css',
      './node_modules/swiper/swiper.min.css'
    ]
  )
  .pipe(concat('plugins.css'))
  .pipe(gulp.dest('./src/assets/css'))
  .pipe(browserSync.stream())
}

gulp.task('pluginsCSS', pluginsCSS)

const createServer =  () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  })
}

gulp.task('server', createServer)

const watchTasks = () => {
  gulp.watch('./src/assets/scss/**/*.scss', builderSass)
  gulp.watch('./src/*.html').on('change', browserSync.reload)
  gulp.watch('./src/assets/js/scripts/*.js', builderJS)
  gulp.watch([ 
    './node_modules/aos/dist/aos.js',
    './node_modules/swiper/swiper-bundle.min.js'
  ], pluginsJS)

  gulp.watch([ 
    './node_modules/aos/dist/aos.css',
    './node_modules/swiper/swiper.min.css'
  ], pluginsCSS)
}

gulp.task('watch', watchTasks)

gulp.task('default', gulp.parallel('watch', 'server', 'sass', 'js', 'pluginsJS', 'pluginsCSS'))
