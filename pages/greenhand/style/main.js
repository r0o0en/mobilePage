if(location.host == '192.168.1.176' ) {
	document.write("<script language=\"javascript\" src=\"http:\/\/192.168.1.176/hmsh-agent-web\/src\/main\/webapp\/mobile-new\/js\/vconsole.min.js\" > <\/script><script>var v = new VConsole();<\/script>");
//	if( document.getElementById('flexRefreshBtn')){
//		document.getElementById('flexRefreshBtn').style.display = 'block';		
//	}
}
//监听窗口变化
$(window).resize(function (e) {
	defineRem();
});
$(function () {
	defineRem();
	//初始化给高
//	if(!/noob\.html/i.test(location.pathname)){
//		setBodyHeight();
//		$(window).resize(function (e) {
//			//判断竖屏
//			judgeVertical(function () {
//				setBodyHeight();
//			},function () {
//				setBodyHeight('auto');
//			});
//		});
//	}

	if(!/noob\.html/i.test(location.pathname)){
		var home = $('.home,.success');
		home.css('minHeight',window.innerHeight + 'px');
		$(window).resize(function (e) {
			//判断竖屏
			judgeVertical(function () {
				home.css('minHeight',window.innerHeight + 'px');
			},function () {
				home.css('minHeight',"0px");
			});
		});	
	}
	
	//监听表单提交
	var urld = getQueryData();
	var islocally = location.origin == 'http://192.168.1.176';
	var istest =  urld.serve && urld.serve == 'test';
	
	var url_judgeUser = function() {
		if( islocally || istest) {
//			alert('（测试）请求接口：' + 'http://test.hmsh.com/v1.0/activity/receiveStamps');
			return 'http://test.jlhmsh-test.com/v1.0/activity/receiveStamps';
		}else{
			return 'http://app.jlhmsh.com/v1.0/activity/receiveStamps';
		}
	}();
	
	var phone = $('#phone');
	$('form').submit(function(e) {
		e.preventDefault();
		if(!phone.inputjudgePhone()) {
			return false;
		}
		$.ajax({
			url: url_judgeUser,
			data: {
				phone: phone.val()
			},
			type: "get",
			dataType: 'json',
			success: function(data) {
				if(data.code === 0) {
					//console.log('等于0');
					isSuccess(0);
				} else {
					//console.log('等于-1');
					isSuccess(1);
				}
			},
			complete: function(xhr, status) {
				if(status != "success") {
					isSuccess(1);
				}
				//console.log('complete',arguments);
			},
			error: function(xhr, status, text) {
				//alert('error：【'+status+'】【'+text+'】');
			}
		});
	})
	function isSuccess(i) {
		$('body').addClass('active');
		$('.success .content').eq(i || 0).show();
	}
	$('.success .open-app').on('click',function () {
		if(/HMSH/ig.test(navigator.userAgent)){
			modal('你已经在APP应用中了！');
		}else{			
			nativeSchema.loadSchema();			
		}
	})
})


function defineRem(maxW) {
	try{
		/*
		 clientW >= maxW 时  1rem = 100px , 小于等于时 1rem = 100 * clientW/maxW;
		 * */
		var maxW = maxW || 750,
			clientW = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
		document.documentElement.style.fontSize = 100 * (clientW >= maxW ? 1 : clientW / maxW) + 'px';
	}catch(e){
		//TODO handle the exception
		alert('function defineRem error');
	}
}

function setBodyHeight(target,h){
	if(!!target){
		if(target.nodeType == 1 ){

			if(typeof h == 'number'){
				target.style.height = h + 'px';		
			//}else if(typeof target == 'string' && /(rem|px|em|\%|auto|inherit|initial)$/ig.test(target) ){
			}else if(typeof h == 'string'){
				target.style.height = h;
			}else{
				target.style.height = window.innerHeight + 'px';	
				
			}
		}else if(typeof target == 'number'){
			document.body.style.height = target + 'px';		
		//}else if(typeof target == 'string' && /(rem|px|em|\%|auto|inherit|initial)$/ig.test(target) ){
		}else if(typeof target == 'string'){
			document.body.style.height = target;
		}
	}else{
		document.body.style.height = window.innerHeight + 'px';		
	}
}

