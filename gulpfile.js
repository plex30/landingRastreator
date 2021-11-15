const { src, dest, parallel, series, watch } = require('gulp');

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
/* const imagemin = require('gulp-imagemin'); */
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();



  // Clean assets


const clear = () => {

  return src('./asstes/*', {
    read: false
  })
  .pipe(clean());
}


 // JS function

 const js = () => {

   const source = './src/js/*.js';

   return src(source)
   .pipe(changed(source))
   .pipe(concat('bundle.js'))
   .pipe(uglify())
   .pipe(rename({
     extname:'.min.js'
     
   }))
   .pipe(dest('./assets/js/'))
   .pipe(browsersync.stream())
 }


 // CSS function

 const css = () => {

  const source = './src/scss/*.scss';

  return src(source)
      .pipe(changed(source))
      .pipe(sass())
      .pipe(autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
          cascade: false
      }))
      .pipe(rename({
          extname: '.min.css'
      }))
      .pipe(cssnano())
      .pipe(dest('./assets/css/'))
      .pipe(browsersync.stream());
}


 // Optimize images

/* const img = () => {

  return src('./src/img/*')
      .pipe(imagemin())
      .pipe(dest('./assets/img'));
}
 */
// Watch files

const watchFiles = () => {

  watch('./src/scss/*', css);
  watch('./src/js/*', js);
  /* watch('./src/img/*', img); */
}

// BrowserSync

const browserSync = () => {

  browsersync.init({
      server: {
          baseDir: './'
      },
      port: 3000
  });
}

gulp.task("heroku:production", function(){
  console.log('hello'); 
});

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css));