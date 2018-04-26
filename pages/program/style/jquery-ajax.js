function ajax(opt) {
	var ajaxinfotime = 1500 ;
	if(!!!opt){
		modal('ajax()没有参数',ajaxinfotime);
		return false;
	}
	if(typeof opt != 'object' || opt.length<1){
		modal('ajax()参数错误',ajaxinfotime);
		return false;
	}
	var o = $.extend({
			type:'post',
			dataType:'json',
			infosuccess:false,//显示提示
			errorCallback:false,//返回结果为 code!=200 code ==403 等结果也将执行回调函数 
		},opt),
		before = $.extend({}, opt);
	//非登录页每次操作判断?延长cookie有效期:跳转登录
	if(!judgeLoginType()){//token无效
		return false;
	}
	//token写入ajax头部
	var token = Cookies.get('token');
	if(!isLoginPage || token){
//		var token = Cookies.get('token');
		o.headers = $.extend({},{
			token: token
		},o.headers);
	}
	o.beforeSend = function(xhr, settings) {
		loading(settings.info||undefined);
		if(before.beforeSend instanceof Function){
			before.beforeSend(xhr,settings);
		}
	};
	o.success = function(data, status, xhr) {
//		if(typeof data == 'undefined' || data == undefined){
//			modal('获取数据异常',ajaxinfotime);
//			return false;
//		}
		if(typeof data.code == 'undefined'){
			modal('获取状态异常',ajaxinfotime);
			return false;
		}
		if(data.code != 200) {
			if(data.code == 403) {
				toLoginPage();
			} else {
				modal(data.msg ? '提示：'+ data.msg : '请求失败，稍后重试');
			}
			if(before.errorCallback && before.success instanceof Function ){
				before.success(data, status, xhr);
			}
			return false;
		}
		modalRemove();
		if(before.success instanceof Function){
			before.success(data, status, xhr);
			if(o.infosuccess){
				o.info ? modal(o.info +'成功',ajaxinfotime) :''; 
			}
		}else{
			if(o.infosuccess){
				modal(o.info? o.info +'成功':'请求成功',ajaxinfotime);
			}
		}
	};
	o.complete = function(xhr,status) {
		if (status == 'success'){ return false;}
		if(before.complete instanceof Function){
			before.complete(xhr,status);
		}else{
			modal(o.info? o.info +status : '请求：'+ status,ajaxinfotime);
		}
	};
	o.error = function(xhr,status,text) {
		if(before.error instanceof Function){
			before.error(xhr,status,text);
		}else{
			modal(o.info? o.info +status : '请求：'+ status,ajaxinfotime);
		}
	};
	return $.ajax(o);
}