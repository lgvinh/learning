let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    pug = require('gulp-pug'),
    file = require('gulp-file'),
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    htmlbeautify = require('gulp-html-beautify'),
    fs = require('fs'),
    dotenv = require('dotenv').config(),
    browserSync = require('browser-sync').create();

// Set the options for sass compiler 
const SASS_OPTIONS = {
    outputStyle: 'nested',
    precision: 10,
    includePaths: ['.'],
    onError: console.error.bind(console, 'Sass error:')
};

// Set the options for HTML Beautify
const HTML_BEAUTIFY_OPTIONS = {
    "indent_size": 4,
    "indent_char": " ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
}

// Rules for Eslint
const ESLINT_RULES = {
    'indent': ['error', 4],
    'semi': ['error', 'always'],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'camelcase': ['error'],
    'no-var': ['error'],
    'max-len': 'off',
    'curly': ['error', 'multi-or-nest'],
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'linebreak-style': 'off',
    'yoda': 'error',
    'no-return-await': 'off',
    'space-infix-ops': 'error',
    'eol-last': ['error', 'always'],
    'no-useless-constructor': 'off',
    'switch-colon-spacing': ['error', {'before': false, 'after': true}],
    'key-spacing': ['error', {'beforeColon': false, 'afterColon': true}],
    'eqeqeq': ['error', 'always', {'null': 'ignore'}],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    'keyword-spacing': ['error', {'before': true, 'after': true}],
    'arrow-spacing': ['error', {'before': true, 'after': true}],
    'brace-style': ['error', 'stroustrup'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'object-curly-spacing': ['error', 'never', {'objectsInObjects': false, 'arraysInObjects': false}],
    'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
    }],
    'sort-imports': ['error', {
        'ignoreCase': false,
        'ignoreMemberSort': false,
        'ignoreDeclarationSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }]
}

// Task for compile & minify the main sass file
gulp.task('sass', function() {
    return gulp.src([
        './node_modules/bootstrap/scss/bootstrap.scss', 
        './src/sass/main.scss'
    ])
        // Compile sass file
        .pipe(sass(SASS_OPTIONS))
        // Autoprefix css for cross browser compatibility
        .pipe(autoprefixer())
        // Minify the css files
        .pipe(csso())
        // Ouptut css
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js', 
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/popper.js/dist/popper.min.js',
        './src/scripts/*.js'
    ])
        // Babel compiler
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // Minify the js files
        .pipe(uglify())
        // Output js
        .pipe(gulp.dest("./src/assets/js"))
        .pipe(browserSync.stream());
});

gulp.task('eslint', function() {
    return gulp.src(['./src/scripts/**/*'])
        .pipe(eslint({
            parserOptions: {
                ecmaVersion: 6,
                sourceType: 'module'
            },
            rules: ESLINT_RULES,
            globals: [
                'jQuery',
                '$'
            ],
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Task for compile the pug files
gulp.task('pug', function() {
    return gulp.src('./src/pugs/*.pug')
        // Compile pug file
        .pipe(pug({
            pretty: true
        }))
        .pipe(htmlbeautify(HTML_BEAUTIFY_OPTIONS))
        .pipe(gulp.dest('./src'));
});

// Prepare build - Task copy the assets folder to build 
gulp.task('cp-assets-folder', function() {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets'));
});

// Prepare build -  Task copy all the *.html files to build 
gulp.task('cp-html-files', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'));
});

// Prepare build - Create a now.json file
gulp.task('cr-now-json', function() {
    // Throw error if no .env file
    if (!fs.existsSync('./.env')) 
        throw new Error(`\x1b[31mFailed to generate now.json file! Missing\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile! Create a\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile first from the sample file\x1b[0m \x1b[33m.env.sample\x1b[0m`);

    // Throw error if no PROJECT_NAME or PROJECT_VERSION value
    if (!process.env.PROJECT_NAME || !process.env.PROJECT_VERSION)
        throw new Error(`\x1b[31mFailed to generate now.json file! Missing\x1b[0m \x1b[33mPROJECT_NAME\x1b[0m \x1b[31mor\x1b[0m \x1b[33mPROJECT_VERSION\x1b[0m \x1b[31mvalue in\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile!\x1b[0m`);

    // Throw error if the PROJECT_NAME value is same as .env.sample template name
    if (process.env.PROJECT_NAME === 'Namtech Pug Sass Kit')
        throw new Error(`\x1b[31mFailed to generate now.json file! Must modify the\x1b[0m \x1b[33mPROJECT_NAME\x1b[0m \x1b[31mvalue before continue!\x1b[0m `);

    let fileName = 'now.json';
    let contents = `
{
    "name": "${process.env.PROJECT_NAME}",
    "version": ${process.env.PROJECT_VERSION}
}
`;

    return file(
        fileName, 
        contents, 
        { src: true }
    ).pipe(gulp.dest('./build'));
});

// Task build - `gulp build` into terminal for building the project
gulp.task('build', gulp.series(
    'cp-assets-folder', 
    'cp-html-files',
    'cr-now-json'
));

// Task serve - type `gulp serve` into terminal for watching the project
gulp.task('serve', gulp.series('sass', 'eslint', 'js', 'pug', function() {
    browserSync.init({ 
        server: './src',
        port: 8000
    });

    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch(['./src/scripts/*.js'], gulp.series('eslint', 'js'));
    gulp.watch('./src/pugs/**/*', gulp.series('pug'));
    gulp.watch('./src/*.html').on('change', browserSync.reload);
}));

// Default task - run the `gulp serve` when type only `gulp`
gulp.task('default', gulp.series('serve'));
