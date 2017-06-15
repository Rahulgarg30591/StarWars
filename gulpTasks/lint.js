import gulp from 'gulp';
import eslint from 'gulp-eslint';

// Linting
gulp.task('lint', () => {
    return gulp.src('/public/**/*.jsx')
    .pipe(eslint())
    .pipe(eslint.format());
});
