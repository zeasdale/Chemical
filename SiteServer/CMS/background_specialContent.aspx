<%@ Page Language="C#" Inherits="SiteServer.CMS.BackgroundPages.BackgroundSpecialContent" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>

<%@ Register TagPrefix="site" Namespace="SiteServer.CMS.Controls" Assembly="SiteServer.CMS" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!--#include file="../inc/header.aspx"-->
    <script src="/SiteFiles/bairong/JQuery/clipboard/jquery.clipboard.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var copy_sel = $('a.code-copy');

            // Disables other default handlers on click (avoid issues)
            copy_sel.on('click', function (e) {
                e.preventDefault();
            });

            // Apply clipboard click event
            copy_sel.clipboard({
                path: '/SiteFiles/bairong/JQuery/clipboard/jquery.clipboard.swf',
                copy: function () {
                    var this_sel = $(this);
                    // Hide "Copy" and show "Copied, copy again?" message in link
                    this_sel.find('.code-copy-first').hide();
                    this_sel.find('.code-copy-done').show();
                    // Return text in closest element (useful when you have multiple boxes that can be copied)
                    return this_sel.attr("data");
                }
            });

            //点击分类文本框，弹出窗体
            $("#<%=tbClassify.ClientID%>").focus(function () {
                $("#<%=lbClassify.ClientID%>").click();
            });
        });
    </script>
</head>

<body>
    <!--#include file="../inc/openWindow.html"-->
    <form class="form-inline" runat="server">
        <asp:Literal ID="ltlBreadCrumb" runat="server" />
        <bairong:Alerts runat="server" />

        <script type="text/javascript">
            $(document).ready(function () {
                loopRows(document.getElementById('contents'), function (cur) { cur.onclick = chkSelect; });
                $(".popover-hover").popover({ trigger: 'hover', html: true });
            });
        </script>

        <div class="well well-small">

            <asp:Button class="btn btn-success" ID="btnAdd" Text="添加专题" runat="server" />
            <asp:Button class="btn" ID="btnDelete" OnClick="btnDelete_OnClick" Text="删 除" runat="server" />
            <asp:Button class="btn" ID="btnTranslate" Text="转 移" runat="server" />
            <asp:Button class="btn" ID="btnTaxis" Text="排 序" runat="server" />

            <div id="contentSearch" style="margin-top: 10px;">
                专题分类：
                <asp:TextBox ID="tbClassify" runat="server"></asp:TextBox>
                <asp:HiddenField ID="tbClassifyHidden" runat="server"></asp:HiddenField>
                <asp:LinkButton ID="lbClassify" runat="server">选择</asp:LinkButton>
                &nbsp;&nbsp;
                <!--<asp:DropDownList ID="ddlSpecialClassify1" runat="server"></asp:DropDownList>
                <asp:DropDownList ID="ddlSpecialClassify2" runat="server"></asp:DropDownList>-->
                时间从：
      <bairong:DateTimeTextBox ID="DateFrom" class="input-small" Columns="12" runat="server" />
                到：
      <bairong:DateTimeTextBox ID="DateTo" class="input-small" Columns="12" runat="server" />
                关键字：
      <asp:TextBox class="input-medium" ID="tbKeyword" runat="server" />
                <asp:Button class="btn" OnClick="Search_OnClick" Text="搜 索" runat="server" />
            </div>
        </div>

        <table id="contents" class="table table-bordered table-hover">
            <tr class="info thead">
                <asp:Literal ID="ltlColumnHeadRows" runat="server"></asp:Literal>
                <td class="center" style="width: 80px;">专题名称</td>
                <td class="center" style="width: 80px;">专题分类</td>
                <td class="center" style="width: 80px;">添加者</td>
                <td class="center" style="width: 80px;">最后编辑者</td>
                <td class="center" style="width: 80px;">专题路径</td>
                <td class="center" style="width: 40px;">&nbsp;</td>
                <td class="center" style="width: 40px;">&nbsp;</td>
                <td class="center" style="width: 40px;">&nbsp;</td>
                <td width="20" class="center">
                    <input type="checkbox" onclick="selectRows(document.getElementById('contents'), this.checked);">
                </td>
            </tr>
            <asp:Repeater ID="rptContents" runat="server">
                <ItemTemplate>
                    <tr>
                        <td class="center">
                            <asp:Literal ID="ItemSpecailName" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ItemClassifyName" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ItemAddUser" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ItemLastEditUser" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ItemPath" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ItemEidtRow" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ItemCopyRow" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ItemDownSource" runat="server"></asp:Literal>
                        </td>
                        <td class="center">
                            <input type="checkbox" name="ContentIDCollection" value='<%#DataBinder.Eval(Container.DataItem, "ID")%>' />
                        </td>
                    </tr>
                </ItemTemplate>
            </asp:Repeater>
        </table>

        <bairong:SqlPager ID="spContents" runat="server" class="table table-pager" />

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
