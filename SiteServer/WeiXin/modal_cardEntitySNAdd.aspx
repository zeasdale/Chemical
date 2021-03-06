<%@ Page Language="C#" ValidateRequest="false" Inherits="SiteServer.WeiXin.BackgroundPages.Modal.CardEntitySNAdd" Trace="false" %>

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
        <asp:Button ID="btnSubmit" UseSubmitBehavior="false" OnClick="Submit_OnClick" runat="server" Style="display: none" />
        <bairong:Alerts runat="server"></bairong:Alerts>
        <bairong:Code Type="ajaxupload" runat="server" />
        
        <table class="table table-noborder">
             <tr>
                <td>卡号：</td>
                <td>
                    <asp:TextBox ID="tbCardSN" MaxLength="50" runat="server" />
                    <asp:RequiredFieldValidator
                        ControlToValidate="tbCardSN"
                        ErrorMessage=" *" ForeColor="red"
                        Display="Dynamic"
                        runat="server" />
                </td>
            </tr>
             <tr>
                <td>姓名：</td>
                <td>
                    <asp:TextBox ID="tbUserName" MaxLength="50" runat="server" />
                    <asp:RequiredFieldValidator
                        ControlToValidate="tbUserName"
                        ErrorMessage=" *" ForeColor="red"
                        Display="Dynamic"
                        runat="server" />
                </td>
            </tr>
            <tr>
                <td>余额：</td>
                <td>
                    <asp:TextBox ID="tbAmount" MaxLength="50" runat="server" />
                    <asp:RequiredFieldValidator
                        ControlToValidate="tbAmount"
                        ErrorMessage=" *" ForeColor="red"
                        Display="Dynamic"
                        runat="server" />
                    <asp:RegularExpressionValidator
                        runat="server"
                        ControlToValidate="tbAmount"
                        ValidationExpression="^(([1-9]\d*)|\d)(\.\d{1,2})?$"
                        ErrorMessage="不合法" ForeColor="red"
                        Display="Dynamic" />
                </td>
            </tr>
            <tr>
                <td>积分：</td>
                <td>
                    <asp:TextBox ID="tbCredits" MaxLength="50" runat="server" />
                    <asp:RequiredFieldValidator
                        ControlToValidate="tbCredits"
                        ErrorMessage=" *" ForeColor="red"
                        Display="Dynamic"
                        runat="server" />
                     <asp:RegularExpressionValidator
                        runat="server"
                        ControlToValidate="tbCredits"
                        ValidationExpression="^[0-9]*$"
                        ErrorMessage="不合法" ForeColor="red"
                        Display="Dynamic" />
                </td>
            </tr>
            <tr>
                <td>手机号码：</td>
                <td>
                    <asp:TextBox ID="tbMobile" runat="server"></asp:TextBox>
                    <asp:RegularExpressionValidator ControlToValidate="tbMobile"
                        ValidationExpression="^(13|15|18)\d{9}$"
                        ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                </td>
            </tr>
            <tr>
                <td>电子邮箱：</td>
                <td>
                    <asp:TextBox ID="tbEmail" runat="server"></asp:TextBox>
                    <asp:RegularExpressionValidator ControlToValidate="tbEmail"
                        ValidationExpression="(\w[0-9a-zA-Z_-]*@(\w[0-9a-zA-Z-]*\.)+\w{2,})"
                        ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                </td>
            </tr>
            <tr>
                <td>详细地址：</td>
                <td>
                    <asp:TextBox ID="tbAddress" MaxLength="50" runat="server" />
                    <asp:RequiredFieldValidator
                        ControlToValidate="tbAddress"
                        ErrorMessage=" *" ForeColor="red"
                        Display="Dynamic"
                        runat="server" />
                </td>
            </tr>
        </table>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
