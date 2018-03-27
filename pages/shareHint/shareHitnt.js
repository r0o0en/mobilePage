//检测浏览器
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
if(/auto\-share\-hint/g.test(document.body.className)){
	judgeAppendShareHint();
}

function judgeAppendShareHint(hinthtml) {
	if(browser.versions.JLHM) {
		appendShareHint(hinthtml);
	}
}

function appendShareHint(hinthtml) {
	var wp = document.getElementsByClassName('share-hint');
	if(wp.length>0){
		for(var i = 0 ; i<wp.length;i++){
			wp[i].parentNode.removeChild(wp[i]);
		}
		delete i ;
	}
	var hint =  hinthtml || '点击分享按钮，分享到<br/>微信即可打开小程序';
	var styles = document.createElement('style');
	styles.type = 'text/css';
	styles.innerHTML = '.share-hint{position:fixed;z-index:999;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.6);}.share-hint-content{padding:10px;color:white;font-size:14px;}.share-hint-content img{display:inline-block;width:auto;height:auto;max-width:100%;border:none;}.share-hint-wx{text-align:right;}.share-hint-wx img{width:60px;margin-right:15px}.share-hint-wx p{line-height:1.2;padding-right:75px;margin:0 auto;-webkit-transform:translateY(-10px);-moz-transform:translateY(-10px);-ms-transform:translateY(-10px);-o-transform:translateY(-10px);transform:translateY(-10px);}.share-hint-wx span{text-align:left;display:inline-block;position:relative;padding:10px;}.share-hint-wx i{position:absolute;top:0;left:0;width:15px;height:15px;border-color:white;border-style:solid;border-width:2px 0 0 2px;}.share-hint-wx i + i{top:auto;left:auto;bottom:0;right:0;border-width:0 2px 2px 0;}';
	document.getElementsByTagName('head')[0].appendChild(styles);
	
	var htmls = document.createElement('div'),
		htmlsinner = '';
	htmls.className = 'share-hint'
	htmls.setAttribute('onclick', 'this.parentNode.removeChild(this)');
	htmlsinner = '<div class="share-hint-content"><div class="share-hint-wx">';
	htmlsinner += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABJCAMAAACtmkDtAAAAq1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Nr6iZAAAAOHRSTlMA/PjciAOXklW8oSEZEAsG8J6EaU81JBOxdUUd6uLUzLetfEcwLNfEp41aQTwCbmBcSyby52Q6H93kPUQAAAH7SURBVFjD7ZfHktswEEQHALPEZRCpsFTOaZU29f9/matoeS27XOUi2Qcf/G488BUHBHowwqDTERIHpQ4cUzcG4i7DFBoAMGFzk+2jxLcbqxzcceQ/fyeyUpbqE4qlWmJIOzhYs1R7+CzVHAlLlWDOUm3gsVTOeiX/HLePiKVyefkyxp5k6im0SSoPYyERwCKZ7CFykuoZIyGRGVdoPLHqW7zw9uc7ybRAzKpvih3JlEMVtI9KaNtTt0gqn7ZSElohR1R8CAtfse7YJ7yS1nypcSYlusGMY4p8mJAV6PGqcnT3+9YfXtrrrOrJEBkDCH6rxYukauvrYCCH81bB/PLbU0yrRmdXf29xucGo+FmyCwyqr+1UStpjbL+awgzVd/mT/mqWhfsjdlsTaK9GGpmHp1UpO8YYLWtMxOg/zmoXEVt6b35PqjN4TNs5AlmYXG61JsjL+uFHZZhsgT7nFgXotH7Pu7r3ctqJBqbdBlO/wqRzPHpzCTWQShOyGCWFuFCthgF38s1647bEe50JhxdpkXLcm7Cu0xeNlDSvA4HNMK0mIH3TTiH2CJ52TwL0my+5vdjqnXwuGt/Fr84bGidBtLzJWQEYWlXP73C0mTlWOuhKZjmzzUghkCOM+xxJRULcuUqCkmEiUVHreLXz7DS3XGcpe2vwnuU9qck3i0s0AzEHL7wAAAAASUVORK5CYII="/>';
	htmlsinner += '<p><span>'+hint+'<i></i><i></i></span></p></div></div>';
	htmls.innerHTML = htmlsinner;
	
	document.body.appendChild(htmls);

	delete styles;
	delete htmls;
	delete htmlsinner;
	delete hint;
}
