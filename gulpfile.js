var gulp = require('gulp')
var karma = require('gulp-karma')
var browserify  = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify')
gulp.task('build',function(){
    gulp.src('src/main.js')
        .pipe(browserify({
            standalone:'TplRender'
        }))
        .pipe(rename('TplRender.js'))
        .pipe(gulp.dest('build'))
        .pipe(rename('TplRender.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
})
gulp.task('test',['build'],function(){
    return gulp.src(['test/lib/jquery-1.11.1.js','test/lib/jasmine-jquery.js',
                    'build/TplRender.js','test/*.test.js','test/fixtures/*.html'])
        .pipe(karma({
            configFile:'karma.conf.js',
            action:'watch'
            //action:'run'
        }))
        .on('error',function(err){
            throw err;
        })
})