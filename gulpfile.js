const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const projects = {
    core: ts.createProject('./packages/core/tsconfig.json'),
    typeorm: ts.createProject('./packages/typeorm/tsconfig.json'),
};

Object.keys(projects).forEach(project => {
    gulp.task(project, () => {
        return projects[project]
            .src()
            .pipe(projects[project]())
            .pipe(gulp.dest(`dist/${project}`));
    });
});

gulp.task('build', gulp.series(Object.keys(projects)));

gulp.task('copy', () => {
    gulp.src(['README.md', '.npmignore', 'LICENSE'])
        .pipe(gulp.dest(`packages/core`))
        .pipe(gulp.dest(`packages/typeorm`));
});
