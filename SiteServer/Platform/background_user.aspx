﻿<%@ Page Language="C#" Inherits="BaiRong.BackgroundPages.BackgroundUser" %>

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
        <asp:Literal ID="ltlBreadCrumb" runat="server" />
        <bairong:Alerts runat="server" />

        <div class="well well-small">
            <table class="table table-noborder">
                <tr>
                    <td>用户等级：
          <asp:DropDownList ID="ddlUserLevel" AutoPostBack="true" OnSelectedIndexChanged="Search_OnClick" runat="server"></asp:DropDownList>
                        每页显示条数：
          <asp:DropDownList ID="ddlPageNum" class="input-small" AutoPostBack="true" OnSelectedIndexChanged="Search_OnClick" runat="server">
              <asp:ListItem Text="默认" Value="0" Selected="true"></asp:ListItem>
              <asp:ListItem Text="30" Value="30"></asp:ListItem>
              <asp:ListItem Text="50" Value="50"></asp:ListItem>
              <asp:ListItem Text="100" Value="100"></asp:ListItem>
              <asp:ListItem Text="200" Value="200"></asp:ListItem>
              <asp:ListItem Text="300" Value="300"></asp:ListItem>
          </asp:DropDownList>
                        登录次数：
          <asp:DropDownList ID="ddlLoginNum" class="input-small" AutoPostBack="true" OnSelectedIndexChanged="Search_OnClick" runat="server">
              <asp:ListItem Text="全部" Value="0" Selected="true"></asp:ListItem>
              <asp:ListItem Text=">30" Value="30"></asp:ListItem>
              <asp:ListItem Text=">50" Value="50"></asp:ListItem>
              <asp:ListItem Text=">100" Value="100"></asp:ListItem>
              <asp:ListItem Text=">200" Value="200"></asp:ListItem>
              <asp:ListItem Text=">300" Value="300"></asp:ListItem>
          </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>目标：
            <asp:DropDownList ID="SearchType" class="input-medium" runat="server"></asp:DropDownList>
                        关键字：
          <asp:TextBox ID="tbKeyword" MaxLength="500" Size="45" runat="server" />
                        注册时间：
          <asp:DropDownList ID="ddlCreationDate" class="input-medium" AutoPostBack="true" OnSelectedIndexChanged="Search_OnClick" runat="server">
              <asp:ListItem Text="全部时间" Value="0" Selected="true"></asp:ListItem>
              <asp:ListItem Text="1天内" Value="1"></asp:ListItem>
              <asp:ListItem Text="2天内" Value="2"></asp:ListItem>
              <asp:ListItem Text="3天内" Value="3"></asp:ListItem>
              <asp:ListItem Text="1周内" Value="7"></asp:ListItem>
              <asp:ListItem Text="1个月内" Value="30"></asp:ListItem>
              <asp:ListItem Text="3个月内" Value="90"></asp:ListItem>
              <asp:ListItem Text="半年内" Value="180"></asp:ListItem>
              <asp:ListItem Text="1年内" Value="365"></asp:ListItem>
          </asp:DropDownList>
                        最后活动时间：
          <asp:DropDownList ID="ddlLastActivityDate" class="input-medium" AutoPostBack="true" OnSelectedIndexChanged="Search_OnClick" runat="server">
              <asp:ListItem Text="全部时间" Value="0" Selected="true"></asp:ListItem>
              <asp:ListItem Text="1天内" Value="1"></asp:ListItem>
              <asp:ListItem Text="2天内" Value="2"></asp:ListItem>
              <asp:ListItem Text="3天内" Value="3"></asp:ListItem>
              <asp:ListItem Text="1周内" Value="7"></asp:ListItem>
              <asp:ListItem Text="1个月内" Value="30"></asp:ListItem>
              <asp:ListItem Text="3个月内" Value="90"></asp:ListItem>
              <asp:ListItem Text="半年内" Value="180"></asp:ListItem>
              <asp:ListItem Text="1年内" Value="365"></asp:ListItem>
          </asp:DropDownList>
                        <asp:Button class="btn" OnClick="Search_OnClick" ID="Search" Text="搜 索" runat="server" />
                    </td>
                </tr>
            </table>
        </div>

        <table class="table table-bordered table-hover">
            <tr class="info thead">
                <td>登录名</td>
                <td>显示名</td>
                <%--                <td>用户等级</td>--%>
                <td>注册时间</td>
                <td>最后活动时间</td>
                <td>登录次数</td>
                <td>积分</td>
                <td>用户组</td>
                <asp:Literal ID="ltlColumnHeader" runat="server" />
                <td class="center" width="60">&nbsp;</td>
                <td class="center" width="60">&nbsp;</td>
                <td width="20">
                    <input onclick="_checkFormAll(this.checked)" type="checkbox" />
                </td>
            </tr>
            <asp:Repeater ID="rptContents" runat="server">
                <ItemTemplate>
                    <tr>
                        <td>
                            <asp:Literal ID="ltlUserName" runat="server"></asp:Literal></td>
                        <td>
                            <asp:Literal ID="ltlDisplayName" runat="server"></asp:Literal></td>
                        <%--                        <td>
                            <asp:Literal ID="ltlUserLevelName" runat="server"></asp:Literal></td>--%>
                        <td>
                            <asp:Literal ID="ltlCreationDate" runat="server"></asp:Literal></td>
                        <td>
                            <asp:Literal ID="ltlLastActivityDate" runat="server"></asp:Literal></td>
                        <td>
                            <asp:Literal ID="ltlLoginCount" runat="server"></asp:Literal></td>
                        <td>
                            <asp:Literal ID="ltlCredits" runat="server"></asp:Literal></td>
                        <td>
                            <asp:Literal ID="ltlNewGroupName" runat="server"></asp:Literal></td>
                        <asp:Literal ID="ltlColumns" runat="server" />
                        <td class="center">
                            <asp:HyperLink NavigateUrl="javascript:;" ID="hlChangePassword" Text="重设密码" runat="server"></asp:HyperLink>
                        </td>
                        <td class="center">
                            <asp:HyperLink ID="hlEditLink" Text="编辑" runat="server"></asp:HyperLink>
                        </td>
                        <td class="center">
                            <asp:Literal ID="ltlSelect" runat="server"></asp:Literal></td>
                    </tr>
                </ItemTemplate>
            </asp:Repeater>
        </table>

        <bairong:SqlPager ID="spContents" runat="server" class="table table-pager" />

        <ul class="breadcrumb breadcrumb-button">
            <asp:Button class="btn btn-success" ID="btnAdd" Text="添加用户" runat="server" />
            <asp:Button class="btn" ID="AddToGroup" Text="设置用户类别" runat="server" />
            <asp:Button class="btn" ID="AddToNewGroup" Text="设置用户组" runat="server" />
            <asp:Button class="btn" ID="SetMLibValidityDate" Text="设置投稿有效期" runat="server" />
            <asp:Button class="btn" ID="Lock" Text="锁定用户" runat="server" />
            <asp:Button class="btn" ID="UnLock" Text="解除锁定" runat="server" />
            <asp:Button class="btn" ID="SendMail" Text="发送邮件" runat="server" />
            <asp:Button class="btn" ID="SendSMS" Text="发送短信" runat="server" Visible="false" />
            <asp:Button class="btn" ID="SendMsg" Text="发送站内信" runat="server" />
            <asp:Button class="btn" ID="Delete" Text="删 除" runat="server" />
            <asp:Button class="btn" ID="Import" Text="导入Excel" runat="server" />
            <asp:Button class="btn" ID="Export" Text="导出Excel" runat="server" />
        </ul>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
