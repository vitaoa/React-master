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
         $('body').prepend(_wrapBox);
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

        var _class = this.className;
        var _classArr = _class.split(' ');
        var _regClass = _class;
        _classArr.forEach(function (e,i) {
            if(e.indexOf('i-mobilemenu-arrow')!=-1){
                _regClass = e;
            }
        });

		if( $(this).hasClass('open') ){
            this.className=this.className.replace(_regClass,'i-mobilemenu-arrow');
			$(this).parent().find('ul.mobile-submenu').slideToggle();
			$(this).removeClass('open');
		}else{
			$('a.btn-open-submenu.open').parent().find('ul.mobile-submenu').slideToggle();
			$(this).parent().find('ul.mobile-submenu').slideToggle();
			$('ul.mobile-menu li').find('a.btn-open-submenu.open').removeClass('open i-mobilemenu-arrowd').addClass('i-mobilemenu-arrow');
            this.className=this.className.replace(_regClass,_regClass+'d');
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