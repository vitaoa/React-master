### React to HTML
+ 将对应项目src文件夹下的fonts、js（除images、css）等公用文件复制一份到对应项目dist文件夹下；
+ 浏览器打开React页面，然后鼠标右键另存为，保存类型为“网页，全部”，保存到对应项目的src/html目录下面；
+ 运行gulp htmlmin，将压缩处理后的.min.html保存到对应项目的dist目录下面；
+ 在dist目录下将.min.html文件各复制一份，保存为非.min版作为最终打包发布。
