var gulp = require('gulp');
var bower = require('main-bower-files');
var concat = require('gulp-concat');

gulp.task('bower_js_min', function() {  
    var js = bower({ filter: new RegExp('.*js$', 'i') });
    gulp.src(js)
      .pipe(concat('bower_components.js'))
      .pipe(gulp.dest('./build'));
});  
gulp.task('js_min', function() {  
    gulp.src(['./js/components/*.js','./js/*.js'])
      .pipe(concat('index.js'))
      .pipe(gulp.dest('./build'));
});  

gulp.task('default', ['bower_js_min','js_min']);
