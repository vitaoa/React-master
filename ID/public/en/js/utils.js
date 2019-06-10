function quotationConnect(wsUrl,httpUrl){
	var websocket = null;

	//判断当前浏览器是否支持WebSocket
	if ('WebSocket' in window) {
		websocket = new WebSocket(wsUrl);
	}else {
		console.log('Not support websocket')
	}

	//连接发生错误的回调方法
	websocket.onerror = function () {
		console.log("connect error");
	};

	//连接成功建立的回调方法
	websocket.onopen = function (event) {
		console.log('connect open');
	}

	//接收到消息的回调方法
	websocket.onmessage = function (event) {
		var data = event.data;//socket发送消息
		if(data && JSON.parse(data).length > 0){
			var data = JSON.parse(data),item ;
			for(var i = 0,len = data.length; i < len ;i++){
				item = data[i];
				var range = item.rise == true ? item.range : '-'.concat(item.range);
				$('#'+item.symbolName).next().html(item.lastPrice);
				$('#'+item.symbolName).next().next().html(range);
				$('#'+item.symbolName).attr('sid',item.id);
				if(item.rise == true){
					$('#'+item.symbolName).next().removeClass('red').addClass("green");
					$('#'+item.symbolName).next().next().removeClass('red').addClass("green");
				}else{
					$('#'+item.symbolName).next().removeClass('green').addClass("red");
					$('#'+item.symbolName).next().next().removeClass('green').addClass("red");
				}
			}
		}
	}

	//连接关闭的回调方法
	websocket.onclose = function () {
		console.log("connect close");
	}

}

function indexWebSocket(){
	var websocket = null,wsUrl;
	var h=window.location.host;
	var wsIp = $('#wsIp').val();
	if(!wsIp){
		console.log("wsIp error");
		return;
	}
	wsUrl = "ws://".concat(wsIp).concat(":8011/newsSocket");
	//判断当前浏览器是否支持WebSocket
	if ('WebSocket' in window) {
		websocket = new WebSocket(wsUrl);
	}else {
		console.log('Not support websocket')
	}

	//连接发生错误的回调方法
	websocket.onerror = function () {
		console.log("index connect error");
	};

	//连接成功建立的回调方法
	websocket.onopen = function (event) {
		console.log('index connect open');
	}

	//接收到消息的回调方法
	websocket.onmessage = function (event) {
		var data = event.data;//socket发送消息
		console.log(data);
		if(data){
			var message = JSON.parse(data);
			if(message.content){
				alert(message.content);
			}
		}

	}

	//连接关闭的回调方法
	websocket.onclose = function () {
		console.log("index connect close");
	}
}

function openaccount() {
	if(window.IxJsHook){
		window.IxJsHook.appOpen();
	}
	else if (window.webkit) {
		window.webkit.messageHandlers.ixMarketPage.postMessage({functionName: 'appOpen'});
	}
	else{
        if(window.location.href.indexOf("isLoginUser")==-1 && window.location.href.indexOf("pagefrom")==-1){
            if (typeof(openaccounturl) != "undefined"){
                window.open(openaccounturl.replace(/&amp;/g,'&'));
                return;
            }
        }
        if(window.location.href.indexOf("isLoginUser=0")!=-1){
            regist();
            return;
        }
        if(window.location.href.indexOf("isLoginUser=2")!=-1){
            deposit();
            return;
        }
	}
}

//调用app方法跳转到入金页面
function deposit(){
	if(window.IxJsHook){
		window.IxJsHook.appDeposit();
	}
    else if (window.webkit) {
		window.webkit.messageHandlers.ixMarketPage.postMessage({functionName: 'appDeposit'});
	}
    else{
        if (typeof(openaccounturl) != "undefined"){
            window.open(openaccounturl.replace(/&amp;/g,'&'));
        }
    }
}

//调用app方法跳转到注册页面
function regist(){

	if(window.IxJsHook){
		window.IxJsHook.appRegist();
	}
	if (window.webkit) {
		window.webkit.messageHandlers.ixMarketPage.postMessage({functionName: 'appRegist'});
	}
}

//调用app方法跳转到客服页面
function customerService(){
	if(window.IxJsHook){
		window.IxJsHook.appCustomerService();
	}
	if (window.webkit) {
		window.webkit.messageHandlers.ixMarketPage.postMessage({functionName: 'appCustomerService'});
	}
}

//调用app方法跳转到产品详情页面
function productDetail(productId){
	if(window.IxJsHook){
		window.IxJsHook.appSymbolDetail(productId);
	}
	if (window.webkit) {
		window.webkit.messageHandlers.ixMarketPage.postMessage({functionName: 'appSymbolDetail',symbolId:productId});
	}
}

