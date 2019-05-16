
var gulp = require('gulp');
var rename = require('gulp-rename');

/*css*/
const sass = require('gulp-sass');
const base64 = require('gulp-base64');
const cssFormat = require('gulp-css-format');

/*html*/
const ejs  = require('gulp-ejs');
const glob = require("glob");
const c = require('child_process');
const path =require('path');
const http = require('http');
const fs = require('fs');
const clean = require('gulp-clean');
const htmlbeautify = require('gulp-html-beautify');
const fileinclude = require('gulp-file-include');
/*sprite*/
const spritesmith = require('gulp.spritesmith');
const vinylBuffer = require("vinyl-buffer");
const tinypng_nokey = require('gulp-tinypng-nokey');   //压缩图片2 免费 不限制压缩次数，模拟用户上传和下载的行为

/*babel*/
const gulpbabel = require("gulp-babel");
let env = process.env.NODE_ENV;
//---------------------------------------参数声明----------------------------//
const root_DIR = './';     // 项目根目录
const source_DIR = 'source/';   // 源文件目录
const Download_DIR = 'dist/';   // 文件下载保存目录
const SASS_DIR =   'scss/'; // 样式预处理文件目录

// 具体项目文件目录
//var CUR_PATH = 'ID/app/';
var CUR_PATH = 'ID/';
//const CUR_PATH = 'ID/public/';
// var CUR_PATH =   'react-component/APP/GTS2/';

var SRC_DIR = 'src/';     // 源文件目录
var JSX_DIR = 'jsx/'; // 脚本文件目录
var IMG_DIR = 'images/'; // 图片文件目录
// var DIST_DIR = 'dist/';   // 文件处理后存放的目录

let _url = {
    host:"http://172.30.10.52",
    port:8888,
    savePort:1111,
    path:"/ReactDev/"
};

const global =1;
let FILENAME = 'promosi';//名称
if(global){
    FILENAME = '**/*';
}

//---------------------------------------scss编译----------------------------//
let scssLists = getFiles(root_DIR+SASS_DIR + CUR_PATH+FILENAME+'.*',[],'.scss');
let cssLists= matchResult(scssLists,['sp-','-mw979.','/_'],[]);

// base64
gulp.task('picbase64:sass',function () {
    return gulp.src(cssLists, {base: root_DIR+SASS_DIR})
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(root_DIR))
        .pipe(base64({
            extensions: ['png','svg',/\.jpg#datauri$/i],
            include:    ['/base64/'],
            maxImageSize:100*1024, // bytes
            debug: false
        }))
        .pipe(gulp.dest(root_DIR))
        .pipe(cssFormat({tab:4,indent: 1, hasSpace: false}))
        .pipe(gulp.dest(root_DIR));
});
//---------------------------------------scss编译----------------------------//

//---------------------------------------html编译----------------------------//
/*
 * ejs原生页面编译(task:ejs)
 * */
