//register

<!--555666   555666qq@qq.com   555666qq-->

window.serverUrl="http://192.168.35.198:10376";
window.companyId =72006;
// window.serverUrl="https://ui.hsb.co.id";
// window.companyId =41913;
window.verificodeId ="";
window.customerToken ="";
window.lang = 'INA';
window.emailReg =/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Tips={
    phone:'Nomor telepon telah pernah digunakan',
    email1:'Format email salah',
    email2:'Kode verifikasi salah',
    code:'Format password tidak sesuai',
    password:'Panjang kata sandi harus lebih dari 6 digit'
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
        params._mobileNumber  =  params_green.mobilePhone =$("#mobile").val();
        params_green.mobilePhonePrefix = $("#exmobile").val().replace("+","");
        phoneVerify(document.getElementById('mobile'));
    }
    remote_username_validator(window.serverUrl+"/bo/validate_phone",params_green).done(function(){
        $(dom).attr("disabled",true);
        $.ajax(window.serverUrl+"/bo/call",{
            type:"POST",
            data:params,
            success:function(data){
                console.log(data)
                try {
                    if (data.ret == 0) {
                        var msg = JSON.parse(data.msg);
                        if(msg.code == "success"){
                            window.verificodeId = msg.data._id;
                            var timer=60;
                            var inter =setInterval(function(){
                                dom.value= --timer+"S";
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
                    }else {
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
            console.log(data)
            if(data.ret ==0){
                defer.resolve();
            }else{
                var msg = JSON.parse(data.msg);
                console.log(msg);
                if(param.email){
                    errorVerify($("#emailAddress").closest('.form-listbox'));
                    $("#emailAddress").closest('.form-listbox').find('.result-msg').text(Tips.email2);
                }else{
                    errorVerify($("#mobile").closest('.form-listbox'));
                    $("#mobile").closest('.form-listbox').find('.result-msg').text(Tips.phone);
                }
            }
        }
    });
    return defer;
}
function checkVerifycode(type){
    if(phoneVerify(document.getElementById('mobile'))){
        if(vCodeVerify(document.getElementById('mobile_code'))){
            if(emailVerify(document.getElementById('emailAddress'))){
                if(passwordVerify(document.getElementById('password'))){
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
                            console.log(data)
                            try {
                                if (data.ret == 0) {
                                    let msg = JSON.parse(data.msg);
                                    if(msg.code == "success"  && msg.data.status.code == 200){
                                        window.customerToken = msg.data.token;

                                        //邮箱
                                        var emailParams_green ={"companyId":window.companyId};
                                        var lang = window.lang;
                                        var emailParams ={
                                            "call_bo_method": "2",
                                            "company_id": window.companyId,
                                            "_url":"/app/appNewCustomer",
                                            "messageLang":lang
                                        };
                                        emailParams.call_bo_url  ="/verificode/getEmailVerifiCode";
                                        emailParams_green.email = emailParams._email = $("#emailAddress").val();
                                        if(!emailParams._email || emailParams._email.trim() ==""){
                                            console.log('邮件为空')
                                            errorVerify($("#emailAddress").closest('.form-listbox'));
                                        }else if(!window.emailReg.test( emailParams._email )){
                                            console.log('邮件格式错误');
                                            errorVerify($("#emailAddress").closest('.form-listbox'));
                                        }else{
                                            remote_username_validator(window.serverUrl+"/bo/validate_phone",emailParams_green).done(function(){
                                                $.ajax(window.serverUrl+"/bo/call",{
                                                    type:"POST",
                                                    data:emailParams,
                                                    success:function(data){
                                                        console.log(data)
                                                        try {
                                                            if (data.ret == 0) {
                                                                var msg = JSON.parse(data.msg);
                                                                console.log(msg)
                                                                if(msg.code == "success"){
                                                                    correctVerify($("#emailAddress").closest('.form-listbox'));
                                                                    register(type);
                                                                }
                                                            }
                                                        }
                                                        catch (e) {
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    else{
                                        console.log(msg.data.status.msg)
                                        errorVerify($("#mobile_code").closest('.form-listbox'));
                                        $("#mobile_code").closest('.form-listbox').find('.result-msg').text(Tips.code);
                                    }
                                }else {
                                    console.log(data);
                                }
                            }
                            catch (e) {
                            }
                        },
                        error:function (XMLHttpRequest, textStatus, errorThrown) {
                        }
                    });

                }else{
                    return;
                };
            };
        }
    };

}
function register(type){
    var lang = window.lang;
    var params = {
        "call_bo_url": "/app/appNewCustomer",
        "call_bo_method": "3",
        "company_id": window.companyId,
        "_token":window.customerToken,
        "openFrom":"WEBSITE",
        "customer":{
            "companyId": window.companyId,
            // "nationality":$this.con.code,
            "openFrom":"WEBSITE",
            "mobilePhonePrefix":$("#exmobile").val().replace("+",""),
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
            console.log(data)
            try{
                if(data.ret == 0) {
                    let msg = JSON.parse(data.msg);
                    if (data.msg && msg.code == "SUCCESS") {
                        let result = msg.result;
                        console.log(result)
                        if (result && result.newRet == "OK") {
                            console.log('login=========')
                            $('.registerResultPopup').show();
                        }else{
                            console.log('注册失败'+msg.result.newComment)
                        }
                    }else{
                        console.log(msg.result.newComment+'请获取短信验证码')
                    }
                }
                else{
                    console.log(data)
                }
            }
            catch (e) {
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });


}

function phoneVerify(e) {
    if(!e.value || e.value.trim() ==""){
        console.log('Silakan masukkan nomor ponsel 请输入手机号')
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }else if(!/^\d{5,}$/.test(e.value)){
        console.log('Panjang minimum adalah 5 最小长度为5')
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
        console.log('请输入验证码')
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }
}
function emailVerify(e) {
    if(!e.value || e.value.trim() ==""){
        errorVerify($(e).closest('.form-listbox'));
        return false;
    }else if(!window.emailReg.test(e.value)){
        console.log('邮件格式错误');
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