function judgeVertical(vertical,transverse) { // vertical 竖屏回调   transverse:横屏回调
	var max_w = 750;
	var w = window.innerWidth ,
		h = window.innerHeight;
	w = w >= max_w ? max_w : w;
	console.log('max_w',max_w);
	console.log('w',w);
	console.log('h',h);
	if( w < h ){ //竖屏
		if(!!vertical && typeof vertical == 'function'){ vertical();}
		return true;
	}else{//横屏
		if(!!transverse && typeof transverse == 'function'){ transverse();}
		return false;
	}
}

$.fn.watch = function(callback) {
	return this.each(function() {
		/*缓存以前的值*/
		var before = $(this).val();
		//			$(this).on('keyup paste', function(e) {
		$(this).on('keyup paste', function(e) {
			var _this = $(this),
				val = _this.val();
			if(before != val) {
				callback ? callback(_this, _this.val()) : '';
				before = _this.val();
			}
		});
	});
};
$.fn.inputJudge = function(reg, data) {
	if(!(reg instanceof RegExp)) {
		return false;
	}
	var v = this.val(),
		judge;
	if(typeof data != 'object') {
		judge = reg.test(v);
		if(judge) {
			this.removeClass('error');
		} else {
			this.addClass('error');
		}
		return judge;
	} else {
		var o = $.extend({
//				title:'手机号',
//					info:'请输入11位手机号'
			}, data),
			len = v.length;
		if(v == '' || v == null || len == 0) {
			modal(o.title + '为空');
			judge = false;
		} else if(typeof o.length == 'number' && o.length > 0 && len != o.length) {
			modal('请输入' + o.length + '位的' + o.title);
			judge = false;
		} else if(typeof o.minlength == 'number' && o.minlength >= 0 && len < o.minlength) {
			modal('请输入至少' + o.minlength + '位的' + o.title);
			judge = false;
		} else if(typeof o.maxlength == 'number' && o.maxlength >= 0 && len > o.maxlength) {
			modal('请输入最多' + o.maxlength + '位的' + o.title);
			judge = false;
		}
		if(typeof judge != 'undefined') {
			this.addClass('error');
			this.focus();
			return false;
		}
		judge = reg.test(v);
		if(judge) {
			this.removeClass('error');
		} else {
			modal(o.info);
			this.focus();
			this.addClass('error');
		}
		return judge;
	}
};
$.fn.inputjudgePhone = function() {
	var reg_tel = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
	return this.inputJudge(reg_tel, {
		title: '手机账号',
		info: "账号应为11号手机号码",
		length: 11
	});
};


//检测浏览器
window.browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
				weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
				qq: u.match(/\sQQ/i) == " qq" //是否QQ
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
//给body 添加 平滑滚动
smoothRoll = function() {
	if(browser.versions.ios || browser.versions.iPad) {
		setTimeout(function () {
				var body = document.body,
					html = document.getElementsByTagName('html')[0],
					box = document.querySelector('.page');
				var classs = box.getAttribute('class')||'',
					bodystyle = body.getAttribute('style')||'',
					htmlstyle = html.getAttribute('style')||'',
					boxstyle = box.getAttribute('style')||'';
				html.setAttribute('style', htmlstyle + 'background-color: white;');
				body.setAttribute('style', bodystyle + 'height: 100%;overflow: hidden;');
				box.setAttribute('style', boxstyle + 'height: 100%;overflow: auto;position: relative;z-index: 1;');
				box.setAttribute('class', classs + ' smooth-roll');					
		},100);
	}
};
onLoad = function(fun) {
	var defaults = window.onload;
	window.onload = defaults ? function(e) {
		defaults(e);
		fun(e);
	} : fun;
};

 //获取参数
function getQueryData() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			if(strs[i].length==0){continue;}
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

var _mtac = {};
function statistics() {
	var mta = document.createElement("script");
  	mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4";
  	mta.setAttribute("name", "MTAH5");
  	mta.setAttribute("sid", "500595736");

  	var s = document.getElementsByTagName("script")[0];
  	s.parentNode.insertBefore(mta, s);
}