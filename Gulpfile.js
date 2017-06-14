var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');


gulp.task('compile-less', function(){
	gulp.src('./css/styles.less')
	.pipe(less())
	.pipe(gulp.dest('./css'))
})

gulp.task('watch', function(){
	gulp.watch(['./css/styles.less'], ['compile-less'])
})

gulp.task('default', ['watch', 'compile-less'])
