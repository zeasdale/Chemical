<%@ Page Language="C#" ValidateRequest="false" Inherits="SiteServer.CMS.Pages.MLibManage.SubmissionShow" %>

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
                    $(item).addClass("m2menu_cuta");
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
                <p>当前位置：投稿系统<span>&gt;</span>查看稿件</p>
            </div>
            <div class="main-cont">
                <div class="tab-box">
                    <h5 class="tab-nav tab-nav-s1 clear">
                        <asp:Literal runat="server" ID="ltlTabAction"></asp:Literal></h5>
                    <div class="tab-con-s1">
                        <table class="table table-bordered table-striped">
                            <tr style="height: 0px;">
                                <td width="150">审核信息</td>
                                <td colspan="2">
                                    <asp:Literal runat="server" ID="ltlStatus"></asp:Literal></td>
                            </tr>
                            <asp:Repeater ID="MyRepeater" runat="server">
                                <ItemTemplate>
                                    <asp:Literal ID="ltlHtml" runat="server" />
                                </ItemTemplate>
                            </asp:Repeater>
                            <div class="btn-area">
                            </div>
                        </table>
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

