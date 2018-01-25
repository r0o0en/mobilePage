var reg_tel = /^1[3|4|5|7|8][0-9]\d{8}$/i;
var reg_pass = /^[a-zA-Z]+[a-zA-Z0-9\_]{5,}$/i;
var reg_code = /^[0-9]{6}$/i;
;(function ($) {
	/*
	 汉字：/[\u4e00-\u9fa5]+/g
	 * */
	/*
	 $.watch(callback) 表单监听
	 1、如果当前值等于before（之前的值） 则不作处理 本次监听结束， 如果不等于执行第2步。
	 2、如存在callback ,则执行callback(_this,val) val为当前值 如果不存在则 本次监听结束。
	 * */
	$.fn.watch = function(callback) {
		return this.each(function() {
			/*缓存以前的值*/
			var  before = $(this).val();
//			$(this).on('keyup paste', function(e) {
			$(this).on('keyup paste', function(e) {
				var _this = $(this),
					val =  _this.val();
				if(before != val){
					callback ? callback(_this,_this.val()) : '';
					before = _this.val();
				}
			});
		});
	};

	/*
	 $.inputOnly(reg[,callbakc])
	  判断  reg.test(val) ？ 允许输入 : 返回之前有效值; 
	 * */
	$.fn.inputOnly = function (reg,callback) {
		if(!(reg instanceof RegExp)){console.error('regExp为空或为空！',this[0],reg);return this;}
		if(callback instanceof Function){
			return this.watch(function (_this,val) {
				if(val.length<1){return false;}
				var val_alert = reg.test(val) ? val.match(reg)[0] : '' ;
				val != val_alert ? _this.val(val_alert) : '';
				callback(_this ,val_alert);
			});
		}else{
			return this.watch(function (_this,val) {
				if(val.length<1){return false;}
				var val_alert = reg.test(val) ? val.match(reg)[0] : '' ;
				val != val_alert ? _this.val(val_alert) : '';
			});
		}
	};
	
//	var reg_nonumber = /[^0-9\.]*/i; //非小数数字字符
//	var reg_nonumber = /[^0-9]+/i; //非数字字符
	$.fn.inputOnlyNumber = function (callback) {/*只允许输入数字*/
		this.attr('type','tel');
		return this.inputOnly(/^[0-9]+/i,callback);
	};
	
//	var reg_tel = /^1[3|4|5|7|8][0-9]\d{8}$/i;
//	var reg_onlytel = /(1[3|4|5|7|8][0-9]\d{0,8})|(1[3|4|5|7|8])|(1)/i; /*1-11手机号*/
	$.fn.inputOnlyTel = function (callback) { /*只允许输入 0-11位 符合手机号 的数字*/
		this.attr('type','tel');
		return this.inputOnly(/(1[3|4|5|7|8][0-9]\d{0,8})|(1[3|4|5|7|8])|(1)/i,callback);
	};

	//var reg_onlyEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
//	var reg_onlyEmail = /([a-zA-Z0-9]+[a-zA-Z0-9\_]*@[a-zA-Z0-9\_]+\.[a-zA-Z]{0,6}\.?[a-zA-Z]{0,4})|([a-zA-Z0-9]+[a-zA-Z0-9\_]*@?[a-zA-Z0-9\_]*)/i;
	$.fn.inputOnlyEmail = function (callback) { /*只允许输入 符合邮箱 的字符串*/
		return this.inputOnly(/([a-zA-Z0-9]+[a-zA-Z0-9\_]*@[a-zA-Z0-9\_]+\.[a-zA-Z]{0,6}\.?[a-zA-Z]{0,4})|([a-zA-Z0-9]+[a-zA-Z0-9\_]*@?[a-zA-Z0-9\_]*)/i,callback);
	};
//	var reg_onlyName = /[a-zA-Z]*||[\u4e00-\u9fa5]*/i;
//	var reg_onlyName = /([a-zA-Z]+)|([\u4e00-\u9fa5]+)/i;
	$.fn.inputOnlyName = function (callback) { /*只允许输入 中/英文 的名称*/
		return this.inputOnly(/([a-zA-Z]+)|([\u4e00-\u9fa5]+)/i,callback);
	};
	
	$.fn.inputOnlyCode = function (callback) { /*只允许输入 6 位以内数字的 短信验证码*/
		this.attr('type','tel');
		return this.inputOnly(/[0-9]{1,6}/i,callback);
	};
	$.fn.inputOnlyImgCode = function (callback) { /*只允许输入 6 位以内数字的 短信验证码*/
		return this.inputOnly(/[a-zA-Z0-9]{1,4}/ig,callback);
	};
	
	
	
	/*
	 $.inputjudge(reg[,val])
	  判断 并返回$input 的 reg.test(val); 
	 * */
//	$.fn.inputJudge = function () {
//		if(!( !!reg || typeof reg == 'object' || reg instanceof RegExp )){return false;}
//		var  val = this.val();
//		var judge = reg.test(val);
//		if(judge){
//			this.removeClass('error');
//		}else{
//			this.addClass('error');
//		}
//		return judge ;
//	};
	$.fn.inputJudge = function (reg,data) {
		if(!( reg instanceof RegExp )){return false;}
		var v = this.val(),
			judge;
		if(typeof data != 'object'){
			judge = reg.test(v);
			if(judge){
				this.removeClass('error');
			}else{
				this.addClass('error');
			}
			return judge ;			
		}else{
			var o =$.extend({
//					title:'手机号',
//					info:'请输入11位手机号'
				},data),
				len = v.length;
			if(v == '' || v == null || len == 0){
				modal( o.title + '为空');
				judge = false ;
			}else if(typeof o.length == 'number' && o.length > 0 && len != o.length){
				modal('请输入'+o.length +'位的'+o.title);
				judge = false ;
			}else if(typeof o.minlength == 'number' && o.minlength>=0 && len < o.minlength){
				modal('请输入至少'+o.minlength +'位的'+o.title);
				judge = false ;
			}else if(typeof o.maxlength == 'number' && o.maxlength>=0 && len > o.maxlength){
				modal('请输入最多'+o.maxlength +'位的'+o.title);
				judge = false ;
			}
			if(typeof judge != 'undefined'){
				this.addClass('error');
				this.focus();
				return false;
			}
			judge = reg.test(v);
			if(judge){
				this.removeClass('error');
			}else{
				modal(o.info);
				this.focus();
				this.addClass('error');
			}
			return judge;
		}
	};
	$.fn.inputjudgePhone  = function () {
		return this.inputJudge(reg_tel,{
			title:'手机账号',
			info:"账号应为11号手机号码",
			length:11
		});
	};
	$.fn.inputjudgePassword  = function () {
		return this.inputJudge(/^[a-zA-Z0-9]{6,}/,{
			title:'登录密码',
			info:"<p style='margin:0 auto;text-align: center;'>密码应以字母开头<br/>由字母和数字组成,至少6位字符</p>",
			minlength:6
		});
//		return this.inputJudge(reg_pass,{
//			title:'登录密码',
//			info:"<p style='margin:0 auto;text-align: center;'>密码应以字母开头<br/>由字母和数字组成,至少6位字符</p>",
//			minlength:6
//		});
	};
	$.fn.inputjudgeCode  = function () {
		return this.inputJudge(reg_code,{
			title:'验证码',
			info:"验证码应为6位数字",
			length:6
		});
	};
	$.fn.inputjudgeInviter  = function () {
		return this.inputJudge(reg_tel,{
			title:'邀请人手机',
			info:"邀请人账号应为11号手机号码",
			length:11
		});
	};
	
	
	
	/* 获取 验证码
	 $.fn.getCode(phoneinput[,timeout])
	 * */
	var codeOut,codetime = 120; // 120s
	$.fn.getCode = function (phoneinput,geturl) {
		if(!geturl){return this;}
		var _this = this.addClass('disabled');
		return _this.on('click',function (e) {
			if(_this.hasClass('disabled')){ return false;}
			phoneinput.attr("disabled",true);
			_this.addClass('disabled');
			ajax({
				info:'获取短信验证码',
				url:geturl,
				data:{
					phone:phoneinput.val()
				}
			});
			codeOut = setInterval(function () {
				_this.html((--codetime)+'s后再次发送' );
				if(codetime == 0){
					clearInterval(codeOut);	
					_this.html('获取验证码' );
					codetime = 120;
					phoneinput.attr("disabled",false);
					_this.removeClass('disabled');
				}
			},1000);
		});
	};
//	function getCode(btn,phoneinput) {
//		var _this = btn.addClass('disabled');
//		return _this.on('click',function (e) {
//			if(_this.hasClass('disabled')){ return false;}
//			phoneinput.attr("disabled",true);
//			_this.addClass('disabled');
//			ajax({
//				info:'获取短信验证码',
//				url:url_getCode,
//				data:{
//					phone:user.val()
//				}
//			});
//			codeOut = setInterval(function () {
//				_this.html((--codetime)+'s后再次发送' );
//				if(codetime == 0){
//					clearInterval(codeOut);
//					_this.html('获取验证码' );
//					codetime = 120;
//					phoneinput.attr("disabled",false);
//					_this.removeClass('disabled');
//				}
//			},1000);
//		});
//	}
	/* 查看密码
	 $.fn.eyePassword(callback)
	 * */
	$.fn.eyePassword = function () {
		return  this.on('click',function (e) {
			var _this = $(this),
				passinp = _this.parents().siblings('input[type="password"]');
			if(!_this.hasClass('active')) {
				_this.addClass('active');
				passinp.attr('type', 'text');
				passinp.focus();
				setTimeout(function() {
					_this.removeClass('active');
					passinp.attr('type', 'password');
				}, 3000);
			}
		});
	};
	/*
	 * 清空form
	 * $.fn.resetForm
	 */
	$.fn.resetForm = function () {
		return this.on('click',function (e) {
			$(this).parents('form')[0].reset();
		});
	};
	
})(typeof jQuery != 'undefined' ? jQuery :  Zepto );
