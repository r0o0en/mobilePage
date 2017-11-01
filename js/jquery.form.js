;(function ($) {
	//表单监听
	$.fn.watch = function(callback) {
		return this.each(function() {
			/*缓存以前的值*/
			var  before = $(this).val();
			$(this).on('keyup paste', function() {
				var val = $(this).val();
				if(before !== val) {
					before = $(this).val();
					callback($(this), val);
				}
			});
		});
	}
	var reg_tel = /^1[3|4|5|7|8][0-9]\d{8}$/ig;
	var reg_inputnumber = /\D/ig;
	$.fn.inputNumber = function(callback) { /*只于许输入数字*/
		return this.each(function(i, e) {
			/*//缓存以前的值 
			var  before = $(this).val();*/
			$(this).on('keyup paste', function(e) {
				var _this = $(this);
				var val =  _this.val();
				if(reg_inputnumber.test(val)){//删除非数字字符
					_this.val(val.replace(reg_inputnumber,''));
				}
				if(callback){
					callback(_this,_this.val());
				}
				/*//缓存当前值赋给before
				before = _this.val();*/
			});
		});
	}
	
	var reg_onlytel1 = /^1/ig,
	reg_onlytel2 = /^1[3|4|5|7|8]/ig,
	reg_onlytel3 = /^1[3|4|5|7|8][0-9]\d{0,8}/ig;
	$.fn.inputOnlyTel = function(callback) {/*只允许输入手机号*/
		return this.inputNumber(function (_this,val) {
			if(val.length<1){return false;}
			var onlytel;
			if(reg_onlytel3.test(val)){
				onlytel = val.match(reg_onlytel3);
			}else if(reg_onlytel2.test(val)){
				onlytel = val.match(reg_onlytel2);
			}else if(reg_onlytel1.test(val)){
				onlytel = val.match(reg_onlytel1);
			}else {
				_this.val('');
				return false;
			}
			_this.val(onlytel);
		})
	}
	
})(typeof jQuery != 'undefined' ? jQuery : typeof Zepto != "undefined" ? Zepto : false);
