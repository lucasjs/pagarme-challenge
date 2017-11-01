const gulp = require('gulp');
const stylint = require('gulp-stylint');
const stylus = require('gulp-stylus');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const connect = require('gulp-connect');

gulp.task('html', () =>
	gulp.src('./src/views/*.html')
	.pipe(connect.reload())
);

gulp.task('stylint', () =>
	gulp.src('./src/styles/*.styl')
	.pipe(stylint({
		rules: {
			"brackets": "always",
			"colons": "always",
			"commaSpace": "always",
			"parenSpace": "never",
			"quotePref", "double",
			"semicolons": "always",
			"sortOrder": "alphabetical"
		}
	}))
	.pipe(stylint.reporter());
);

gulp.task('stylus', () =>
	gulp.src('./src/styles/*.styl')
	.pipe(stylus({
		compress: true
	}))
	.pipe(gulp.dest('./build/css'))
	.pipe(connect.reload())
);

gulp.task('eslint', () =>
	gulp.src('./src/js/*.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(connect.reload())
);

gulp.task('babel', () =>
	gulp.src('./src/js/*.js')
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(gulp.dest('./build/js'))
	.pipe(connect.reload())
);

gulp.task('imagemin', () =>
	gulp.src('./src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./build/img'))
	.pipe(connect.reload())
);

gulp.task('watch', () =>
	gulp.watch('./src/views/*.html', ['html'])
	gulp.watch(['./src/styles/*.styl'], ['stylint', 'stylus'])
	gulp.watch(['./src/js/*.js'], ['eslint'])	
	gulp.watch(['./src/img/*.*'], ['imagemin'])	
);

gulp.task('connect', () =>
	connect.server({
		root: './src/views',
		livereload: true,
		port: 8000
	});
);

gulp.task('build', ['html', 'stylint', 'stylus', 'imagemin', 'eslint', 'babel']);
gulp.task('server', ['connect', 'watch']);