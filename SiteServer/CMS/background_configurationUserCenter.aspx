﻿<%@ Page Language="C#" Inherits="SiteServer.CMS.BackgroundPages.BackgroundConfigurationUserCenter" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>
<%@ Register TagPrefix="site" Namespace="SiteServer.CMS.Controls" Assembly="SiteServer.CMS" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!--#include file="../inc/header.aspx"-->
    <style>
        .td table tr td {
            border: 0;
        }
    </style>
</head>

<body>
    <!--#include file="../inc/openWindow.html"-->
    <form class="form-inline" runat="server">
        <asp:Literal ID="ltlBreadCrumb" runat="server" />
        <bairong:Alerts runat="server" />
        <script>
            $(document).ready(function () {
                $('#myTab a').click(function (e) {
                    e.preventDefault();
                    changeTab($(this).attr('index'));
                });
                <%=GetChangeTabFunction()%>
            });
            function changeTab(index) {
                $('#index').val(index);
                $($('#myTab a').get(index)).tab('show');
            }
        </script>

        <input type="hidden" id="index" name="index" value="0" />

        <ul class="nav nav-pills" id="myTab">
            <li class="active"><a href="#basic" index="0">基本设置</a></li>
            <li style="display: none;"><a href="#advance" index="1">访问地址设置</a></li>
            <li><a href="#register" index="2">注册设置</a></li>
            <li><a href="#login" index="3">登录设置</a></li>
            <li style="display: none;"><a href="#forget" index="4">忘记密码设置</a></li>
        </ul>

        <div class="tab-content">
            <div class="tab-pane active" id="basic">
                <table class="table table-bordered table-hover">
                    <tr>
                        <td width="200">用户中心名称：</td>
                        <td>
                            <asp:TextBox Columns="25" MaxLength="50" ID="PublishmentSystemName" runat="server" class="input-xlarge" />
                            <asp:RequiredFieldValidator ControlToValidate="PublishmentSystemName" ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                            <asp:RegularExpressionValidator runat="server" ControlToValidate="PublishmentSystemName" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                        </td>
                    </tr>
                    <site:AuxiliaryControl ID="acAttributes" runat="server" />
                </table>
            </div>
            <div class="tab-pane" id="advance">
                <table class="table table-bordered table-hover">
                    <tr>
                        <td colspan="2">
                            <div>
                                外网访问地址：<asp:Literal ID="ltOuterUrl" runat="server"></asp:Literal>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            内网访问地址：<asp:Literal ID="ltInnerUrl" runat="server"></asp:Literal>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>生成页面URL前缀</td>
                        <td>
                            <asp:TextBox ID="tbPublishmentSystemUrl" Columns="40" MaxLength="200" Style="ime-mode: disabled;" runat="server" />
                            <asp:RequiredFieldValidator ControlToValidate="tbPublishmentSystemUrl" ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                            <asp:RegularExpressionValidator runat="server" ControlToValidate="tbPublishmentSystemUrl" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                            <br />
                            <span class="gray">页面所有地址将保留此前缀，可以设置绝对路径（域名）或者相对路径（如：“/”）</span>
                        </td>
                    </tr>
                    <tr>
                        <td>网站部署方式：</td>
                        <td>
                            <asp:DropDownList ID="ddlIsMultiDeployment" AutoPostBack="true" OnSelectedIndexChanged="ddlIsMultiDeployment_SelectedIndexChanged" runat="server"></asp:DropDownList>
                            <br />
                            <span class="gray">如果是多服务器部署，请选择“内外网分离部署”</span>
                        </td>
                    </tr>
                    <asp:PlaceHolder ID="phIsMultiDeployment" runat="server">
                        <tr>
                            <td>网站外部访问地址：</td>
                            <td>
                                <asp:TextBox ID="tbOuterUrl" Columns="40" MaxLength="200" Style="ime-mode: disabled;" runat="server" />
                                <asp:RequiredFieldValidator ControlToValidate="tbOuterUrl" ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                                <asp:RegularExpressionValidator runat="server" ControlToValidate="tbOuterUrl" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                                <br />
                                <span class="gray">外部访问的地址，通常填写网站域名</span>
                            </td>
                        </tr>
                        <tr>
                            <td>网站内部访问地址：</td>
                            <td>
                                <asp:TextBox ID="tbInnerUrl" Columns="40" MaxLength="200" Style="ime-mode: disabled;" runat="server" />
                                <asp:RequiredFieldValidator ControlToValidate="tbInnerUrl" ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                                <asp:RegularExpressionValidator runat="server" ControlToValidate="tbInnerUrl" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                                <br />
                                <span class="gray">内部访问的地址，后台访问将访问此地址</span>
                            </td>
                        </tr>
                    </asp:PlaceHolder>
                    <tr>
                        <td>功能页面访问方式：</td>
                        <td>
                            <asp:DropDownList ID="ddlFuncFilesType" AutoPostBack="true" OnSelectedIndexChanged="ddlFuncFilesType_SelectedIndexChanged" runat="server" />
                        </td>
                    </tr>
                    <asp:PlaceHolder ID="phCrossDomainFilesCopy" runat="server">
                        <tr>
                            <td>将跨域代理页复制到站点中：</td>
                            <td>
                                <asp:Button class="btn btn-success" ID="btnCopyCrossDomainFiles" Text="复 制" OnClick="btnCopyCrossDomainFiles_OnClick" runat="server" />
                            </td>
                        </tr>
                    </asp:PlaceHolder>
                    <asp:PlaceHolder ID="phFuncFilesCopy" runat="server">
                        <tr>
                            <td>将功能页复制到站点中：</td>
                            <td>
                                <asp:Button class="btn btn-success" ID="btnCopyFuncFiles" Text="复 制" OnClick="btnCopyFuncFiles_OnClick" runat="server" />
                            </td>
                        </tr>
                    </asp:PlaceHolder>
                    <asp:PlaceHolder ID="phAPIUrl" runat="server">
                        <tr>
                            <td>API访问地址：</td>
                            <td>
                                <asp:TextBox ID="tbAPIUrl" runat="server"></asp:TextBox>
                                <asp:RequiredFieldValidator ControlToValidate="tbAPIUrl" ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                                <asp:RegularExpressionValidator runat="server" ControlToValidate="tbAPIUrl" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                            </td>
                        </tr>
                    </asp:PlaceHolder>
                </table>
            </div>
            <div class="tab-pane" id="register">
                <table class="table table-bordered table-hover">
                    <tr>
                        <td width="200">允许新用户注册：</td>
                        <td class="td">
                            <asp:RadioButtonList ID="IsRegisterAllowed" runat="server" RepeatDirection="Horizontal"></asp:RadioButtonList>
                            <span class="gray">选择否将禁止新用户注册, 但不影响过去已注册的会员的使用</span>
                        </td>
                    </tr>
                    <tr>
                        <td>注册用户名最小长度：</td>
                        <td>
                            <asp:TextBox ID="tbRegisterUserNameMinLength" class="input-mini" runat="server"></asp:TextBox>
                            <span class="gray">0代表不限制</span>
                        </td>
                    </tr>
                    <tr>
                        <td>注册密码限制：</td>
                        <td>
                            <asp:DropDownList ID="ddlRegisterPasswordRestriction" runat="server"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>用户名称保留关键字：</td>
                        <td>
                            <asp:TextBox ID="ReservedUserNames" TextMode="MultiLine" Width="360" Height="60" runat="server"></asp:TextBox>
                            <br />
                            <span class="gray">使用&ldquo;,&rdquo;分隔多个用户名</span>
                        </td>
                    </tr>
                    <tr>
                        <td>用户注册人工审核：</td>
                        <td>
                            <asp:DropDownList ID="RegisterAuditType" runat="server"></asp:DropDownList>
                            <br />
                            <span class="gray">选择&quot;开启&quot;用户注册需要管理员进行审核;<br />
                                选择&quot;关闭&quot;用户注册不需要管理员审核，但是可以在菜单[消息管理--消息提醒设置]中，选择发送注册验证信息。</span>
                        </td>
                    </tr>
                    <tr>
                        <td>同一IP注册间隔限制：</td>
                        <td>
                            <asp:TextBox class="input-mini" MaxLength="10" ID="tbRegisterMinHoursOfIPAddress" runat="server" />
                            小时
          <asp:RegularExpressionValidator runat="server" ControlToValidate="tbRegisterMinHoursOfIPAddress" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                            <br>
                            <span>同一IP在本时间间隔内将只能注册一个帐号，0 为不限制</span>
                        </td>
                    </tr>
                    <%--<tr>
                        <td>发送欢迎信息：</td>
                        <td>
                            <asp:DropDownList ID="ddlRegisterWelcomeType" AutoPostBack="true" OnSelectedIndexChanged="RegisterType_SelectedIndexChanged" runat="server"></asp:DropDownList>
                            <br>
                            <span>可选择是否自动向新注册用户发送一条欢迎信息</span>
                        </td>
                    </tr>
                    <asp:PlaceHolder ID="phRegisterWelcome" runat="server">
                        <tr>
                            <td>欢迎信息标题：</td>
                            <td>
                                <asp:TextBox Columns="60" ID="tbRegisterWelcomeTitle" runat="server" Text="" />
                                <asp:RegularExpressionValidator runat="server" ControlToValidate="tbRegisterWelcomeTitle" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                                <br>
                                <span>系统发送的欢迎信息的标题</span>
                            </td>
                        </tr>
                        <tr>
                            <td>欢迎信息内容：</td>
                            <td>
                                <asp:TextBox TextMode="MultiLine" Width="90%" Style="height: 160px;" MaxLength="500" ID="tbRegisterWelcomeContent" runat="server" Text="" />
                                <asp:RegularExpressionValidator runat="server" ControlToValidate="tbRegisterWelcomeContent" ValidationExpression="[^']+" ErrorMessage=" *" ForeColor="red" Display="Dynamic" />
                                <br>
                                <span>系统发送的欢迎信息的内容，[UserName]代表账号，[DisplayName]代表姓名，[AddDate]代表当前时间</span>
                            </td>
                        </tr>
                    </asp:PlaceHolder>--%>
                </table>
            </div>
            <div class="tab-pane" id="login">
                <table class="table table-bordered table-hover">
                    <tr>
                        <td width="200">用户登录方式：</td>
                        <td class="td">
                            <asp:CheckBoxList ID="cblLoginMethod" runat="server" RepeatDirection="Horizontal"></asp:CheckBoxList>
                            <span class="gray">选择多项，控制登录验证方式</span>
                        </td>
                    </tr>
                    <tr>
                        <td>是否记录登录IP：</td>
                        <td class="td">
                            <asp:RadioButtonList ID="rblIsRecordIP" runat="server" RepeatDirection="Horizontal">
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td>是否记录登录来源：</td>
                        <td class="td">
                            <asp:RadioButtonList ID="rblIsRecordSource" runat="server" RepeatDirection="Horizontal">
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td>是否开启失败锁定：</td>
                        <td class="td">
                            <asp:RadioButtonList ID="rblIsFailToLock" OnSelectedIndexChanged="rblIsFailToLock_SelectedIndexChanged" runat="server" RepeatDirection="Horizontal" AutoPostBack="true">
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <asp:PlaceHolder ID="phFailToLock" runat="server">
                        <tr>
                            <td>失败次数锁定：</td>
                            <td>
                                <asp:TextBox ID="loginFailCount" runat="server"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ControlToValidate="loginFailCount" runat="server" ErrorMessage="*" ForeColor="Red"></asp:RequiredFieldValidator>
                                <br />
                                <span class="gray">一旦登录失败达到指定次数之后用户就会被锁定</span>
                            </td>
                        </tr>
                        <tr>
                            <td>用户锁定类型：</td>
                            <td>
                                <asp:DropDownList ID="ddlLockType" OnSelectedIndexChanged="ddlLockType_SelectedIndexChanged" runat="server" AutoPostBack="true"></asp:DropDownList>
                            </td>
                        </tr>
                        <asp:PlaceHolder ID="phLockingTime" runat="server">
                            <tr>
                                <td>锁定时间：</td>
                                <td>
                                    <asp:TextBox ID="lockingTime" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" ControlToValidate="lockingTime" runat="server" ErrorMessage="*" ForeColor="Red"></asp:RequiredFieldValidator>
                                </td>
                            </tr>
                        </asp:PlaceHolder>
                    </asp:PlaceHolder>
                </table>
            </div>
            <div class="tab-pane" id="forget">
                <table class="table table-bordered table-hover">
                    <tr>
                        <td width="200">密码找回方式：</td>
                        <td class="td">
                            <asp:CheckBoxList ID="cblPasswordFind" runat="server" RepeatDirection="Horizontal" OnSelectedIndexChanged="cblPasswordFind_SelectedIndexChanged" AutoPostBack="true"></asp:CheckBoxList>
                            <span class="gray">选择多项，控制密码找回方式</span>
                        </td>
                    </tr>
                    <asp:PlaceHolder runat="server" ID="phPhone">
                        <tr>
                            <td>短信验证通知：</td>
                            <td>
                                <asp:TextBox ID="phoneNotice" runat="server" TextMode="MultiLine" Height="200" Width="95%"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator3" ControlToValidate="phoneNotice" runat="server" ErrorMessage=" *" ForeColor="Red"></asp:RequiredFieldValidator>
                                <asp:RegularExpressionValidator runat="server" ControlToValidate="phoneNotice" ErrorMessage=" *" ForeColor="red" Display="Dynamic" ValidationExpression="[^']*\[VerifyCode\][^']*"></asp:RegularExpressionValidator>
                                <br />
                                <span class="gray">当密码找回方式选择手机号，那么系统会根据此格式发送信息。<br />
                                    [UserName]代表账号，[DisplayName]代表姓名，[AddDate]代表当前时间，[VerifyCode]代表验证码，发送内容必须包含[VerifyCode]</span>
                            </td>
                        </tr>
                    </asp:PlaceHolder>
                    <asp:PlaceHolder runat="server" ID="phEmail">
                        <tr>
                            <td>邮箱验证标题：</td>
                            <td>
                                <asp:TextBox ID="emailNoticeTitle" runat="server"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="emailNoticeTitle" ErrorMessage=" *" ForeColor="Red"></asp:RequiredFieldValidator>
                            </td>
                        </tr>
                        <tr>
                            <td>邮箱验证通知：</td>
                            <td>
                                <asp:TextBox ID="emailNotice" runat="server" TextMode="MultiLine" Height="200" Width="95%"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator5" ControlToValidate="emailNotice" runat="server" ErrorMessage=" *" ForeColor="Red"></asp:RequiredFieldValidator>
                                <asp:RegularExpressionValidator runat="server" ControlToValidate="emailNotice" ErrorMessage=" *" ForeColor="red" Display="Dynamic" ValidationExpression="[^']*\[VerifyUrl\][^']*"></asp:RegularExpressionValidator>
                                <br />
                                <span class="gray">当密码找回方式选择邮箱，那么系统会根据此格式发送信息。<br />
                                    [UserName]代表账号，[DisplayName]代表姓名，[AddDate]代表当前时间，[VerifyUrl]代表验证地址，发送内容必须包含[VerifyUrl]</span>
                            </td>
                        </tr>
                    </asp:PlaceHolder>
                </table>
            </div>
        </div>

        <hr />
        <table class="table noborder">
            <tr>
                <td class="center">
                    <asp:Button class="btn btn-primary" ID="Submit" Text="确 定" OnClick="Submit_OnClick" runat="server" />
                </td>
            </tr>
        </table>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
