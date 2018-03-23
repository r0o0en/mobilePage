//如果是测试连接，显示刷新按钮
if(location.host == '192.168.1.176' ) {
	document.write("<script language=\"javascript\" src=\"http:\/\/192.168.1.176/hmsh-agent-web\/src\/main\/webapp\/mobile-new\/js\/vconsole.min.js\" > <\/script><script>var v = new VConsole();<\/script>");
//	if( document.getElementById('flexRefreshBtn')){
//		document.getElementById('flexRefreshBtn').style.display = 'block';		
//	}
}
;(function(doc, win) {

	window.onLoad = function(fun) {
		var defaults = window.onload;
		window.onload = defaults ?
			function(e) {
				defaults(e);
				fun(e);
			} :
			fun;
	};
	window.onResize = function(fun) {
		if(!fun || fun && !(fun instanceof Function)) {
			return false;
		}
		var defaults = window.onresize;
		window.onresize = defaults ?
			function(e) {
				defaults(e);
				fun(e);
			} :
			fun;
	}

	function defineRem(maxW) {
		/*
		 clientW >= maxW 时  1rem = 100px , 小于等于时 1rem = 100 * clientW/maxW;
		 * */
		var maxW = maxW || 750,
			clientW = doc.documentElement.clientWidth ? doc.documentElement.clientWidth : doc.body.clientWidth;
		doc.documentElement.style.fontSize = 100 * (clientW >= maxW ? 1 : clientW / maxW) + 'px';
	};
	
	//获取参数
	window.getRequest = function() {
		var href = location.search;
		var url = decodeURI(href); //获取url中"?"符后的字串
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
			}
		}
		return theRequest;
	}
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
	window.smoothRoll = function() {
		if(browser.versions.ios || browser.versions.iPad) {
			onLoad(function() {
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
			});
		}
	}
	/*
	 init
	 * */
	defineRem();
	onResize(function(e) {
		defineRem();
	});
	
}(document, window));

var _mtac = {};
function statistics() {
	var mta = document.createElement("script");
  	mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4";
  	mta.setAttribute("name", "MTAH5");
  	mta.setAttribute("sid", "500595736");

  	var s = document.getElementsByTagName("script")[0];
  	s.parentNode.insertBefore(mta, s);
}