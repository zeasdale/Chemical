<%@ Page Language="C#" AutoEventWireup="true" Inherits="SiteServer.CMS.Pages.MLibManage.Contents" %>


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

</head>
<body>
    <form id="myForm" enctype="multipart/form-data" runat="server">
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
                    if ($(item).attr("href").indexOf("contents.aspx") >= 0)
                        $(item).addClass("nav_cuta");
                });
            });


            $.post("/siteserver/stl/background_serviceStl.aspx", { type: "AjaxUrlFSONext" }, function (data) {
                if (typeof (data) == "string")
                    data = eval('(' + data + ')');
                if (data.isNext == 'true' && data.ajaxUrl) {
                    submitAjaxUrl(data.ajaxUrl, data.parameters);
                }
            });

            function submitAjaxUrl(ajaxUrl, parameters) {
                $.post(ajaxUrl, parameters, function (data) {
                    if (typeof (data) == "string")
                        data = eval('(' + data + ')');
                    if (data.isNext == 'true' && data.ajaxUrl) {
                        submitAjaxUrl(data.ajaxUrl, data.parameters);
                    }
                })
            }
        </script>
        <div class="mcon">
            <div class="mcL mcLx1">
                <ul id="accountInfoUrl">
                    <li><a href="/<%=homeUrl %>/submission.aspx" class="m2menu_a">
                        <img class="block" src="/<%=homeUrl %>/images/ml_ico1.png" width="35" height="35" /><img class="hidden" src="/<%=homeUrl %>/images/ml_ico1a.png" width="35" height="35" />投稿</a></li>
                    <li><a href="/<%=homeUrl %>/contents.aspx" class="m2menu_a m2menu_cuta">
                        <img class="block" src="/<%=homeUrl %>/images/ml_ico2.png" width="35" height="35" /><img class="hidden" src="/<%=homeUrl %>/images/ml_ico2a.png" width="35" height="35" />稿件管理</a></li>
                </ul>
            </div>
            <div class="mcR">
                <!-- <div class="path">
                    <p>当前位置：投稿系统<span>&gt;</span>我的投稿</p>
                </div>-->
                <div class="mc4_top">
                    <a class="mc4_a1 mc4_cuta1" id="systemNotice" href="contents.aspx">已投稿件</a>
                    <a class="mc4_a1" id="systemMsg" href="draftcontent.aspx">草稿</a>
                </div>
                <div class="main-cont">
                    <div class="tab-box">
                        <h5 class="tab-nav tab-nav-s1 clear">
                            <asp:Literal ID="ltlContentType" runat="server"></asp:Literal></h5>
                        <div class="tab-con-s1">
                            <div class="set-area">
                                <div class="search-area">

                                    <div class="item">
                                        <label for="start"><strong>站点</strong></label>
                                        <asp:DropDownList ID="ddlPublishmentSystem" OnSelectedIndexChanged="ddlPublishmentSystem_SelectedIndexChanged" AutoPostBack="true" runat="server" Width="180"></asp:DropDownList>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<label><strong>栏目</strong></label>
                                        <asp:DropDownList ID="NodeIDDropDownList" OnSelectedIndexChanged="NodeIDDropDownList_SelectedIndexChanged" Width="130" AutoPostBack="true" runat="server"></asp:DropDownList>

                                    </div>
                                    <div class="item">
                                        <label for="start"><strong>时间</strong></label>
                                        <input type="text" name="start" id="start" readonly="readonly" value="" class="ipt-txt w70" runat="server" onfocus="WdatePicker({isShowClear:false,readOnly:true,dateFmt:'yyyy-MM-dd'});" />
                                        &nbsp;&nbsp;--&nbsp;&nbsp;
                                        <input type="text" name="end" id="end" readonly="readonly" class="ipt-txt w70" value="" runat="server" onfocus="WdatePicker({isShowClear:false,readOnly:true,dateFmt:'yyyy-MM-dd'});" />
                                        <label><strong>关键字</strong></label>
                                        <asp:TextBox ID="Keyword" class="ipt-txt w120" runat="server"></asp:TextBox>
                                        <asp:LinkButton OnClick="Search_OnClick" runat="server" CssClass="btn-general"><span>搜索</span></asp:LinkButton>

                                        <a class="btn-general highlight" href="submission.aspx"><span>新增稿件</span></a>
                                    </div>
                                </div>
                                <div class="user-list" style="width: 100%">
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table table-bordered table-hover" style="table-layout: auto;">
                                        <colgroup>
                                            <col class="w200" />
                                            <col class="w200" />
                                            <col class="w150" />
                                            <col class="w80" />
                                            <col class="w50" />
                                        </colgroup>
                                        <thead class="tb-tit-bg">
                                            <tr class="info thead">
                                                <th>
                                                    <div class="th-gap">内容标题</div>
                                                </th>
                                                <th>
                                                    <div class="th-gap">栏目</div>
                                                </th>
                                                <th>
                                                    <div class="th-gap">投稿时间</div>
                                                </th>
                                                <th>
                                                    <div class="th-gap">状态</div>
                                                </th>
                                                <th>
                                                    <div class="th-gap">操作</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="recordList">
                                            <asp:PlaceHolder ID="phContents" runat="server">
                                                <asp:Repeater ID="dlContents" runat="server">
                                                    <ItemTemplate>
                                                        <tr>
                                                            <td>
                                                                <asp:Literal ID="ltlContent" runat="server"></asp:Literal></td>
                                                            <td>
                                                                <asp:Literal ID="ltlChannel" runat="server"></asp:Literal></td>
                                                            <td>
                                                                <asp:Literal ID="ltlDateTime" runat="server"></asp:Literal></td>
                                                            <td align="center">
                                                                <asp:Literal ID="ltlState" runat="server"></asp:Literal></td>
                                                            <td align="center">
                                                                <asp:Literal ID="ltlOperate" runat="server"></asp:Literal></td>
                                                        </tr>
                                                    </ItemTemplate>
                                                </asp:Repeater>
                                            </asp:PlaceHolder>
                                            <asp:PlaceHolder ID="phNoData" runat="server">
                                                <tr>
                                                    <td colspan="6">
                                                        <p class="no-data">无投稿内容，请更换搜索条件</p>
                                                    </td>
                                                </tr>
                                            </asp:PlaceHolder>
                                        </tbody>
                                        <tfoot class="td-foot-bg">
                                            <tr>
                                                <td colspan="6">
                                                    <div class="pre-next">
                                                        <bairong:SqlPager ID="spContents" PagerStyle="NextPrev" PagingMode="NonCached" runat="server" Width="100%" CellSpacing="0"></bairong:SqlPager>
                                                        总记录数：
                      <asp:Literal ID="ltlCount" runat="server"></asp:Literal>
                                                        &nbsp;已投稿数：
                      <asp:Literal ID="ltlCountUser" runat="server"></asp:Literal>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                </div>
                                <br />
                                <asp:PlaceHolder ID="phShow" runat="server">
                                    <a class="btn-general highlight" href="contents.aspx?Export=True"><span>导出已审核稿件</span></a>
                                </asp:PlaceHolder>

                                <asp:PlaceHolder ID="phExport" runat="server" Visible="false">
                                    <asp:Literal ID="lbExport" runat="server">成功导出文件！</asp:Literal><asp:HyperLink ID="lkDown" runat="server" Text="正在导出，请等待。。。"></asp:HyperLink>
                                </asp:PlaceHolder>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <!--#include file="include/footer_parsed.html"-->
    </form>
</body>
</html>
<script src="js/lib.js"></script>
<script src="js/app.js" id="controllerName" data-controller-name="helpCenter"></script>
