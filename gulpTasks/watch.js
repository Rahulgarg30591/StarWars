import gulp from 'gulp';
import runSequence from 'run-sequence';

// Configuration
const src = 'public';
const config = {
    port: 4000,
    paths: {
        js: src + '/**/*.jsx',
    },
};

// Re-runs specific tasks when certain files are changed
gulp.task('watch', () => {
    gulp.watch(config.paths.js, () => {
        runSequence('lint', 'test');
    });
});
