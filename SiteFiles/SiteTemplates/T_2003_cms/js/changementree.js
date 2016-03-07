// JavaScript Document

$(function (){
	//回到底部
		$(document).ready(function($){
			$(this).dwseeTopBottomMenu({
				'menucontainer' : '.TopBottomMenu',
				'boxsize' : 40,
				'boxbackground' : '#ffffff',
				'position' : 'right',
				'openmenusize' : 450,
				'topicon' : '/webportal/images/up_arrow.png',
				'menuicon' : '/webportal/images/menu_icon.png',
				'bottomicon' : '/webportal/images/down_arrow.png'
			});
		}); 
		jQuery(document).ready(function(){
			var qcloud={};
			$('[_t_nav]').hover(function(){
				var _nav = $(this).attr('_t_nav');
				clearTimeout( qcloud[ _nav + '_timer' ] );
				qcloud[ _nav + '_timer' ] = setTimeout(function(){
				$('[_t_nav]').each(function(){
				$(this)[ _nav == $(this).attr('_t_nav') ? 'addClass':'removeClass' ]('nav-up-selected');
				});
				$('#'+_nav).stop(true,true).slideDown(200);
				}, 150);
			},function(){
				var _nav = $(this).attr('_t_nav');
				clearTimeout( qcloud[ _nav + '_timer' ] );
				qcloud[ _nav + '_timer' ] = setTimeout(function(){
				$('[_t_nav]').removeClass('nav-up-selected');
				$('#'+_nav).stop(true,true).slideUp(200);
				}, 150);
			});
		});
		
			//导航选项卡切换
			function xxk(pid){
				//$("#id"+pid).addClass("class1″) .removeClass("class2″)
				$("ul li").removeClass('current') ;
				$("#id"+pid).addClass('current');
				//如果不是首面则显示
				if(pid!='40289909412554c0014125e526a00001'){
					$("#go").show("slow");
				}else{//如果是首面则隐藏
					$("#go").hide("slow");
				}
				$("#vnavid").val(pid);
				$("#changeTitle").submit();
				//.toggleClass("class1″)如果原来没有class1就添加class1，如果原来有class1就移除class1
			
			}
		
			function Tourl(){
				if($("#keyword").val()==null||$("#keyword").val()==''||$("#keyword").val().replace(/(^\s*)|(\s*$)/, "")==""){
					return false;
				}
			}
		
			function xcz(){
				if($("#keyword").val()==null||$("#keyword").val()==''||$("#keyword").val().replace(/(^\s*)|(\s*$)/, "")==""){
					return false;
				}else{
					//$("#keyword").val('');	
				}
			}
		  function changementree(id,prodid,navid,url){
			  //alert(1);
					  if(prodid!=null&&prodid!=''){
					   	 $("#topsprodid").val(prodid);
						 // window.location.href="/portal/WebMain.action?mtid="+id+"&prodpid="+prodid+"&menutree.pid="+id;
					  }else{
						  $("#topnnavid").val(navid);
					 		//window.location.href="/portal/WebMain.action?mtid="+id+"&navid="+navid+"&menutree.pid="+id;
					  }
					  if(url!=null&&url!=''){
					   $("#topisurl").val("是");
					  } 
					 
					  $("#topsmtid").val(id);
					  $("#topsmenutreepid").val(id);
					  $("#topchangemenu").submit();
			  }
			  function goprodmenu(prodpid,n,name){
			  $("#tppdprodpid").val(prodpid);
			  var sp = n.split('|');
			  if(sp[1]=='1'||sp[1]=='7'||sp[1]=='9'||sp[1]=='11'||sp[1]=='12'||sp[1]=='13'){
			  n=0;
			  }else{
			  n=100000;
			  }
			  if(name=='网络管理'){
			  $("#tpmtpid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdmtid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdprodpid").val('4028808141c05da90141c06201f90001');
			  $("#tppdmanBuid").val('4028ea1942bcf9580142bd00141d0001');
			  n=0;
			  }
			   if(name=='运营支撑'){
			  $("#tppdmanBuid").val('4028ea19429d739301429ddc9e440039');
			  n=0;
			  }
			   if(name=='游戏平台'){
			  $("#tppdmanBuid").val('4028ea1944ba21df0144be7581fa0008');
			  n=0;
			  }
			  if(name=='流程管理'){
			 $("#tpmtpid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdmtid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdprodpid").val('4028808141c05da90141c06201f90001');
			  $("#tppdmanBuid").val('4028ea1942c5b2020142c6967128000e');
			  n=2;
			  }
			  if(name=='信息安全管理'){
			  $("#tpmtpid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdmtid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdprodpid").val('4028808141c05da90141c06201f90001');
			  $("#tppdmanBuid").val('4028ea1942c5b2020142c692a53d000c');
			  n=4;
			  }
			  if(name=='网络优化'){
			  $("#tpmtpid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdmtid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdprodpid").val('4028808141c05da90141c06201f90001');
			  $("#tppdmanBuid").val('4028ea1942c5b2020142c6948899000d');
			  n=6;
			  }
			  if(name=='大数据应用'){
			  $("#tpmtpid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdmtid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdprodpid").val('4028808141c05da90141c06201f90001');
			  $("#tppdmanBuid").val('4028ea19446704e7014467d4b79c0002');
			  n=8;
			  }
			  if(name=='通用产品'){
			  $("#tpmtpid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdmtid").val('4028ea1942b7f02e0142bc4aa5e60025');
			  $("#tppdprodpid").val('4028808141c05da90141c06201f90001');
			  $("#tppdmanBuid").val('4028ea1944f348430144f3642b2b0002');
			  n=10;
			  }
			  if(name=='互联网服务'){
			   $("#tppdmanBuid").val('4028ea19422676cd014226db543600f2');
			  n=4;
			  }
			  if(name=='游戏产品'){
			   $("#tppdmanBuid").val('4028ea1944ba21df0144bea38597000a');
			  n=2;
			  }
			   if(name=='融合通信'){
			   $("#tppdmanBuid").val('4028ea1944ba21df0144beb24cfe000b');
			  n=0;
			  }
			   if(name=='物联网'){
			   $("#tppdmanBuid").val('4028ea19420c477e01420c6ecab90019');
			  n=0;
			  }
			   if(name=='食材经销'){
			   $("#tppdmanBuid").val('4028ea194221b7660142221c94de0022');
			  n=0;
			  }
			   if(name=='SmartCare'){
			   $("#tppdmanBuid").val('4028ea1946f9f7ad0146fa485752002e');
			  	n=3;
			  }
			
			  $("#tpnu").val(n);
			  $("#tppdform").submit();
			  } 

});