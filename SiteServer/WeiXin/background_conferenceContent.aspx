<%@ Page Language="C#" Inherits="SiteServer.WeiXin.BackgroundPages.BackgroundConferenceContent" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>

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

  <script type="text/javascript">
  $(document).ready(function()
  {
    loopRows(document.getElementById('contents'), function(cur){ cur.onclick = chkSelect; });
    $(".popover-hover").popover({trigger:'hover',html:true});
  });
  </script>

  <table id="contents" class="table table-bordered table-hover">
    <tr class="info thead">
      <td width="20"></td>
      <td>姓名</td>
      <td>手机</td>
      <td>邮箱</td>
      <td>公司</td>
      <td>职位</td>
      <td>备注</td>
      <td>微信码</td>
      <td>IP地址</td>
      <td>提交时间</td>
      <td width="20"><input type="checkbox" onClick="selectRows(document.getElementById('contents'), this.checked);" /></td>
    </tr>
    <asp:Repeater ID="rptContents" runat="server">
      <itemtemplate>
        <tr>
          <td class="center">
            <asp:Literal ID="ltlItemIndex" runat="server"></asp:Literal>
          </td>
          <td>
            <asp:Literal ID="ltlRealName" runat="server"></asp:Literal>
          </td>
          <td>
            <asp:Literal ID="ltlMobile" runat="server"></asp:Literal>
          </td>
          <td>
            <asp:Literal ID="ltlEmail" runat="server"></asp:Literal>
          </td>
          <td>
            <asp:Literal ID="ltlCompany" runat="server"></asp:Literal>
          </td>
          <td>
            <asp:Literal ID="ltlPosition" runat="server"></asp:Literal>
          </td>
          <td>
            <asp:Literal ID="ltlNote" runat="server"></asp:Literal>
          </td>
          <td class="center">
            <asp:Literal ID="ltlWXOpenID" runat="server"></asp:Literal>
          </td>
          <td class="center">
            <asp:Literal ID="ltlIPAddress" runat="server"></asp:Literal>
          </td>
          <td class="center">
            <asp:Literal ID="ltlAddDate" runat="server"></asp:Literal>
          </td>
          <td class="center">
            <input type="checkbox" name="IDCollection" value='<%#DataBinder.Eval(Container.DataItem, "ID")%>' />
          </td>
        </tr>
      </itemtemplate>
    </asp:Repeater>
  </table>

  <bairong:sqlPager id="spContents" runat="server" class="table table-pager" />

  <ul class="breadcrumb breadcrumb-button">
    <asp:Button class="btn" id="btnDelete" Text="删 除" runat="server" />
    <asp:Button class="btn" id="btnReturn" Text="返 回" runat="server" />
  </ul>

</form>
</body>
</html>