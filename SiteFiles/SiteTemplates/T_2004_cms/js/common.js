$(function(){
	
	
	$(".menu li").hover(function(){$(this).children("div").show();$(this).children("a").addClass("on");},function(){$(this).children("div").hide();$(this).children("a").removeClass("on")});
	
	$(".tab_tit li").mouseover(function(){
		var a = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(this).parent().parent().next().find(".con").eq(a).show().siblings().hide();
	})

	$(".tab_tit2 li").mouseover(function(){
		var a = $(this).index();
		if(a==1){
			$(this).parent().parent().addClass("on");
		}
		else{
			$(this).parent().parent().removeClass("on");
			}
		$(this).parent().parent().next().find(".con").eq(a).show().siblings().hide();
	})
	//index
	$(".index .part2 .pic").hover(
		function(){
			$(this).children(".bg").fadeIn();									   
		},function(){
			$(this).children(".bg").hide();									   
		}
	)
	
	//图片透明
	$(".picOver li img").each(function(){
		$(this).hover(function(){
			$(this).css('opacity', '0.6');							
		},function(){
			$(this).css('opacity', '1.0');							
		})							   
	})
	
	$(".btn_fx").mouseover(function(){
		$(this).find(".bds_more").mouseover();								
	})
	$(".btn_fx").mouseout(function(){
		$(this).find(".bds_more").mouseout();								
	})
	
	//搜索
	/*$(".input1").focus(function(){
		var a = $(this).val();
		$(this).addClass("input_hover");
		$(this).val("");
	}).blur(function(){
		$(this).removeClass("input_hover");
	});*/
	/*$(".input2").focus(function(){
		var a = $(this).val();
		$(this).addClass("input2_hover");
		$(this).val("");
	}).blur(function(){
		$(this).removeClass("input2_hover");
		if($(this).val()!==""){
			$(this).addClass("input2_ok");
		}
	});*/
	$(".input4").focus(function(){
		$(this).val("");
	}).blur(function(){
		//$(this).removeClass("input_hover");
	});

	/*$(".textarea1").focus(function(){
		var a = $(this).val();
		$(this).addClass("textarea1_hover");
		$(this).val("");
	}).blur(function(){
		$(this).removeClass("textarea1_hover");
		if($(this).val()!==""){
			$(this).addClass("textarea1_ok");
		}
	});*/
	
	//发送留言
	//$("#btn_fsly").click(function(){
//		$(".sqcg").show();	
//			$("#TB_overlay").show();	
//	})
//	$("#test").click(function(){
//		$(".sqsb").show();									
//	})
//	$(".sqcg .btn_confirm").click(function(){
//		$(".sqcg").hide();									   
//	});
//	$(".sqcg .close").click(function(){
//		$(".sqcg").hide();									   
//	});
//	$(".sqsb .btn_confirm").click(function(){
//		$(".sqsb").hide();									   
//	});
//	$(".sqsb .close").click(function(){
//		$(".sqsb").hide();									   
//	});
	//视频列表
	$(".sp_list .pic").hover(function(){
		$(this).find(".bg").fadeIn();								
	},function(){
		$(this).find(".bg").hide();								
	})
	
	//子页搜索
	$(".xlc").hover(function(){
		$(this).find(".input_xlc").addClass("input_xlc_hover");								
		$(this).find("ul").show();								
	},function(){
		$(this).find(".input_xlc").removeClass("input_xlc_hover");								
		$(this).find("ul").hide();								
	})
	$(".xlc ul li").hover(function(){
		$(this).addClass("on");								
	},function(){
		$(this).removeClass("on");								
	}).click(function(){
		var a = $(this).html();
		$(this).parent().parent().find(".input_xlc").val(a);
		$(this).parent().hide();
	})
	
	
	//3列图片效果  科技园
	$(".list3li li,.list3li2 li").hover(function(){
		$(this).children(".bg").fadeIn();								
		$(this).children(".text").fadeIn();								
	},function(){
		$(this).children(".bg").hide();								
		$(this).children(".text").hide();								
	})
	
	//地图
	$("#ditu .alink").mouseover(function(){
		var a = $(this).attr("name");
		$("#ditu .tc").hide();
		$("."+a).fadeIn();
	})
	$("#ditu .tc .close").click(function(){
		$(this).parent().hide();
		return false;
	})
	
	//核心能力-自主核心技术
	$("#zzhxjs .tab").mouseover(function(){
		$("#zzhxjs .con").hide();
		$(this).next(".con").show();
	})
	
	//企业荣誉
	$("#btn_qyry").toggle(
		function () {
			$(this).html("收缩 &gt;")
			$("#con_qyry").fadeIn();
		},
		function () {
			$(this).html("展开 &gt;")
			$("#con_qyry").fadeOut();
		}
	);
	$("#btn_qyry2").toggle(
		function () {
			$(this).html("收缩 &gt;")
			$("#con_qyry2").fadeIn();
		},
		function () {
			$(this).html("展开 &gt;")
			$("#con_qyry2").fadeOut();
		}
	);
	
	
})