<%@ Page Language="C#" ValidateRequest="false" Inherits="SiteServer.CMS.Pages.MLibManage.Submission" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>
<%@ Register TagPrefix="site" Namespace="SiteServer.CMS.Pages.Controls" Assembly="SiteServer.CMS" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>投稿中心</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <link href="/<%=homeUrl %>/css/style.css" rel="stylesheet" type="text/css" />
    <script language="javascript" src="/sitefiles/bairong/jquery/jquery-1.9.1.min.js"></script>
    <script language="javascript" src="/sitefiles/bairong/scripts/datepicker/wdatepicker.js"></script>

    <script>var $pageInfo = { publishmentSystemID: 0, channelID: 0, contentID: 0, siteUrl: "", homeUrl: "", currentUrl: "", rootUrl: "", apiUrl: "" }</script>
</head>
<body>
    <!--#include file="include/head_parsed.html"-->
    <script>
        $(function () {
            $('.nav').css('margin', '0 auto');
            $('#accountInfoUrl').css('margin', '0');

            $("#channelUL").find("a").removeClass("nav_cuta");
            $("#channelUL").find("a").map(function (index, item) {
                if ($(item).attr("href").indexOf("contents.aspx") >= 0)
                    $(item).addClass("nav_cuta");
            });

            $("#accountInfoUrl").find("a").removeClass("nav_cuta");
            $("#accountInfoUrl").find("a").map(function (index, item) {
                if ($(item).attr("href").indexOf("submission.aspx") >= 0)
                    $(item).addClass("nav_cuta");
            });
        });

    </script>
    <div class="mcon">
        <div class="mcL mcLx1">
            <ul id="accountInfoUrl">
                <li><a href="/<%=homeUrl %>/submission.aspx" class="m2menu_a m2menu_cuta">
                    <img class="block" src="/<%=homeUrl %>/images/ml_ico1.png" width="35" height="35" /><img class="hidden" src="/<%=homeUrl %>/images/ml_ico1a.png" width="35" height="35" />投稿</a></li>
                <li><a href="/<%=homeUrl %>/contents.aspx" class="m2menu_a">
                    <img class="block" src="/<%=homeUrl %>/images/ml_ico2.png" width="35" height="35" /><img class="hidden" src="/<%=homeUrl %>/images/ml_ico2a.png" width="35" height="35" />稿件管理</a></li>
            </ul>
        </div>
        <div class="mcR">
            <script type="text/javascript" charset="utf-8" src="../../sitefiles/bairong/scripts/independent/validate.js"></script>
            <script language="javascript">
                function selectChannel(nodeName, nodeID) {
                    $('#channelName').html(nodeName);
                    $('#channelID').val(nodeID);
                }
            </script>
            <div class="path">
                <p>当前位置：投稿系统<span>&gt;</span>我要投稿</p>
            </div>
            <div class="main-cont">
                <bairong:Alerts runat="server"></bairong:Alerts>
                <h3 class="title">
                    <asp:Literal ID="ltlTitle" runat="server"></asp:Literal>
                </h3>
                <div class="set-area">
                    <div class="form">
                        <form id="myForm" enctype="multipart/form-data" runat="server">
                            <div class="form-row">
                                <label for="title" class="form-field">站点：</label><div class="form-cont">
                                    <asp:DropDownList ID="ddlPublishmentSystem" OnSelectedIndexChanged="ddlPublishmentSystem_SelectedIndexChanged" style="width: 390px;" AutoPostBack="true" runat="server"></asp:DropDownList> 
                                </div>
                            </div>
                            <div class="form-row">
                                <label for="title" class="form-field">栏目：</label><div class="form-cont">
                                    <asp:DropDownList ID="NodeIDDropDownList" OnSelectedIndexChanged="NodeIDDropDownList_SelectedIndexChanged" style="width: 390px;" AutoPostBack="true" runat="server"></asp:DropDownList>
                                </div>
                            </div>
                            <site:MLibAuxiliaryControl ID="acAttributes" runat="server" />

                            <script>
                                $('input[type=text]').css('width', '380px');
                                $('.btn_word').parent().css('margin-left', '115px').css('width', '530px');
                                $('.form-cont>textarea:visible').css('width', '517px');
                                $('.form-cont').map(function () {
                                    if ($(this).html().length == 0) {
                                        $(this).parent().hide();
                                    }
                                });
                                $('.form-field').map(function () {
                                    if ($(this).html() == '外部链接：') {
                                        $(this).next().find('input').css('width', '300px');
                                    }
                                });

                                $('.btn_word').css('float', 'left').css('padding-left', '5px');
                                var onclickStr1 = $('.btn_word').attr('onclick');
                                $('.btn_word').attr('onclick', onclickStr1.replace('/siteserver/cms/', '/<%=homeUrl %>/modal/'));

                                $('.btn_video').css('float', 'left').css('padding-left', '5px');
                                var onclickStr2 = $('.btn_video').attr('onclick');
                                $('.btn_video').attr('onclick', onclickStr2.replace('/siteserver/cms/', '/<%=homeUrl %>/modal/'));

                                $('.btn_audio').css('float', 'left').css('padding-left', '5px');
                                var onclickStr3 = $('.btn_audio').attr('onclick');
                                $('.btn_audio').attr('onclick', onclickStr3.replace('/siteserver/cms/', '/<%=homeUrl %>/modal/'));
                            </script>
                            <div class="btn-area">
                                <asp:Button ID="btnSubmit" class="pubBtn" Style="margin-left: 60px; width: 131px;" OnClick="btnSubmit_OnClick" Text="提 交" runat="server"></asp:Button>
                                <asp:Button ID="btnSubmitCaogao" class="pubBtn" Style="margin-left: 10px; width: 131px;" OnClick="btnSubmitCaogao_OnClick" Text="保存草稿" runat="server"></asp:Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        <div class="clear"></div>
    </div>
    <!--#include file="include/footer_parsed.html"-->
