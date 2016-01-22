<%@ Page Language="C#" Inherits="SiteServer.CMS.BackgroundPages.BackgroundSpecialStatisticDay" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>

<%@ Register TagPrefix="site" Namespace="SiteServer.CMS.Controls" Assembly="SiteServer.CMS" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!--#include file="../inc/header.aspx"-->
</head>

<body>
    <!--#include file="../inc/openWindow.html"-->
    <form class="form-inline" runat="server">
        <asp:Literal ID="ltlBreadCrumb" runat="server" />
        <bairong:Alerts runat="server" />

        <div class="well well-small">
            <div id="contentSearch" style="margin-top: 10px;">
                专题分类：
                <asp:TextBox ID="tbClassify" runat="server"></asp:TextBox>
                <asp:HiddenField ID="tbClassifyHidden" runat="server"></asp:HiddenField>
                <asp:LinkButton ID="lbClassify" runat="server">选择</asp:LinkButton>
                &nbsp;&nbsp;
                时间从：
      <bairong:DateTimeTextBox ID="dateFrom" class="input-small" Columns="12" runat="server" />
                到：
      <bairong:DateTimeTextBox ID="dateTo" class="input-small" Columns="12" runat="server" />
                x轴：
      <asp:DropDownList ID="ddlXType" runat="server"></asp:DropDownList>
                <asp:Button class="btn" OnClick="Search_OnClick" Text="搜 索" runat="server" />
            </div>
        </div>


        <div class="popover popover-static">
            <h3 class="popover-title">专题增加最近<%=count %><%=SiteServer.CMS.Model.EStatictisXTypeUtils.GetText(SiteServer.CMS.Model.EStatictisXTypeUtils.GetEnumType(base.GetQueryString("XType"))) %>分配图表</h3>
            <div class="popover-content">
                <!--旧图标-->
                <!--<table cellpadding="2" border="0">
                    <tbody>
                        <tr>
                            <td>单位（专题增加）</td>
                        </tr>
                        <tr>
                            <td align="bottom">
                                <table align="center">
                                    <tbody>
                                        <tr valign="bottom">
                                            <td valign="top" style="vertical-align: top;">
                                                <table height="200" cellspacing="0" cellpadding="0" align="center"
                                                    border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(8)%></td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(7)%></td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(6)%></td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(5)%></td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(4)%></td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(3)%></td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(2)%></td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" nowrap height="25"><%=GetAccessNum(1)%></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <%if (this.count >= 10)
                                              {%>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(1)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(2)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(3)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(4)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(5)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(6)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(7)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(8)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(9)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(10)%></td>
                                            <%} if (this.count >= 12)
                                              {%>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(11)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(12)%></td>
                                            <%} if (this.count >= 30)
                                              { %>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(13)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(14)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(15)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(16)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(17)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(18)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(19)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(20)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(21)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(22)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(23)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(24)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(25)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(26)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(27)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(28)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(29)%></td>
                                            <td nowrap align="bottom" width="16" style="vertical-align: bottom;"
                                                background="../pic/tracker_background.gif" height="216"><%=GetGraphicHtml(30)%></td>
                                            <%} %>
                                            <td>单位（<%=SiteServer.CMS.Model.EStatictisXTypeUtils.GetText(SiteServer.CMS.Model.EStatictisXTypeUtils.GetEnumType(base.GetQueryString("XType"))) %>）</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>-->
                <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                <div id="main" style="height: 400px"></div>
                <!-- ECharts单文件引入 -->
                <script src="/sitefiles/bairong/jquery/echarts/build/dist/echarts.js"></script>
                <script type="text/javascript">
                    // 路径配置
                    require.config({
                        paths: {
                            echarts: '/sitefiles/bairong/jquery/echarts/build/dist'
                        }
                    });
                    // 使用
                    require(
                        [
                            'echarts',
                            'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
                        ],
                        function (ec) {
                            // 基于准备好的dom，初始化echarts图表
                            var myChart = ec.init(document.getElementById('main'));
                            //x array
                            var xArray = [];
                            //y array
                            var yArray = [];

                    <%for (int i = 0; i < this.count; i++)
                      {%>
                            xArray.push('<%=GetGraphicX(i+1)%>');
                            yArray.push('<%=GetGraphicY(i+1)%>');
                    <%}%>

                            var option = {
                                tooltip: {
                                    show: true
                                },
                                legend: {
                                    data: ['专题（<%=SiteServer.CMS.Model.EStatictisXTypeUtils.GetText(SiteServer.CMS.Model.EStatictisXTypeUtils.GetEnumType(base.GetQueryString("XType"))) %>）']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: xArray
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                "name": "增加量",
                                "type": "bar",
                                "data": yArray
                            }
                        ]
                    };

                            // 为echarts对象加载数据 
                            myChart.setOption(option);
                        }
            );
                </script>
            </div>
        </div>

        <ul class="breadcrumb breadcrumb-button">
            <asp:Button class="btn" ID="ExportTracking" runat="server" Text="导出Excel"></asp:Button>
        </ul>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
