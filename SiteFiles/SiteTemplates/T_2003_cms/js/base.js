// JavaScript Document

$(function (){
		
		/*nav导航栏*/
		(function (){
			var index=0;
			var timer;
			$(".nav .nav_li").hover(function (){
				index=$(this).index();
				timer=setTimeout(function (){
					$(".nav .nav_li").eq(index).find("ul").slideDown(200);
				},100);
			},function (){
				clearTimeout(timer);
				$(".nav .nav_li").eq(index).find("ul").slideUp(200);
			}); 
			var len=$(".nav .nav_li").length;
			$(".nav .nav_li").eq(len-1).css("background-image","none");
			
		})();
		/*nav导航栏结束*/
		(function (){
			var len=$(".footer_nav .footer_nav_li").length;
			$(".footer_nav .footer_nav_li").eq(len-1).css("background-image","none");
		})();
		
		(function (){
			$(".keautoCon").css({"left":-($(".keautoCon").width()-$(document).width())/2}); 
			$(".kebox2").height($(".main2Con").height()+400)
			$(window).resize(function(){
				$(".keautoCon").css({"left":-($(".keautoCon").width()-$(document).width())/2}); 
				$(".kebox2").height($(".main2Con").height()+400)
			});

		})();
		
		/*图片轮播渐变*/
		(function (){
				$scroll_btn=function (obj,btn,time){
					var i=0;
					var t=time||3000;
					var len=$(obj).length;
					var timer=null;
					$scroll=function (index){
						clearInterval(timer);
						timer=setInterval(function (){
							index++;
							if(index==len){index=0;}
							$(obj).fadeOut(600);
							$(obj).eq(index).fadeIn(600);
							$(btn).removeClass("on");
							$(btn).eq(index).addClass("on");
							$(obj).css("z-index","0");
							$(obj).eq(index).css("z-index","1");
							
						},t);
					};
					$scroll(i);
					(function (_timer){
						$(btn).hover(function (){
							clearInterval(_timer);
							i=$(this).index();
							$(obj).fadeOut(500);
							$(obj).eq(i).fadeIn(500);
							$(btn).removeClass("on");
							$(this).addClass("on");
							$(obj).css("z-index","0");
							$(obj).eq(i).css("z-index","1");
						},function (){
							$scroll(i);
						});
					})(obj.timer);
				};
				
		})();
		$(window).load(function(){
			$scroll_btn('.banner_a','',4000);
			$scroll_btn('.successful_scroll_a','.successful_scrollBtn',4000);
		});
		/*图片轮播渐变结束*/
		/*轮播图左右*/
		
		
		
				(function(){
					$(".main_visual").hover(function(){
						$("#btn_prev,#btn_next").fadeIn()
					},function(){
						$("#btn_prev,#btn_next").fadeOut()
					});
					
					$dragBln = false;
					
					$(".main_image").touchSlider({
						flexible : true,
						speed : 200,
						btn_prev : $("#btn_prev"),
						btn_next : $("#btn_next"),
						paging : $(".flicking_con a"),
						counter : function (e){
							$(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
						}
					});
					
					$(".main_image").bind("mousedown", function() {
						$dragBln = false;
					});
					
					$(".main_image").bind("dragstart", function() {
						$dragBln = true;
					});
					
					$(".main_image a").click(function(){
						if($dragBln) {
							return false;
						}
					});
					
					timer = setInterval(function(){
						$("#btn_next").click();
					}, 5000);
					
					$(".main_visual").hover(function(){
						clearInterval(timer);
					},function(){
						timer = setInterval(function(){
							$("#btn_next").click();
						},5000);
					});
					
					$(".main_image").bind("touchstart",function(){
						clearInterval(timer);
					}).bind("touchend", function(){
						timer = setInterval(function(){
							$("#btn_next").click();
						}, 5000);
					});
					
				})();
				
		
		/*轮播图左右结束*/
		
		
		/*选项卡*/
		(function (){
			$tab=function (obj1,obj2,cla,i){
				index=0;
				$(obj1).click(function (){
					index=$(this).index();
					
					$(obj1).removeClass(cla);
					$(obj1).eq(index).addClass(cla);
					$(obj2).removeClass(cla);
					$(obj2).eq(index).addClass(cla);
				});
			};
			$tab2=function (obj1,obj2,cla,i){
				index=0;
				$(obj1).click(function (){
					index=$(this).index()-1;
					$(obj1).removeClass(cla);
					$(obj1).eq(index).addClass(cla);
					$(obj1).find(".nvaulidTabBTNDown").removeClass("bottom");
					$(obj1).eq(index).find(".nvaulidTabBTNDown").addClass("bottom");
					$(obj2).removeClass(cla);
					$(obj2).eq(index).addClass(cla);
				});
			};
			$tab3=function (obj1,obj2,cla,i){
				index=0;
				$(obj1).click(function (){
					index=$(this).index();
					$(obj1).removeClass(cla);
					$(obj1).eq(index).addClass(cla);
					$(obj1).find(".nvaulidTabBTNDown").removeClass("bottom");
					$(obj1).eq(index).find(".nvaulidTabBTNDown").addClass("bottom");
					$(obj2).removeClass(cla);
					$(obj2).eq(index).addClass(cla);
				});
			};
		})();
		
		$tab(".cpxqTab_btnBox .cpxqTab_btn"/*选项卡按钮*/,".cpxqTab_divBox .cpxqTab_div"/*切换的div*/,"on");
		
		$tab(".yearsTabBtn"/*选项卡按钮*/,".yearsTabDiv"/*切换的div*/,"on");
		$tab(".yearsTabBtn2"/*选项卡按钮*/,".yearsTabDiv2"/*切换的div*/,"on");
		
		$tab2(".nvaulidTabBTN"/*选项卡按钮*/,".myTabDiv"/*切换的div*/,"current");
		
		$tab3(".nvaulidTabBTN_2"/*选项卡按钮*/,".myTabDiv"/*切换的div*/,"current");
		/*选项卡结束*/
		
			

		/*无缝左*/
		(function (){
			$scroll_left=function (obj_box,obj_son,ul1,ul2,num){
				var $oBox=$(obj_box);
				var $oSon=$(obj_son);
				var $oUl1=$(ul1);
				var $oUl2=$(ul2);
				var timer;
				//复制一份内容
				$oUl2.html($oUl1.html());
				//算宽度
				var wid=$oUl1.width();
				$oSon.css("width",wid*2+100);
				var W=$oUl1.width();
				var left=0;
				(function (_timer){
					$scrollLeft=function (){
						clearInterval(_timer);
						_timer=setInterval(function(){
							//改left-的数值就可调节速度减得越多速度越快
							left-=num/100;
							$oSon.css("left",(left%W-W)%W);
						},30);
					};
					$scrollLeft();
					$oBox.hover(function (){
						clearInterval(_timer);
					},function (){
						_timer=setInterval(function(){
							//改left-的数值就可调节速度减得越多速度越快
							left-=num/100;
							$oSon.css("left",(left%W-W)%W);
						},30);
					});
				
				})($oBox.time);
				
			};
			
		})();
		$(window).load(function(){
			$scroll_left("#my_sc_box"/*用来固定位置显示宽度的div*/,"#my_scroll"/*滚动的元素*/,"#my_ul1"/*放内容的元素*/,"#my_ul2"/*用来存复制的内容的元素*/,150/**/);
		});
		
	(function (){
		var index=0;
		var w=326;
		var timer;
		$("#introduceScroll").html($("#introduceScroll").html()+$("#introduceScroll").html());
		var len=$(".introduceScrollDiv").length;
		$("#introduceScroll").css("width",w*len);
		$_scr=function (){
			timer=setInterval(function (){
				index++;
				if(index>len-3){index=0;$("#introduceScroll").animate({left:-w*index},0);}
				$("#introduceScroll").animate({left:-w*index},500);
			},2000);
		};
		$("#introducePrev").click(function (){
			index--;
			if(index<-1){index=len-4;$("#introduceScroll").animate({left:-w*index},0);}
			$("#introduceScroll").animate({left:-w*index},500);
		});
		$("#introduceNext").click(function (){
			index++;
			if(index>len-3){index=0;$("#introduceScroll").animate({left:-w*index},0);}
			$("#introduceScroll").animate({left:-w*index},500);
		});
		$(window).load(function(){
			$_scr();
			$(".introduce").hover(function (){
				clearInterval(timer);
			},function (){
				$_scr();
			});
		});
	})();
	
	(function (){
			$_AutoScroll=function (obj) {
				$(obj).find("ul:first").animate({
					marginTop: "-30px"
				}, 500, function() {
					$(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
				});
			}
			$(document).ready(function() {
				var myar = setInterval('$_AutoScroll("#scrollDiv")', 3000)
				$("#scrollDiv").hover(function() { clearInterval(myar); }, function() { myar = setInterval('$_AutoScroll("#scrollDiv")', 3000) });
			});
		})();
	(function (){/*透明遮罩*/
		$(".introduceScrollDiv").mouseover(function (){
			$(this).find(".introduce_zhezhaoBox").show();
		});
		$(".introduce_zhezhaoBox").mouseout(function (){
			$(this).hide();
		});
	})();
	
	//goTop返回顶部
		function b(){
			h = 100;
			t = $(document).scrollTop();
			if(t > h){
				$('#goTop').show();
			}else{
				$('#goTop').hide();
			}
		};
		$(window).scroll(function(e){
			b();		
		});
		

});
/*下面是放大镜的代码*/
function addReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		document.onreadystatechange=function(){
			if(document.readyState=='complete'){
				fn();
			}
		};
	}
}
(function (){
	window.my_magnifier=function (obox,obj1,obj2,oson,oImg){
		var oBox=document.getElementById(obox);
		var oDiv1=document.getElementById(obj1);
		var oDiv2=document.getElementById(obj2);
		var oSon=document.getElementById(oson);
		var oImg=document.getElementById(oImg);
		//var oMain=document.getElementById('main');
		oDiv1.onmouseover=function (ev){
			var oEvent=ev||event;
			var oFrom=oEvent.fromElement||oEvent.relatedTarget;
			if(oDiv1.contains(oFrom)){
				return;
			}
			oDiv2.style.display='block';
			oSon.style.display='block';
		};
		oDiv1.onmouseout=function (ev){
			var oEvent=ev||event;
			var oFrom=oEvent.toElement||oEvent.relatedTarget;
			if(oDiv1.contains(oFrom)){
				return;
			}
			oDiv2.style.display='none';
			oSon.style.display='none';
		};
		oDiv1.onmousemove=function (ev){
			var oEvent=ev||event;
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			var l=oEvent.clientX-oDiv1.offsetLeft-oBox.offsetLeft-oSon.offsetWidth/2;
			var t=oEvent.clientY-oDiv1.offsetTop+scrollTop-oBox.offsetTop-oSon.offsetHeight/2;
			if(l<0){
				l=0;
			}else if(l>oDiv1.offsetWidth-oSon.offsetWidth){
				l=oDiv1.offsetWidth-oSon.offsetWidth;
			}
			if(t<0){
				t=0;
			}else if(t>oDiv1.offsetHeight-oSon.offsetHeight){
				t=oDiv1.offsetHeight-oSon.offsetHeight;
			}
			oSon.style.left=l+"px";
			oSon.style.top=t+"px";
			oImg.style.left=-l/(oDiv1.offsetWidth-oSon.offsetWidth)*(oImg.offsetWidth-oDiv2.offsetWidth)+"px";
			oImg.style.top=-t/(oDiv1.offsetHeight-oSon.offsetHeight)*(oImg.offsetHeight-oDiv2.offsetHeight)+"px";
		};
	};
})();

addReady(function (){	
	  try {//try里面运行要执行的代码
		  my_magnifier('magnifierBox','magnifierDiv1','magnifierDiv2','magnifierSon','magnifierImg1');			      } catch (err) {//如果发生错误就会在这里操作参数的description属性可以显示错误信息
		  //console.error(err.description)//在控制台输出错误信息
	  }
	  function killErrors(){
			return true;
		}
		//window.onerror = killErrors;
		
		
		
		
});


//双击鼠标滚动屏幕的代码
/*var currentpos,timer;
function initialize()
{
timer=setInterval ("scrollwindow ()",30);
}
function sc()
{
clearInterval(timer);
}
function scrollwindow()
{
currentpos=document.body.scrollTop;
window.scroll(0,++currentpos);
if (currentpos !=document.body.scrollTop)
sc();
}
document.onmousedown=sc
document.ondblclick=initialize
		

*/