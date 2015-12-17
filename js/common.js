-/* 
* @Author: wangyinwei
* @Date:   2015-11-12 17:04:14
*/

'use strict';

//自定义滚动
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
function addWheel(obj,fn){
	function fnWheel(ev){
		var bOk = true;
		var oEvent = ev||event;
		bOk = oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		fn&&fn(bOk);
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;
	};
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',fnWheel);
	}else{
		addEvent(obj,'mousewheel',fnWheel);
	}
}

//获取非行间样式；
function getStyle(obj,sName){
    return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}

//运动框架

(function(){
    window.startmove=function(obj,json,options){
	options=options||{};
	options.duration = options.duration||700;
	options.easing = options.easing||'ease-out';
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'top':
					start[name] = obj.offsetTop;
					break;
				case 'left':
					start[name] = obj.offsetLeft;
					break;
				case 'width':
					start[name] = obj.offsetWidth;
					break;
				case 'height':
					start[name] = obj.offsetHeight;
					break;
				case 'opacity':
					start[name] = 1;
					break;
				case 'borderWidth':
					start[name] = 0;
					break;
			}
		}
		dis[name] = json[name]-start[name];
	}
	var count = Math.floor(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var cur = start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name] = cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();
		}
	},30);
}
})();

function addClass(obj,sClass){
	if(obj.className){
		var re = new RegExp('\\b'+sClass+'\\b','g');
		if(obj.className.search(re)==-1){
			obj.className+=' '+sClass;			
		}
	}else{
		obj.className=sClass;
	}
};
function removeClass(obj,sClass){
	if(obj.className){
		var re = new RegExp('\\b'+sClass+'\\b','g');
		obj.className=obj.className.replace(re,' ').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
		if(!obj.className){
			obj.removeAttribute('class');
		}
	}
};
function getPos(obj){
	var l = 0;
	var t = 0;
	while(obj){
		l = l+obj.offsetLeft;
		t = t+obj.offsetTop;
		obj = obj.offsetParent;	
	}
	return {left:l,top:t}
}

/*
**	addCookie	add a cookie
**	params
**				name[string]
**				value[string]
**				iDay[number]
*/
function addCookie(name,value,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie=name+'='+value+'; PATH=/; EXPIRES='+oDate.toGMTString();
	}else{
		document.cookie=name+'='+value+'; PATH=/';
	}
}
/*
**	getCookie		get a cookie
**	params
**				name[string]
**	return 
**				[string]
*/
function getCookie(name){
	var arr = document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var arr2 = arr[i].split('=');
		if(arr2[0]==name){
			return arr2[1];
		}
	}
}

/*
**	removeCookie	remove a Cookie
**	params
**				name[string]
*/
function removeCookie(name){
	addCookie(name,1,-1);
}
