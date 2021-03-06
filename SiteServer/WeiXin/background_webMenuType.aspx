<%@ Page Language="C#" Inherits="SiteServer.WeiXin.BackgroundPages.BackgroundWebMenuType" %>

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
  <asp:Literal id="ltlBreadCrumb" runat="server" />
  <bairong:alerts runat="server" />

  <script src="../../SiteFiles/bairong/JQuery/jscolor/jscolor.js"></script>

  <div class="popover popover-static">
    <h3 class="popover-title">菜单风格选择</h3>
    <div class="popover-content">

      <!-- <table class="table noborder table-hover">
        <tr>
          <td width="120">菜单颜色：</td>
          <td>
            <asp:TextBox class="input-mini color" id="tbWebMenuColor" runat="server"/>
          </td>
        </tr>
        <tr>
          <td width="120">对齐方式：</td>
          <td>
            <asp:RadioButtonList id="rblIsWebMenuLeft" repeatDirection="Horizontal" runat="server"/>
          </td>
        </tr>
        <tr>
          <td colspan="2">菜单风格：</td>
        </tr>
      </table> -->

      <div>
        <asp:dataList id="dlContents" CssClass="table" repeatDirection="Horizontal" repeatColumns="4" runat="server">
          <ItemTemplate>
            <asp:Literal ID="ltlImageUrl" runat="server"></asp:Literal>
            <asp:Literal ID="ltlDescription" runat="server"></asp:Literal>
            <asp:Literal ID="ltlRadio" runat="server"></asp:Literal>
          </ItemTemplate>
          <ItemStyle cssClass="center" />
        </asp:dataList>
      </div>

      <hr />
      <table class="table noborder">
        <tr>
          <td class="center">
            <asp:Button class="btn btn-primary" id="Submit" text="确 定" onclick="Submit_OnClick" runat="server" />
          </td>
        </tr>
      </table>
  
    </div>
  </div>

</form>
</body>
</html>
<!-- check for 3.6 html permissions -->