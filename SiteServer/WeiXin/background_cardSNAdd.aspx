<%@ Page Language="C#" Inherits="SiteServer.WeiXin.BackgroundPages.BackgroundCardSNAdd" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>
<%--<%@ Register TagPrefix="user" Namespace="UserCenter.Controls" Assembly="UserCenter.Pages" %>--%>
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

  <style type="text/css">
  .city {
   width:94px;
    
  }
  div.step {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  }

  span.activate_title {
  line-height: 34px;
  font-size: 16px;
  color: #333;
  }

  p.activate_desc {
  width: 100%;
  margin-left: 32px;
  font-size: 13px;
  font-weight: bold;
  }

  div.step_one, div.step_two, div.step_three {
    display: inline-block;
    margin-left: 30px;
    width: 280px;
    height: 190px;
    background: transparent url("images/weixin-activate.png") no-repeat;
  }
  div.step_two, div.step_three {
    margin-top: 20px;
  }
  div.step_one {
    background-position: -40px -48px;
  }
  div.step_two {
    background-position: -395px -48px;
  }
  div.step_three {
    background-position: -760px -48px;
  }
  </style>

  <bairong:Code type="ajaxupload" runat="server" />
  <script type="text/javascript" src="../../sitefiles/bairong/scripts/swfUpload/swfupload.js"></script>
  <script type="text/javascript" src="../../sitefiles/bairong/scripts/swfUpload/handlers.js"></script>
  
  <div class="popover popover-static operation-area">
    <h3 class="popover-title">
      <asp:Literal id="ltlPageTitle" runat="server" />
    </h3>
    <div class="popover-content">
      <div class="container-fluid" id="weixinactivate">
      <div class="row-fluid">
          <div class="span6">
            <div class="step"></div>
            <table class="table noborder table-hover">
              <tr>
                <td width="120">选择用户：</td>
                <td>
                   <asp:TextBox Width="360" Rows="4" TextMode="MultiLine" ID="tbUserNameList" runat="server" />
                    <asp:RequiredFieldValidator ControlToValidate="tbUserNameList" ErrorMessage=" *" ForeColor="red" Display="Dynamic" runat="server" />
                    <asp:Literal ID="ltlSelectUser" runat="server" />
                    <br>
                    <span class="gray">（要添加会员卡的用户名列表，多个用户以“,”分割）</span>
                </td>
              </tr>
             
            </table>
          </div>
     </div>
 
     </div>
       
      <table class="table table-noborder">
        <tr>
          <td class="center">
            <asp:Button class="btn btn-primary" id="btnSubmit" text="确 定" OnClick="Submit_OnClick" runat="server"/>
            <asp:Button class="btn" id="btnReturn" text="返 回" runat="server"/>
          </td>
        </tr>
      </table>
  
    </div>
  </div>

</form>
</body>
</html>
<!-- check for 3.6 html permissions -->