//调用app方法跳转到交易页面
function trade(){
	if(window.IxJsHook){
		window.IxJsHook.appTrade();
	}
	if (window.webkit) {
		window.webkit.messageHandlers.ixMarketPage.postMessage({functionName: 'appTrade'});
	}
}

//调用app方法：pc端跳转到开户页面，app客户端跳转到行情页面
function btnJump() {
	if(window.IxJsHook){
		window.IxJsHook.appTrade();
	}
	else if (window.webkit) {
		window.webkit.messageHandlers.ixMarketPage.postMessage({functionName: 'appTrade'});
	}
	else{
		if (typeof(openaccounturl) != "undefined"){
			window.open(openaccounturl.replace(/&amp;/g,'&'));
		}
	}
}

//下载app
function downloadApp(_obj){
	var mType = mobileType();
	if(mType == 'pc'){
		_obj.attr("href","https://play.google.com/store/apps/details?id=com.ixdigit.gg");
	}else if(mType == 'android'){
		_obj.attr("href","https://play.google.com/store/apps/details?id=com.ixdigit.gg");
	}else if(mType == 'ios'){
		iosUrlNationalDownload(_obj);
	}
}

//判断Android和ios
function mobileType(){
	var type = 'pc';
	var ua = navigator.userAgent;
	if(ua.match(/Android/i) != null){
		type = 'android';
	}else if(ua.match(/iPhone|iPad/i) != null){
		type =  'ios';
	}
	return type;
}

//ios根据url后缀的国家类型区分到相应app store
function iosUrlNationalDownload(_obj) {
	var strArray = location.href.split('_');
	var national = strArray[strArray.length - 1]
	if(national == 'bl.html'){//巴林
		_obj.attr("href","https://itunes.apple.com/bh/app/id1374123278?mt=8");
	}else if(national == 'yn.html'){//印尼
		_obj.attr("href","https://itunes.apple.com/id/app/id1374123278?mt=8");
	}else if(national == 'kny.html'){//肯尼亚
		_obj.attr("href","https://itunes.apple.com/ke/app/id1374123278?mt=8");
	}else if(national == 'tg.html'){//泰国
		_obj.attr("href","https://itunes.apple.com/th/app/id1374123278?mt=8");
	}else if(national == 'flb.html'){//菲律宾
		_obj.attr("href","https://itunes.apple.com/ph/app/id1374123278?mt=8");
	}else if(national == 'mlsy.html'){//马来西亚
		_obj.attr("href","https://itunes.apple.com/my/app/id1374123278?mt=8");
	}else if(national == 'adly.html'){//澳大利亚
		_obj.attr("href","https://itunes.apple.com/au/app/id1374123278?mt=8");
	}else if(national == 'nf.html'){//南非
		_obj.attr("href","https://itunes.apple.com/za/app/id1374123278?mt=8");
	}else if(national == 'jnd.html'){//加拿大
		_obj.attr("href","https://itunes.apple.com/ca/app/id1374123278?mt=8");
	}else if(national == 'yd.html'){//印度
		_obj.attr("href","https://itunes.apple.com/in/app/id1374123278?mt=8");
	}else {//默认
		_obj.attr("href","https://itunes.apple.com/id/app/id1374123278?mt=8");
	}
}

function connectOnlineCs(domId) {
	if($('#csflag').val() == 'true')return;
	$('#'+domId).append('<iframe src="https://jms.phgsa.cn/cs-m.php?pid=IX17&key=4ApcjjmE4nI56LnGWMc0" width="100%" height="100%" scrolling="no"></iframe>');
	$('#csflag').val('true');
}
var _syscode={"AUDJPY":"153011","USDJPY":"153007","USDCHF":"153018","USDCAD":"153013","NZDUSD":"153015","NZDJPY":"153016","GBPUSD":"153012","GBPCHF":"153025","GBPJPY":"153014","GBPAUD":"153017","EURUSD":"153004","EURJPY":"153005","EURGBP":"153020","EURCHF":"153023","EURAUD":"153009","CADJPY":"153010","AUDUSD":"153006","AUDNZD":"153024","USDCNH":"153008"};



//url参数获取
function getRequestParam(param) {
    var locationPath = window.location.href.split('?')[1];
    var requested = '';
    if (locationPath) {
        if(locationPath.indexOf('#utm_source')!=-1){
            locationPath =locationPath.replace('#utm_source','&utm_source');
        }
        var params = locationPath.split('&');
        for(var i = 0; i < params.length; i ++) {
            if(param == params[i].split("=")[0] ){
                requested = '?'+params[i].split("=")[0]+'='+params[i].split("=")[1];
            }
        }
    }
    return requested;
}