<%@ Page Language="C#" Inherits="SiteServer.CMS.BackgroundPages.Modal.AdvImageClassifySelect" Trace="false" %>

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
    <form class="form-inline" enctype="multipart/form-data" method="post" runat="server">
        <asp:Button ID="btnSubmit" UseSubmitBehavior="false" OnClick="Submit_OnClick" runat="server" Style="display: none" />
        <bairong:Alerts runat="server"></bairong:Alerts>
        <div class="popover popover-static">
            <table class="table table-noborder table-hover">
                <tr>
                    <td width="120">关键字：</td>
                    <td>
                        <asp:TextBox ID="tbKeyword" runat="server"></asp:TextBox>
                        <asp:Button OnClick="Search_OnClick" runat="server" class="btn" Text="搜 索" />
                    </td>
                </tr>
                <tr>
                    <td class="radiobuttonlist" colspan="2">
                        <asp:RadioButtonList ID="rblClassify" runat="server" RepeatColumns="3" BorderWidth="1px" BorderColor="Gray" Width="100%" />
                    </td>
                </tr>
            </table>
        </div>
        <script type="text/javascript" language="javascript">
            <asp:Literal id="ltlScript" runat="server"></asp:Literal>
        </script>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
