/**
 * ========================================================
 *                       PACKAGE REQUIREMENT
 * ========================================================
 */

/* Gulp */
const { src, dest, parallel, watch, series } = require( 'gulp' );
const changed = require( 'gulp-changed' ); /* Detect and replace only changed file */
const scssCompiler = require( 'gulp-sass' );
const cmq = require( 'gulp-combine-media-queries' );
const babel = require( 'gulp-babel' );
const cssMinifier = require( 'gulp-csso' );
const jsMinifier = require( 'gulp-minify' );
const imagemin = require( 'gulp-imagemin' );

/* Others */
const browser = require( 'browser-sync' );
const del = require( 'delete' );

/* ===================================================== */

/**
 * ========================================================
 *                       CONFIGURATIONS
 * ========================================================
 */
const router = { /* Path */
  root: {
    src: 'src'
    , dest: 'dest'
  }
  , html: {
    src: [
      'src/**/*'
      , '!src/assets/js/*'
      , '!src/assets/img/*'
      , '!src/assets/css/*'
      , '!src/assets/scss/*'
      , '!src/assets/lib/*'
    ]
    , dest: 'dest'
  }
  , scss: {
    src: 'src/assets/scss/**/*.scss'
    , dest: 'dest/assets/scss'
  }
  , css: {
    src: 'src/assets/scss/style.scss'
    , other: 'src/assets/css/**/*.css'
    , dest: 'dest/assets/css'
  }
  , js: {
    src: 'src/assets/js/src/**/*.js'
    , dest: 'dest/assets/js/src'
    , production: 'dest/assets/js'
  }
  , img: {
    src: ['src/assets/img/**/*', 'src/assets/**/img/**/*']
    , dest: 'dest/assets/img'
  }
  , lib: {
    src: 'src/assets/lib/**/*'
    , dest: 'dest/assets/lib'
  }
  , cssMinify: {
    src: 'dest/assets/css/**/*.css'
    , dest: 'dest/assets/css'
  }
}

const settings = { /* Plugin settings */
  browser: {
    server: {
      baseDir: router.root.dest
      , proxy: 'localhost:3000'
    }
  }
  , scss: {
    outputStyle: 'compressed'
  }
  , js: {
    babel: {
      presets: ['@babel/env']
    }
    , minify: {
      ext: {
        src: '.js'
        , min: '.js'
      }
      , compress: true
      , noSource: true
    }
  }
  , img: {
    // interlaced: true
    // , progressive: true
    optimizationLevel: 5
  }
}

/* ===================================================== */

/**
 * ========================================================
 *                       WATCHING
 * ========================================================
 */
function buildHTML() { /* Copy HTML file */
  return src( router.html.src )
        .pipe( changed( router.html.dest ) )
        .pipe( dest( router.html.dest ) );
}

function buildSCSS() { /* Copy SCSS file */
  return src( router.scss.src )
        // .pipe( changed( router.scss.dest ) )
        .pipe( dest( router.scss.dest ) );
}

function buildCSS() { /* Convert SCSS to CSS */
  return src( router.css.src )
        .pipe( 
          scssCompiler( settings.scss )
          .on( 'error', scssCompiler.logError ) 
        )
        // .pipe( changed( router.css.dest ) )
        .pipe( dest( router.css.dest ) );
}

function buildJS() { /* Copy JS file */
  return src( router.js.src )
        .pipe( dest( router.js.dest ) )
        .pipe( changed( router.js.dest ) )
        .pipe( dest( router.js.production ) );
}

function buildImg() { /* Copy Images */
  return src( router.img.src )
        .pipe( changed( router.img.dest ) )
        .pipe( dest( router.img.dest ) );
}

function buildLib() { /* Copy Libraries */
  return src( router.lib.src )
        .pipe( changed( router.lib.dest ) )
        .pipe( dest( router.lib.dest ) );
}

function reload() { /* Reload browser */
  return src( 'dest' ).pipe( browser.reload( { stream: true } ) );
}

exports.watch = function() { /* >>> gulp watch */
  browser.init( settings.browser );

  /* Watch files */
  watch( router.html.src, series( buildHTML, reload ) );
  watch( router.scss.src, series( buildSCSS, buildCSS, reload ) );
  watch( router.js.src, series( buildJS, reload ) );
  watch( router.img.src, series( buildImg, reload ) );
  watch( router.lib.src, series( buildLib, reload ) );
};

/* ===================================================== */

/**
 * ========================================================
 *                       MINIFYING
 * ========================================================
 */
function minifyImage() { /* Minify images */
  return src( router.img.src )
        .pipe( imagemin( settings.img ) )
        .pipe( dest( router.img.dest ) );
}
function minifyJS() {
  /**
   * Translate to Babel
   * Minify JS
   */
  return src( router.js.src )
        .pipe( babel( settings.js.babel ) )
        .pipe( jsMinifier( settings.js.minify ) )
        .pipe( dest( router.js.production ) );
}

function minifyCSS() {
  /**
   * Convert SCSS to CSS
   * Remove duplicated media queries
   * Minify CSS
   */
  return src( router.scss.src )
        .pipe( 
          scssCompiler( settings.scss )
          .on( 'error', scssCompiler.logError ) 
        )
        .pipe( cmq() )
        .pipe( cssMinifier() )
        .pipe( dest( router.css.dest ) );
}

exports.minifyimage = minifyImage; /* >>> gulp minifyimage */
// exports.minify = parallel( minifyCSS, minifyJS ); /* >>> gulp minify */
exports.minify = parallel( minifyJS ); /* >>> gulp minify */
/* ===================================================== */

/**
 * ========================================================
 *                       CLEAN
 * ========================================================
 */
function clean() { /* Delete Dest folder */
  return del.promise( [router.root.dest] );
}

exports.clean = clean; /* >>> gulp clean */

/* ===================================================== */

/**
 * ========================================================
 *                       DEFAULT
 * ========================================================
 */
function buildOtherCSS() { /* Just move these files */
  return src( router.css.other )
        .pipe( dest( router.css.dest ) );
}
exports.default = parallel( /* >>> gulp */ 
  clean
  , buildHTML
  , buildOtherCSS
  , buildSCSS
  , buildCSS
  , buildJS
  , buildImg
  , buildLib 
);

/* ===================================================== */