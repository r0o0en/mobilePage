//smoothRoll();
var home=$('.home2');
home.css({'minHeight':window.innerHeight});
var phone = $('#phone');
var url_judgeUser = function() {
	if(location.origin == 'http://192.168.100.178') {
		return 'http://test.hmsh.com/v1.0/activity/receiveStamps';
	} else {
		return 'http://test.hmsh.com/v1.0/activity/receiveStamps';
		return 'http://app.jlhmsh.com/v1.0/activity/receiveStamps';
	}
}();
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
	$('.page').addClass('active');
	$('.success .content').eq(i || 0).show();
}

function openFun() {
	openApp();
}
//var browser = {
//	versions: function() {
//		var u = navigator.userAgent,
//			app = navigator.appVersion;
//		return { //移动终端浏览器版本信息  
//			trident: u.indexOf('Trident') > -1, //IE内核  
//			presto: u.indexOf('Presto') > -1, //opera内核  
//			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
//			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
//			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
//			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
//			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
//			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
//			iPad: u.indexOf('iPad') > -1, //是否iPad  
//			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
//		};
//	}(),
//	language: (navigator.browserLanguage || navigator.language).toLowerCase()
//}
//console.log(browser);
//console.log('userAgent', navigator.userAgent);
//console.log('appVersion', navigator.appVersion);
//console.log('ua', navigator.userAgent.toLowerCase());
//alert(/(samsungBrowser)/ig.test(ag));
//alert(navigator.userAgent + '(' + /(Lenovo)/ig.test(navigator.userAgent) + ')');
//
//function openFun() {
//	var ua = navigator.userAgent.toLowerCase();
//	if(ua.match(/MicroMessenger/i) == "micromessenger") {
//		openApp();
//		alert('微信');
//		return "weixin";
//	} else if(ua.match(/QQ/i) == "qq") {
//		openApp();
//		alert('QQ');
//		return "QQ";
//	} else {
//		if(browser.versions.ios || browser.versions.iPad || browser.versions.iPhone) {
//			//ios
//			if(browser.versions.webApp) {
//				location.href = "https://itunes.apple.com/cn/app/id1156008352?l=zh&ls=1&mt=8"
//				alert('不支持跳转APP。');
//			} else {
//				openApp();
//			}
//		} else {
//			//安卓
//			var ag = navigator.userAgent;
//			//Lenovo 无法判断
//			if(/(samsungBrowser|EUIbrowser|MZbrowser|HUAWEI|XiaoMI|Miuibrowser|SogouMSE|sogoMobileBrowser)/ig.test(ag)) {
//				openApp();
//			} else {
//				location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.jlhm.personal";
//				alert('不支持跳转APP。');
//			}
//		}
//	}
//}
			 
			
			
			