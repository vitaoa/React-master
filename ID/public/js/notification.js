
function showNotice(title,msg) {
    //发送通知
    newNotify = function () {
        var notification = new Notification(title,
            {
                //通知显示正文。非必须，默认为空
                body: msg,
                //通知显示正文的图片地址。非必须，默认为空
                image: 'https://www.hsb.co.id/upload/2019/04-24/17-37-59070016428240--.png',
                //通知左侧图标。非必须，默认为空
                icon: 'https://www.hsb.co.id/logo.png',
                //通知的分类标记（ID）。非必须，默认为空
                tag: title,
                //通知相关联的数据，通常用于方法的回调，传参。非必须，默认为空
                // data: '可以是任意数据类型',
                // data: {
                //     url: 'https://www.hsb.co.id'
                // },
                //通知显示延迟的时间。非必须，默认通知实例创建完成就显示
                timestamp: '',
                //通知主体内容的水平展示顺序，有点类似direction属性。非必须，默认值是auto, 可以是ltr或rtl
                dir: 'auto',
                //当没有足够的空间来显示通知本身时，用于表示通知的图像的URL。非必须，默认为空
                badge: '',
                //通知的语言。非必须默认为空
                // lang: 'utf-8',
                // vibrate:[100,200,100],
                //新通知出现是否覆盖旧的通知，覆盖（true）则永远只显示一条通知，不覆盖（false）则会多条通知重叠。非必须，默认为true
                renotify: true,
                //是否不在屏幕上显示通知信息。非必须，默认为false表示要显示
                noscreen: false,
                //指定通知是否应该粘滞性，即不容易被用户清理。非必须，默认false表示不具粘滞性
                sticky: false,
                //指定通知是否保持活性，知道用户点击或关闭。非必须，默认为false
                requireInteraction: false
            }
        );
        notification.onclick = function (event) {
            //回到发送此通知的页面
            window.focus();

            //回来后要做什么
            window.open('https://www.hsb.co.id/lp/lp20_ayvz_201904hd.html?#utm_source=gwi_notification');
            notification.close();
        };
        // setTimeout(function() {
        //     notification.close();
        // }, 100000);
    }
    //权限判断
    if (Notification.permission == "granted") {
        newNotify();
    } else {
        //请求权限
        Notification.requestPermission(function (perm) {
            if (perm == "granted") {
                newNotify();
            }
        })
    }
}
if (window.Notification) {
    showNotice('Komisi Terendah Mulai Dari USD 1','Trading di platform, tanpa perantara IB, sehingga nasabah bisa menikmati penawaran harag terendah dengan service yang terbaik')
    // setTimeout(function() {
    //     showNotice('标题2','message22222222')
    // }, 9000);
}