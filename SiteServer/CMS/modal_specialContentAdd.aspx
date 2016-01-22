<%@ Page Language="C#" ValidateRequest="false" Inherits="SiteServer.CMS.BackgroundPages.Modal.SpecialContentAdd" Trace="false" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>

<%@ Register TagPrefix="site" Namespace="SiteServer.CMS.Controls" Assembly="SiteServer.CMS" %>
<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <!--#include file="../inc/header.aspx"-->
    <script type="text/javascript">
        function setFileAndPath(file, path) {
            $("#<%=tbFile.ClientID%>").val(file);
            $("#<%=tbPath.ClientID%>").val(path);
        }
        function checkClassifyID() {
            if ($("#<%=tbClassifyHidden.ClientID%>").val() == "") {
                alert("请先选择专题分类！");
                <%=SiteServer.CMS.BackgroundPages.Modal.SpecialClassifySelect.GetOpenWindowStringToTextBox(base.PublishmentSystemID,tbClassify.ClientID)%>
            }
            else {
                var openWinStr = "<%=SiteServer.CMS.BackgroundPages.Modal.UploadSpecial.GetOpenWindowStringToTextBox(base.PublishmentSystemID,BaiRong.Model.EUploadType.Special,tbCompressPath.ClientID)%>";
                openWinStr = openWinStr.replace(encodeURI("{").toLowerCase() + "classifyID" + encodeURI("}").toLowerCase(), $("#<%=tbClassifyHidden.ClientID%>").val());
                eval("(" + openWinStr.split(";")[0] + ")");
            }
        }
    </script>
</head>

<body>
    <!--#include file="../inc/openWindow.html"-->
    <script type="text/javascript" charset="utf-8" src="../../sitefiles/bairong/scripts/independent/validate.js"></script>
    <form class="form-inline" enctype="multipart/form-data" method="post" runat="server">
        <asp:Button ID="btnSubmit" UseSubmitBehavior="false" OnClick="Submit_OnClick" runat="server" Style="display: none" />
        <bairong:Alerts runat="server"></bairong:Alerts>

        <table class="table table-noborder table-hover">
            <tr>
                <td>专题名称：</td>
                <td>
                    <asp:TextBox ID="tbSpecialName" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator" BorderColor="Red" ErrorMessage="*" runat="server" ControlToValidate="tbSpecialName"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>专题压缩包：</td>
                <td>
                    <asp:TextBox ID="tbCompressPath" runat="server"></asp:TextBox>
                    <asp:LinkButton ID="lbUpload" runat="server" CssClass="btn"><i class="icon-arrow-up"></i></asp:LinkButton>
                </td>
            </tr>
            <tr>
                <td>专题文件夹：</td>
                <td>
                    <asp:TextBox ID="tbFile" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" BorderColor="Red" ErrorMessage="*" runat="server" ControlToValidate="tbFile"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>专题路径：</td>
                <td>
                    <asp:TextBox ID="tbPath" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" BorderColor="Red" ErrorMessage="*" runat="server" ControlToValidate="tbPath"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>所述分类：</td>
                <td>
                    <asp:TextBox ID="tbClassify" runat="server"></asp:TextBox>
                    <asp:HiddenField ID="tbClassifyHidden" runat="server"></asp:HiddenField>
                    <asp:LinkButton ID="lbClassify" runat="server">选择</asp:LinkButton>
                </td>
            </tr>
            <tr>
                <td>专题简介：</td>
                <td>
                    <asp:TextBox ID="tbDescription" runat="server"></asp:TextBox>
                </td>
            </tr>
        </table>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
