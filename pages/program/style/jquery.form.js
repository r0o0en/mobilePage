var reg = {
	name:/^([\u4e00-\u9fa5]{2,20}|[A-Za-z]{2,20})$/,//姓名(中、英文),至少两位
	tel:/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[1456789]|6[56]|7[01345678]|9[89])[0-9]{8}))$/,//座机、手机号
	phone:/^(1([358][0-9]|4[1456789]|6[56]|7[01345678]|9[89])[0-9]{8})$/,//手机号
	email:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,//邮箱
	idNumber:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //15、18位身份证号
	chineseName:/^[\u4e00-\u9fa5]{2,20}$/,//中文姓名、两位以上纯中文
//	tel:/^1[3|4|5|6|7|8][0-9]\d{8}$/i,
	pass:/^[a-zA-Z][a-zA-Z0-9\_]{5,20}$/i,
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
			callback.apply(this,arguments);//callback = function(e){ this == input}
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
		if(!this.isElementNode()){
			console.warn(this,'target no has html element node');
			return this;
		}
		if(typeof _reg == 'undefined'){
			//既沒有 RegExp 也沒有 callback
			console.warn(this,'No callback function');
			return this;
		}else if(typeof _reg == 'function'){
			//只有一个callback
			return this.each(function (i,el) {
				$(el).watch(_reg);
			})
		}else if( typeof _reg == 'object' && ( _reg instanceof RegExp) ){
			//有正则表达式
			if( typeof callback =='function' ){
				//有回调
				return this.each(function (i,el) {
					$(el).watch(function (e) {
						var _this = $(this);
						//判断
						var judge = _reg.test(_this.val() );
						callback(_this,judge);
						_this = null ;
					})
				})
			}else{
				//没有回调
				console.warn(this,'callback is not function');
				return this;								
			}
		}
		
		return this ;
	}
	
	$.fn.isElementNode = typeof $.fn.isElementNode == 'function' ? $.fn.isElementNode :  function () {
		//检测一个 jquery对象中是否是 是 html element node  
		if(typeof this != 'object'){
			console.warn('this is not element object');
			return false;
		}else if(this.length<1){
			console.warn('this length < 1');
			return false;
		}else if(this.get(0).nodeType !== 1){
			console.warn("this no't html node");
			return false;
		}
		return true;
	};
	
}(typeof jQuery =='function' ? jQuery : typeof Zepto =='function' ? Zepto : false ));
