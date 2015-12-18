/* 
* @Author: wangyinwei
* @Date:   2015-11-12 17:04:14
*/

'use strict';
//让内容宽度为满屏

(function(){
	function changeClientH(){
		var oSc = document.getElementById('scrollCon');
		oSc.style.height=document.documentElement.clientHeight+'px';
	}
	changeClientH();	
	window.onresize=function(){
		changeClientH();	
	};
})();
document.onmousedown=function(){
	return false;
};


(function(){
	var oBar = document.getElementById('bar');
	var oS = document.getElementById('scrollBar');	
	var oSh = document.getElementById('scrollHeigh');
	var oBackTop = document.getElementById('back_top');
	var timer =null;
	var bOk = false;
	var oSc = document.getElementById('scrollCon');
	function showBack(){
		if(oBar.offsetTop<=0){
		oBackTop.style.display='none';
		}else{
			oBackTop.style.display='block';
		}
	};
	showBack();
	oBackTop.onclick=function(){
		var start = oBar.offsetTop;
		var dis = 0-start;
		var count = Math.floor(2000/30);
		var n = 0;
		clearInterval(timer);
		timer = setInterval(function(){
			bOk = false;
			n++;
			var a = 1-n/count;
			var cur = start+dis*(1-Math.pow(a,3));
			changeT(cur);
			showBack();
			if(n==count){
				clearInterval(timer);
			};
		},30);

	};
	oBar.onmousedown=function(ev){
		var oEvent = ev||event;
		var disY = oEvent.clientY-oBar.offsetTop;
		document.onmousemove=function(ev){
			var oEvent = ev||event;
			var t = oEvent.clientY-disY;
			changeT(t);

		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			oBar.releaseCapture&&oBar.releaseCapture();	
			showBack();	
		};
		oBar.setCapture&&oBar.setCapture();
		return false;
	};
	function changeT(t){
		var tMax = oS.offsetHeight-oBar.offsetHeight;
		if(t<0){
			t=0;
		}else if(t>tMax){
			t=tMax;	
		}
		oBar.style.top=t+'px';
		var scale = t/tMax;
		oSh.style.top=-scale*(oSh.scrollHeight-oSc.offsetHeight)+'px';
	}
	// addWheel(document,function(dir){
	// 	var t = oBar.offsetTop;
	// 	if(dir){
	// 		t+=10;	
	// 		if(bOk){
	// 			clearInterval(timer);
	// 		}
	// 		bOk = true;
	// 	}else{
	// 		t-=10;
	// 		if(bOk){
	// 			clearInterval(timer);
	// 		}
	// 		bOk = true;
	// 	}
	// 	changeT(t);
	// });
})();

//导航运动

;(function(){
    var oNav = document.getElementById('nav_ct');
    var oS =document.getElementById('slide_bg');
    var oUl = document.getElementById('nav_ul');
    var aLi = oUl.getElementsByTagName('li');
    var iNow = 0;
    aLi[1].children[0].onclick=function(){
    	addCookie('deg',0,1);
    };
    for (var i = 0; i < aLi.length; i++) {
         (function(index){
            aLi[i].onmouseover=function(){
                move(oS,oS.offsetWidth*index);
                for(var i=0;i<aLi.length;i++){
                    aLi[i].className='';
                }
                this.className='on';
            };
            aLi[i].onmouseout=function(){
                move(oS,oS.offsetWidth*iNow);
                for(var i=0;i<aLi.length;i++){
                    aLi[i].className='';
                }
                aLi[iNow].className='on';
            };
            aLi[i].onclick=function(){
                iNow = index;
            };
         })(i);
     }; 
})();
//导航运动框架
;(function(){
    var left = 0;
    var iSpeed = 0;
    var timer = null;
    window.move=function(obj,iTarget){
       clearInterval(timer);
       timer = setInterval(function(){
           iSpeed+=(iTarget-left)/5;
           iSpeed*=0.7;
           left+=iSpeed;
           obj.style.left = left+'px';
            if(Math.floor(iSpeed)==0&&Math.floor(left)==iTarget){
                clearInterval(timer);
            }
       },30);
    }
})();

//导航时钟

function toDou(iNum){
    return iNum<10?'0'+iNum:''+iNum;
}
;(function(){
    var oClock = document.getElementById('nav_clock');
    var aImg = oClock.getElementsByTagName('img');
    setInterval(function(){
        var oDate = new Date();
        var str = toDou(oDate.getHours())+toDou(oDate.getMinutes())+toDou(oDate.getSeconds());
        for(var i=0;i<aImg.length;i++){
           startmove(aImg[i],{top:-str.charAt(i)*35})
        }
    },1000);
})();

;(function(){
    var oP = document.getElementById('nav_font');
    var clientW = document.documentElement.clientWidth/2;
    move(oP,clientW);
})();

//滚动还原导航

