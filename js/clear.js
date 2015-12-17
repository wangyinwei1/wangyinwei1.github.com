/* 
* @Author: wangyinwei
* @Date:   2015-11-12 17:04:14
*/

'use strict';

// 阻止默认事件

document.onmousedown=function(){
	return false;
};

if(window.navigator.userAgent.indexOf('MSIE')!=-1||window.navigator.userAgent.indexOf('11.0')!=-1){
}

// 名字动画
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var oPage = Raphael(winW/2-400,winH/2-310,800,600);
var aLine = {'y':[
	'M',90,120,
	'L',210,125,
	'M',150,145,
	'L',150,250,
	'M',100,190,
	'L',195,195,
	'M',90,250,
	'L',205,245,
	'M',280,95,
	'L',250,160,
	'M',265,126,
	'L',330,132,
	'M',265,166,
	'L',325,168,
	'M',255,206,
	'L',328,204,
	'M',295,166,
	'L',295,251,
	'L',325,249,
	'M',355,115,
	'L',428,120,
	'L',430,195,
	'L',395,195,
	'M',365,145,
	'L',365,255,
	'L',395,252,
	'M',365,164,
	'L',400,163,
	'M',405,225,
	'L',455,260,
	'M',425,245,
	'L',445,220,
	'M',545,140,
	'L',495,170,
	'M',520,155,
	'L',533,225,
	'M',565,115,
	'L',685,118,
	'M',575,160,
	'L',670,160,
	'M',572,200,
	'L',675,203,
	'L',673,245,
	'L',645,243,
	'M',620,80,
	'L',620,265
]};

for(var name in aLine){
	var data = [];
	data=aLine[name];
	fn(data);
}
function fn(data){
	var path = oPage.path();
	path.attr('stroke-width',12);
	path.attr('stroke','#ffef5c');
	var arr2 = ['M',0,0];
	var count = 0;
	var timer =	null;
	timer = setInterval(function(){
		arr2.push(data[count]);
		count++;
		path.attr('path',arr2.join(' '));
		if(count==data.length){
			clearInterval(timer);
		}
		
	},15);
};

// 画板

var oC = document.querySelector('.c1');
var gd = oC.getContext('2d');
oC.width = winW;
oC.height = winH;

oC.onmousedown=function(ev){	
	document.onmousemove=null;		
	gd.moveTo(ev.pageX-oC.offsetLeft,ev.pageY-oC.offsetTop);
	gd.lineWidth=10;
	gd.strokeStyle='#ffef5c';
	document.onmousemove=function(ev){
		gd.clearRect(0,0,winW,winH);
		gd.lineTo(ev.pageX-oC.offsetLeft,ev.pageY-oC.offsetTop);
		gd.stroke();
		oPen.style.left=ev.pageX-oC.offsetLeft+'px';
		oPen.style.top=ev.pageY-oC.offsetTop-oPen.offsetHeight+'px';
	};
	document.onmouseup=function(){
		document.onmouseup=null;
		document.onmousemove=null;
		penMove();
	}
	return false;
};

// 笔

var oPen = document.querySelector('.pen');			
function penMove(){
	document.onmousemove=function(ev){
		oPen.style.left=ev.pageX-oC.offsetLeft+'px';
		oPen.style.top=ev.pageY-oC.offsetTop-oPen.offsetHeight+'px';
	};
}
penMove();


// 滑动解锁
var oBtn = document.querySelector('.clear_btn');
oBtn.onmousedown=function(ev){
	document.onmousemove=null;
	var oEvent = ev||event;
	var disX = oEvent.clientX-oBtn.offsetLeft;
	document.onmousemove=function(ev){
		var oEvent = ev||event;
		var l = oEvent.clientX-disX;
		if(l<-50){
			l=-50;
		}else if(l>oBtn.parentNode.offsetWidth-oBtn.offsetWidth+50){
			l=oBtn.parentNode.offsetWidth-oBtn.offsetWidth+50;
		}
		oBtn.style.left=l+'px';
		oPen.style.left=ev.pageX-oC.offsetLeft+'px';
		oPen.style.top=ev.pageY-oC.offsetTop-oPen.offsetHeight+'px';
	};
	document.onmouseup=function(ev){
		var oEvent = ev||event;
		var count = 0;
		var timer = null;
		var l = oEvent.clientX-disX;
		if(l>oBtn.parentNode.offsetWidth-oBtn.offsetWidth+50){
			l=oBtn.parentNode.offsetWidth-oBtn.offsetWidth+50;
			window.open('init.html','_self');
				if(window.navigator.userAgent.indexOf('Firefox')!=-1){
					oBtn.style.left=0+'px';
				}
				
		}else{
			timer = setInterval(function(){
				count++;
				l = l-count;
				if(l<-50){
					l=-50;
					clearInterval(timer);
				}
				oBtn.style.left=l+'px';
			},30);
		}
		document.onmousemove=null;
		document.onmouseup=null;
		penMove();
	};
	return false;
};
