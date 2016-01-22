<%@ Page Language="C#" Inherits="SiteServer.CMS.BackgroundPages.Modal.AdvImageClassifySelect" Trace="false" %>

<%@ Register TagPrefix="bairong" Namespace="BaiRong.Controls" Assembly="BaiRong.Controls" %>

<%@ Register TagPrefix="site" Namespace="SiteServer.CMS.Controls" Assembly="SiteServer.CMS" %>
<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <!--#include file="../inc/header.aspx"-->
    <script>
        $(function(){
            $("input[name='rpItemID']").change(function(){
                var itemID = $(this).val();
                var itemName =  $(this).attr("text");
                var isFirst = $(this).attr("isFirst");
                if(isFirst=="true"){
                    $("#spClassify1").html(itemName);
                }
                else
                {
                    $("#spClassify2").html(itemName);
                }
                $("#<%=hidSpClassifyID.ClientID%>").val(itemID);
            });
        });
    </script>
</head>

<body>
    <!--#include file="../inc/openWindow.html"-->
    <form class="form-inline" enctype="multipart/form-data" method="post" runat="server">
        <asp:Button ID="btnSubmit" UseSubmitBehavior="false" OnClick="Submit_OnClick" runat="server" Style="display: none" />
        <bairong:Alerts runat="server"></bairong:Alerts>

        <div class="well well-small">
            <div id="contentSearch" style="margin-top: 10px;">
                关键字：
                <asp:TextBox ID="tbKeyword" runat="server"></asp:TextBox>
                <asp:Button OnClick="Search_OnClick" runat="server" class="btn" Text="搜 索" />
            </div>

        </div>
        <div>
            选择分类：
                一级：
                <span id="spClassify1" style="color:red;"><%=this.hidSpClassifyName %></span>
            二级：
                <span id="spClassify2" style="color:red;"></span>
            <asp:HiddenField ID="hidSpClassifyID" runat="server" />
        </div>
        <div class="popover popover-static">
            <table class="table table-noborder table-hover">
                <asp:Repeater runat="server" ID="rpClassify" OnItemDataBound="rpClassify_ItemDataBound">
                    <ItemTemplate>
                        <tr>
                            <td>
                                <asp:Literal ID="ltlRadio" runat="server" />
                            </td>
                        </tr>
                    </ItemTemplate>
                </asp:Repeater>
            </table>
        </div>
        <script type="text/javascript" language="javascript">
            <asp:Literal id="ltlScript" runat="server"></asp:Literal>
        </script>

    </form>
</body>
</html>
<!-- check for 3.6 html permissions -->