const _date = `${new Date().toLocaleDateString()}`;
const _dateYear = _date.split('-')[0];
const _dateMonth = _date.split('-')[1];
const _dateDay = _date.split('-')[2];
const cfg = require(root_DIR+source_DIR + 'datas/config.json');
let ejsLists = getFiles(root_DIR+source_DIR + CUR_PATH+FILENAME+'.*',[],'.ejs');
gulp.task('ejs',gulp.series('picbase64:sass',function(cb) {
    for (var r = 0; r < ejsLists.length; r++) {
        (function (r,file) {
            console.log("===========ejs "+r+": "+file);
            let _lpNAME;
            if(file.indexOf('/lp/')!=-1){
                _lpNAME = file.split('/lp/')[1].split('/')[0];
            }
            let reactOpts = {
                reactUrl : _url.host+":"+_url.port+_url.path + 'node_modules/react/dist/react.js',
                reactDomUrl : _url.host+":"+_url.port+_url.path + 'node_modules/react-dom/dist/react-dom.js',
                babelStandaloneUrl : _url.host+":"+_url.port+_url.path + 'node_modules/@babel/standalone/babel.js',
                type:"text/babel",
                jsxUrl: CUR_PATH.replace('ID/','/') + 'dist/'+JSX_DIR+file.replace(root_DIR+ source_DIR + CUR_PATH,'').replace('.ejs','.jsx')
            };
            if(env ==='production'){//打包
                reactOpts = {
                    reactUrl : _url.host+":"+_url.port+_url.path + 'node_modules/react/dist/react.min.js',
                    reactDomUrl : _url.host+":"+_url.port+_url.path + 'node_modules/react-dom/dist/react-dom.min.js',
                    babelStandaloneUrl : _url.host+":"+_url.port+_url.path + 'node_modules/@babel/standalone/babel.min.js',
                    type:"text/javascript",
                    jsxUrl: _url.host+":"+_url.port+_url.path + Download_DIR + CUR_PATH + 'js/'+file.replace(root_DIR+ source_DIR + CUR_PATH,'').replace('.ejs','.js')
                };
            }

            let name;
            name = file.replace(root_DIR+source_DIR,'').split('/')[0];
            let value;
            if(cfg.hasOwnProperty(name)){//cfg 为 存放数据的配置文件
                value = cfg[name];
            } else {
                value = {}
            }
            // console.log(value)

            return gulp.src(file, {base: root_DIR+source_DIR})
                .pipe(ejs({msg:value,dateYMD:{"year":_dateYear,"month":_dateMonth,"day":_dateDay},rollupOps:{"url":reactOpts.jsxUrl,"title":path.basename(file).split('.')[0]},reactOpts:reactOpts,lpNAME:_lpNAME}))
                .pipe(rename({ extname: '.html' }))
                .pipe(gulp.dest(root_DIR+Download_DIR))
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: root_DIR+source_DIR+CUR_PATH,
                    indent:true,
                    context: {
                        rootUrl:'/',
                        timestamp:[new Date().getTime(),Math.random().toFixed(0)],
                        arr: ['test1', 'test2']
                    }
                }))
                .pipe(gulp.dest(root_DIR));
        }(r,ejsLists[r]))
    }
    cb();
}));

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
var Temple_DIR = 'generateHtmlTemple/';   // ejs模板引擎目录
var Temple_Name = 'temple.ejs'; // 指定ejs模板文件
const speed = 3000;
gulp.task('downloadHtml',gulp.series('clean:downloadHtml',function(cb) {
    let htmlLists = getFiles(root_DIR+Download_DIR + CUR_PATH+FILENAME+'.*',[],'.html');
    console.log(htmlLists)
    for (var r = 0; r < htmlLists.length; r++) {
        (function (r,file) {
            setTimeout(function(){
                //第二步:编译ejs下载模板
                console.log("===========downloadHtml "+r+": "+file);
                gulp.src(root_DIR+Temple_DIR+Temple_Name, {base: root_DIR+Temple_DIR})
                    .pipe(ejs({templeOps:{"url":_url.host+":"+_url.port+_url.path+file.replace(root_DIR+Download_DIR,'').replace('.ejs','.html'),"title":path.basename(file)}}))
                    .pipe(rename({ extname: '.html' }))
                    .pipe(gulp.dest(root_DIR+Temple_DIR));
                let _templeSrc = _url.host+":"+_url.port+_url.path+Temple_DIR+Temple_Name.replace('.ejs','.html');
                //第三步:通过打开浏览器下载html文件
                c.exec('start firefox '+_templeSrc);
            },r*speed);
            //第四步:html文件另存到项目打包文件并格式化
            setTimeout(function () {
                var _savePage = path.basename(file);
                var _curHtml = file.replace(root_DIR+Download_DIR+CUR_PATH,'');
                http.get(_url.host+":"+_url.savePort+"/"+_savePage,function(res){  //通过get方法获取对应地址中的页面信息
                    var chunks = [];
                    var size = 0;
                    //读取下载后的html文件，访问路径http://172.30.10.52:1111（_url.host+":"+_url.savePort）
                    console.log("===========saveAsHtml "+r+": "+_url.host+":"+_url.savePort+"/"+_savePage)
                    res.on('data',function(chunk){   //监听事件 传输
                        chunks.push(chunk);
                        size += chunk.length;
                    });
                    res.on('end',function(){  //数据传输完
                        var data = Buffer.concat(chunks,size);
                        var html = "<!doctype html>\n\r"+data.toString();

                        // 将抓取的内容保存到本地文件中
                        let dirpath = root_DIR+CUR_PATH;
                        let srciptReg = new RegExp('<script[^>]*:[^>]*' +_url.port +'[^>]*><\/script>','g');
                        let txt = html.replace(srciptReg,'').replace(/( data-reactroot="")/g,'').replace(/(<!--[\s\S]*?-->)/g,'');
                        // console.log(txt)
                        mkdirs(dirpath,function () {
                            fs.writeFile(dirpath+file.replace(root_DIR+Download_DIR+CUR_PATH,''),txt,function (err) {
                                if (err){
                                    console.log("写入错误")
                                    console.log(err)
                                    return false;
                                }else{
                                    console.log("写入成功页面 "+r+": "+dirpath+_curHtml);
                                    //html文件格式化
                                    return gulp.src(dirpath+_curHtml,{base:dirpath})
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
            },(r+5)*speed);
        }(r,htmlLists[r]))
    }
    //第五步:关闭浏览器
    setTimeout(function () {
        console.log('close  浏览器')
        c.exec('taskkill /IM firefox.exe');
    },(htmlLists.length+5)*speed);
    cb();
}));

//---------------------------------------html编译----------------------------//

//---------------------------------------img sprites----------------------------//
// const REMNAME = 'mw979'; //对应的响应式样式名
const REM = true; //是否支持rem
const REMwidth = 750; //移动端设计稿宽
let REM2 = false; //响应式
if(CUR_PATH.indexOf('/app/')!=-1){
    REM2 = true; //只有移动端
}
let spiresTime = (Math.random()*1000).toFixed(0);
gulp.task('sprites:more',function(cb){
    let dirs = glob.sync(root_DIR+source_DIR+CUR_PATH+"/images/slice/*/*/");
    // console.log(dirs)
    for(let i = 0;i<dirs.length;i++){
        let baseDir = dirs[i].split("/")[dirs[i].split("/").length-3];
        let basename = path.basename(dirs[i]);
        let prefix = '.png';
        let spriteData = gulp.src(root_DIR+source_DIR + CUR_PATH + `images/slice/${baseDir}/${basename}/*.{png,jpg,gif,jpeg}`)//需要合并的图片地址
            .pipe(spritesmith({
                cssOpts: {
                    cssSelector: function(item) {
                        console.log("****************")
                        console.log(item)
                        // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                        if (item.name.indexOf('-hover') !== -1) {
                            return item.name.replace('-hover', ':hover');
                            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                        } else {
                            return item.name;
                        }
                    }
                },
                imgName: `sp_${baseDir}_${basename}${prefix}`,//保存合并后图片的地址
                cssName: `sp-${baseDir}-${basename}.scss`,//保存合并后对于css样式的地址
                padding:10,//合并时两个图片的间距
                algorithm: 'top-down',
                cssTemplate: function(data){
                    let arr1,arr2,width1,width2,height1,height2;
                    let arr = ["/* ============ sprites ============ */","\n"],
                        width = data.spritesheet.px.width,
                        height = data.spritesheet.px.height,
                        url =  data.spritesheet.image;

                    let mVar = data.spritesheet.image.split("/")[data.spritesheet.image.split("/").length-1].replace(/-m_/,'_m_').indexOf('_m');
                    let mSvg = data.spritesheet.image.split("/")[data.spritesheet.image.split("/").length-1].indexOf('_svg_');

                    if(!REM2){
                        data.sprites.forEach(function(sprite) {
                            arr.push(
                                "."+sprite.name+
                                "{ "+
                                "width: "+sprite.px.width+";"+
                                "height: "+sprite.px.height+";"+
                                "background-image: url('"+url+"?="+spiresTime+"');"+
                                "background-position:"+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                                "background-size: "+ width+" "+height+";"+
                                "background-repeat:no-repeat;"+
                                " }\n"
                            );
                        });
                        if(REM && mVar!==-1){
                            arr1 = ["\n","/* ============ sprites rem ============ */","\n"];
                            width1 = data.spritesheet.rem.width;
                            height1 = data.spritesheet.rem.height;

                            arr1.push('@media(max-width:'+REMwidth+'px){\n');
                            data.sprites.forEach(function(sprite) {
                                arr1.push(
                                    "."+sprite.name+
                                    "{ "+
                                    "background-position:"+sprite.rem.offset_x+" "+sprite.rem.offset_y+";"+
                                    "background-size: "+ width1+" "+height1+";"+
                                    "width: "+sprite.rem.width+";"+
                                    "height: "+sprite.rem.height+";"+
                                    " }\n"
                                );
                            });
                            arr1.push('}');
                            return arr.join("")+(arr1.join(""));
                        }
                    }
                    else if(REM2){
                        arr2 = [];
                        width2 = data.spritesheet.rem.width;
                        height2 = data.spritesheet.rem.height;

                        if(mSvg>0){
                            data.sprites.forEach(function(sprite) {
                                arr2.push(
                                    "."+sprite.name+
                                    "{ "+
                                    "width: "+sprite.rem.width+";"+
                                    "height: "+sprite.rem.height+";"+
                                    "background-image: url('"+url+"?="+spiresTime+"');"+
                                    "background-repeat:no-repeat;"+
                                    " }\n"
                                );
                            });
                        }else{
                            data.sprites.forEach(function(sprite) {
                                arr2.push(
                                    "."+sprite.name+
                                    "{ "+
                                    "width: "+sprite.rem.width+";"+
                                    "height: "+sprite.rem.height+";"+
                                    "background-image: url('"+url+"?="+spiresTime+"');"+
                                    "background-position:"+sprite.rem.offset_x+" "+sprite.rem.offset_y+";"+
                                    "background-size: "+ width2+" "+height2+";"+
                                    "background-repeat:no-repeat;"+
                                    " }\n"
                                );
                            });
                        }
                        return arr.join("")+(arr2.join(""));
                    }

                    return arr.join("");
                },
                imgPath: `../images/sp_${baseDir}_${basename}${prefix}`,
                spritestamp: true
            }));

        if(basename.indexOf('svg_')===-1){
            spriteData.img
                .pipe(vinylBuffer())
                // .pipe(imagemin({
                //     // optimizationLevel:3, //类型：Number  默认：3  取值范围：0-7（优化等级）
                //     svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                //     progressive: true,    //类型：Boolean 默认：false 无损压缩jpg图片
                //     interlaced: true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
                //     multipass: true       //类型：Boolean 默认：false 多次优化svg直到完全优化
                // }))
                .pipe(tinypng_nokey()).on('error', function(err) {
                console.error(err.message);
            })
                .pipe(gulp.dest(root_DIR+CUR_PATH + "images"));
        }

        spriteData.css.pipe(gulp.dest(root_DIR+SASS_DIR + CUR_PATH + 'css'));

    }
    cb();
});
gulp.task('publish:tinypng', function() {
    gulp.src(root_DIR+source_DIR + CUR_PATH + 'images/tinypng/*.{png,jpg,gif,jpeg}')
        .pipe(tinypng_nokey()).on('error', function(err) {
        console.error(err.message);
    })
        .pipe(gulp.dest(root_DIR+CUR_PATH + "images"));
});
//---------------------------------------img sprites----------------------------//

//---------------------------------------jsx编译----------------------------//
let jsxLists = getFiles(root_DIR+source_DIR + CUR_PATH+JSX_DIR+FILENAME+'.*',[],'.jsx');
gulp.task("babel:js",function(cb){
    env = 'production';
    return gulp.src(jsxLists,{base:root_DIR +source_DIR+ CUR_PATH+JSX_DIR})
        .pipe(gulpbabel({
            presets: [
                ["@babel/preset-react"],
                // ["@babel/env",
                //     {
                //         "loose": true,
                //         "modules":false,
                //         // // "debug":true,
                //         // "targets": {
                //         //     // "chrome": "58",
                //         //     "ie": "7",
                //         //     "node": "current"
                //         // },
                //     }
                // ]
            ],
            // "exclude":[DIST_DIR + "js/lib/*.js"]
        }))
        .pipe(gulp.dest(root_DIR +Download_DIR + CUR_PATH+ 'js/'));
    cb();
})

//---------------------------------------jsx编译----------------------------//

//---------------------------------------清除----------------------------//
// 清除生成的文件
gulp.task("clean:dist", function(){
    return gulp.src([root_DIR + Download_DIR,root_DIR+CUR_PATH+'**/dist/'])
        .pipe(clean({
            options:{force:true}
        }));
});
gulp.task("clean:package", function(){
    return gulp.src(root_DIR + CUR_PATH + "**/*.{html,css}")
        .pipe(clean({
            options:{force:true}
        }));
});
gulp.task("clean",gulp.series('clean:dist','clean:package', function(cb){
    cb();
    console.info('清除完成');
}));
//---------------------------------------清除----------------------------//

//---------------------------------------开发(没有处理react页面)----------------------------//
gulp.task('jsx:copy',function () {
    return gulp.src(jsxLists, {base: root_DIR+source_DIR+CUR_PATH})
        .pipe(gulp.dest(root_DIR+CUR_PATH+'dist/'))
});
gulp.task('dev',gulp.series('jsx:copy','ejs','picbase64:sass',function () {
    gulp.watch(jsxLists, gulp.series('jsx:copy'));
    gulp.watch(ejsLists, gulp.series('ejs'));
    gulp.watch(scssLists, gulp.series('picbase64:sass'));
}));
//---------------------------------------开发----------------------------//

//---------------------------------------打包(处理过react页面)----------------------------//
gulp.task('package',gulp.series('babel:js','ejs','picbase64:sass','downloadHtml',function (cb) {
    cb();
    console.info('打包完成');
}));
//---------------------------------------打包----------------------------//

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
function getFiles(path,name,endsWith) {
    glob.sync(path).filter(function (file) {
        return (CUR_PATH.indexOf('app/')===-1 || CUR_PATH.indexOf('lp/')===-1) ? file.endsWith(endsWith) && file.indexOf('include/')===-1 && file.indexOf('app/')===-1 && file.indexOf('lp/')===-1:file.endsWith(endsWith) && file.indexOf('include/')===-1;
    }).forEach(function (file) {
        name.push(file);
    });
    // console.log(endsWith+" getFiles =============")
    // console.log(name);
    return name;
}
function matchResult(lists,matchLists,pushObj) {
    for (let i = 0; i < lists.length; i++) {
        let match =false;
        matchLists.forEach(function (val) {
            match=(lists[i].indexOf(val)!=-1 || match)?true:false;
        });
        !match && lists[i].indexOf('css/')!=-1 && pushObj.push(lists[i])
    }
    // console.log(matchLists+" matchResult =============")
    // console.log(pushObj);
    return pushObj;
}
gulp.task('funTest',function (cb) {
    let ejsLists = getFiles(root_DIR+source_DIR + CUR_PATH+FILENAME+'.*',[],'.ejs');
    let jsxLists = getFiles(root_DIR+source_DIR + CUR_PATH+JSX_DIR+FILENAME+'.*',[],'.jsx');
    let htmlLists = getFiles(root_DIR+Download_DIR + CUR_PATH+FILENAME+'.*',[],'.html');
    let jsLists = getFiles(root_DIR+Download_DIR + CUR_PATH+'js/'+FILENAME+'.*',[],'.js');

    cb();
});