(function(){
	var oNav_ct = document.getElementById('nav_container');
	var oLg = document.getElementById('logo');
	var oNav = document.getElementById('nav_ct');
	var oClock = document.getElementById('nav_clock');
	var oPage = document.getElementById('page');
	//var oPerson_ct = document.getElementById('per_cont');
	var timer = null;
	oLg.onclick=function(){
		oPage.style.WebkitTransform=oPage.style.MozTransform=oPage.style.transform='perspective(1500px) translateZ(-100px) translateX(500px) translateY(-20px) rotateY(-20deg) rotateX(58deg) rotateZ(60deg) scale(0.5,0.5)';
		function fnEnd(){
			oPage.removeEventListener('transitionend',fnEnd,false);
			clearTimeout(timer);
			timer = setTimeout(function(){
				oPage.style.WebkitTransform=oPage.style.MozTransform=oPage.style.transform='perspective(1500px) translateZ(0px) translateX(0px) translateY(0px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1,1)';
			},300);
			
		}
		oPage.addEventListener('transitionend',fnEnd,false);
	// 	// function fnEnd(){
	// 	// 	oPage.removeEventListener('transitionend',fnEnd,false);
	// 	// 	alert('不错哦,这都可以发现');
	// 	// 	oPerson_ct.style.WebkitTransformOrigin=oPerson_ct.style.transformOrigin='center 650px';
	// 	// 	oPerson_ct.style.WebkitTransform=oPerson_ct.style.transform='rotateX(-60deg)';
	// 	// 	oPerson_ct.style.WebkitTransition=oPerson_ct.style.transition='1s all ease';
	// 	// };
	// 	// oPage.addEventListener('transitionend',fnEnd,false);
	};
	
	
	function elastic(obj,iTarget,iSpeedY){
		clearInterval(timer);
		timer = setInterval(function(){
			iSpeedY+=2;
			var t = obj.offsetTop+iSpeedY;
			if(t>=iTarget){
				t=iTarget;
				iSpeedY*=-0.8;
			}
			if(t<0){
				t=0;
				iSpeedY*=-0.8;
			}
			obj.style.top=t+'px';
			if(Math.abs(iSpeedY)<1)iSpeedY=0;
			if(iSpeedY==0&&t==iTarget){
				clearInterval(timer);
			}
		},30);
	}
	elastic(oLg,125,30);
    setTimeout(function(){
		clearInterval(timer);
        move(oNav,750);
        startmove(oNav_ct,{height:80},{complete:function(){ elastic(oClock,25,2);}});
       
        if(window.navigator.userAgent.indexOf('Firefox')!=-1){
        	startmove(oLg,{width:260,height:32,left:360,top:26,margin:0});
        }else{
        	startmove(oLg,{width:260,height:32,left:0,top:26,margin:0});
        }
    },3000);
})();
//吸顶条
// (function(){
// 	var oNav_ct = document.getElementById('nav_container');
// 	var oNav_box = document.getElementById('box_nav');
// 	document.onscroll=document.onresize=function(){
// 		var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
// 		if(scrollT<=0){
// 			oNav_box.style.display='none';	
// 			oNav_ct.style.position='relative';
// 			oNav_ct.style.top='';
// 		}else{
// 			oNav_ct.style.position='fixed';
// 			oNav_ct.style.top='0';
// 			oNav_box.style.display='block';	
// 		};	
// 	};
// })();

//分块运动

;(function (){
	var oL = document.getElementById('wk_left');	
	var oWk = document.getElementById('wk_left');
	var C = 4;
	var R = 10;
	for(var i=0;i<R;i++){
		for(var j=0;j<C;j++){
			var oS = document.createElement('span');
			oS.style.width=oL.offsetWidth/C+'px';
			oS.style.height=oL.offsetHeight/R+'px';
			oL.appendChild(oS);
			oS.style.left=j*oL.offsetWidth/C+'px';
			oS.style.top=i*oL.offsetHeight/R+'px';
			oS.style.backgroundPosition=-j*oL.offsetWidth/C+'px -'+i*oL.offsetHeight/R+'px';
			oS.c = j;
			oS.r = i;
		}	
	};	
	var aS = oL.children;
	var timer = null;
	var inow = 0;
	var bOk = false;
	oL.onmouseover=function(){
		if(bOk)return;
		inow++;
		bOk = true;
		for(var i=0;i<aS.length;i++){
			(function(index){
				timer = setTimeout(function(){
					aS[index].style.backgroundImage='url(img/monkey-wandesign'+(inow%2+1)+'.png)';
					aS[index].style.opacity='0';
					aS[index].style.filter='alpha(opacity:0)';
					(function(j){
						startmove(aS[j],{opacity:1},{complete:function(){
							if(j==aS.length-1){
								bOk = false;
								oWk.style.background='url(img/monkey-wandesign'+(inow%2+1)+'.png)';
							}
						}});
					})(index);
				},100*(aS[index].c+aS[index].r));	
			})(i);
		}	
	};	
})();

//幽灵按钮

