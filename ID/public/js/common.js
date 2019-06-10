 $(document).ready(function(){
    /* CUSTOM - CHECK IF ELEMENT EXISITS */
    jQuery.fn.exist = function(){
      return this.length>0;
    }

    /*sidemenu*/
     $('.platform *').bind('click',function(e){
         if (e.stopPropagation) e.stopPropagation();
         else e.cancelBubble = true;
         var _target = $(e.target);
         if(_target.closest('.platform').length>0){
             if(_target.closest('h3.title').length>0){
                 _target.closest('h3.title').parent('.heading').toggleClass('active');
                 _target.closest('h3.title').find('[class*="i-panel-"]').toggleClass('i-panel-minus i-panel-add');
             }
         }
         if(_target.closest('.platform .courses .lessons').length>0 || _target.closest('.lesson-end .next-lesson').length>0){
             if(_target.closest('a').length>0){
                 e.preventDefault();
                 var _url = _target.closest('a').attr('href');
                 if(_url.indexOf('.html')!=-1){
                     lessonsHtml(_target,_url);
                 }
             }
         }
         if(_target.closest('.menu-list').length>0){
             if(_target.hasClass('slideUp')){
                 _target.toggleClass('slideUp');
             }
         }
     });
     $('.menu-content > ul > li:visible').each(function () {
		 if($(this).attr('id')){
             snippetsHtml($(this),'.qa-txtcon');
		 }
     });
    $('.menu-list dd').on('click',function () {
    	var _curObj = $('.menu-content > ul > li').eq($(this).index()-1);
        $(this).addClass('active').siblings().removeClass('active');

        if(!!_curObj.attr('id')){
            snippetsHtml(_curObj,'.qa-txtcon');
		}
        _curObj.show().siblings().hide();
        $('.menu-current').trigger('click');
    });
    $('.menu-current').on('click',function () {
        $(this).closest('.menu-list').toggleClass('slideUp');
        $(this).html($('.menu-list dd.active a').html());
	});
     function snippetsHtml(obj,cls) {
    	var curObj = obj.find(cls);
        if(curObj.text().replace(/\s*/,'').length===0 || !!curObj.attr('data-id')){
        	var _name = window.location.pathname.split('/');
            _name = _name[_name.length-1].replace(/.html/,'');
            console.log(_name)
            if(_name=="cepat"){
                _name="instan";
            }
            if(_name=="kuliah-online"){
                _name="platform";
            }
            $.ajax({
                url: '/snippets/'+_name+'/'+obj.attr('id')+'.html',
                type: "GET",
                dataType:"html",
                success: function (data) {
                    curObj.html(data);
                    curObj.removeAttr('data-id');
                    setTimeout(function () {
                        PageScrollTo(0);
                    },100);
                }
            });
        }
    }
     function lessonsHtml(_target,_url) {
         var _firstArr = ['/learn/forex/history-of-retail-fx','/learn/forex/support-and-resistance','/learn/forex/leading-vs-lagging-indicators','/learn/forex/elliott-wave-theory','/learn/forex/divergence-trading','/learn/forex/what-is-market-sentiment','/learn/forex/what-is-the-dollar-index','/learn/forex/what-is-a-trading-plan','/learn/forex/what-is-risk-management','/learn/forex/forex-account-managers'];
         var _forexCode = document.createElement('div');
         $(_forexCode).load(_url+' .wrapper>.w-part',function (responseTxt,statusTxt) {
             if(statusTxt=='success'){
                 var _GATxt = $GA_NAME;
                 _GATxt = _GATxt+"_"+_target.closest('.qa-txtcon').parent('li').attr('id');
                 var _btnTryNow = document.createElement('div');
                 _btnTryNow.className='btn-trynow';
                 _btnTryNow.innerHTML='<a href="/common/app-lp-main.html" target="_blank" onclick="dataLayer.push({\'event\':\'Try_now\',\'gtm.elementTarget\': \''+ _GATxt +'\',\'gtm.element\': \'content_last\'})" class="btn">Try now</a>';
                 var _name = _url.split('/');
                 _name = _name[_name.length-1].replace(/.html/,'');
                 _target.closest('.qa-txtcon').attr('data-id',_name);
                 $(_forexCode).find('.w-part').eq(0).append(_btnTryNow);

                 if(_target.closest('a.title').length>0){
                     _target.closest('.qa-txtcon').html($(_forexCode).html().replace(/\.\.\/images/g,'/learn/images'));
                 }else{
                     if($.inArray(_url.split('.html')[0], _firstArr)!=-1){
                         $('.menu-list dd').eq($('.menu-list .active').index()).trigger('click');
                         $('.menu-list.slideUp').trigger('click');
                     }else{
                         _target.closest('.qa-txtcon').html($(_forexCode).html().replace(/\.\.\/images/g,'/learn/images'));
                     }
                 }
                 setTimeout(function () {
                     PageScrollTo(0);
                 },100);
             }
         });
     }
     function PageScrollTo(y){
         document.body.scrollTop = document.documentElement.scrollTop = y;
     }

     /*tip-bar*/
     var tipBarHtml = '<a href="javascript:;" class="a-close" onclick=\'closeTipBar(this);dataLayer.push({"event":"close Download App Gratis","gtm.elementTarget": $GA_NAME,"gtm.element": "float_top"})\'><i class="tip-btn-close"></i></a>'+
         '<a href="javascript:;" target="_blank" class="a-download" onclick=\'downloadAppyn100(this);dataLayer.push({"event":"Download App Gratis","gtm.elementTarget": $GA_NAME,"gtm.element": "float_top"})\'>'+
         '<i class="tip-bar-logo"></i>'+
         '<span class="s1">Download App Gratis</span>'+
         '<span class="s2">Trading bersama hanson Forex</span>'+
         '<span class="s2">Gratis - Tersedia di App Store</span>'+
         '<i class="tip-bar-linkarrow"></i>'+
         '</a>';
     var _wrapBox = createEl('div','tip-bar mobile');
     _wrapBox.innerHTML = tipBarHtml;
     if (window.sessionStorage.getItem("TipBar")){
         $('.tip-bar').remove();
     }else{
         $('.tip-bar').length===0 && $('body').prepend(_wrapBox);
     }

    /* COMMON - topnav hover */
    $('#mainnav').delegate('ul li', 'mouseenter', function(){
      if( $(this).find('.submenu').exist() ){
        var index = $(this).parent().find('li').index($(this));
        if($(window).width() > 1160){
          var tempPaddingLeft = $(this).offset().left - ( $(window).width()/2 - $('#site-header  >.container').width()/2 ) + 22;
        }else{
          var tempPaddingLeft = $(this).offset().left- ( $(window).width()/2 - $('#site-header  >.container').width()/2 ) + 15;
        }

        $(this).find('.submenu .f-pl').css({'padding-left':tempPaddingLeft+'px'});
      }
    })


    	/* COMMON - mobile menu */
	$('ul.mobile-menu').delegate('li a.btn-open-submenu', 'click', function(e){
		e.preventDefault();
        var _this = $(this).find('i')[0];
        var _class = _this.className;
        var _classArr = _class.split(' ');
        var _regClass = _class;
        _classArr.forEach(function (e,i) {
            if(e.indexOf('i-mobilemenu-arrow')!=-1){
                _regClass = e;
            }
        });

		if( $(this).hasClass('open') ){
            _this.className=_this.className.replace(_regClass,'i-mobilemenu-arrow');
			$(this).parent().find('ul.mobile-submenu').slideToggle();
			$(this).removeClass('open');
		}else{
            var _thissiblings = $(this).closest('li').siblings('li').find('a.btn-open-submenu.open > i')[0];
            $('a.btn-open-submenu.open').parent().find('ul.mobile-submenu').slideToggle();
            $(this).parent().find('ul.mobile-submenu').slideToggle();
            $('ul.mobile-menu li').find('a.btn-open-submenu.open').removeClass('open');
            if(!!_thissiblings){
                _thissiblings.className = _thissiblings.className.replace(_thissiblings.className,'i-mobilemenu-arrow');
            }
            _this.className=_this.className.replace(_regClass,_regClass+'d');
			$(this).addClass('open');
		}
	});



	/* COMMON - mobile menu open/close */
	$('body').delegate('.btn-mobile-menu a', 'click', function(e){
		e.preventDefault();
		mobileMenu();
	})
	$(window).resize(closeMobileMenu);

	function mobileMenu(){
		if( $('body').hasClass('mmopen') ){
			closeMobileMenu();
		}else{
			openMobileMenu();
		}
	}

	function openMobileMenu(){
		var winWidth = $(window).width();

		disableMobileNavBtn();
		$('body').addClass('mmopen');
		$('#mobile-menu').addClass('mmopen');
		$('#page').append('<div class="mmblocker"></div>');
		setTimeout(activateMobileNavBtn,800);

		$('.mmblocker').click(closeMobileMenu);
	}

	function closeMobileMenu(){
		if( $('body').hasClass('mmopen') ){
			disableMobileNavBtn();
			$('body').removeClass('mmopen');
			$('#mobile-menu').removeClass('mmopen');
			$('.mmblocker').remove();
			setTimeout(function(){
				$('body').css({'position':'', 'width':''});
				activateMobileNavBtn();
			},800);
		}
	}

	function activateMobileNavBtn(){
		$('body').delegate('.btn-mobile-menu a', 'click', function(e){
			e.preventDefault();
			mobileMenu();
		})
	}

	function disableMobileNavBtn(){
		$('body').undelegate('.btn-mobile-menu a', 'click');
	}


	/* PRODUCTS - left menu */
	$('.products-menu').delegate('.switch a', 'click', function(e){
		e.preventDefault();
		$('.products-menu').find('ul.switch-menu').slideToggle();
	});
	$(window).resize(function(){
		if( $(window).width() >= 990 ){
			$('.products-menu').find('ul.switch-menu').css({'display':''});
		}
	});

// /* GTM */
     var head = document.head || document.getElementsByTagName('head')[0];
     var scriptTag1 = document.createElement('script');
     scriptTag1.type = 'text/javascript';
     scriptTag1.src = '/public/js/gtm.js';

     var comment1 = document.createComment('Google Tag Manager');
     var comment2 = document.createComment('End Google Tag Manager');
     head.appendChild(comment1);
     head.appendChild(scriptTag1);
     head.appendChild(comment2);


    /*Hotjar*/
     var commenth = document.createComment('Hotjar Tracking Code for https://www.hsb.co.id/');
     var scriptTagh = document.createElement('script');
     scriptTagh.type = 'text/javascript';
     scriptTagh.src = '/public/js/hotjar.js';
     head.appendChild(commenth);
     head.appendChild(scriptTagh);

 });

 function openLiveChat(){
     var localurl=location.href;
     var pagereferrer=document.referrer;
     var iTop = (window.screen.availHeight-30-520)/2; //获得窗口的垂直位置;
     var iLeft = (window.screen.availWidth-10-740)/2; //获得窗口的水平位置;
     var url="https://tawk.to/chat/5b34b394eba8cd3125e34265/default/?$_tawk_popout=true";
     window.open (url,'LiveChatindow','height=520,width=740,top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
 }
 function createEl(tag,classes) {
     var el = document.createElement(tag || 'div');
     if(classes) {
         el.className = classes;
     }
     return el;
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
 function downloadAppyn100(_obj) {
     var mType = mobileType();
     if(mType == 'android'){
         $(_obj).attr("href","https://www.hsb.co.id/apk/hansonApp_yn100_prd_release.apk");
     }else if(mType == 'ios'){
         $(_obj).attr("href","https://itunes.apple.com/id/app/hanson-forex-trader/id1403262751");
     }
     closeTipBar(_obj);
 }
 function closeTipBar(o) {
     $(o).closest('.tip-bar').length>0 && $(o).closest('.tip-bar').remove();
     window.sessionStorage.setItem("TipBar",1)
 }
 function downloadAppgw(_obj) {
     var mType = mobileType();
     if(mType == 'android'){
         $(_obj).attr("href","https://play.google.com/store/apps/details?id=com.ixdigit.hanson#utm_source=pcgw_middle_download_android");
         dataLayer.push({'event':'Google play','gtm.elementTarget': $GA_NAME,'gtm.element': 'content_middle'});
     }else if(mType == 'ios'){
         $(_obj).attr("href","https://itunes.apple.com/id/app/id1403262751?mt=8#utm_source=pcgw_middle_download_ios");
         dataLayer.push({'event':'App Store','gtm.elementTarget': $GA_NAME,'gtm.element': 'content_middle'});
     }else{
         $(_obj).attr("href","https://ui.hsb.co.id/static/mobile.html#/register/RVf#utm_source=pcgw_middle_download");
         dataLayer.push({'event':'download btn','gtm.elementTarget': $GA_NAME,'gtm.element': 'content_middle'});
     }
 }
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