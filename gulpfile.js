const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const projects = {
    core: ts.createProject('./packages/core/tsconfig.json'),
    typeorm: ts.createProject('./packages/typeorm/tsconfig.json'),
};

const projectKeys = Object.keys(projects);

// production clean
projectKeys.forEach(project => {
    gulp.task(`${project}-clean:prod`, done => {
        return gulp
            .src([`packages/${project}/**/*.{d.ts,js.map,js}`])
            .pipe(clean({ read: false }));
    });
});

// production build
projectKeys.forEach(project => {
    gulp.task(`${project}-build:prod`, () => {
        return projects[project]
            .src()
            .pipe(projects[project]())
            .pipe(gulp.dest(`packages/${project}`));
    });
});

// dev clean
projectKeys.forEach(project => {
    gulp.task(`${project}-clean:dev`, done => {
        return gulp
            .src(
                `node_modules/@entity-factory/${project}/**/**/*.{d.ts,js.map,js}`,
            )
            .pipe(clean({ force: true }));
    });
});

// dev build
projectKeys.forEach(project => {
    gulp.task(`${project}-build:dev`, () => {
        return projects[project]
            .src()
            .pipe(projects[project]())
            .pipe(gulp.dest(`node_modules/@entity-factory/${project}`));
    });
});

gulp.task(
    'build:prod',
    gulp.series(projectKeys.map(project => `${project}-build:prod`)),
);
gulp.task(
    'clean:prod',
    gulp.series(projectKeys.map(project => `${project}-clean:prod`)),
);

gulp.task(
    'build:dev',
    gulp.series(projectKeys.map(project => `${project}-build:dev`)),
);
gulp.task(
    'clean:dev',
    gulp.series(projectKeys.map(project => `${project}-clean:dev`)),
);

gulp.task('prod', gulp.series(['clean:prod', 'build:prod']));
gulp.task('dev', gulp.series(['clean:dev', 'build:dev']));

gulp.task('copy', () => {
    return gulp
        .src(['.npmignore', 'LICENSE'])
        .pipe(gulp.dest(`packages/core`))
        .pipe(gulp.dest(`packages/typeorm`));
});

gulp.task('copy:readme', () => {
    return gulp.src(['README.md']).pipe(gulp.dest(`packages/core/`));
});
