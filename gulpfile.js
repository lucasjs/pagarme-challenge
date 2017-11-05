const gulp = require('gulp');
const stylint = require('gulp-stylint');
const stylus = require('gulp-stylus');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const ghPages = require('gulp-gh-pages');

gulp.task('html', () =>
	gulp.src('./src/views/*.html')
	.pipe(gulp.dest('./build'))
	.pipe(connect.reload())
);

gulp.task('stylint', () =>
	gulp.src(['./src/styles/*.styl', './src/styles/**/*.styl'])
	.pipe(stylint({
		rules: {
			"brackets": "always",
			"colons": "always",
			"commaSpace": "always",
			"parenSpace": "never",
			"semicolons": "always",
			"sortOrder": "alphabetical"
		}
	}))
	.pipe(stylint.reporter())
);

gulp.task('stylus', () =>
	gulp.src('./src/styles/*.styl')
	.pipe(stylus({
		compress: true
	}))
	.pipe(gulp.dest('./build/css'))
	.pipe(connect.reload())
);

gulp.task('svg', () =>
	gulp.src('./src/svg/*.svg')
	.pipe(gulp.dest('./build/svg'))
	.pipe(connect.reload())
);

gulp.task('imagemin', () =>
	gulp.src('./src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./build/img'))
	.pipe(connect.reload())
);

gulp.task('watch', () => {
	gulp.watch(['./src/views/*.html'],['html'])
	gulp.watch(['./src/styles/*.styl', './src/styles/**/*.styl'],['stylint', 'stylus'])
	gulp.watch(['./src/js/*.js'],['eslint'])
	gulp.watch(['./src/svg/*.svg'],['svg'])	
	gulp.watch(['./src/img/*.*'],['imagemin'])	
});

gulp.task('connect', () =>
	connect.server({
		root: './build',
		livereload: true,
		port: 8000
	})
);

gulp.task('ghPages', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('build', ['html', 'stylint', 'stylus', 'svg', 'imagemin']);
gulp.task('server', ['connect', 'watch']);
gulp.task('deploy', ['build', 'ghPages']);