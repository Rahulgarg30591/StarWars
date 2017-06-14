import gulp from 'gulp';
import eslint from 'gulp-eslint';

// Configuration
const src = '../public';
const config = {
    port: 4000,
    paths: {
        js: src + '/**/*.jsx',
    },
};

// Linting
gulp.task('lint', () => {
    return gulp.src(config.paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});
