//register
window.serverUrl="https://ui.hsb.co.id";
window.companyId =41913;
window.verificodeId ="";
window.customerToken ="";
window.lang = 'INA';
window.openFrom = isMobile()?'MOBILE_WEB':'WEBSITE';
window.emailReg =/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Tips={
    phone:'Nomor telepon telah pernah digunakan',//该电话号码已被使用
    email1:'Format email salah',//无效的电子邮件格式
    email2:'E-mail telah terdaftar',
    code:'Kesalahan kode verifikasi',//错误代码验证
    password:'Panjang kata sandi harus lebih dari 6 digit'//密码的长度必须超过6位数字
}

$('.input-txt').each(function () {
    $(this).focus(function () {
        inputFocus($(this).closest('.form-listbox'));
    })
});

function getVerifyCode($event){
    var dom = $event;
    var params_green ={"companyId":window.companyId};
    var lang = window.lang;
    var params ={
        "call_bo_method": "2",
        "company_id": window.companyId,
        "_url":"/app/appNewCustomer",
        "messageLang":lang
    };
    if(dom.id == "phone-code-btn"){   //手机
        params.call_bo_url  ="/verificode/getVerifiCode";
        params._areaCode = $("#exmobile").val().replace("+","");
        params._mobileNumber  =  params_green.mobilePhone =$("#mobile").val();
        params_green.mobilePhonePrefix = $("#exmobile").val().replace("+","");
        phoneVerify(document.getElementById('mobile'));
    }
    dom.value="Sending Code ...";
    remote_username_validator(window.serverUrl+"/bo/validate_phone",params_green).done(function(){
        $(dom).attr("disabled",true);
        $.ajax(window.serverUrl+"/bo/call",{
            type:"POST",
            data:params,
            success:function(data){
                try {
                    if (data.ret == 0) {
                        var msg = JSON.parse(data.msg);

                        if(msg.code == "success"){
                            window.verificodeId = msg.data._id;
                            var timer=60;
                            var inter =setInterval(function(){
                                dom.value= 'Resend: "'+--timer+'s"';
                                if(timer <=0){
                                    clearInterval(inter);
                                    dom.value="DAPATKAN KODE";
                                    $(dom).attr("disabled",false);
                                }
                            },1000);
                        }
                        else{
                            $(dom).attr("disabled",false);
                        }
                    }
                }
                catch (e) {
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                $(dom).attr("disabled",false);
            }
        });
    });
};
function remote_username_validator(url,param){
    var defer = $.Deferred();
    $.ajax(url,{
        data :param,
        success : function(data) {
            if(data.ret ==0){
                defer.resolve();
            }else{
                var msg = JSON.parse(data.msg);
                if(param.email){
                    $('.disableClickDom').hide();
                    errorVerify($("#emailAddress").closest('.form-listbox'));
                    $("#emailAddress").closest('.form-listbox').find('.result-msg').text(Tips.email2);
                }else{
                    $('.disableClickDom').hide();
                    errorVerify($("#mobile").closest('.form-listbox'));
                    $("#mobile").closest('.form-listbox').find('.result-msg').text(Tips.phone);
                    document.getElementById('phone-code-btn').value="DAPATKAN KODE";
                }
            }
        }
    });
    return defer;
}
function checkVerifycode(type){
    if(phoneVerify(document.getElementById('mobile'))) {
        if (vCodeVerify(document.getElementById('mobile_code'))) {
            if(isDisplayNone('emailAddress')){//pass
                if(isDisplayNone('password')){//pass
                    checkVerifycodeFn(type);
                }else{
                    //判断password
                    if(passwordVerify(document.getElementById('password'))){
                        checkVerifycodeFn(type);
                    }
                }
            }else{
                //判断emailAddress
                if(emailVerify(document.getElementById('emailAddress'))){
                    if(isDisplayNone('password')){//pass
                        checkVerifycodeFn(type);
                    }else{
                        //判断password
                        if(passwordVerify(document.getElementById('password'))){
                            checkVerifycodeFn(type);
                        }
                    }
                }
            }
        }
    }
}
function checkVerifycodeFn(type) {
    var params = {
        "call_bo_url": "/verificode/checkVerifiCode",
        "call_bo_method": "1",
        "company_id": window.companyId,
        "_verifiCode":type==0?$("#mobile_code").val().trim():(type==1?$("#email_code").val().trim():""),
        "_verifiNumber":type==0?$("#mobile").val().trim():(type==1?$("#email").val().trim():""),
        "_id":window.verificodeId
    };
    $.ajax(window.serverUrl+"/bo/call",{
        data:params,
        type:"POST",
        success:function(data){
            try {
                var disableClickDom = '<div class="disableClickDom" style="position: fixed;top:0;left:0;bottom:0;right:0;background: transparent;z-index: 9999999;"></div>';
                $('.disableClickDom').length>0 ? $('.disableClickDom').show() : $('body').append(disableClickDom);
                if (data.ret == 0) {
                    var msg = JSON.parse(data.msg);
                    if(msg.code == "success" && msg.data.status.code == 200){
                        window.customerToken = msg.data.token;

                        if(isDisplayNone('emailAddress')){//pass
                            register(type);
                        }else{
                            //邮箱
                            validatePhoneEmailFn(window.serverUrl+"/bo/validate_phone",type);
                        }
                    }
                    else{
                        errorVerify($("#mobile_code").closest('.form-listbox'));
                        $("#mobile_code").closest('.form-listbox').find('.result-msg').text(Tips.code);
                        $('.disableClickDom').hide();
                    }
                }
            }
            catch (e) {
            }
        }
    });
}
function validatePhoneEmailFn(url,type) {
    var lang = window.lang;
    var emailParams ={
        "call_bo_method": "2",
        "company_id": window.companyId,
        "_url":"/app/appNewCustomer",
        "messageLang":lang
    };
    emailParams.call_bo_url  ="/verificode/getEmailVerifiCode";
    var emailParams_green ={"companyId":window.companyId};
    emailParams_green.email = emailParams._email = $("#emailAddress").val();

    if(!emailParams._email || emailParams._email.trim() ==""){
        $('.disableClickDom').hide();
        errorVerify($("#emailAddress").closest('.form-listbox'));
    }else if(!window.emailReg.test( emailParams._email )){
        $('.disableClickDom').hide();
        errorVerify($("#emailAddress").closest('.form-listbox'));
    }else{
        remote_username_validator(url,emailParams_green).done(function(){
            $.ajax(window.serverUrl+"/bo/call",{
                type:"POST",
                data:emailParams,
                success:function(data){
                    try {
                        if (data.ret == 0) {
                            var msg = JSON.parse(data.msg);
                            if(msg.code == "success"){
                                correctVerify($("#emailAddress").closest('.form-listbox'));
                                register(type);
                            }
                        }
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
            });
        });
    }
}

function register(type){
    var lang = window.lang;
    var registerParams = getRequest2('utm_source');
    var source='';
    if (!$.isEmptyObject(registerParams)) {
        source = registerParams.utm_source;
    }
    var params = {
        "call_bo_url": "/app/appNewCustomer",
        "call_bo_method": "3",
        "company_id": window.companyId,
        "_token":window.customerToken,
        "openFrom":window.openFrom,
        "customer":{
            "companyId": window.companyId,
            "openFrom":window.openFrom,
            "mobilePhonePrefix":$("#exmobile").val().replace("+",""),
            "appMarket":source,
            "messageLang":lang
        }
    };
    if(type ==0 ){
        params.customer.mobilePhone  = $("#mobile").val();
        params.customer.passwordRaw = hex_md5($("#password").val());
        params.customer.email = $("#emailAddress").val();
    }
    params.customer = JSON.stringify( params.customer);
    $.ajax(window.serverUrl+"/bo/call",{
        type:"POST",
        async:false,
        data:params,
        success:function(data){
            try{
                if(data.ret == 0) {
                    var msg = JSON.parse(data.msg);
                    if (data.msg && msg.code == "SUCCESS") {
                        var result = msg.result;
                        if (result && result.newRet == "OK") {
                            $('.registerResultPopup').show();
                            $('.disableClickDom').hide();
                        }
                    }
                }
            }
            catch (e) {
            }
        }
    });
}

function getRequest2(){
    var url = window.location.search; //获取url中"?"符及其后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function phoneVerify(e) {
    if(!e.value || e.value.trim() ==""){
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }else if(!/^\d{5,}$/.test(e.value)){
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }else{
        correctVerify($(e).closest('.form-listbox'));
        return true;
    }
}
function vCodeVerify(e) {
    if(/^\d{6}$/.test(e.value)){
        correctVerify($(e).closest('.form-listbox'));
        return true;

    }else{
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }
}
function emailVerify(e) {
    if(!e.value || e.value.trim() ==""){
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }else if(!window.emailReg.test(e.value)){
        $(e).closest('.form-listbox').find('.result-msg').text(Tips.email1);
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }else{
        correctVerify($(e).closest('.form-listbox'));
        return true;
    }
}
function passwordVerify(e) {
    if(/^\w{6,}$/.test(e.value)){
        correctVerify($(e).closest('.form-listbox'));
        return true;
    }else {
        $(e).closest('.form-listbox').find('.result-msg').text(Tips.password);
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }
}
function errorVerify(objRoot) {
    objRoot.removeClass('inputCorrect').addClass('inputError');
}
function correctVerify(objRoot) {
    objRoot.removeClass('inputError').addClass('inputCorrect');
}
function inputFocus(objRoot) {
    objRoot.removeClass('inputError').removeClass('inputCorrect');
}

function isMobile() {
    if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true;
    }else {
        return false;
    }
}
function isDisplayNone(el) {
    if(document.getElementById(el).offsetParent === null){
        return true;
    }else{
        return document.getElementById(el).offsetParent.nodeName==='BODY';
    }
}