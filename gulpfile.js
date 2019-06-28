var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var concat        = require('gulp-concat');



function conwert(done) {
	gulp.src('./src/sass/*.sass')
		.pipe(sass({
			errorLogToConsole: true
			// outputStyle: 'compressed' Сжимает сss код- будет без пробелов и в одну строчку
		}))
		.on('error', console.error.bind(console))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(concat("style.css"))
		.pipe(gulp.dest('./src/css/'))
		.pipe(browserSync.stream());
done();
}
// БРАУЗЕР АВТОМАТОМ  МОЖЕТ НЕ ОБНОВЛЯТЬ, А ИНОГДА РАБОТАЕТ!!!!
function browser(done) {
	browserSync.init({
		server: {
			baseDir: "./src/"
		},
		port: 3000
	})
	done();
}

function browserReload(done) {
	browserSync.reload();
	done();
}

function watchFiles () {
	gulp.watch("./src/sass/*", conwert);
	gulp.watch("./src/**/*.html", browserReload);
	gulp.watch("./src/**/*.css", browserReload);
	gulp.watch("./src/**/*.js", browserReload);
	gulp.watch("./src/**/*.php", browserReload);
}


gulp.task('default', gulp.parallel(browser, watchFiles));