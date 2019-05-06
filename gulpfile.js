
var gulp = require('gulp');
// var concat = require('gulp-concat');
// var less = require('gulp-less');
// var htmlmin = require('gulp-htmlmin');
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
const clean = require('gulp-clean');
const htmlbeautify = require('gulp-html-beautify');

//---------------------------------------参数声明----------------------------//
const root_DIR = './';     // 项目根目录
const source_DIR = 'source/';   // 源文件目录
const Download_DIR = 'dist/';   // 文件下载保存目录
const SASS_DIR =   'scss/'; // 样式预处理文件目录

// 具体项目文件目录
var CUR_PATH = 'ID/app/';
// var CUR_PATH =   'react-component/APP/GTS2/';

var SRC_DIR = 'src/';     // 源文件目录
var JSX_DIR = 'jsx/'; // 脚本文件目录
var IMG_DIR = 'images/'; // 图片文件目录
// var DIST_DIR = 'dist/';   // 文件处理后存放的目录


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
        let HTMLdirs = glob.sync(root_DIR+source_DIR + HTML_PATH[i]+'*.{html,ejs}');
        // console.log(HTMLdirs)
        if(HTMLdirs.length>0){
            for(let i = 0;i<HTMLdirs.length;i++){
                _HTMLpath.push(HTMLdirs[i]);
            }
        }else{
            _HTMLpath.push(root_DIR+source_DIR +  HTML_PATH[i] + '.html');
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
var _src = _url.host+":"+_url.port+_url.path+Download_DIR+CUR_PATH+HTMLNAME+'.html';
const _date = `${new Date().toLocaleDateString()}`;
const _dateYear = _date.split('-')[0];
const _dateMonth = _date.split('-')[1];
const _dateDay = _date.split('-')[2];

const cfg = require(root_DIR+source_DIR + 'datas/config.json');
let ejs_dirs = glob.sync(root_DIR+source_DIR+CUR_PATH + "/**/*.{html,ejs}");
if(_HTMLpath.length>0){
    ejs_dirs = _HTMLpath;
}
gulp.task('ejs',function(cb) {
    ejs_dirs.filter(function (file) {
        return (file.endsWith('.ejs'));//过滤不是ejs文件
    }).forEach(function (file) {
        let name;
        let _lpNAME;
        if(_HTMLpath.length>0){
            name = file.replace(root_DIR+source_DIR,'').split('/')[0];
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
        return gulp.src(file, {base: root_DIR+source_DIR})
            .pipe(ejs({msg:value,dateYMD:{"year":_dateYear,"month":_dateMonth,"day":_dateDay},rollupOps:{"url":_url.host+":"+_url.port+_url.path + Download_DIR + CUR_PATH + 'js/rollup.js',"title":HTMLNAME},lpNAME:_lpNAME}))
            .pipe(rename({ extname: '.html' }))
            .pipe(gulp.dest(root_DIR+Download_DIR));
    })
    cb();
});

/*
* 将react页面保存为静态html文件(task:saveAsHtml)
* */
//第一步:清除下载的旧的html文件
gulp.task("clean:downloadHtml", function(){
    return gulp.src(['C:/Users/GA/Downloads/*.html'])
        .pipe(clean({
            options:{force:true}
        }));
});
//第二步:编译ejs下载模板
var Temple_DIR = 'generateHtmlTemple/';   // ejs模板引擎目录
var Temple_Name = 'temple.ejs'; // 指定ejs模板文件
gulp.task('ejs:temple', function() {
    return gulp.src(root_DIR+Temple_DIR+Temple_Name, {base: root_DIR+Temple_DIR})
        .pipe(ejs({templeOps:{"url":_src,"title":HTMLNAME}}))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest(root_DIR+Temple_DIR));
});
//第三步:下载html文件
//下载html文件，访问路径http://172.30.10.52:1111（_url.host+":"+_url.savePort）
//文件名：_src.split('/')[_src.split('/').length-1]
gulp.task('downloadHtml',gulp.series("clean:downloadHtml","ejs:temple", function(cb) {
    let _templeSrc = _url.host+":"+_url.port+_url.path+Temple_DIR+Temple_Name.replace('.ejs','.html');
    // console.log(_templeSrc);
    c.exec('start firefox '+_templeSrc);
    cb();
}));
//第四步:html文件另存到项目打包文件并格式化
gulp.task('saveAsHtml',gulp.series('downloadHtml',function (cb) {
    var _savePage = _src.split('/')[_src.split('/').length-1];
    // console.log(_savePage);
    setTimeout(function () {
        c.exec('taskkill /IM firefox.exe');
        http.get(_url.host+":"+_url.savePort+"/"+_savePage,function(res){  //通过get方法获取对应地址中的页面信息
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
                // console.log(txt)
                mkdirs(dirpath,function () {
                    fs.writeFile(dirpath+HTMLNAME+".html",txt,function (err) {
                        if (err){
                            console.log(err)
                            return false;
                        } else{
                            console.log("写入成功");
                            //html文件格式化
                            console.log('saveAsHtml完成');
                            return gulp.src(dirpath+HTMLNAME+".html")
                                .pipe(htmlbeautify({
                                    "indent_size": 4,
                                    "eol": "\n",
                                    "indent_level": 0,
                                    "indent_with_tabs": false,
                                    "preserve_newlines": false,
                                    "brace_style": "collapse",
                                    "end_with_newline": false
                                }))
                                .pipe(gulp.dest(root_DIR+CUR_PATH));
                        }
                    }) ;
                });

            });
        }).on('error', function(err) {
            console.log('错误信息：' + err)
        });
    },3000);
    cb();
}));
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