(function(){
	var oInt = document.getElementById('int_second');
	oInt.onclick=function(){
		window.open('person.html','_blank');
	};
	function Ghost(id,id1){
		var oPer = document.getElementById(id);
		var oInt = document.getElementById(id1);
		var oP = oInt.getElementsByTagName('p')[0];
		var oS = oInt.getElementsByTagName('span');
		oPer.onmouseover=function(ev){
			var oEvent = ev||event;
			var oFrom = oEvent.formElement||oEvent.relatedTarget;
			if(oPer.contains(oFrom))return;
			startmove(oS[0],{left:126},{duration:300});	
			startmove(oS[2],{right:126},{duration:300});
			startmove(oS[1],{top:42},{duration:300});	
			startmove(oS[3],{top:42},{duration:300});
			oP.style.backgroundColor='#333030';	
		};
		oPer.onmouseout=function(ev){
			var oEvent = ev||event;
			var oTo = oEvent.toElement||oEvent.relatedTarget;
			if(oPer.contains(oTo))return;
			startmove(oS[0],{left:-150},{duration:300});	
			startmove(oS[2],{right:-150},{duration:300});
			startmove(oS[1],{top:-36},{duration:300});	
			startmove(oS[3],{top:108},{duration:300});
			oP.style.backgroundColor='#36d254';			
		};
	}
	Ghost('per_int','int_second');
	Ghost('thc','thc_second');
})();

//穿墙

(function(){
	var oW = document.getElementById('wall');
	var aLi = oW.getElementsByTagName('li');
	var oBp = document.getElementById('page');
	var oWorkTit = document.getElementById('work_title');
	oWorkTit.onclick=function(){
		addCookie('deg',0,1);
	};
	for(var i=0;i<aLi.length;i++){
		throughWall(aLi[i]);
		(function(index){
			aLi[index].onclick=function(){
				if(index==5){
					oBp.style.WebkitTransform=oBp.style.MozTransform=oBp.style.transform='perspective(1500px) translateZ(-100px) translateX(500px) translateY(-20px) rotateY(-20deg) rotateX(58deg) rotateZ(60deg) scale(0.5,0.5)';
				}

				function fnEnd(){
					oBp.removeEventListener('transitionend',fnEnd,false);
					oBp.style.WebkitTransform=oBp.style.MozTransform=oBp.style.transform='perspective(1500px) translateZ(0px) translateX(0px) translateY(0px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1,1)';
				}
				oBp.addEventListener('transitionend',fnEnd,false);
				switch(index){
					case 0:
					addCookie('deg',0,1);
					break;
					case 1:
					addCookie('deg',90,1);
					break;
					case 2:
					addCookie('deg',-90,1);
					break;
					case 3:
					addCookie('deg',180,1);
					break;
				}
			};	
		})(i);
	}	
	function getPos(obj){
		var l=0;
		var t=0;
		while(obj){
			l=l+obj.offsetLeft;
			t=t+obj.offsetTop;
			obj=obj.offsetParent;
		}	
		return {left:l,top:t};
	}
	function d2a(d){
		return d*180/Math.PI;	
	}
	function haverDir(obj,ev){
		var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
		var x =	getPos(obj).left+264/2-ev.clientX;
		var y = (getPos(obj).top+264/2-scrollT)-ev.clientY;
		return Math.round((d2a(Math.atan2(y,x))+180)/90)%4;
	}
	function throughWall(obj){
		var oA = obj.children[0];
		var oMw = oA.children[1];
		var oS = oMw.children[0];
		var oT = oMw.children[1];
		oMw.onmouseover=function(ev){
			var oEvent = ev||event;
			var oFrom = oEvent.formElement||oEvent.relatedTarget;
			if(oMw.contains(oFrom))return;
			var bDir = haverDir(oMw,oEvent);
			switch(bDir){
				case 0:
				oS.style.left=obj.offsetWidth+'px';
				oS.style.top=0;
				oT.style.left=obj.offsetWidth+'px';
				oT.style.top=0;
				break;
				case 1:
				oS.style.top=obj.offsetHeight+'px';
				oS.style.left=0;
				oT.style.left=0;
				oT.style.top=obj.offsetHeight+'px';
				break;
				case 2:
				oS.style.left=-obj.offsetWidth+'px';
				oS.style.top=0;
				oT.style.left=-obj.offsetWidth+'px';
				oT.style.top=0;
				break;
				case 3:
				oS.style.top=-obj.offsetWidth+'px';
				oS.style.left=0;
				oT.style.left=0;
				oT.style.top=-obj.offsetWidth+'px';
				break;
			}
			startmove(oS,{left:0,top:0});
			startmove(oT,{left:0,top:0});
		};	
		oMw.onmouseout=function(ev){
			var oEvent = ev||event;
			var oTo = oEvent.toElement||oEvent.relatedTarget;
			if(oMw.contains(oTo))return;
			var bDir = haverDir(oTo,oEvent);
			switch(bDir){
				case 0:
				startmove(oS,{left:264,top:0});
				startmove(oT,{left:264,top:0});
				break;
				case 1:
				startmove(oS,{left:0,top:264});
				startmove(oT,{left:0,top:264});
				break;
				case 2:
				startmove(oS,{left:-264,top:0});
				startmove(oT,{left:-264,top:0});
				break;
				case 3:
				startmove(oS,{left:0,top:-264});
				startmove(oT,{left:0,top:-264});
				break;
			}
		};	
	}
})();

