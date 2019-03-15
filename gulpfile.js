const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const projects = {
    core: ts.createProject('./packages/core/tsconfig.json'),
    typeorm: ts.createProject('./packages/typeorm/tsconfig.json'),
};

const projectKeys = Object.keys(projects);

projectKeys.forEach(project => {
    gulp.task(project, () => {
        return projects[project]
            .src()
            .pipe(projects[project]())
            .pipe(gulp.dest(`dist/${project}`));
    });
});

projectKeys.forEach(project => {
    gulp.task(`${project}:dev`, () => {
        return projects[project]
            .src()
            .pipe(projects[project]())
            .pipe(gulp.dest(`node_modules/@entity-factory/${project}`));
    });
});

projectKeys.forEach(project => {
    gulp.task(`${project}-clean:dev`, done => {
        gulp.src(
            `node_modules/@entity-factory/${project}/**/*.{d.ts,js.map,js}`,
        ).pipe(clean({ force: true }));
        done();
    });
});

gulp.task('build', gulp.series(projectKeys));

gulp.task(
    'build:dev',
    gulp.series(projectKeys.map(project => `${project}:dev`)),
);
gulp.task(
    'clean:dev',
    gulp.series(projectKeys.map(project => `${project}-clean:dev`)),
);

gulp.task('dev', gulp.series(['clean:dev', 'build:dev']));

gulp.task('copy', () => {
    gulp.src(['README.md', '.npmignore', 'LICENSE'])
        .pipe(gulp.dest(`packages/core`))
        .pipe(gulp.dest(`packages/typeorm`));
});
