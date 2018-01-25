;(function (w,d) {
	w.createOpenapp = function (funs) {
		var o = funs||{}; 
		var body = document.body,
			wp = document.createElement('div');
		wp.id = 'openApp';
		wp.innerHTML = '<a class="openapp-btn">打开APP</a><div class="openapp-content"><div class="openapp-esc"><i>x</i></div><div class="openapp-info"><img src="logo.png"/><p class="openapp-text">打开吉粮惠民APP购物<br>购买即补贴粮票</p></div></div>';
		body.append(wp);
		wp.querySelector('.openapp-esc').addEventListener('click',function(e){
			wp.setAttribute('class','');
			if(!!o.close && o.close instanceof Function){
				o.close(e);
			}
		});
		wp.querySelector('.openapp-btn').addEventListener('click',function(e){
			if(!!o.open && o.open instanceof Function){
				o.open(e);
			}
		});
		wp.show = function () {
			wp.setAttribute('class','active');
		};
		return wp ;
	};
})(window,document);
//var w = createOpenapp({
//	open:function (e) {
//		console.log(e);
//	}
//});
