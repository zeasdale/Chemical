<%@ Page Language="C#" Inherits="SiteServer.CMS.BackgroundPages.BackgroundAdvImageStatisticDay" %>

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
                广告分类：
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
            <h3 class="popover-title">广告增加最近<%=count %><%=SiteServer.CMS.Model.EStatictisXTypeUtils.GetText(SiteServer.CMS.Model.EStatictisXTypeUtils.GetEnumType(base.GetQueryString("XType"))) %>分配图表</h3>
            <div class="popover-content">
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
                                    data: ['广告（<%=SiteServer.CMS.Model.EStatictisXTypeUtils.GetText(SiteServer.CMS.Model.EStatictisXTypeUtils.GetEnumType(base.GetQueryString("XType"))) %>）']
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