//---------------------------------------scss编译----------------------------//
const STYLENAME = 'test'; //项目样式名
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
gulp.task('css-format', gulp.series('picbase64:sass',function() {
    if(STYLE_PATH.length>0){
        return gulp.src(_CSSsrc, {base: './'})
            .pipe(cssFormat({tab:4,indent: 1, hasSpace: false}))
            .pipe(gulp.dest(root_DIR));
    }else{
        return gulp.src(_CSSsrc)
            .pipe(cssFormat({tab:4,indent: 1, hasSpace: false}))
            .pipe(gulp.dest(root_DIR + CUR_PATH + 'css'));
    }
}));
//---------------------------------------scss编译----------------------------//

//---------------------------------------jsx编译----------------------------//
gulp.task('rollup',function (cb) {
    rollup.rollup({
        //入口
        input: root_DIR+source_DIR+CUR_PATH+JSX_DIR + HTMLNAME + '.jsx',
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
        bundle.write({
            file: root_DIR + Download_DIR + CUR_PATH + 'js/rollup.js',
            format: 'umd',
            sourcemap: false
        });
        cb();
        console.log('rollup完成')
    });
});
//---------------------------------------jsx编译----------------------------//

//---------------------------------------清除----------------------------//
// 清除生成的文件
gulp.task("clean:dist", function(){
    return gulp.src(root_DIR + Download_DIR)
        .pipe(clean({
            options:{force:true}
        }));
});
gulp.task("clean:package", function(){
    return gulp.src(root_DIR + CUR_PATH)
        .pipe(clean({
            options:{force:true}
        }));
});
gulp.task("clean",gulp.series('clean:dist','clean:package', function(cb){
    cb();
    console.info('清除完成')
}));
//---------------------------------------清除----------------------------//

//---------------------------------------开发(没有处理react页面)----------------------------//
gulp.task('dev',gulp.series('rollup','ejs','css-format',function () {
    gulp.watch(root_DIR+source_DIR+CUR_PATH + '**/*.jsx', ['rollup']);
    gulp.watch(root_DIR+source_DIR+CUR_PATH + '**/*.ejs', ['ejs']);
    if(STYLE_PATH.length>0){
        gulp.watch(_SASSsrc, ['css-format']);
    }else{
        gulp.watch(root_DIR+SASS_DIR + CUR_PATH + '**/*.scss', ['css-format']);
    }
}));
//---------------------------------------开发----------------------------//

//---------------------------------------打包(处理过react页面)----------------------------//
gulp.task('package',gulp.series('rollup','ejs','css-format','saveAsHtml',function (cb) {
    cb();
    console.info('打包完成');
}));
//---------------------------------------打包----------------------------//