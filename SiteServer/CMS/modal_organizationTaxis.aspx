﻿<%@ Page Language="C#" Inherits="SiteServer.CMS.BackgroundPages.Modal.OrganizationTaxis" Trace="false" %>

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
        <asp:Button ID="btnSubmit" UseSubmitBehavior="false" OnClick="Submit_OnClick" runat="server" Style="display: none" />
        <bairong:Alerts runat="server"></bairong:Alerts>

        <table class="table table-noborder table-hover">
            <tr>
                <td width="120">
                    <bairong:Help HelpText="对所选分支机构排序的方向" Text="排序方向：" runat="server"></bairong:Help>
                </td>
                <td>
                    <asp:RadioButtonList ID="TaxisType" RepeatDirection="Horizontal" class="noborder" runat="server"></asp:RadioButtonList></td>
            </tr>
            <tr>
                <td width="120">
                    <bairong:Help HelpText="对所选分支机构移动的数目" Text="移动数目：" runat="server"></bairong:Help>
                </td>
                <td>
                    <asp:TextBox class="input-mini" Text="1" MaxLength="50" ID="TaxisNum" runat="server" />
                    <asp:RequiredFieldValidator
                        ControlToValidate="TaxisNum"
                        ErrorMessage=" *" ForeColor="red"
                        Display="Dynamic"
                        runat="server" />
                    <asp:RegularExpressionValidator
                        runat="server"
                        ControlToValidate="TaxisNum"
                        ValidationExpression="^([1-9]|[1-9][0-9]{1,})$"
                        ErrorMessage=" *" ForeColor="red"
                        Display="Dynamic" /></td>
            </tr>
        </table>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
