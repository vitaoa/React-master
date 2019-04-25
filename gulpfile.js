/**
 * Created by vita on 2017/6/2.
 */
var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var less = require('gulp-less');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');



// 具体项目文件目录
var CUR_PATH =   'react-component/APP/GTS2/';
var SRC_DIR = CUR_PATH + 'src/';     // 源文件目录
var LESS_DIR = SRC_DIR + 'less/'; // 样式预处理文件目录
var JSX_DIR = SRC_DIR + 'jsx/'; // 脚本文件目录
var IMG_DIR = SRC_DIR + 'images/'; // 图片文件目录
var DIST_DIR = CUR_PATH + 'dist/';   // 文件处理后存放的目录

gulp.task('less',function(){
    return gulp.src(LESS_DIR + '*.less')
        .pipe(less())
        .pipe(gulp.dest(DIST_DIR + 'css'));
});
gulp.task('copyimages', function () {
    gulp.src(SRC_DIR+'images/**/*')
        .pipe(gulp.dest(DIST_DIR+'images'));
});
gulp.task('jsxtojs',['less','copyimages'], function () {
    return gulp.src(JSX_DIR + '*.jsx')
        .pipe(react())
        .pipe(gulp.dest(JSX_DIR));
});
//gulp.src('script/lib/*.js', {base:'script'}) //配置了base参数，此时base路径为script
//	.pipe(gulp.dest('build')) //假设匹配到的文件为script/lib/jquery.js,此时生成的文件路径为 build/lib/jquery.js
gulp.task('jsconcat',['jsxtojs'], function() {
    return gulp.src(JSX_DIR + '*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest(JSX_DIR));
});
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//清除空格，压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有的空属性 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        preserveLineBreaks:true,
        trimCustomFragments:true,
        minifyJS: false,//压缩页面JS
        minifyCSS: false//压缩页面CSS
    };
    gulp.src(SRC_DIR + 'html/!(*.min).html')
        .pipe(htmlmin(options))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(DIST_DIR));
});


//项目运行
gulp.task('server',['jsxtojs'],function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    console.log(event.path); //变化的文件的路径
    gulp.watch(JSX_DIR+'*.jsx', ['jsxtojs']);
    gulp.watch(LESS_DIR+'*.less', ['less']);
});