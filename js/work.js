/* 
* @Author: wangyinwei
* @Date:   2015-11-12 17:04:14
*/

'use strict';

document.onmousedown=function(){
	return false;
};
var workBox = document.getElementById('work_box');
var aDiv = workBox.children;
var wrpBox = document.getElementById('work_wrapper');
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var oL = aDiv[0];
var oR = aDiv[1];
var oF = aDiv[3];
var oB = aDiv[2];
var oDeg = parseInt(getCookie('deg'))||0;
window.onresize=function(){
	workBox.style.height=winH+'px';
};
workBox.style.height=winH+'px';
workBox.style.WebkitTransform=workBox.style.MozTransform=workBox.style.transform='translateX(-11px) translateZ(-'+winW/2+'px) rotateY('+(oDeg+1)+'deg)';
oL.style.WebkitTransform=oL.style.MozTransform=oL.style.transform='translateX(-'+winW/2+'px) rotateY(-90deg)';
oR.style.WebkitTransform=oR.style.MozTransform=oR.style.transform='translateX('+winW/2+'px) rotateY(90deg)';
oF.style.WebkitTransition=oF.style.MozTransition=oF.style.transform='translateZ('+winW/2+'px)';
oB.style.WebkitTransition=oB.style.MozTransition=oB.style.transform='translateZ(-'+winW/2+'px) rotateY(-180deg)';
var i=oDeg;
var timer = null;
var r = oDeg;
if(r%360==90){
	var h5Works = document.getElementById('h5_works');
			h5Works.style.display='block';
	swing();
}
function moveBox(i){
	var start = r;
	var dis = i-start;
	var count = Math.floor(1500/30);
	var n=0;
	clearInterval(timer);
	timer = setInterval(function(){
		n++;
		var a = 1-n/count;
		r = start+dis*(1-Math.pow(a,3));
		workBox.style.WebkitTransform=workBox.style.MozTransform=workBox.style.transform='translateX(-12px)  translateZ(-'+winW/2+'px) rotateY('+(r+1)+'deg)';

		if(r%360==0||r%360==180||r%360==270){
			var h5Works = document.getElementById('h5_works');
			h5Works.style.display='none';
		}
		if(r%360==90){
			var h5Works = document.getElementById('h5_works');
			h5Works.style.display='block';
			swing();
		}

		if(n==count){
			clearInterval(timer);
		}
	},30);
}
document.onkeydown=function(ev){
	var oEvent = ev||event;
	switch(oEvent.keyCode){	
		case 37:
		i-=90;	
		moveBox(i);
		break;
		case 39:
		i+=90;	
		moveBox(i);
		break;
	}
};	
var cssWorks = document.getElementById('css_works');
var aLi = cssWorks.getElementsByTagName('li');
var cssBtn = document.getElementById('css_btn');	
var oL = cssBtn.getElementsByTagName('button')[0];
var oR = cssBtn.getElementsByTagName('button')[1];
var iNow = 2;
var bOk = false;
function now(n){
	if(n>0){
		return n%aLi.length;
	}else{
		return (n%aLi.length+aLi.length)%aLi.length;
	}
}
if(location.hash){
	iNow = parseInt(location.hash.substring(1));
	tab();
}
function tab(){
	for(var i=0;i<aLi.length;i++){
		aLi[i].className='';
	}	
	aLi[now(iNow-2)].className='l2';
	aLi[now(iNow-1)].className='l1';
	aLi[now(iNow)].className='cur';
	aLi[now(iNow+1)].className='r1';
	aLi[now(iNow+2)].className='r2';
	function fnEnd(){
		aLi[now(iNow)].removeEventListener('transitionend',fnEnd,false);
		bOk = false;
		location.hash=iNow; 
	};
	aLi[now(iNow)].addEventListener('transitionend',fnEnd,false);
};
function wave(obj,ev){
	//水纹
	var oDiv =obj.children[0];
	var oSon = oDiv.children[0];
	var x = ev.pageX-getPos(obj).left;
	var y = ev.pageY-getPos(obj).top;
	oSon.style.left=x+'px';
	oSon.style.top=y+'px';
	addClass(oDiv,'is-active');
	oDiv.addEventListener('animationend',function(ev){
		removeClass(oDiv,'is-active');
	},false);
	oDiv.addEventListener('webkitAnimationEnd',function(ev){
		removeClass(oDiv,'is-active');
	},false);
	oDiv.addEventListener('MSAnimationEnd',function(ev){
		removeClass(oDiv,'is-active');
	},false);
}
oL.onclick=function(ev){
	if(bOk)return;
	var oEvent = ev||event;
	wave(oL,oEvent)
	bOk = true;
	iNow--;
	tab();
};
oR.onclick=function(ev){
	if(bOk)return;
	var oEvent = ev||event;
	wave(oR,oEvent)
	bOk = true;
	iNow++;
	tab();
};
function swing(){
	var oBox = document.getElementById('h5_works');
	var aLi = oBox.getElementsByTagName('li');
	var iSpeed=0;
	var i = 0;
	var timer = null;
	for(var i=0;i<aLi.length;i++){
		var oA = aLi[i].children;
		oA[0].style.WebkitTransform=oA[0].style.MozTransform=oA[0].style.transform='rotateX(-180deg)';
	}
	for(var i=0;i<aLi.length;i++){
		(function(index){
			var oA = aLi[i].children;
			aLi[index].r = -180;
			timer = setTimeout(function(){
				(function(j){
					clearInterval(aLi[j].timer);
					var oA = aLi[j].children;
					aLi[j].timer = setInterval(function(){
						iSpeed+=(0-aLi[j].r)/1.5;
						iSpeed*=0.7;
						aLi[j].r+=iSpeed;
						if(aLi[j].r<-60){
							aLi[j].style.opacity=0;
						}else{
							aLi[j].style.opacity=1;
						}
						oA[0].style.WebkitTransform=oA[0].style.MozTransform=oA[0].style.transform='rotateX('+aLi[j].r+'deg)';
						if(Math.floor(iSpeed)==0&&Math.floor(r)==0){
							clearInterval(aLi[j].timer);
						}
					},150);
				})(index);
			},300);
		})(i);
	}
}
(function(){
	var jsWorks = document.getElementById('js_works');
	var aLi = jsWorks.getElementsByTagName('li');
	var jsBtn = document.getElementById('js_btn');
	var aBtn = jsBtn.getElementsByTagName('button');
	var aRoute = [
		[
			{'href':'jsstroe/运动/3D图片轮换/demo5.html','src':'img/3d_pic.jpg','p':'3D图片轮换'},
			{'href':'jsstroe/运动/iphone 图片查看器/zns_demo3.html','src':'img/iphone.jpg','p':'图片查看器'},
			{'href':'jsstroe/照片墙/wall.html','src':'img/js_wall.jpg','p':'照片墙'},
			{'href':'jsstroe/图片延时加载/图片延迟加载.html','src':'img/load.jpg','p':'图片延时加载'},
			{'href':'jsstroe/运动/3D立体效果/zns_demo3.html','src':'img/3D_LT.jpg','p':'3D立体效果'},
			{'href':'jsstroe/运动/分块运动/分块运动.html','src':'img/fenkuai.jpg','p':'分块运动'},
			{'href':'jsstroe/运动/手风琴/手风琴2.html','src':'img/accordion.jpg','p':'手风琴'},
			{'href':'jsstroe/无缝滚动/无缝滚动.html','src':'img/js_scroll.jpg','p':'无缝滚动'},
			{'href':'jsstroe/运动/苹果菜单/苹果菜单3.html','src':'img/iphone_menu.jpg','p':'苹果菜单'}
		],
		[
			{'href':'jsstroe/运动/分步运动/分步运动.html','src':'img/fenbu.jpg','p':'分步运动'},
			{'href':'jsstroe/运动/无限运动/无限运动的小球2.html','src':'img/infinity_sport.jpg','p':'无限运动'},
			{'href':'jsstroe/运动/圆.html','src':'img/circle_sport.jpg','p':'圆型运动'},
			{'href':'jsstroe/高级运动/碰撞+拖拽3.html','src':'img/drag_and_sprot.jpg','p':'碰撞和拖拽'},
			{'href':'jsstroe/图片延时加载/网络进度条4.html','src':'img/webload.jpg','p':'网络进度条'},
			{'href':'jsstroe/图片延时加载/图片延迟加载.html','src':'img/load.jpg','p':'图片延迟加载'},
			{'href':'jsstroe/拖拽/九宫格拖拽最终版.html','src':'img/drag9.jpg','p':'九宫格拖拽'},
			{'href':'jsstroe/放大镜/放大镜5.html','src':'img/js_big.jpg','p':'放大镜'},
			{'href':'jsstroe/高级运动/漂浮广告.html','src':'img/ad_fly.jpg','p':'漂浮广告'}
		],
		[
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'}
		],
		[
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'},
			{'href':'javascrip:;','src':'img/wite.jpg','p':'还在完善，静候...'}
		]		
	];
	function changImg(inum){
		for(var i=0;i<aLi.length;i++){
			aLi[i].getElementsByTagName('a')[0].href=aRoute[inum][i].href;
			aLi[i].getElementsByTagName('img')[0].src=aRoute[inum][i].src;
			aLi[i].getElementsByTagName('p')[0].innerHTML=aRoute[inum][i].p;
		}
	}
	var aPos = [];
	for(var i=0;i<aLi.length;i++){
		aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop,width:aLi[0].offsetWidth,height:aLi[0].offsetHeight});
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aPos[i].top+'px';
		aLi[i].style.position='absolute';
		aLi[i].style.margin=0;	
	}
	var timer = 0;
	var bOk = false;
	for(var i=0;i<aBtn.length;i++){
		(function(index){
			aBtn[index].onclick=function(ev){
				if(bOk)return;
				bOk =true;
				var iBtn = index;
				var oEvent = ev||event;
				wave(this,oEvent);
				var num = 0;
				timer = setInterval(function(){
					(function(index){
						startmove(aLi[index],{left:432,top:420,width:0,height:0},{complete:function(){
							if(index==aLi.length-1){
								changImg(iBtn);
								var num = aLi.length-1;
								timer = setInterval(function(){
									(function(index){
										startmove(aLi[index],{left:aPos[index].left,top:aPos[index].top,width:aPos[0].width,height:aPos[0].height},{complete:function(){
											if(index==0){
												bOk=false;
											}
										}});
									})(num);
									num--;
									if(num==-1){
										clearInterval(timer);
									}
								},100);
							}
						}});
					})(num);
					num++;
					if(num==aLi.length){
						clearInterval(timer);
					}
				},100);				
			};
		})(i);
	}
})();


