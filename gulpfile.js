
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
const sass = require('gulp-sass');
const base64 = require('gulp-base64');
const cssFormat = require('gulp-css-format');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const env = process.env.NODE_ENV;
const babel = require('rollup-plugin-babel');

//---------------------------------------参数声明----------------------------//
const root_DIR = './';     // 项目根目录
const fileinclude_DIR = './source/';   // 源文件目录
// const DIST_DIR = './dist/';   // 文件输出目录
const SASS_DIR =   './scss/'; // 样式预处理文件目录

// 具体项目文件目录
var CUR_PATH = 'ID/app/';
// var CUR_PATH =   'react-component/APP/GTS2/';

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
// gulp.task('jsxtojs',['less','copyimages'], function () {
//     return gulp.src(JSX_DIR + '*.jsx')
//         .pipe(react())
//         .pipe(gulp.dest(JSX_DIR));
// });
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
// gulp.task('server',['jsxtojs'],function(event){
//     console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
//     console.log(event.path); //变化的文件的路径
//     gulp.watch(JSX_DIR+'*.jsx', ['jsxtojs']);
//     gulp.watch(LESS_DIR+'*.less', ['less']);
// });

//---------------------------------------scss编译----------------------------//
const STYLENAME = 'index'; //项目样式名
// const STYLENAME = ['forex','icons','ielow'];
//  const STYLENAME = ['products','page'];
let STYLE_PATH = [];
let _SASSsrc = [];
let _CSSsrc = [];

if(STYLE_PATH.length>0){
    for(let i = 0;i<STYLE_PATH.length;i++){
        console.log(STYLE_PATH[i])
        _CSSsrc.push(root_DIR + STYLE_PATH[i] + '.css');
        _SASSsrc.push(SASS_DIR + STYLE_PATH[i] + '.scss');
    }
}else{
    if(STYLENAME.length>0 && STYLENAME instanceof Array){
        console.log(STYLENAME)
        for(let i = 0;i<STYLENAME.length;i++){
            _CSSsrc.push(root_DIR + CUR_PATH + 'css/' + STYLENAME[i] + '.css');
            _SASSsrc.push(SASS_DIR + CUR_PATH + 'css/' + STYLENAME[i] + '.scss');
        }
    }else{
        _CSSsrc.push(root_DIR + CUR_PATH + 'css/' + STYLENAME + '.css');
        _SASSsrc.push(SASS_DIR + CUR_PATH + 'css/' + STYLENAME + '.scss');
    }
}
console.log("_SASSsrc=========")
console.log(_SASSsrc);
// base64
gulp.task('picbase64:sass',function () {
    if(STYLE_PATH.length>0){
        return gulp.src(_SASSsrc, {base: SASS_DIR})
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(gulp.dest(root_DIR))
            .pipe(base64({
                extensions: ['png','svg',/\.jpg#datauri$/i],
                include:    ['/base64/'],
                maxImageSize:100*1024, // bytes
                debug: false
            }))
            .pipe(gulp.dest(root_DIR));
    }else{
        return gulp.src(_SASSsrc)
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(gulp.dest(root_DIR + CUR_PATH + 'css'))
            .pipe(base64({
                extensions: ['png','svg',/\.jpg#datauri$/i],
                include:    ['/base64/'],
                maxImageSize:100*1024, // bytes
                debug: true
            }))
            .pipe(gulp.dest(root_DIR + CUR_PATH + 'css'));
    }
});
// css格式化
gulp.task('css-format', ['picbase64:sass'],function() {
    if(STYLE_PATH.length>0){
        gulp.src(_CSSsrc, {base: './'})
            .pipe(cssFormat({tab:4,indent: 1, hasSpace: false}))
            .pipe(gulp.dest(root_DIR));
    }else{
        gulp.src(_CSSsrc)
            .pipe(cssFormat({tab:4,indent: 1, hasSpace: false}))
            .pipe(gulp.dest(root_DIR + CUR_PATH + 'css'));
    }
});
gulp.task('sass:watch',['css-format'],function(event){
    if(STYLE_PATH.length>0){
        gulp.watch(_SASSsrc, ['css-format']);
    }else{
        gulp.watch(SASS_DIR + CUR_PATH + '**/*.scss', ['css-format']);
    }
});

//---------------------------------------scss编译----------------------------//

//---------------------------------------打包----------------------------//
gulp.task('rollup',function () {
    return rollup.rollup({
            //入口
            input: fileinclude_DIR+JSX_DIR + 'test.jsx',
            plugins: [
                nodeResolve({
                    preferBuiltins: true
                }),
                replace({
                    'process.env.NODE_ENV': JSON.stringify(env)
                }),
                commonjs(),
                babel({
                    presets: [
                        ["@babel/preset-react"]
                    ]
                })
            ]
        }).then(bundle => {
            return bundle.write({
                file: './dist/js/rollup.js',
                format: 'umd',
                name: 'library',
                sourcemap: false
            });
        });
});
//---------------------------------------打包----------------------------//

