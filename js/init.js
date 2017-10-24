;(function(doc, win) {
	/*
	 window.onresize 兼容多个
	 * */
	var resize_arr = [],
		resize_naming = 0;
	window.addResize = function (fun) {
		if(!fun || fun && !(fun instanceof Function) ){return false;}
		var name  = fun.name ? fun.name : 'undefined_'+resizeNaming();
		resize_arr.push({
			"name":name,
			"callback":fun
		});
		integrationCallback();
	}
	function resizeNaming() {
		return ++resize_naming;
	}
	function integrationCallback() {
		var arr = resize_arr,
			len = arr.length,
			f = function(){};
		if(!arr || arr && !(arr instanceof Array)){return false;}
		window.onresize = undefined;
		for(var i = 0 ; i<len;i++){
			console.log(i);
			f = window.onresize;
			window.onresize =  f ?
				function(e){
					f(e);
					arr[i].callback(e);
				}:arr[i].callback;
		};
		i--;
	}
	
	
	
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
//	window.onresize = function(e){
//		defineRem();
//	};
}(document, window));