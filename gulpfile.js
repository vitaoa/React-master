
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');

/*css*/
const sass = require('gulp-sass');
const base64 = require('gulp-base64');
const cssFormat = require('gulp-css-format');
/*rollup*/
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const env = process.env.NODE_ENV;
const babel = require('rollup-plugin-babel');
/*html*/
const ejs  = require('gulp-ejs');
const glob = require("glob");
const c = require('child_process');
const path =require('path');
const http = require('http');
const fs = require('fs');

//---------------------------------------参数声明----------------------------//
const root_DIR = './';     // 项目根目录
const fileinclude_DIR = 'source/';   // 源文件目录
// const DIST_DIR = './dist/';   // 文件输出目录
const SASS_DIR =   'scss/'; // 样式预处理文件目录

// 具体项目文件目录
var CUR_PATH = 'ID/app/';
// var CUR_PATH =   'react-component/APP/GTS2/';

var SRC_DIR = CUR_PATH + 'src/';     // 源文件目录
var LESS_DIR = SRC_DIR + 'less/'; // 样式预处理文件目录
var JSX_DIR = SRC_DIR + 'jsx/'; // 脚本文件目录
var IMG_DIR = SRC_DIR + 'images/'; // 图片文件目录
var DIST_DIR = CUR_PATH + 'dist/';   // 文件处理后存放的目录
var EJS_DIR = 'generateHtmlTemple/';   // ejs模板引擎目录

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
        _SASSsrc.push(root_DIR+SASS_DIR + STYLE_PATH[i] + '.scss');
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
        _SASSsrc.push(root_DIR+SASS_DIR + CUR_PATH + 'css/' + STYLENAME + '.scss');
    }
}
console.log("_SASSsrc=========")
console.log(_SASSsrc);
// base64
gulp.task('picbase64:sass',function () {
    if(STYLE_PATH.length>0){
        return gulp.src(_SASSsrc, {base: root_DIR+SASS_DIR})
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
        gulp.watch(root_DIR+SASS_DIR + CUR_PATH + '**/*.scss', ['css-format']);
    }
});

//---------------------------------------scss编译----------------------------//


//---------------------------------------html编译----------------------------//
const globalHtml =0;
let HTMLNAME = 'test';//页面名称
if(globalHtml){
    HTMLNAME = '**/*';
}
let HTML_PATH = [];
let _HTMLpath=[];
if(HTML_PATH.length>0){
    for(let i = 0;i<HTML_PATH.length;i++){
        let HTMLdirs = glob.sync(root_DIR+fileinclude_DIR + HTML_PATH[i]+'*.{html,ejs}');
        // console.log(HTMLdirs)
        if(HTMLdirs.length>0){
            for(let i = 0;i<HTMLdirs.length;i++){
                _HTMLpath.push(HTMLdirs[i]);
            }
        }else{
            _HTMLpath.push(root_DIR+fileinclude_DIR +  HTML_PATH[i] + '.html');
        }
    }
}
// console.log(_HTMLpath)
var _url = {
    host:"http://172.30.10.52",
    port:8888,
    savePort:1111,
    path:"/ReactDev/"
};
var _src = _url.host+":"+_url.port+_url.path+fileinclude_DIR+SRC_DIR+HTMLNAME+'.html';
const _date = `${new Date().toLocaleDateString()}`;
const _dateYear = _date.split('-')[0];
const _dateMonth = _date.split('-')[1];
const _dateDay = _date.split('-')[2];

const cfg = require(root_DIR+fileinclude_DIR + 'datas/config.json');
let ejs_dirs = glob.sync(root_DIR+EJS_DIR + CUR_PATH + "/**/*.{html,ejs}");
if(_HTMLpath.length>0){
    ejs_dirs = _HTMLpath;
}
gulp.task('ejs',['rollup'], function() {
    ejs_dirs.filter(function (file) {
        return (file.endsWith('.ejs'));//过滤不是ejs文件
    }).forEach(function (file) {
        console.log(file)
        // let basename = path.basename(file);
        // let name = basename.substring(0, basename.length - 4)
        let name;
        let _lpNAME;
        if(_HTMLpath.length>0){
            name = file.replace(root_DIR+fileinclude_DIR,'').split('/')[0];
        }else{
            name = CUR_PATH.split('/')[0];
        }
        if(file.indexOf('/lp/')!=-1){
            _lpNAME = file.split('/lp/')[1].split('/')[0];
        }
        let value;
        if(cfg.hasOwnProperty(name)){//cfg 为 存放数据的配置文件
            value = cfg[name];
        } else {
            value = {}
        }
        // console.log(value)
        gulp.src(file, {base: root_DIR+EJS_DIR})
            .pipe(ejs({msg:value,dateYMD:{"year":_dateYear,"month":_dateMonth,"day":_dateDay},infos:{"url":_src},lpNAME:_lpNAME}))
            .pipe(rename({ extname: '.html' }))
            .pipe(gulp.dest(root_DIR+EJS_DIR));
    })
});
//下载html文件，访问路径http://172.30.10.52:1111（_url.host+":"+_url.savePort）
//文件名：_src.split('/')[_src.split('/').length-1]
gulp.task('copyHtml',['ejs'], function() {
    ejs_dirs.filter(function (file) {
        return (file.endsWith('.html'));//过滤不是ejs文件
    }).forEach(function (file) {
        console.log(file)
        let _templeSrc = _url.host+":"+_url.port+_url.path+file.replace(root_DIR,'');
        console.log(_templeSrc);
        c.exec('start '+_templeSrc);
    })
});
//html文件另存为
gulp.task('saveAsHtml',['copyHtml'], function() {
    var _saveUrl = _url.host+":"+_url.savePort+"/"+_src.split('/')[_src.split('/').length-1];
    console.log(_saveUrl);
    http.get(_saveUrl,function(res){  //通过get方法获取对应地址中的页面信息
        var chunks = [];
        var size = 0;
        res.on('data',function(chunk){   //监听事件 传输
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end',function(){  //数据传输完
            var data = Buffer.concat(chunks,size);
            var html = "<!DOCTYPE html>\n\r"+data.toString();

            // 将抓取的内容保存到本地文件中
            let dirpath = root_DIR+CUR_PATH;
            let txt = html.replace(/<script[^>]*rollup.js[^>]*><\/script>[\r\n]/,'');

            mkdirs(dirpath,function () {
                fs.writeFile(dirpath+HTMLNAME+".html",txt,function (err) {
                    if (err){
                        return false;
                    } else{
                        console.log("写入成功");
                    }
                }) ;
            });
        });
    }).on('error', function(err) {
        console.log('错误信息：' + err)
    });
});

function mkdirs(dirpath,callback){
    fs.exists(dirpath, function(exists) {
        if(exists) {
            callback();
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), function(){
                fs.mkdir(dirpath,callback);
            });
        }
    })
}

//---------------------------------------html编译----------------------------//

//---------------------------------------打包----------------------------//
gulp.task('rollup',function () {
    return rollup.rollup({
            //入口
            input: root_DIR+fileinclude_DIR+JSX_DIR + 'test.jsx',
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
                sourcemap: false
            });
        });
});
var htmlCode = require('html-code');

gulp.task('html:Code',function () {
    return gulp.src(root_DIR+fileinclude_DIR+SRC_DIR+'test.html')
        .pipe(htmlCode({
            index:1
        }))
        .pipe(gulp.dest('./dist/'));
});

//---------------------------------------打包----------------------------//

