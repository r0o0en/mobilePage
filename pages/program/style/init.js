/*
 * 如果是测试连接，显示 vconsole
 * 
 * */
if(typeof VConsole != 'function') {
	if( location.origin == 'http://192.168.1.176' ){
		document.write("<script language=\"javascript\" src=\"http:\/\/192.168.1.176\/hmsh-agent-web\/src\/main\/webapp\/mobile-new\/js\/vconsole.min.js\" > <\/script><script>var v = new VConsole();<\/script>");		
	}else if(location.origin == 'http://jlhmsh.vicp.io:5555'){		
		document.write("<script language=\"javascript\" src=\"http:\/\/hs1006.22ip.net:5555\/hmsh-agent-web\/src\/main\/webapp\/mobile-new\/js\/vconsole.min.js\" > <\/script><script>var v = new VConsole();<\/script>");
	}
}
$('.fixed-btn').on('click',function (e) {
	e.preventDefault();
	location.replace(this.getAttribute('href'));
})
/*
 * 读取token or 并存储
 * 
 * */
var urlData = getUrlData();
try{
	if(urlData.token) {
		setToken(urlData.token);
	} else {
		e.preventDefault();
	}	
}catch(e){
	//TODO handle the exception
}


/*
 * 服务环境 or 接口
 * 
 * */
var SERVER = judgeServer();
var URL = judgeUrl(SERVER);
var URLS = judgeUrls(SERVER);
$(function () {
	console.log("location ", location);
	console.log("location.origin = ", location.origin);
	console.log('urlData.token = ',urlData.token);
	console.log("SERVER = ", SERVER);
	console.log("URL = ", URL);
	console.log("URLS = ", URLS);	
})
function judgeServer(){
	//获取当前环境
	if(location.origin == "http://192.168.1.176") {
		return 0;
	}else if(location.origin == "http://jlhmsh.vicp.io:5555") {		
		return 3;
	} else if(/server=test/i.test(location.search)) { //url后带参数?server=test
		return 1;
	} else {
		return 2;
	}
	return -1;
}
function judgeUrl(server){
	return ["http://192.168.1.101:8080","http://admin.jlhmsh-test.com/","http://back.jlhmsh.com",'http://jlhmsh.vicp.io:8888'][server];
}
function judgeUrls(server){
	//根据当前环境选择对应的接口
	var local = {//某JAVA电脑本地接口
		postSubmitOrder: URL +'/v1.0/insuranceFee/subOrder',//提交订单
		getInsuranceInfo: URL +'/v1.0/insuranceFee/getInsuranceFee',//保险信息
		getOrderList:URL + '/v1.0/insuranceFee/getUserOrderList',//订单列表
		getPushOrder:URL + '/v1.0/insuranceFee/pushOrder',//去支付
		postJudgeReferee:URL + '/v1.0/insuranceFee/queryReferee',//验证保险专员
		postCancelOrder:URL + '/v1.0/insuranceFee/cancelOrder',//取消订单
	};
	var test = $.extend(true, local, {//测试后台接口
		
	});
	var official = $.extend(true, local, {//正式接口
		
	});
	
	return [local,test,official,local][server];
}

/*
 * 判断 modal（）
 * 
 * */
//if(typeof modal != 'function'){
//	function modal(info,time) {alert(info);console.log(info,time);};
//}
/*
 * cookie
 * 
 * */
//默认token
var _token = false;
if(typeof Cookies == 'function'){ //Cookies 对象
	if (!Cookies.enabled) {//检测支持 Cookies方法
		modal('浏览器不支持cookies,请检查是否禁用！');
	}else{
		//存在cookies
		_token = Cookies.get('token');
	}
}else{
	console.warn('没有引入 Cookies.js');
//	modal('没有引入 Cookies.js');
}
//cookies 参数
var cookiesOptions = {
	expires: 60*30 //过期时间
};
function setToken(token) {
	Cookies.set('token', token,cookiesOptions);
}
function getToken() {
	return Cookies.get('token');
}

/*
 * 判断是否登录 or 返回登录页
 * 
 * */
//当前页面是否需要登录
var needLogin = true ;

function judgeLoginType(judge) { //每次刷新页面 或 ajax操作前执行方法
	if(_token){
		delayedToken();
	}else{
		toLoginPage();	
		return false;
	}
	return true;
}
function delayedToken(){//延长token
	try{
		//Cookies.set('token', Cookies.get('token'),cookiesOptions);
		setToken(Cookies.get('token'));
	}catch(e){
		//TODO handle the exception
		modal('延长 cookie 失败');
	}
	
}
function toLoginPage() {//登录过期，2s自动跳转登录页/按钮立即跳转
	modal('登录过期！');
	if(typeof Cookies == 'object' && typeof Cookies.set == 'function'){
		Cookies.set('token','',{expires:0});		
	}
	setTimeout(function() {
		loginPage();
	}, 1000);
}
function loginPage(){//跳转登录页
	modal('跳转登录 or 登录命令');
	location.href = 'hmclient://toLogin';
}

/*
 * ajax
 * 
 * */

function ajax(opt) {
	//modal 提示时间
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
			//needLogin:true, //是否需要登录（token）
			infosuccess:false,//显示提示
			errorCallback:false,//返回结果为 code!=200 code==403 等结果也将执行回调函数 
		},opt),
		before = $.extend({}, opt);
//	console.log( o.needLogin , ( typeof o.needLogin == 'boolean' ?  ( o.needLogin != false && needLogin ) : ( needLogin ) ) );
	if( o.needLogin || ( typeof o.needLogin == 'boolean' ?  ( o.needLogin != false && needLogin ) : ( needLogin ) ) ){//需要登录 or 接口需要 token
		//每次操作判断?延长cookie有效期:跳转登录
		if(!judgeLoginType()){//token无效
			return false;
		}
		//token写入ajax头部
		var token = getToken();
		console.log('ajax token = ',token);
		if(token){
			o.headers = $.extend({},{
				token: token
			},o.headers);
		}
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
		if(data.code !== 0) {
			if(data.code == 110001 || data.code == 110002) {//重新登录(登录过期):110001 ;用户未登陆:110002;
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
/*
 * 获取连接参数
 * 
 * */
function getUrlData() { //获取参数
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			if(strs[i].length == 0) {
				continue;
			}
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
/*
 * 检测浏览器
 * 
 * */
if(typeof browser != 'object') {
	browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1, //IE内核
				ie: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核

				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部

				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
				qqBrowser: u.indexOf('MQQBrowser') > -1,
				qq: /QQ\/[\d\.]+/ig.test(u),
				JLHM: /hmsh\s?\d?/ig.test(u)
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};
}

/*
 * 	时间 处理 or 转换
	new Date(1511228236874).format('yyyy-MM-dd hh:mm:ss')
* */
Date.prototype.format = function(style) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"w+": "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt(this.getDay()), //week
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	};
	if(/(y+)/.test(style)) {
		style = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(style)) {
			style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return style;
};