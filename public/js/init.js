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
	function defineRem(maxW) {
		/*
		 clientW >= maxW 时  1rem = 100px , 小于等于时 1rem = 100 * clientW/maxW;
		 * */
		var maxW = maxW || 750,
			clientW = doc.documentElement.clientWidth ? doc.documentElement.clientWidth : doc.body.clientWidth;
		doc.documentElement.style.fontSize = 100 * (clientW >= maxW ? 1 : clientW / maxW) + 'px';
	};
	defineRem();
	window.onresize = function(e){
		defineRem();
	};
	
	//如果是测试连接，显示刷新按钮
	if(location.host == '192.168.1.188'&&document.getElementById('flexRefreshBtn')){
		document.getElementById('flexRefreshBtn').style.display = 'block';
	}
}(document, window));