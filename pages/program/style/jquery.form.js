var reg = {
	name:/^([\u4e00-\u9fa5]{2,}|[A-Za-z]{2,})$/,//姓名(中、英文),至少两位
	tel:/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/,//座机、手机号
	phone:/^(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8})$/,//手机号
	email:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,//邮箱
	idNumber:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //15、18位身份证号
	chineseName:/^[\u4e00-\u9fa5]{2,}$/,//中文姓名、两位以上纯中文
//	tel:/^1[3|4|5|6|7|8][0-9]\d{8}$/i,
	pass:/^[a-zA-Z][a-zA-Z0-9\_]{5,}$/i,
	code:/^[0-9]{6}$/i,
	thousandInteger:/^[0-9]+[0]{3}(\.[0]+){0,1}$/ //千整数
}
;(function ($) {
	if(typeof $ === 'boolean'){
		var $ = function(){}
		$.fn = $.prototype;
	}
	/*
	 汉字：/[\u4e00-\u9fa5]+/g
	 * */
	/*
	 $.watch(callback) 表单监听
	 1、如果当前值等于before（之前的值） 则不作处理 本次监听结束， 如果不等于执行第2步。
	 2、如存在callback ,则执行callback(_this,val) val为当前值 如果不存在则 本次监听结束。
	 * */
	
	$.fn.watch = function(callback) {
		return this.on('keyup paste change',function (e) {
//			console.log('evnet('+e.type+'):',e.key,e.code,e.keyCode);
//			console.log('val() = ',$(this).val());
			callback.apply(this,arguments);
//			return false;
		});
	};
	
	/*
	 	给input添加/溢出 error状态
	 * */
	$.fn.addError = function () { //添加 error 状态
		return this.addClass('error');
	};
	$.fn.removeError = function () { //去除error
		return this.removeClass('error');
	};
	/*
	 	给input button 添加/溢出禁用
	 * */
	$.fn.addDisabled = function () {
		return this.addClass('disabled').attr('disabled','disabled');
	};
	$.fn.removeDisabled = function () {
		return this.removeClass('disabled').removeAttr('disabled');
	};
	
	/*
	 	示例
	 * */
	$.fn.watchVerify = function (_reg,callback) {
		if(typeof this != 'object' || this.length<1){
			console.warn(this,'this is not element Object or length<1');
			return this ;
		}
		var judge = true; // true:有_reg 和 callback ，false:只有callback ，两个都没有，就直接返回this
		if(typeof _reg == 'undefined'){
			console.warn(this,'No callback function');
			return this;
		}else if( typeof _reg == 'object' && ( _reg instanceof RegExp) ){
			if( typeof callback =='function' ){
				judge = true;
			}else{
				console.warn(this,'callback is not function');
				return this;								
			}
		}else if(typeof _reg == 'function'){
			judge = false;	
		}
		
		if(judge){
			this.each(function (i,el) {
				$(el).watch(function (e) {
					var _this = $(this);
					//判断
					var judge = _reg.test( _this.val() );
					callback(_this,judge);
					delete _this;
				})
			})
		}else{
			this.each(function (i,el) {
				$(el).watch(function (e) {
					var _this = $(this);
					callback(_this);
					delete _this;
				})
			})
		}
		
		return this ;
	}
	
	function name($element){
		if(typeof $element != 'object'){
			console.warn('$element is not element object');
			
			return false;
		}else if($element.length<1){
			console.warn('$element length < 1');
			return false;
		}else if($element.get(0).nodeType !== 1){
			console.warn("$element no't htmlNode");
			return false;
		}
	}
	
}(typeof jQuery =='function' ? jQuery : typeof Zepto =='function' ? Zepto : false ));