</body>
</html>
<script src="js/lib.js"></script>
<script src="js/app.js" id="controllerName" data-controller-name="helpCenter"></script>
<link rel="stylesheet" type="text/css" href="/sitefiles/bairong/jquery/bootstrap/css/bootstrap.min.css">
<script language="javascript" src="/sitefiles/bairong/jquery/bootstrap/js/bootstrap.min.js"></script>

<script type="text/javascript" language="javascript">
    jQuery.fn.center = function () {
        this.css("position", "absolute");
        var t = ($(window).height() - this.height() - 150) / 2;
        if (t <= 0) t = 10;
        var top = t + $(window).scrollTop();
        if (top < 0) top = $(window).height() >= this.height() ? 10 : 0;
        this.css("top", top + "px");
        var left = ($(window).width() - this.width()) / 2 + $(window).scrollLeft();
        if ($(window).width() <= this.width() + 20) left = 0;
        this.css("margin-left", "0");
        this.css("left", left + "px");
        return this;
    }
    function openWindow(title, url, width, height, isCloseOnly) {
        if (width == '0') width = $(window).width() - 40;
        if (height == '0') height = $(window).height() - 60;
        if (!width) width = 450;
        if (!height) height = 350;
        $('#openWindowModal h3').html(title);
        $('#openWindowBtn').show();
        if (isCloseOnly == 'true') $('#openWindowBtn').hide();
        $('#openWindowIFrame').attr('src', url);
        $('#openWindowModal').width(width);
        $('#openWindowModal .modal-body').css('max-height', '9999px');
        $('#openWindowModal').height(height);
        $('#openWindowModal .modal-body').height(height - 110);
        $('#openWindowIFrame').height(height - 120);
        $('#openWindowModal').center();
        //$("body").eq(0).css("overflow","hidden");
        $('#openWindowModal').modal({ keyboard: true });
        return false;
    }
    function closeWindow() {
        $('#openWindowModal').modal('hide');
    }
    $(document).ready(function () {
        $('#openWindowBtn').click(function (e) {
            //$('#openWindowBtn').button('loading');
            var UE = document.getElementById("openWindowIFrame").contentWindow.UE;
            if (UE) {
                $.each(UE.instants, function (index, editor) {
                    editor.sync();
                });
            }
            if ($('#openWindowIFrame').contents().find("#btnSubmit").length > 0) {
                $('#openWindowIFrame').contents().find("#btnSubmit").click();
            } else {
                $('#openWindowIFrame').contents().find("form").submit();
            }
        });
        $('#openWindowModal').bind('hidden', function () {
            //$("body").eq(0).css("overflow","scroll");
            $('#openWindowIFrame').attr('src', '');
            //$('#openWindowBtn').button('reset');
        });
    });

    function openTips(tips, type) {
        $('#alertType').removeClass();
        if (!type) type = "info";
        if (type == "success") {
            $('#alertType').addClass('alert alert-success');
        } else if (type == "error") {
            $('#alertType').addClass('alert alert-error');
        } else if (type == "info") {
            $('#alertType').addClass('alert alert-info');
        } else if (type == "warn") {
            $('#alertType').addClass('alert alert-block');
        }
        $('#alertType').html(tips);
        $('#openTipsModal').modal();
    }
    function showTips(tips, type) {
        $('.alert').hide();
        $('#alert').removeClass();
        if (!type) type = "info";
        if (type == "success") {
            $('#alert').addClass('alert alert-success');
        } else if (type == "error") {
            $('#alert').addClass('alert alert-error');
        } else if (type == "info") {
            $('#alert').addClass('alert alert-info');
        } else if (type == "warn") {
            $('#alert').addClass('alert alert-block');
        }
        $('#alertMessage').html(tips);
        $('#alert').show();
    }
</script>
<div id="openWindowModal" class="modal hide fade form-horizontal">
    <div class="modal-header" style="height: 30px;">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3></h3>
    </div>
    <div class="modal-body" style="width: 100%; height: 100%; padding: 5px 0; margin: 0;">
        <iframe id="openWindowIFrame" style="width: 100%; height: 100%; background-color: #ffffff;" scrolling="auto" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <div class="modal-footer">
        <button id="openWindowBtn" class="btn btn-primary" data-loading-text="提交中...">确 定</button>
        <button class="btn" data-dismiss="modal" aria-hidden="true">取 消</button>
    </div>
</div>

<div id="openTipsModal" class="modal hide">
    <div class="modal-header">
        <button class="close" data-dismiss="modal">×</button>
        <h3>提示</h3>
    </div>
    <div class="modal-body">
        <div id="alertType" class="alert alert-info"></div>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关 闭</button>
    </div>
</div>
