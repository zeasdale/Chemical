var eOrderItemReturnType;
(function (eOrderItemReturnType) {
    eOrderItemReturnType[eOrderItemReturnType["Return"] = 0] = "Return";
    eOrderItemReturnType[eOrderItemReturnType["Exchange"] = 1] = "Exchange";
    eOrderItemReturnType[eOrderItemReturnType["Repair"] = 2] = "Repair"; // 维修
})(eOrderItemReturnType || (eOrderItemReturnType = {}));
var eOrderItemReturnTypeUtils = (function () {
    function eOrderItemReturnTypeUtils() {
    }
    eOrderItemReturnTypeUtils.getValue = function (type) {
        if (type === 0 /* Return */) {
            return "Return";
        }
        else if (type === 1 /* Exchange */) {
            return "Exchange";
        }
        else if (type === 2 /* Repair */) {
            return "Exchange";
        }
        return StringUtils.empty;
    };
    eOrderItemReturnTypeUtils.getText = function (type) {
        if (type === 0 /* Return */) {
            return "退货";
        }
        else if (type === 1 /* Exchange */) {
            return "换货";
        }
        else if (type === 2 /* Repair */) {
            return "维修";
        }
        return StringUtils.empty;
    };
    eOrderItemReturnTypeUtils.getEnum = function (type) {
        if (eOrderItemReturnTypeUtils.equals(type, 0 /* Return */)) {
            return 0 /* Return */;
        }
        else if (eOrderItemReturnTypeUtils.equals(type, 1 /* Exchange */)) {
            return 1 /* Exchange */;
        }
        else if (eOrderItemReturnTypeUtils.equals(type, 2 /* Repair */)) {
            return 2 /* Repair */;
        }
        return 0 /* Return */;
    };
    eOrderItemReturnTypeUtils.equals = function (typeStr, type) {
        if (typeStr === eOrderItemReturnTypeUtils.getValue(type)) {
            return true;
        }
        else
            return false;
    };
    eOrderItemReturnTypeUtils.getAllItem = function () {
        var m = new Map();
        m.set(eOrderItemReturnTypeUtils.getValue(0 /* Return */), eOrderItemReturnTypeUtils.getText(0 /* Return */));
        return m;
    };
    eOrderItemReturnTypeUtils.addItemsToEle = function (ele, childEleStr, childEleClass, otherAttrs) {
        if (ele !== null) {
            if (childEleStr === "")
                childEleStr = "option";
            var items = eOrderItemReturnTypeUtils.getAllItem();
            items.forEach(function (val, key, map) {
                var childEle;
                if (childEleStr === "option") {
                    childEle = document.createElement(childEleStr);
                    childEle.setAttribute("value", key);
                    childEle.innerHTML = val;
                    ele.appendChild(childEle);
                }
                else if (childEleStr === "radio") {
                    childEle = document.createElement("input");
                    childEle.setAttribute("type", "radio");
                    childEle.setAttribute("value", key);
                    var labelEle = document.createElement("label");
                    labelEle.innerHTML = val;
                    ele.appendChild(labelEle);
                    ele.insertBefore(childEle, labelEle);
                }
                else if (childEleStr === "checkbox") {
                    childEle = document.createElement("input");
                    childEle.setAttribute("type", "checkbox");
                    childEle.setAttribute("value", key);
                    var labelEle = document.createElement("label");
                    labelEle.innerHTML = val;
                    ele.appendChild(labelEle);
                    ele.insertBefore(childEle, labelEle);
                }
                if (childEleClass) {
                    childEle.className = childEleClass;
                }
                if (otherAttrs) {
                    otherAttrs.forEach(function (val, key, map) {
                        childEle.setAttribute(key, val);
                    });
                }
            });
        }
    };
    return eOrderItemReturnTypeUtils;
})();
/// <reference path="../../defs/jquery.d.ts" />
/// <reference path="../../defs/jquery.cookie.d.ts" />
/// <reference path="../../defs/jquery.fileupload.d.ts" />
/// <reference path="../../defs/tmodjs.d.ts" />
var Utils = (function () {
    function Utils() {
    }
    Utils.isAnonymous = function () {
        return $.cookie("SITESERVER.LOGIN") != "YES";
    };
    Utils.setLoginStatus = function (value) {
        if (value) {
            $.cookie("SITESERVER.LOGIN", "YES", { expires: 7, path: '/', secure: false });
        }
        else {
            $.cookie("SITESERVER.LOGIN", "", { expires: 7, path: '/', secure: false });
        }
    };
    Utils.fileUpload = function (elementID, uploadUrl, success, progress, submit, callback) {
        $('#' + elementID).attr('data-url', uploadUrl);
        $('#' + elementID).fileupload({
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 5000000,
            xhrFields: { withCredentials: true },
            type: 'POST',
            add: function (e, data) {
                data.submit().done(success);
            },
            progress: function (e, data) {
                if (progress)
                    progress(data);
            },
            submit: function (e, data) {
                if (submit)
                    return submit(data);
            }
        });
    };
    Utils.commonUpload = function (elementID, uploadUrl, success) {
        if ($("#" + elementID) && $("#_filePosition"))
            $("#_filePosition").insertAfter($("#" + elementID).css("display:none;"));
        if ($("#_commonFileForm"))
            $("#_commonFileForm").remove();
        if ($("#" + elementID))
            $("#" + elementID).css("display:inline;");
        if ($("#_filePosition"))
            $("#_filePosition").remove();
        var formHtml = "<form method='post' style='display:none;' enctype='multipart/form-data' id='_commonFileForm' target='_commonFileTarget'></form>";
        var targetPannel = "<iframe id='_commonFileTarget' style='display:none;'></iframe>";
        $("#" + elementID).insertBefore($("<div id='_filePosition' style='display:none;'></div>")); //元素定位
        $("#" + elementID).wrap($(formHtml)); //文件表单
        $("#_filePosition").append($(targetPannel)); //上传之后返回信息放置地方
        $("#_commonFileForm").attr("action", uploadUrl);
        $("#_commonFileForm").submit();
    };
    Utils.getDate = function (d) {
        return d.substr(0, d.indexOf('T'));
    };
    Utils.getDateTime = function (d) {
        return d.substr(0, d.indexOf('T')) + ' ' + d.substr(d.indexOf('T') + 1);
    };
    Utils.random = function () {
        return Math.floor(1000 * Math.random());
    };
    Utils.isEmail = function (str) {
        return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str);
    };
    Utils.isMobile = function (str) {
        return /^0{0,1}1[0-9]{10}$/.test(str);
    };
    Utils.ajaxGet = function (parameters, url, done) {
        $.ajax({
            url: url,
            type: 'GET',
            data: parameters,
            dataType: 'jsonp',
            xhrFields: { withCredentials: true },
            crossDomain: true
        }).done(function (data) {
            done(data);
        }).fail(function (e) {
            alert(JSON.stringify(e));
        });
    };
    Utils.ajaxGetSync = function (parameters, url, done) {
        $.ajax({
            url: url,
            async: false,
            type: 'GET',
            data: parameters,
            dataType: 'jsonp'
        }).done(function (data) {
            done(data);
        }).fail(function (e) {
            alert(JSON.stringify(e));
        });
    };
    Utils.ajaxPost = function (parameters, url, done) {
        $.ajax({
            url: url,
            type: 'POST',
            data: parameters,
            dataType: 'json',
            xhrFields: { withCredentials: true },
            crossDomain: true
        }).done(function (data) {
            done(data);
        }).fail(function (e) {
            console.log(JSON.stringify(e));
            alert(JSON.stringify(e));
        });
    };
    Utils.toJSON = function (data) {
        return $.parseJSON(JSON.stringify(data));
    };
    Utils.detectIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        // other browser
        return 0;
    };
    Utils.setDisplay = function (tipsID) {
        $("#" + tipsID).removeClass("nerror");
        $("#" + tipsID + " img.tipImg").hide();
        $("#" + tipsID + " .nmf_st1").hide();
    };
    /******
     * 信息弹窗提示
     * @param msg         <> 提示信息
     * @param success     <> 成功OR失败
     * @param autoDisplay <> 是否自动隐藏
     * @param interval    <> 自动隐藏时间
     *
     ******/
    Utils.tipAlert = function (success, msg, autoDisplay, interval, url) {
        if (autoDisplay == undefined)
            autoDisplay = true;
        if (!interval)
            interval = 1500;
        //容器
        var tipHtml = '';
        if (success)
            tipHtml += '<div id="tipPannel" class="mLayOk" style="color:#187abc;font-family:Microsoft Yahei">'; //成功
        else
            tipHtml += '<div id="tipPannel" class="mLayOk" style="color:#e42222;font-family:Microsoft Yahei">'; //失败
        tipHtml += '<span class="mLayOk_s1" >';
        if (success)
            tipHtml += '<span style="top:0px;"><image style="margin:10px;" src="' + HomeUrlUtils.homeUrl + '/images/success.png"/>' + msg + '</span>';
        else
            tipHtml += '<span style="top:0px;"><image style="margin:10px;" src="' + HomeUrlUtils.homeUrl + '/images/error.png"/>' + msg + '</span>';
        tipHtml += '</span >';
        tipHtml += '</div>';
        $(document.body).append($(tipHtml));
        //if (!autoDisplay) {
        //手动关闭
        $("#tipPannel").click(function () {
            Utils.closeTip("tipPannel");
        });
        //}
        var toID;
        if (autoDisplay) {
            toID = autoCloseTip(interval);
        }
        $("#tipPannel").mouseover(function () {
            if (toID)
                clearTimeout(toID);
        }).mouseout(function () {
            autoCloseTip(interval);
        });
        function autoCloseTip(interval) {
            var toID = setTimeout(function () {
                Utils.closeTip("tipPannel");
                if (url) {
                    location.href = url;
                }
            }, interval);
            return toID;
        }
    };
    /******
     * 信息显示，用于表单验证
     * @param dom         <> 验证表单（表单需要id）
     * @param msg         <> 提示信息
     * @param success     <> 成功OR失败
     * @param autoDisplay <> 是否自动隐藏
     * @param interval    <> 自动隐藏时间
     *
     ******/
    Utils.tipShow = function (dom, success, msg, autoDisplay, interval) {
        $("#tipPannel_" + dom.attr("name")).remove();
        if (success == undefined)
            success = true;
        if (autoDisplay == undefined)
            autoDisplay = false;
        if (!interval)
            interval = 3000;
        //容器
        var tipHtml = '<div class="nmf_aler" id="tipPannel_' + dom.attr("id") + '">';
        if (success)
            tipHtml += '<img class="tipImg" src="' + HomeUrlUtils.homeUrl + '/images/nico3.png">'; //成功
        else {
            tipHtml += '<img class="tipImg" src="' + HomeUrlUtils.homeUrl + '/images/nico2.png">'; //失败
            tipHtml += '<div class="nmf_st1">' + msg + '</div>';
        }
        tipHtml += '</div>';
        $(tipHtml).insertAfter(dom);
        if (autoDisplay) {
            autoCloseTip(interval);
        }
        function autoCloseTip(interval) {
            setTimeout(function () {
                Utils.closeTip("tipPannel");
            }, interval);
        }
    };
    Utils.closeTip = function (id) {
        $("#" + id).hide();
        $("#" + id).remove();
    };
    Utils.isPC = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = "true";
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = "false";
                break;
            }
        }
        return flag;
    };
    Utils.urlToMap = function (url) {
        url = decodeURIComponent(url);
        var objResult = {};
        $.each(url.split('&'), function (i, item) {
            var prm = item.split('=');
            if (prm[0] && prm[1]) {
                objResult[prm[0]] = prm[1];
            }
        });
        return objResult;
    };
    Utils.mapToUrl = function (map) {
        return $.param(map);
    };
    Utils.clone = function (obj) {
        return $.extend(true, {}, obj);
    };
    /******
    * 时间格式
    * @param time         <> 时间字符串
    * @param format       <> 时间格式
    *
    ******/
    Utils.formatTime = function (time, fmt) {
        var S = '';
        if (time.indexOf("-") >= 0)
            time = time.replace(/-/g, "/");
        if (time.indexOf(".") > 0) {
            time = time.substring(0, time.indexOf("."));
            S = time.substring(time.indexOf(".") + 1);
        }
        var datetime = eval("(new Date('" + time + "'))");
        var o = {
            "M+": datetime.getMonth() + 1,
            "d+": datetime.getDate(),
            "h+": datetime.getHours() % 12 == 0 ? 12 : datetime.getHours() % 12,
            "H+": datetime.getHours(),
            "m+": datetime.getMinutes(),
            "s+": datetime.getSeconds(),
            "q+": Math.floor((datetime.getMonth() + 3) / 3),
            "S": S //毫秒         
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[datetime.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    return Utils;
})();
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.format = function (oldStr) {
        var t = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            t[_i - 1] = arguments[_i];
        }
        return oldStr.replace(/\{(\d+)\}/g, function (index, args) {
            return t[args[0]] || index;
        });
    };
    StringUtils.formatIngnoreFalse = function (oldStr) {
        var t = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            t[_i - 1] = arguments[_i];
        }
        return oldStr.replace(/\{(\d+)\}/g, function (index, args) {
            return t[args[0]];
        });
    };
    /**
     * base64编码
     * @param {Object} str
     */
    StringUtils.base64encode = function (str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += StringUtils.base64EncodeChars.charAt(c1 >> 2);
                out += StringUtils.base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += StringUtils.base64EncodeChars.charAt(c1 >> 2);
                out += StringUtils.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += StringUtils.base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += StringUtils.base64EncodeChars.charAt(c1 >> 2);
            out += StringUtils.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += StringUtils.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += StringUtils.base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    };
    /**
     * base64解码
     * @param {Object} str
     */
    StringUtils.base64decode = function (str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            do {
                c1 = StringUtils.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;
            do {
                c2 = StringUtils.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = StringUtils.base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = StringUtils.base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    };
    /**
     * utf16转utf8
     * @param {Object} str
     */
    StringUtils.utf16to8 = function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            }
            else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    };
    /**
     * utf8转utf16
     * @param {Object} str
     */
    StringUtils.utf8to16 = function (str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12:
                case 13:
                    // 110x xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx10xx xxxx10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    };
    StringUtils.Text = {
        "register": {
            "tip_empty_user_name": "请填写用户名",
            "tip_empty_password": "请填写密码",
            "tip_empty_confimpassword": "请确认密码",
            "tip_empty_samepassword": "请确认2次输入密码一致",
            "tip_success_register": "恭喜，用户注册成功"
        },
        "userInfo": {
            "tip_empty_user_name": "用户名不能为空",
            "tip_change_user_name": "用户名不能被修改",
            "tip_no_format_email": "邮箱格式不正确",
            "tip_no_format_phone": "手机格式不正确",
            "tip_great_0_height": "身高必须大于0"
        }
    };
    StringUtils.ThirdLoginType = {
        "Weibo": "Weibo",
        "QQ": "QQ",
        "WeixinPC": "WeixinPC",
        "WeixinMob": "WeixinMob"
    };
    StringUtils.empty = "";
    StringUtils.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    StringUtils.base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    return StringUtils;
})();
/// <reference path="../../defs/jquery.d.ts" />
var UrlUtils = (function () {
    function UrlUtils() {
    }
    UrlUtils.getAPI = function (controllerName, action, id) {
        if (id) {
            return UrlUtils.apiUrl + controllerName + '/' + action + '/' + id;
        }
        return UrlUtils.apiUrl + controllerName + '/' + action;
    };
    UrlUtils.getAbsoluteUrl = function (url) {
        return "http://" + window.location.hostname.toLowerCase() + "/" + url.replace(/(^\/*)|(\/*$)/g, "");
    };
    UrlUtils.getReturnUrl = function (defaultUrl) {
        var reg = new RegExp("(^|&)" + "returnUrl" + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return defaultUrl || "/index.html";
        }
    };
    UrlUtils.getViewUrl = function (sessionType, sn) {
        return "/app/static/" + sessionType + ".html?sn=" + sn;
    };
    UrlUtils.getUrlVar = function (key) {
        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        return result && decodeURIComponent(result[1]) || "";
    };
    UrlUtils.getSessionType = function () {
        return UrlUtils.getUrlVar('sessionType');
    };
    UrlUtils.getSN = function () {
        return UrlUtils.getUrlVar('sn');
    };
    UrlUtils.isSN = function () {
        if (UrlUtils.getSN()) {
            return true;
        }
        return false;
    };
    UrlUtils.getToken = function () {
        return UrlUtils.getUrlVar('token');
    };
    UrlUtils.isToken = function () {
        if (UrlUtils.getToken()) {
            return true;
        }
        return false;
    };
    UrlUtils.redirectToReturnUrl = function (defaultUrl) {
        location.href = UrlUtils.getReturnUrl(defaultUrl);
    };
    UrlUtils.redirect = function (url) {
        location.href = url;
    };
    UrlUtils.redirectToIndex = function () {
        UrlUtils.redirect('/index.html');
    };
    UrlUtils.redirectToLogin = function (returnUrl) {
        returnUrl = returnUrl || window.location.href;
        UrlUtils.redirect('/login.html?returnUrl=' + returnUrl);
    };
    UrlUtils.getThirdLoginUrl = function (loginType, returnUrl, userID) {
        if (userID) {
            return 'http://gx.com/home/authLogin.html?isStart=true&loginType=' + loginType + "&userID=" + userID + '&returnUrl=' + returnUrl;
        }
        else {
            return 'http://gx.com/home/authLogin.html?isStart=true&loginType=' + loginType + '&returnUrl=' + returnUrl;
        }
    };
    UrlUtils.reload = function () {
        location.reload(true);
    };
    UrlUtils.apiUrl = eval("($pageInfo.apiUrl)") + "/";;// + "/api/";
    return UrlUtils;
})();
/// <reference path="../../defs/jquery.d.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../utils/stringUtils.ts" />
/// <reference path="../utils/urlUtils.ts" />
var ConsultationService = (function () {
    function ConsultationService() {
    }
    ConsultationService.prototype.getUrl = function (action, id) {
        return UrlUtils.getAPI('consultation', action, id);
    };
    ConsultationService.prototype.getAllConsultationList = function (keywords, pageIndex, prePageNum, done) {
        Utils.ajaxGet({ keywords: keywords, pageIndex: pageIndex, prePageNum: prePageNum }, this.getUrl('GetAllConsultationList'), done);
    };
    ConsultationService.prototype.deleteConsultation = function (consultationID) {
        var parms = { id: consultationID };
        Utils.ajaxGet(parms, this.getUrl("DeleteConsultation"), function () {
            Utils.tipAlert(true, "操作成功");
        });
    };
    ConsultationService.prototype.SaveConsultation = function (type, question, publishmentSystemID, channelID, contentID) {
        var parms = { type: type, question: question, publishmentSystemID: publishmentSystemID, channelID: channelID, contentID: contentID };
        Utils.ajaxGet(parms, this.getUrl("SaveConsultation"), function () {
            Utils.tipAlert(true, "操作成功");
        });
    };
    return ConsultationService;
})();
/// <reference path="../../defs/jquery.d.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../utils/stringUtils.ts" />
/// <reference path="../utils/urlUtils.ts" />
var OrderItemReturnService = (function () {
    function OrderItemReturnService() {
    }
    OrderItemReturnService.prototype.getUrl = function (action, id) {
        return UrlUtils.getAPI('orderItemReturn', action, id);
    };
    OrderItemReturnService.prototype.deleteOrderItemReturn = function (orderItemReturnID) {
        var parms = { id: orderItemReturnID };
        Utils.ajaxGet(parms, this.getUrl("DeleteOrderItemReturn"), function (json) {
            if (json.isSuccess)
                Utils.tipAlert(true, "操作成功");
            else
                Utils.tipAlert(false, json.errorMessage);
        });
    };
    OrderItemReturnService.prototype.saveOrderItemReturn = function (orderItemID, publishmentSystemID, returnType, returnCount, inspectReport, description, images, contact, contactPhone) {
        var parms = { orderItemID: orderItemID, publishmentSystemID: publishmentSystemID, returnType: returnType, returnCount: returnCount, inspectReport: inspectReport, description: description, imageUrl: images, contact: contact, contactPhone: contactPhone };
        Utils.ajaxGet(parms, this.getUrl("SaveOrderItemReturn"), function (json) {
            if (json.isSuccess)
                Utils.tipAlert(true, "操作成功");
            else
                Utils.tipAlert(false, json.errorMessage);
        });
    };
    OrderItemReturnService.prototype.getUploadImgUrl = function (action, orderItemID, publishmentSystemID) {
        return this.getUrl(action) + "?orderItemID=" + orderItemID.toString() + "&publishmentSystemID=" + publishmentSystemID.toString();
    };
    OrderItemReturnService.prototype.getOrderItemReturnRecordList = function (isPC, orderTime, keywords, pageIndex, prePageNum, done) {
        Utils.ajaxGet({ isPC: isPC, orderTime: orderTime, keywords: keywords, pageIndex: pageIndex, prePageNum: prePageNum }, this.getUrl('getOrderItemReturnRecordList'), done);
    };
    return OrderItemReturnService;
})();
/// <reference path="../../defs/jquery.d.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../utils/stringUtils.ts" />
/// <reference path="../utils/urlUtils.ts" />
var OrderService = (function () {
    function OrderService() {
    }
    OrderService.prototype.getUrl = function (action, id) {
        return UrlUtils.getAPI('order', action, id);
    };
    OrderService.prototype.getOrderList = function (pageIndex, prePageNum, done) {
        Utils.ajaxGet({ pageIndex: pageIndex, prePageNum: prePageNum }, this.getUrl('GetOrderList'), done);
    };
    OrderService.prototype.getAllOrderList = function (isCompleted, isPayment, isPC, orderTime, keywords, pageIndex, prePageNum, done) {
        Utils.ajaxGet({ isCompleted: isCompleted, isPayment: isPayment, isPC: isPC, orderTime: orderTime, keywords: keywords, pageIndex: pageIndex, prePageNum: prePageNum }, this.getUrl('GetAllOrderList'), done);
    };
    OrderService.prototype.deleteOrder = function (orderID) {
        var parms = { id: orderID };
        Utils.ajaxGet(parms, this.getUrl("DeleteOrder"), function (data) {
            if (data.isSuccess)
                Utils.tipAlert(true, "操作成功");
            else
                Utils.tipAlert(true, "操作失败");
        });
    };
    OrderService.prototype.getOrderItemList = function (orderID, publishmentSystemID, done) {
        var parms = { orderID: orderID, publishmentSystemID: publishmentSystemID };
        Utils.ajaxGet(parms, this.getUrl("GetOrderItemList"), done);
    };
    OrderService.prototype.getAllOrderItemList = function (pageIndex, prePageNum, done) {
        var parms = { pageIndex: pageIndex, prePageNum: prePageNum };
        Utils.ajaxGet(parms, this.getUrl("GetAllOrderItemList"), done);
    };
    OrderService.prototype.saveOrderItemComment = function (orderID, orderItemID, publishmentSystemID, star, tags, comment, isAnonymous, imageUrl) {
        var parms = { orderID: orderID, orderItemID: orderItemID, publishmentSystemID: publishmentSystemID, star: star, tags: tags, comment: comment, isAnonymous: isAnonymous, imageUrl: imageUrl };
        Utils.ajaxGet(parms, this.getUrl("SaveOrderItemComment"), function (json) {
            if (json.isSuccess)
                Utils.tipAlert(true, "操作成功");
            else
                Utils.tipAlert(false, "操作失败");
        });
    };
    OrderService.prototype.getLatestOrderInAll = function (isPC, done) {
        Utils.ajaxGet({ isPC: isPC }, this.getUrl('GetLatestOrderInAll'), done);
    };
    OrderService.prototype.getOrderStatistic = function (done) {
        Utils.ajaxGet({}, this.getUrl('GetOrderStatistic'), done);
    };
    OrderService.prototype.getOrderItem = function (orderItemID, publishmentSystemID, done) {
        var parms = { orderItemID: orderItemID, publishmentSystemID: publishmentSystemID };
        Utils.ajaxGet(parms, this.getUrl("GetOrderItem"), done);
    };
    OrderService.prototype.getAllOrderListWithSiteInfo = function (isCompleted, isPayment, isPC, orderTime, keywords, pageIndex, prePageNum, done) {
        Utils.ajaxGet({ isCompleted: isCompleted, isPayment: isPayment, isPC: isPC, orderTime: orderTime, keywords: keywords, pageIndex: pageIndex, prePageNum: prePageNum }, this.getUrl('GetAllOrderListWithQiao'), done);
    };
    //晒单图片
    OrderService.prototype.getUploadImgUrl = function (action, orderItemID, publishmentSystemID) {
        return this.getUrl(action) + "?orderItemID=" + orderItemID.toString() + "&publishmentSystemID=" + publishmentSystemID.toString();
    };
    //获取第一个B2C站点信息
    OrderService.prototype.getFirstB2CPageInfo = function (done, pID) {
        Utils.ajaxGetSync({ publishmentSystemID: pID }, UrlUtils.getAPI('b2c', "GetFirstB2CPageInfo"), done);
    };
    return OrderService;
})();
/// <reference path="../../defs/jquery.d.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../utils/stringUtils.ts" />
/// <reference path="../utils/urlUtils.ts" />
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.getUrl = function (action, id) {
        return UrlUtils.getAPI('user', action, id);
    };
    UserService.prototype.getOrderUrl = function (action, id) {
        return UrlUtils.getAPI('order', action, id);
    };
    UserService.prototype.getB2CUrl = function (action, id) {
        return UrlUtils.getAPI('b2c', action, id);
    };
    UserService.prototype.getFollowUrl = function (action, id) {
        return UrlUtils.getAPI('follow', action, id);
    };
    UserService.prototype.getHomeUrl = function (done) {
        Utils.ajaxGet({}, this.getUrl('GetHomeUrl'), done);
    };
    UserService.prototype.getUser = function (done) {
        Utils.ajaxGet({}, this.getUrl('GetUser'), done);
    };
    //getUserSync(done: (data) => void): void {
    //    Utils.ajaxGetSync({}, this.getUrl('GetUser'), done);
    //}
    UserService.prototype.IsPersistent = function (done) {
        Utils.ajaxGet({}, this.getUrl('IsPersistent'), done);
    };
    UserService.prototype.register = function (userName, email, password, validCode, returnUrl, done) {
        var parameters = { loginName: userName, password: password, email: email, mobile: "", validCode: validCode, returnUrl: returnUrl };
        Utils.ajaxGet(parameters, this.getUrl('RegisterWithValidCode'), done);
    };
    UserService.prototype.login = function (userName, password, isPersistent, useBase64, done) {
        var parameters = { loginName: userName, password: password, isPersistent: isPersistent, useBase64: useBase64 };
        Utils.ajaxGet(parameters, this.getUrl('Login'), done);
    };
    UserService.prototype.logout = function (done) {
        Utils.ajaxGet({}, this.getUrl('Logout'), function (data) {
            Utils.setLoginStatus(false);
            done(data);
        });
    };
    UserService.prototype.updateDetailUserInfo = function (bloodType, height, maritalStatus, education, graduateInstitutions, provinceValue, address, QQ, WeiBo, WeiXin, gender, organization, department, position, interects, graduation, done) {
        var parameters = {
            bloodType: bloodType,
            height: height,
            maritalStatus: maritalStatus,
            education: education,
            graduateInstitutions: graduateInstitutions,
            provinceValue: provinceValue,
            address: address,
            QQ: QQ,
            WeiBo: WeiBo,
            WeiXin: WeiXin,
            gender: gender,
            organization: organization,
            department: department,
            position: position,
            interects: interects,
            graduation: graduation
        };
        Utils.ajaxGet(parameters, this.getUrl('UpdateDetailUserInfo'), done);
    };
    UserService.prototype.updateAutoDetailUserInfo = function (form, done) {
        var parameters = {
            form: form
        };
        Utils.ajaxPost(parameters, this.getUrl('updateAutoDetailUserInfo'), done);
    };
    UserService.prototype.updateBasicUserInfo = function (userName, signature, done) {
        var parameters = { userName: userName, signature: signature };
        Utils.ajaxGet(parameters, this.getUrl('UpdateBasicUserInfo'), done);
    };
    UserService.prototype.changePassword = function (currentPassword, newPassword, done) {
        var parameters = { currentPassword: currentPassword, newPassword: newPassword };
        Utils.ajaxGet(parameters, this.getUrl('ChangePassword'), done);
    };
    UserService.prototype.getUploadImgUrl = function (action) {
        return this.getUrl(action);
    };
    UserService.prototype.getUserMessage = function (type, pageIndex, prePageNum, done) {
        var parameters = { type: type, pageIndex: pageIndex, prePageNum: prePageNum };
        Utils.ajaxGet(parameters, this.getUrl('GetUserMessage'), done);
    };
    UserService.prototype.getUserAllMessage = function (type, pageIndex, prePageNum, done) {
        var parameters = { type: type, pageIndex: pageIndex, prePageNum: prePageNum };
        Utils.ajaxGet(parameters, this.getUrl('GetUserAllMessage'), done);
    };
    UserService.prototype.getUserMessageDetail = function (messageID, done) {
        var parameters = { messageID: messageID };
        Utils.ajaxGet(parameters, this.getUrl('GetUserMessageDetail'), done);
    };
    UserService.prototype.deleteUserMessage = function (messageID, done) {
        var parameters = { messageID: messageID };
        Utils.ajaxGet(parameters, this.getUrl('DeleteUserMessage'), done);
    };
    UserService.prototype.getSiteMessage = function (pageIndex, prePageNum, done) {
        var parameters = { pageIndex: pageIndex, prePageNum: prePageNum };
        Utils.ajaxGet(parameters, this.getUrl('GetSiteMessage'), done);
    };
    UserService.prototype.sendMessage = function (userName, title, msg, done, parentID) {
        var parameters = { userName: userName, title: title, msg: msg, parentID: parentID };
        Utils.ajaxGet(parameters, this.getUrl('SendMessage'), done);
    };
    UserService.prototype.getUserLoginLog = function (pageIndex, prePageNum, done) {
        Utils.ajaxGet({ pageIndex: pageIndex, prePageNum: prePageNum }, this.getUrl('GetUserLoginLog'), done);
    };
    UserService.prototype.getSecurityQuestionList = function (done, userName) {
        Utils.ajaxGet({ userName: userName }, this.getUrl('GetSecurityQuestionList'), done);
    };
    UserService.prototype.updateSecurityQuestion = function (que1, que2, que3, anw1, anw2, anw3, done) {
        var parameters = { que1: que1, que2: que2, que3: que3, anw1: anw1, anw2: anw2, anw3: anw3 };
        Utils.ajaxGet(parameters, this.getUrl('UpdateSecurityQuestion'), done);
    };
    UserService.prototype.validateSecurityQuestion = function (que, anw, done) {
        var parameters = { que: que, anw: anw };
        Utils.ajaxGet(parameters, this.getUrl('ValidateSecurityQuestion'), done);
    };
    UserService.prototype.getUserSecurityQuestionAnwser = function (done) {
        Utils.ajaxGet({}, this.getUrl('GetUserSecurityQuestionAnwser'), done);
    };
    UserService.prototype.bindEmail = function (email, done) {
        var parameters = { email: email };
        Utils.ajaxPost(parameters, this.getUrl('BindEmail'), done);
    };
    UserService.prototype.bindEmailValidate = function (email, validateCode, done) {
        var parameters = { email: email, validateCode: validateCode };
        Utils.ajaxPost(parameters, this.getUrl('BindEmailValidate'), done);
    };
    UserService.prototype.findPasswordByEmailStep1 = function (userName, done, validateCode) {
        var parameters = { userName: userName, groupSN: "", validateCode: validateCode };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordByEmailStep1'), done);
    };
    UserService.prototype.findPasswordByEmailStep2 = function (userName, email, key, done) {
        var parameters = { userName: userName, groupSN: "", email: email, key: key };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordByEmailStep2'), done);
    };
    UserService.prototype.findPasswordByEmailStep3 = function (userName, validateCode, email, key, done) {
        var parameters = { userName: userName, groupSN: "", validateCode: validateCode, email: email, key: key };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordByEmailStep3'), done);
    };
    UserService.prototype.findPasswordByPhoneStep1 = function (userName, done, validateCode) {
        var parameters = { userName: userName, groupSN: "", validateCode: validateCode };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordByPhoneStep1'), done);
    };
    UserService.prototype.findPasswordByPhoneStep2 = function (userName, phone, key, done) {
        var parameters = { userName: userName, groupSN: "", phone: phone, key: key };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordByPhoneStep2'), done);
    };
    UserService.prototype.findPasswordByPhoneStep3 = function (userName, validateCode, phone, key, done) {
        var parameters = { userName: userName, groupSN: "", validateCode: validateCode, phone: phone, key: key };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordByPhoneStep3'), done);
    };
    UserService.prototype.findPassword = function (newPassword, userName, email, type, key, done) {
        var parameters = { newPassword: newPassword, userName: userName, groupSN: "", email: email, type: type, key: key };
        Utils.ajaxPost(parameters, this.getUrl('FindPassword'), done);
    };
    UserService.prototype.findPasswordBySCQUStep1 = function (userName, done, validateCode) {
        var parameters = { userName: userName, groupSN: "", validateCode: validateCode };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordBySCQUStep1'), done);
    };
    UserService.prototype.findPasswordBySCQUStep2 = function (userName, KeyStep1, Que, Anw, done) {
        var parameters = { userName: userName, groupSN: "", KeyStep1: KeyStep1, Que: Que, Anw: Anw };
        Utils.ajaxPost(parameters, this.getUrl('FindPasswordBySCQUStep2'), done);
    };
    UserService.prototype.accountSafeLevel = function (done) {
        Utils.ajaxPost({}, this.getUrl('AccountSafeLevel'), done);
    };
    UserService.prototype.sdkLogin = function (sdkType, returnUrl, done) {
        var parameters = { sdkType: sdkType, returnUrl: returnUrl };
        Utils.ajaxGet(parameters, this.getUrl('SdkLogin'), done);
    };
    UserService.prototype.sdkBind = function (sdkType, returnUrl, done) {
        var parameters = { sdkType: sdkType, returnUrl: returnUrl };
        Utils.ajaxGet(parameters, this.getUrl('SdkBind'), done);
    };
    UserService.prototype.sdkUnBind = function (sdkType, done) {
        var parameters = { sdkType: sdkType };
        Utils.ajaxGet(parameters, this.getUrl('SdkUnBind'), done);
    };
    UserService.prototype.getThirdLoginTypeParameter = function (done) {
        var parameters = {};
        Utils.ajaxGet(parameters, this.getUrl('GetThirdLoginTypeParameter'), done);
    };
    UserService.prototype.getEnablePathList = function (done) {
        var parameters = {};
        Utils.ajaxGet(parameters, this.getUrl("getEnablePathList"), done);
    };
    UserService.prototype.getEnablePathListForMessage = function (done) {
        var parameters = {};
        Utils.ajaxGet(parameters, this.getUrl("getEnablePathListForMessage"), done);
    };
    UserService.prototype.bindPhone = function (phoneNum, done) {
        var parameters = { phoneNum: phoneNum };
        Utils.ajaxPost(parameters, this.getUrl("bindPhone"), done);
    };
    UserService.prototype.bindPhoneValidate = function (phoneNum, validateCode, done) {
        var parameters = { phoneNum: phoneNum, validateCode: validateCode };
        Utils.ajaxPost(parameters, this.getUrl("bindPhoneValidate"), done);
    };
    UserService.prototype.removeBindPhone = function (done) {
        var parameters = {};
        Utils.ajaxPost(parameters, this.getUrl("removeBindPhone"), done);
    };
    UserService.prototype.loadUserProperty = function (done) {
        var parameters = {};
        Utils.ajaxGet(parameters, this.getUrl("loadUserProperty"), done);
    };
    UserService.prototype.getUserInvoices = function (done) {
        var parameters = {};
        Utils.ajaxGet(parameters, this.getUrl('GetUserInvoices'), done);
    };
    UserService.prototype.getUserInvoicesOne = function (id, done) {
        var parameters = { id: id };
        Utils.ajaxGet(parameters, this.getUrl('getUserInvoicesOne', id), done);
    };
    UserService.prototype.updateUserInvoice = function (invoice, done) {
        Utils.ajaxGet(invoice, this.getOrderUrl('UpdateInvoice'), done);
    };
    UserService.prototype.addUserInvoice = function (invoice, done) {
        Utils.ajaxGet(invoice, this.getOrderUrl('AddInvoice'), done);
    };
    UserService.prototype.delUserInvoice = function (id, done) {
        Utils.ajaxGet({}, this.getOrderUrl('DeleteInvoice', id), done);
    };
    UserService.prototype.getUserShipmentOne = function (id, done) {
        var parameters = { id: id };
        Utils.ajaxGet(parameters, this.getUrl('getUserShipmentOne', id), done);
    };
    UserService.prototype.getUserFollows = function (pageIndex, prePageNum, done) {
        var parameters = { pageIndex: pageIndex, prePageNum: prePageNum };
        Utils.ajaxGet(parameters, this.getUrl('GetFollowList'), done);
    };
    UserService.prototype.removeUserFollows = function (ids, done) {
        var parameters = { 'ids': ids };
        Utils.ajaxGet(parameters, this.getUrl('RemoveUserFollow'), done);
    };
    UserService.prototype.addToCart = function (cart, done) {
        Utils.ajaxGet(cart, this.getB2CUrl('AddToCart'), done);
    };
    UserService.prototype.followAddToCart = function (ids, done) {
        Utils.ajaxGet({ 'ids': ids }, this.getUrl('FollowAddToCart'), done);
    };
    UserService.prototype.getUserCart = function (done) {
        Utils.ajaxGet({}, this.getUrl('GetUserCart'), done);
    };
    UserService.prototype.isUserSeller = function (done) {
        Utils.ajaxGet({}, this.getUrl('IsSeller'), done);
    };
    UserService.prototype.getUserHistory = function (pageIndex, prePageNum, done) {
        var parameters = { pageIndex: pageIndex, prePageNum: prePageNum };
        Utils.ajaxGet(parameters, this.getUrl('GetHistoryList'), done);
    };
    UserService.prototype.removeUserHistory = function (ids, done) {
        var parameters = { 'ids': ids };
        Utils.ajaxGet(parameters, this.getUrl('RemoveUserHistory'), done);
    };
    UserService.prototype.historyAddToCart = function (ids, done) {
        Utils.ajaxGet({ 'ids': ids }, this.getUrl('HistoryAddToCart'), done);
    };
    UserService.prototype.getUserAddress = function (done) {
        Utils.ajaxGet({}, this.getUrl('GetConsigneeList'), done);
    };
    UserService.prototype.getUserAddressOne = function (id, done) {
        Utils.ajaxGet({ id: id }, this.getUrl('GetConsigneeOne', id), done);
    };
    UserService.prototype.addUserAddress = function (address, done) {
        Utils.ajaxGet(address, this.getUrl('AddConsignee'), done);
    };
    UserService.prototype.updateUserAddress = function (address, done) {
        Utils.ajaxGet(address, this.getUrl('UpdateConsignee'), done);
    };
    UserService.prototype.deleteUserAddress = function (id, done) {
        Utils.ajaxGet({}, this.getUrl('DeleteConsignee', id), done);
    };
    UserService.prototype.getExtUrl = function (action, id) {
        return UrlUtils.getAPI('ext', action, id);
    };
    UserService.prototype.getUserGuesses = function (done) {
        Utils.ajaxGet({}, this.getExtUrl('GetGuesses'), done);
    };
    UserService.prototype.deleteCart = function (cartID, publishmentSystemId, done) {
        $.getJSON(UrlUtils.getAPI('b2c', 'DeleteCart', cartID) + "?publishmentSystemId=" + publishmentSystemId.toString(), null, done);
    };
    return UserService;
})();
var AccountBindController = (function () {
    function AccountBindController() {
        this.userService = new UserService();
    }
    AccountBindController.prototype.init = function () {
        $("#channelUL").children().eq(2).children().addClass("nav_cuta");
        var locationUrl = window.location.href.toLowerCase();
        if (locationUrl.indexOf("accountbind.html") != -1) {
            $("#accountInfoUrl li a").removeClass("m2menu_cuta");
            $("#accountInfoUrl").children().eq(3).children().addClass("m2menu_cuta");
        }
        this.getBasicUserInfo();
        this.getThirdBindInfo();
    };
    AccountBindController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    AccountBindController.prototype.getThirdBindInfo = function () {
        this.sdkController = new SDKController();
        this.sdkController.initBind();
    };
    return AccountBindController;
})();
var AccountSafeController = (function () {
    function AccountSafeController() {
        this.userService = new UserService();
    }
    AccountSafeController.prototype.init = function () {
        $("#channelUL").children().eq(1).children().addClass("nav_cuta");
        var locationUrl = window.location.href.toLowerCase();
        ;
        if (locationUrl.indexOf("accountsafe.html") != -1) {
            $("#accountSafeUrl li a").removeClass("m2menu_cuta");
            $("#accountSafeUrl").children().eq(3).children().addClass("m2menu_cuta");
        }
        this.getBasicUserInfo();
        this.accountSafeLevel();
    };
    AccountSafeController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    AccountSafeController.prototype.accountSafeLevel = function () {
        this.userService.accountSafeLevel(function (json) {
            if (json.isSuccess) {
                if (json.level == 1) {
                    $("#spanAccountLevel").html("低");
                    $("#spanAccountNum").attr("style", "width:30%");
                }
                if (json.level == 2) {
                    $("#spanAccountLevel").html("中");
                    $("#spanAccountNum").attr("style", "width:60%");
                }
                if (json.level == 3) {
                    $("#spanAccountLevel").html("高");
                    $("#spanAccountNum").attr("style", "width:90%");
                }
                if (json.isBindEmai) {
                    $("#bindEmail").html("修改");
                    $("#iconEmail").addClass("m2r_ico1");
                    $("#iconEmail").removeClass("m2r_ico2");
                }
                else {
                    $("#bindEmail").html("绑定");
                    $("#iconEmail").removeClass("m2r_ico1");
                    $("#iconEmail").addClass("m2r_ico2");
                }
                if (json.isBindPhone) {
                    $("#bindPhone").html("修改");
                    $("#iconPhone").addClass("m2r_ico1");
                    $("#iconPhone").removeClass("m2r_ico2");
                }
                else {
                    $("#bindPhone").html("绑定");
                    $("#iconPhone").removeClass("m2r_ico1");
                    $("#iconPhone").addClass("m2r_ico2");
                }
                if (json.isSetSQCU) {
                    $("#bindQsuc").html("修改");
                    $("#iconQscu").addClass("m2r_ico1");
                    $("#iconQscu").removeClass("m2r_ico2");
                }
                else {
                    $("#bindQsuc").html("绑定");
                    $("#iconQscu").removeClass("m2r_ico1");
                    $("#iconQscu").addClass("m2r_ico2");
                }
                if (json.pwdComplex) {
                    $("#bindpwd").html("修改");
                    $("#iconPwd").addClass("m2r_ico1");
                    $("#iconPwd").removeClass("m2r_ico2");
                }
                else {
                    $("#bindpwd").html("绑定");
                    $("#iconPwd").removeClass("m2r_ico1");
                    $("#iconPwd").addClass("m2r_ico2");
                }
            }
        });
    };
    return AccountSafeController;
})();
/**********
* 控制类基类
**********/
var baseController = (function () {
    function baseController() {
        baseController.userService = new UserService();
        baseController.getUserCart();
    }
    baseController.prototype.getUserService = function () {
        return baseController.userService;
    };
    baseController.prototype.getUser = function () {
        return baseController.user;
    };
    //验证用户是否登录
    baseController.userAuthValidate = function (fn) {
        baseController.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                baseController.user = json.user;
                if (fn)
                    fn();
            }
        });
    };
    baseController.getUserCart = function () {
        baseController.userService.getUserCart(function (json) {
            if (json.isSuccess) {
                $("#cart").html("");
                var innerHtml = ""; //<td>城市</td>
                var tatalCount = 0;
                var totalMoney = 0;
                baseController.carts = json.carts;
                baseController.publishmentSystemInfo = json.publishmentSystemInfo;
                var result = baseController.renderCart();
                $("#cart").html(result.innerHtml);
                $('#totalCount').html(result.tatalCount + '');
                $('#totalMoney').html(result.totalMoney + '');
                $("#indexPage").attr("href", json.publishmentSystemInfo.publishmentSystemUrl);
                $(".homecart").attr("href", json.publishmentSystemInfo.publishmentSystemUrl + "/cart.html");
            }
        });
    };
    baseController.renderCart = function () {
        var result = {
            tatalCount: 0,
            totalMoney: 0,
            innerHtml: StringUtils.empty
        };
        if (baseController.carts.length == 0) {
            result.innerHtml += '<div style="display:table;height: 300px;width: 100%;">';
            result.innerHtml += '    <div style="display:table-cell;vertical-align:middle;text-align: center;">';
            result.innerHtml += '        <p class="f24" style="margin-bottom: 30px">你的购物车竟然还是空的？赶紧选购吧!</p>';
            result.innerHtml += '        <button class="btn btn-primary" onclick="location=\'' + baseController.publishmentSystemInfo.publishmentSystemUrl + '\';">马上去购物</button>';
            result.innerHtml += '    </div>';
            result.innerHtml += '</div>';
            $('.msc_lay2box').html(result.innerHtml);
        }
        else {
            for (var i = 0; i < baseController.carts.length; i++) {
                result.innerHtml += '<li>';
                result.innerHtml += '    <a class="fl" href="' + baseController.carts[i].navigationUrl + '"><img src="' + baseController.carts[i].imageUrl + '" width="50" height="50" /></a>';
                result.innerHtml += '    <div class="msc_lay2txt">';
                result.innerHtml += '        ' + baseController.carts[i].title;
                result.innerHtml += '    </div>';
                result.innerHtml += '    <div class="msc_layprice">';
                result.innerHtml += '        <strong class="msc_red">¥' + baseController.carts[i].price + '</strong><span class="msc_999"> x' + baseController.carts[i].purchaseNum + '</span><br />';
                result.innerHtml += '        <a class="msc_blue" href="javascript:;" onclick="baseController.deleteCart(' + i + ')">删除</a>';
                result.innerHtml += '    </div>';
                result.innerHtml += '</li>';
                result.tatalCount += baseController.carts[i].purchaseNum;
                result.totalMoney += baseController.carts[i].purchaseNum * baseController.carts[i].price;
            }
        }
        $("#allCount").html(result.tatalCount);
        return result;
    };
    baseController.deleteCart = function (index) {
        var carts = baseController.carts.splice(index, 1);
        baseController.userService.deleteCart(carts[0].cartID, baseController.publishmentSystemInfo.publishmentSystemID, function (data) {
            Utils.tipAlert(true, '商品删除成功');
            var result = baseController.renderCart();
            $("#cart").html(result.innerHtml);
            $("#allCount").html(result.tatalCount);
            $('#totalCount').html(result.tatalCount + '');
            $('#totalMoney').html(result.totalMoney + '');
        });
    };
    baseController.getFirstB2CPageInfo = function (pID, fn) {
        var orderService = new OrderService();
        orderService.getFirstB2CPageInfo(function (json) {
            if (json.isSuccess) {
                var pageInfo = 'var $pageInfo = { publishmentSystemID : {0}, channelID : {1}, contentID : {2}, siteUrl : "{3}", homeUrl : "{4}", currentUrl : "{5}", rootUrl : "{6}", apiUrl : "{7}" };';
                pageInfo = StringUtils.formatIngnoreFalse(pageInfo, json.pageInfo.publishmentSystemID, json.pageInfo.channelID, json.pageInfo.contentID, json.pageInfo.siteUrl, json.pageInfo.homeUrl, json.pageInfo.currentUrl, json.pageInfo.rootUrl, json.pageInfo.apiUrl);
                var pageScript = document.createElement("script");
                pageScript.innerHTML = pageInfo;
                document.body.appendChild(pageScript);
                if (fn)
                    fn();
            }
        }, pID);
    };
    //用户仓储
    baseController.userService = new UserService();
    return baseController;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BcAccountSafeController = (function (_super) {
    __extends(BcAccountSafeController, _super);
    function BcAccountSafeController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcAccountSafeController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.accountSafeLevel();
        });
    };
    BcAccountSafeController.prototype.accountSafeLevel = function () {
        this.userService.accountSafeLevel(function (json) {
            if (json.isSuccess) {
                if (json.level == 1) {
                    $("#spanAccountLevel").html("低");
                    $("#spanAccountNum").attr("style", "width:30%");
                }
                if (json.level == 2) {
                    $("#spanAccountLevel").html("中");
                    $("#spanAccountNum").attr("style", "width:60%");
                }
                if (json.level == 3) {
                    $("#spanAccountLevel").html("高");
                    $("#spanAccountNum").attr("style", "width:90%");
                }
                if (json.isBindEmai) {
                    $("#linkEmail").html("修改");
                    $("#iconEmail").attr("src", "images/mbm_ico1.jpg");
                }
                else {
                    $("#linkEmail").html("绑定").addClass("bmr_pa3");
                    $("#iconEmail").attr("src", "images/mbm_ico2.jpg");
                }
                if (json.isBindPhone) {
                    $("#linkPhone").html("修改");
                    $("#iconPhone").attr("src", "images/mbm_ico1.jpg");
                }
                else {
                    $("#linkPhone").html("绑定").addClass("bmr_pa3");
                    $("#iconPhone").attr("src", "images/mbm_ico2.jpg");
                }
                if (json.isSetSQCU) {
                    $("#linkQscu").html("修改");
                    $("#iconQscu").attr("src", "images/mbm_ico1.jpg");
                }
                else {
                    $("#linkQscu").html("绑定").addClass("bmr_pa3");
                    $("#iconQscu").attr("src", "images/mbm_ico2.jpg");
                }
                if (json.pwdComplex) {
                    $("#linkPwd").html("修改");
                    $("#iconPwd").attr("src", "images/mbm_ico1.jpg");
                }
                else {
                    $("#linkPwd").html("绑定").addClass("bmr_pa3");
                    $("#iconPwd").attr("src", "images/mbm_ico2.jpg");
                }
            }
        });
    };
    return BcAccountSafeController;
})(baseController);
var BcBindEmailController = (function (_super) {
    __extends(BcBindEmailController, _super);
    function BcBindEmailController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcBindEmailController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            $(".mlayBg").height($(document).height());
            $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
            $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
            $(window).resize(function () {
                $(".mlayBg").height($(document).height());
                $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
                $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
            });
            $(".mrclose").click(function () {
                $(".mlay").slideUp(200);
                $(".mlayBg").hide();
            });
            $("#spanUserBindEmail").html(baseController.user.email);
            if (!baseController.user.email) {
                $("#divNoBindEmail").show();
                $("#divBindEmail").hide();
            }
            else if (baseController.user.email && !baseController.user.isBindEmail) {
                $("#divNoBindEmail").hide();
                $("#divBindEmail").show();
                $("#btnUpdateEmail").html("现在绑定");
                $("#txtSendEmail").val(baseController.user.email);
            }
            else {
                $("#divNoBindEmail").hide();
                $("#divBindEmail").show();
                $("#btnUpdateEmail").html("修改绑定");
            }
            $("#btnSetEmail").click(function () {
                $("#verifybox").slideDown(200);
            });
            $("#btnUpdateEmail").click(function () {
                $("#verifybox").slideDown(200);
            });
            $("#btnSendEmail").click(function () {
                _this.bindEmail();
            });
            $("#btnSubmitEmail").click(function () {
                _this.SendEmail();
            });
        });
    };
    BcBindEmailController.prototype.bindEmail = function () {
        var email = $("#txtSendEmail").val();
        if (!Utils.isEmail(email)) {
            Utils.tipAlert(false, "请填写正确的邮箱！");
            return;
        }
        this.userService.bindEmail(email, function (json) {
            if (json.isSuccess) {
                Utils.tipAlert(true, "发送成功,请登录邮箱查看");
                $("#btnSendEmail").css("display", "none").unbind("click");
                var counterHtml = '<span class="mlay_alr2" id="spanMessage">120秒后可重新获取</span>';
                $(counterHtml).insertAfter($("#txtValidateCode"));
                var interval = 1000;
                var counter = 120;
                var interl = setInterval(function () {
                    var _this = this;
                    counter--;
                    $("#spanMessage").html(counter + "秒后可重新获取");
                    if (counter == 0) {
                        clearInterval(interl);
                        $("#spanMessage").remove();
                        $("#btnSendEmail").css("display", "inline").click(function () {
                            _this.bindEmail();
                        });
                    }
                }, interval);
            }
            else {
                Utils.tipAlert(false, "发送失败，" + json.errorMessage);
            }
        });
    };
    BcBindEmailController.prototype.SendEmail = function () {
        var email = $("#txtSendEmail").val();
        var validateCode = $("#txtValidateCode").val();
        if (!email || !validateCode) {
            Utils.tipAlert(false, "邮箱绑定数据填写不完整！");
            return;
        }
        this.userService.bindEmailValidate(email, validateCode, function (json) {
            if (json.isSuccess) {
                $(".mlay").hide();
                Utils.tipAlert(true, "邮箱绑定成功！");
                HomeUrlUtils.reload();
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    return BcBindEmailController;
})(baseController);
var BcBindPhoneController = (function (_super) {
    __extends(BcBindPhoneController, _super);
    function BcBindPhoneController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcBindPhoneController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            if (baseController.user.isBindPhone) {
                $("#phone").html(baseController.user.mobile);
                $("#btnRemoveBindPhoneOpen").css("display", "inline").click(function () {
                    _this.removeBindPhone();
                });
                $("#btnReBindPhoneOpen").css("display", "inline").click(function () {
                    $('#verifybox').show();
                });
            }
            $("#btnBindPhoneOpen").click(function () {
                $('#verifybox').show();
            });
            //提交绑定
            $("#btnBindPhone").click(function () {
                _this.bindPhoneValidate();
            });
            //发送验证码
            $("#btnSendPhone").click(function () {
                _this.bindPhone();
            });
        });
    };
    BcBindPhoneController.prototype.bindPhoneValidate = function () {
        var phoneNum = $("#phoneNum").val();
        var validateCode = $("#validateCode").val();
        if (!phoneNum) {
            Utils.tipAlert(false, "请填写手机号");
            return;
        }
        if (!validateCode) {
            Utils.tipAlert(false, "请填写验证码");
            return;
        }
        this.userService.bindPhoneValidate(phoneNum, validateCode, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "绑定成功");
                HomeUrlUtils.reload();
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    BcBindPhoneController.prototype.bindPhone = function () {
        var phoneNum = $("#phoneNum").val();
        if (!phoneNum) {
            Utils.tipAlert(false, "请填写手机号");
            return;
        }
        this.userService.bindPhone(phoneNum, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "校验码已经发送到您的手机，请注意查收");
                $("#btnSendPhone").css("display", "none").unbind("click");
                var counterHtml = '<span class="mlay_alr2" id="spanMessage">120秒后可重新获取</span>';
                $(counterHtml).insertAfter($("#validateCode"));
                var interval = 1000;
                var counter = 120;
                var interl = setInterval(function () {
                    var _this = this;
                    counter--;
                    $("#spanMessage").html(counter + "秒后可重新获取");
                    if (counter == 0) {
                        clearInterval(interl);
                        $("#spanMessage").remove();
                        $("#btnSendPhone").css("display", "inline").click(function () {
                            _this.bindPhone();
                        });
                    }
                }, interval);
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    BcBindPhoneController.prototype.removeBindPhone = function () {
        this.userService.removeBindPhone(function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "解除绑定成功");
                HomeUrlUtils.reload();
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    return BcBindPhoneController;
})(baseController);
var BcChangePwdController = (function (_super) {
    __extends(BcChangePwdController, _super);
    function BcChangePwdController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcChangePwdController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            $("#btnChangePwd").click(function () {
                _this.ChangePwd();
            });
            _this.blurCheck();
        });
    };
    BcChangePwdController.prototype.blurCheck = function () {
        $("#txtOldPwd").blur(function () {
            if (!$("#txtOldPwd").val()) {
                Utils.tipShow($("#txtOldPwd"), false, "请输入正确的原始密码！");
            }
            else {
                Utils.tipShow($("#txtOldPwd"), true);
            }
        });
        $("#txtNewPwd").blur(function () {
            if (!$("#txtNewPwd").val()) {
                Utils.tipShow($("#txtNewPwd"), false, "请输入正确的新密码！");
            }
            else {
                Utils.tipShow($("#txtNewPwd"), true);
            }
            if ($("#txtConfimNewPwd").val() != $("#txtNewPwd").val()) {
                Utils.tipShow($("#txtConfimNewPwd"), false, "两次输入的新密码不一致！");
            }
            else {
                Utils.tipShow($("#txtConfimNewPwd"), true);
            }
        });
        $("#txtConfimNewPwd").blur(function () {
            if (!$("#txtConfimNewPwd").val()) {
                Utils.tipShow($("#txtConfimNewPwd"), false, "请输入再一次输入新密码！");
            }
            else if ($("#txtConfimNewPwd").val() != $("#txtNewPwd").val()) {
                Utils.tipShow($("#txtConfimNewPwd"), false, "两次输入的新密码不一致！");
            }
            else {
                Utils.tipShow($("#txtConfimNewPwd"), true);
            }
        });
    };
    BcChangePwdController.prototype.ChangePwd = function () {
        var currentPassword = $('#txtOldPwd').val();
        var newPassword = $('#txtNewPwd').val();
        var confimPassword = $('#txtConfimNewPwd').val();
        if (!currentPassword) {
            Utils.tipShow($('#txtOldPwd'), false, "请输入正确的原始密码");
            return;
        }
        else {
            Utils.tipShow($('#txtOldPwd'));
        }
        if (!newPassword) {
            Utils.tipShow($('#txtNewPwd'), false, "请输入正确的新密码");
            return;
        }
        else {
            Utils.tipShow($('#txtNewPwd'));
        }
        if (!confimPassword) {
            Utils.tipShow($('#txtConfimNewPwd'), false, "请输入再一次输入新密码");
            return;
        }
        else if (newPassword != confimPassword) {
            Utils.tipShow($('#txtConfimNewPwd'), false, "两次输入的新密码不一致");
            return;
        }
        else {
            Utils.tipShow($('#txtConfimNewPwd'));
        }
        this.userService.changePassword(currentPassword, newPassword, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "用户密码修改成功！");
                $("#txtOldPwd").val("");
                $("#txtNewPwd").val("");
                $("#txtConfimNewPwd").val("");
            }
            else {
                Utils.tipAlert(false, "用户密码修改失败！" + data.errorMessage);
                Utils.tipShow($('#txtOldPwd'), false, "请输入正确的原始密码");
            }
        });
    };
    return BcChangePwdController;
})(baseController);
/**********
* 购买咨询
**********/
var BcConsultationListController = (function (_super) {
    __extends(BcConsultationListController, _super);
    function BcConsultationListController() {
        _super.call(this);
        this.pageIndex = 1;
        this.prePageNum = 10;
        this.keywords = StringUtils.empty;
        this.loading = true;
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        BcConsultationListController.consultationService = new ConsultationService();
    }
    //初始化页面元素以及事件
    BcConsultationListController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    BcConsultationListController.prototype.bindEvent = function () {
        var _this = this;
        if ($("#btnSearch").length > 0) {
            $("#btnSearch").click(function () {
                _this.btnSearchClick();
            });
        }
    };
    //绑定数据
    BcConsultationListController.prototype.bindData = function () {
        this.bindConsultationList(this.pageIndex, this.prePageNum);
        this.bindConsultationKeywords();
    };
    //绑定购买咨询数据
    BcConsultationListController.prototype.bindConsultationList = function (pageIndex, prePageNum) {
        var _this = this;
        this.pageIndex = pageIndex || this.pageIndex;
        this.prePageNum = prePageNum || this.prePageNum;
        this.keywords = UrlUtils.getUrlVar("keywords");
        BcConsultationListController.consultationService.getAllConsultationList(this.keywords, this.pageIndex, this.prePageNum, function (json) {
            BcConsultationListController.consultationList = json.consultationList;
            _this.loading = false;
            //加载数据
            _this.render();
            //分页链接
            $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllConsultationList'));
        });
    };
    //购买咨询关键字帅选
    BcConsultationListController.prototype.btnSearchClick = function () {
        window.location.href = this.getUrl($("#txtKeywords").val());
    };
    //绑定购买咨询关键字帅选
    BcConsultationListController.prototype.bindConsultationKeywords = function () {
        if ($("#txtKeywords").length > 0) {
            $("#txtKeywords").val(UrlUtils.getUrlVar("keywords"));
        }
    };
    //删除购买咨询
    BcConsultationListController.prototype.removeConsultation = function (consultationID) {
        var item = {};
        for (var i = 0; i < BcConsultationListController.consultationList.length; i++) {
            if (BcConsultationListController.consultationList[i].consultationInfo.id == consultationID) {
                item = BcConsultationListController.consultationList[i];
                break;
            }
        }
        BcConsultationListController.consultationList.splice($.inArray(item, BcConsultationListController.consultationList), 1);
        BcConsultationListController.consultationService.deleteConsultation(consultationID);
        this.render();
    };
    //渲染数据
    BcConsultationListController.prototype.render = function () {
        var html = StringUtils.empty;
        var htmlTemplate = StringUtils.empty;
        //htmlTemplate = $("#consultationTemplate").html();
        htmlTemplate += '<tr data="true">';
        htmlTemplate += '<td class="bmrc_std1"><a href="{0}"><img src="{1}" width="50" height="50"></a></td>';
        htmlTemplate += '<td><a href="{0}" class="cor_blue">{2}</a></td>';
        htmlTemplate += '<td valign="top" class="bmrc_std2">';
        htmlTemplate += '<div class="bmrc_sd1"><span class="bmrc_s1">我的咨询：{3}</span><span class="fr cor_999">{4}</span></div>';
        htmlTemplate += '<div class="bmrc_sd2" style="display:{8}">';
        htmlTemplate += '<p><span class="cor_org">京东回复：</span>{5}</p>';
        htmlTemplate += '</div>';
        htmlTemplate += '<div class="bmrc_time" style="display:{8}"><span class="cor_999">{6}</span></div>';
        htmlTemplate += '<div style="display:{7}">暂无回复</div>';
        htmlTemplate += '</td>';
        htmlTemplate += '<tr>';
        for (var i = 0; i < BcConsultationListController.consultationList.length; i++) {
            var addDate = Utils.formatTime(BcConsultationListController.consultationList[i].addDate.replace("T", " "), "yyyy-MM-dd HH:mm:ss");
            var replyDate = Utils.formatTime(BcConsultationListController.consultationList[i].replyDate.replace("T", " "), "yyyy-MM-dd HH:mm:ss");
            if (BcConsultationListController.consultationList[i].answer.length == 0) {
                html += StringUtils.format(htmlTemplate, BcConsultationListController.consultationList[i].navigationUrl, BcConsultationListController.consultationList[i].thumbUrl, BcConsultationListController.consultationList[i].title, BcConsultationListController.consultationList[i].question, addDate, BcConsultationListController.consultationList[i].answer, replyDate, "block", "none");
            }
            else {
                html += StringUtils.format(htmlTemplate, BcConsultationListController.consultationList[i].navigationUrl, BcConsultationListController.consultationList[i].thumbUrl, BcConsultationListController.consultationList[i].title, BcConsultationListController.consultationList[i].question, addDate, BcConsultationListController.consultationList[i].answer, replyDate, "none", "block");
            }
        }
        //添加之前删除原有的tr
        $("tr[data='true']").remove();
        //添加
        $("#consultationTab").append(html);
    };
    BcConsultationListController.prototype.getUrl = function (keywords) {
        this.parmMap['keywords'] = keywords;
        return "?" + Utils.mapToUrl(this.parmMap);
    };
    return BcConsultationListController;
})(baseController);
var BcFollowController = (function (_super) {
    __extends(BcFollowController, _super);
    function BcFollowController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcFollowController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.getUserFollow(1, 12);
        });
    };
    BcFollowController.prototype.getUserFollow = function (pageIndex, prePageNum) {
        this.userService.getUserFollows(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#tbUserFollow").html("");
                var innerHtml = ""; //<td>城市</td>
                for (var i = 0; i < json.followList.length; i++) {
                    innerHtml += '<li>';
                    innerHtml += '  <a href="' + json.followList[i].navigationUrl + '"><img src="' + json.followList[i].imageUrl + '" width="160" height="190"></a>';
                    innerHtml += '  <div class="bmrc_ss1">';
                    innerHtml += '    <input class="bmra_rad bmra_rad2" name="cb" type="checkbox" value="' + json.followList[i].id + '">';
                    innerHtml += '    <a class="cor_blue" href="' + json.followList[i].navigationUrl + '">' + json.followList[i].goodsName + '</a>';
                    innerHtml += '  </div>';
                    innerHtml += '  <div class="bmrc_ss2">' + json.followList[i].goodsPrice + '</div>';
                    innerHtml += '  <div class="bmrc_ss3"><span class="fl">' + json.followList[i].goodsCommentsCount + '人评价</span><span class="fr">好评度' + json.followList[i].goodsPraiseRate + '</span></div>';
                    innerHtml += '  <div class="bmrc_btnBox">';
                    innerHtml += '    <dl>';
                    if (json.followList[i].firstGoodID > 0) {
                        innerHtml += '      <dd><a class="bmrc_a1" href="javascript:;" onclick="new BcFollowController().addToCart(' + json.followList[i].goodsPublishmentSystemID + ',' + json.followList[i].goodsNodeID + ',' + json.followList[i].goodsID + ',' + json.followList[i].firstGoodID + ');return false;">加入购物车</a></dd>';
                    }
                    innerHtml += '      <dd><a class="bmrc_a1" href="javascript:;" onclick="new BcFollowController().removeUserFollow(\'' + json.followList[i].id + '\')">取消</a></dd>';
                    innerHtml += '    </dl>';
                    innerHtml += '  </div>';
                    innerHtml += '</li>';
                }
                $("#tbUserFollow").html(innerHtml);
                //分页链接
                $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getUserFollow'));
            }
        });
    };
    BcFollowController.prototype.addToCart = function (publishmentSystemID, channelID, contentID, goodsID) {
        //内容页面
        var purchaseNum = 1;
        var cart = {
            publishmentSystemID: publishmentSystemID,
            channelID: channelID,
            contentID: contentID,
            goodsID: goodsID,
            purchaseNum: "1"
        };
        this.userService.addToCart(cart, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "添加成功");
                baseController.getUserCart();
            }
            else {
                Utils.tipAlert(true, "添加失败");
            }
        });
    };
    BcFollowController.prototype.removeUserFollow = function (ids) {
        var _this = this;
        this.userService.removeUserFollows(ids, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "删除成功");
                _this.getUserFollow(1, 12);
            }
            else {
                Utils.tipAlert(true, data.errorMessage);
            }
        });
    };
    BcFollowController.prototype.followAddToCart = function (ids) {
        this.userService.followAddToCart(ids, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "添加成功");
                baseController.getUserCart();
            }
            else {
                Utils.tipAlert(true, data.errorMessage);
            }
        });
    };
    return BcFollowController;
})(baseController);
var BcHistoryController = (function (_super) {
    __extends(BcHistoryController, _super);
    function BcHistoryController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcHistoryController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.getUserHistory(1, 12);
        });
    };
    BcHistoryController.prototype.getUserHistory = function (pageIndex, prePageNum) {
        this.userService.getUserHistory(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#tbUserHistory").html("");
                var innerHtml = "";
                for (var i = 0; i < json.historyList.length; i++) {
                    innerHtml += '<li>';
                    innerHtml += '  <a href="' + json.historyList[i].navigationUrl + '"><img src="' + json.historyList[i].imageUrl + '" width="160" height="160"></a>';
                    innerHtml += '  <div class="bmrc_ss1">';
                    innerHtml += '    <input class="bmra_rad bmra_rad2" name="cb" type="checkbox" value="' + json.historyList[i].id + '">';
                    innerHtml += '    <a class="cor_blue" href="' + json.historyList[i].navigationUrl + '">' + json.historyList[i].goodsName + '</a>';
                    innerHtml += '  </div>';
                    innerHtml += '  <div class="bmrc_ss2">' + json.historyList[i].goodsPrice + '</div>';
                    innerHtml += '  <div class="bmrc_ss3"><span class="fl">' + json.historyList[i].goodsCommentsCount + '人评价</span><span class="fr">好评度' + json.historyList[i].goodsPraiseRate + '</span></div>';
                    innerHtml += '  <div class="bmrc_btnBox">';
                    innerHtml += '    <dl>';
                    if (json.historyList[i].firstGoodID > 0) {
                        innerHtml += '      <dd><a class="bmrc_a1" href="javascript:;" onclick="new BcHistoryController().addToCart(' + json.historyList[i].goodsPublishmentSystemID + ',' + json.historyList[i].goodsNodeID + ',' + json.historyList[i].goodsID + ',' + json.historyList[i].firstGoodID + ');return false;">加入购物车</a></dd>';
                    }
                    innerHtml += '      <dd><a class="bmrc_a1" href="javascript:;" onclick="new BcHistoryController().removeUserHistory(\'' + json.historyList[i].id + '\')">取消</a></dd>';
                    innerHtml += '    </dl>';
                    innerHtml += '  </div>';
                    innerHtml += '</li>';
                }
                $("#tbUserHistory").html(innerHtml);
                //分页链接
                $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getUserHistory'));
            }
        });
    };
    BcHistoryController.prototype.addToCart = function (publishmentSystemID, channelID, contentID, goodsID) {
        //内容页面
        var purchaseNum = 1;
        var cart = {
            publishmentSystemID: publishmentSystemID,
            channelID: channelID,
            contentID: contentID,
            goodsID: goodsID,
            purchaseNum: "1"
        };
        this.userService.addToCart(cart, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "添加成功");
                baseController.getUserCart();
            }
            else {
                Utils.tipAlert(true, "添加失败");
            }
        });
    };
    BcHistoryController.prototype.removeUserHistory = function (ids) {
        var _this = this;
        this.userService.removeUserHistory(ids, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "删除成功");
                _this.getUserHistory(1, 12);
            }
            else {
                Utils.tipAlert(true, data.errorMessage);
            }
        });
    };
    BcHistoryController.prototype.historyAddToCart = function (ids) {
        this.userService.historyAddToCart(ids, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "添加成功");
                baseController.getUserCart();
            }
            else {
                Utils.tipAlert(true, data.errorMessage);
            }
        });
    };
    return BcHistoryController;
})(baseController);
var BcInvoiceController = (function (_super) {
    __extends(BcInvoiceController, _super);
    function BcInvoiceController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcInvoiceController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.getAllInvoice();
            _this.regTabClickEvent();
        });
    };
    BcInvoiceController.prototype.updateInvoice = function (id) {
        var _this = this;
        var invoice = this.getInvoiceById(id);
        invoice.isVat = $('#isVat').val();
        invoice.isVat = $('#isVat').val();
        invoice.isCompany = $('#isCompany').val();
        invoice.companyName = $('#companyName').val();
        invoice.vatCompanyName = $('#vatCompanyName').val();
        invoice.vatCode = $('#vatCode').val();
        invoice.vatAddress = $('#vatAddress').val();
        invoice.vatPhone = $('#vatPhone').val();
        invoice.vatBankName = $('#vatBankName').val();
        invoice.vatBankAccount = $('#vatBankAccount').val();
        invoice.consigneeName = $('#consigneeName').val();
        invoice.consigneeMobile = $('#consigneeMobile').val();
        invoice.consigneeAddress = $('#consigneeAddress').val();
        if (id == 0) {
            this.userService.addUserInvoice(invoice, function (json) {
                if (json.isSuccess) {
                    Utils.tipAlert(true, "添加成功!");
                    _this.getAllInvoice();
                }
            });
        }
        else {
            this.userService.updateUserInvoice(invoice, function (json) {
                if (json.isSuccess) {
                    Utils.tipAlert(true, "更新成功!");
                    _this.getAllInvoice();
                }
            });
        }
    };
    BcInvoiceController.prototype.regCheckBoxClickEvent = function () {
        var _this = this;
        $('input[name=invoice]').on('change', function () {
            var invoice = _this.getInvoiceById($('input[name=invoice]:checked').val());
            _this.loadInput(invoice);
        });
    };
    BcInvoiceController.prototype.delInvoice = function (id) {
        var _this = this;
        this.userService.delUserInvoice(Number(id), function (json) {
            if (json.isSuccess) {
                Utils.tipAlert(true, "已删除!");
                _this.getAllInvoice();
            }
        });
    };
    BcInvoiceController.prototype.getInvoiceById = function (id) {
        var invoice;
        for (var i = 0; i < this.invoices.length; i++) {
            if (this.invoices[i].id == id) {
                invoice = this.invoices[i];
                break;
            }
        }
        if (!invoice) {
            invoice = {
                "groupSN": "",
                "userName": "",
                "isOrder": false,
                "isDefault": false,
                "isVat": false,
                "isCompany": false,
                "companyName": "",
                "vatCompanyName": "",
                "vatCode": "",
                "vatAddress": "",
                "vatPhone": "",
                "vatBankName": "",
                "vatBankAccount": "",
                "consigneeName": "",
                "consigneeMobile": "",
                "consigneeAddress": "",
                "id": id
            };
        }
        return invoice;
    };
    BcInvoiceController.prototype.loadInput = function (invoice) {
        if (!invoice)
            return;
        $('#vatCompanyName').val(invoice.vatCompanyName);
        $('#vatCode').val(invoice.vatCode);
        $('#vatAddress').val(invoice.vatAddress);
        $('#vatPhone').val(invoice.vatPhone);
        $('#vatBankName').val(invoice.vatBankName);
        $('#vatBankAccount').val(invoice.vatBankAccount);
        $('#companyName').val(invoice.companyName);
        $('#consigneeName').val(invoice.consigneeName);
        $('#consigneeMobile').val(invoice.consigneeMobile);
        $('#consigneeAddress').val(invoice.consigneeAddress);
        $('#isVat').val(invoice.isVat);
        $('#isCompany').val(invoice.isCompany);
        if (invoice.isVat) {
            $('.sc3_change .sc3_chgBnt').eq(1).click();
        }
        else {
            $('.sc3_change .sc3_chgBnt').eq(0).click();
            if (invoice.isCompany) {
                $('.sc3_f1 .sc3_chgBnt').eq(1).click();
            }
            else {
                $('.sc3_f1 .sc3_chgBnt').eq(0).click();
            }
        }
    };
    BcInvoiceController.prototype.getAllInvoice = function () {
        var _this = this;
        this.userService.getUserInvoices(function (json) {
            if (json.isSuccess) {
                _this.invoices = json.invoices;
                $("#invoicelist").html("");
                var innerHtml = '';
                for (var i = 0; i < json.invoices.length; i++) {
                    var invoiceName = '';
                    if (json.invoices[i].isVat) {
                        invoiceName = "增值税发票 " + json.invoices[i].vatCompanyName;
                    }
                    else {
                        invoiceName = "普通发票 " + (json.invoices[i].isCompany ? json.invoices[i].companyName : "个人");
                    }
                    innerHtml += '<li>';
                    innerHtml += '  <input type="radio" value="' + json.invoices[i].id + '" id = "invoice' + json.invoices[i].id + '" ' + (i == 0 ? 'checked' : '') + ' name="invoice" class="bmra_rad"/>';
                    innerHtml += '  <label for="invoice' + json.invoices[i].id + '"> ' + invoiceName + ' </label>';
                    innerHtml += '  <a href="javascript:;" onclick="new BcInvoiceController().delInvoice(' + json.invoices[i].id + ');" class="btndel cor_red">删除</a >';
                    innerHtml += '</li>';
                }
                innerHtml += '<li><input type="radio"  id="invoicenew" name="invoice" class="bmra_rad"><label for= "invoicenew"> 使用新的发票信息 </label></li>';
                $("#invoicelist").html(innerHtml);
                _this.loadInput(json.invoice);
                _this.regCheckBoxClickEvent();
            }
        });
    };
    BcInvoiceController.prototype.regTabClickEvent = function () {
        var _this = this;
        $('.sc3_change .sc3_chgBnt').on('click', function () {
            $('.sc3_change .sc3_chgBnt').removeClass('sc3_cutChgBnt');
            $(this).addClass('sc3_cutChgBnt');
            $('.ibox').hide().eq(1 - $(".sc3_change .sc3_chgBnt").index(this)).show();
            if ($(".sc3_change .sc3_chgBnt").index(this) == 1) {
                $('#isVat').val('true');
            }
            else {
                $('#isVat').val('false');
            }
        });
        $('.sc3_f1 .sc3_chgBnt').on('click', function () {
            $('.sc3_f1 .sc3_chgBnt').removeClass('sc3_cutChgBnt');
            $(this).addClass('sc3_cutChgBnt');
            if ($(this).text() == '单位') {
                $('#companyName').show();
                $('#isCompany').val('true');
            }
            else {
                $('#companyName').hide();
                $('#isCompany').val('false');
            }
        });
        $('.sc3mr_submit').on('click', function () {
            var checkedVal = $('input[name=invoice]:checked').val();
            if (Number(checkedVal)) {
                _this.updateInvoice(Number(checkedVal));
            }
            else {
                _this.updateInvoice(0);
            }
        });
    };
    return BcInvoiceController;
})(baseController);
var BcLoginRecordController = (function (_super) {
    __extends(BcLoginRecordController, _super);
    function BcLoginRecordController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcLoginRecordController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.getUserLoginLog(1, 10);
        });
    };
    BcLoginRecordController.prototype.getUserLoginLog = function (pageIndex, prePageNum) {
        this.userService.getUserLoginLog(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#tbUserLog").html("");
                var innerHtml = "<tr class='bmra_trh1'><td>IP地址</td><td>日期</td><td>备注</td></tr>"; //<td>城市</td>
                for (var i = 0; i < json.userLoginInfoList.length; i++) {
                    innerHtml += "<tr>";
                    innerHtml += "<td>" + json.userLoginInfoList[i].ipAddress + "</td>";
                    innerHtml += "<td>" + Utils.formatTime(json.userLoginInfoList[i].addDate.replace("T", "  "), "yyyy-MM-dd HH:mm:ss") + "</td>";
                    innerHtml += "<td>" + json.userLoginInfoList[i].summary + "</td>";
                    innerHtml += "</tr>";
                }
                $("#tbUserLog").html(innerHtml);
                //分页链接
                $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getUserLoginLogData'));
            }
        });
    };
    return BcLoginRecordController;
})(baseController);
/**********
* 订单
**********/
var BcOrderListController = (function (_super) {
    __extends(BcOrderListController, _super);
    function BcOrderListController() {
        _super.call(this);
        this.pageIndex = 1;
        this.prePageNum = 10;
        this.isCompleted = "false";
        this.isPayment = "false";
        this.isPC = Utils.isPC();
        this.orderTime = 0;
        this.keywords = StringUtils.empty;
        this.isEmpty = true;
        this.loading = true;
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        BcOrderListController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    BcOrderListController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    BcOrderListController.prototype.bindEvent = function () {
        var _this = this;
        if ($("#selStatus").length > 0) {
            $("#selStatus").change(function () {
                _this.orderStatusChange();
            });
        }
        if ($("#selTime").length > 0) {
            $("#selTime").change(function () {
                _this.orderTimeChange();
            });
        }
        if ($("#btnSearch").length > 0) {
            $("#btnSearch").click(function () {
                _this.btnSearchClick();
            });
        }
    };
    //绑定数据
    BcOrderListController.prototype.bindData = function () {
        this.bindOrderList(this.pageIndex, this.prePageNum);
        this.bindOrderStatus();
        this.bindOrderTime();
        this.bindOrderKeywords();
    };
    //绑定订单数据
    BcOrderListController.prototype.bindOrderList = function (pageIndex, prePageNum) {
        var _this = this;
        this.pageIndex = pageIndex || this.pageIndex;
        this.prePageNum = prePageNum || this.prePageNum;
        this.isCompleted = UrlUtils.getUrlVar("isCompleted");
        this.isPayment = UrlUtils.getUrlVar("isPayment");
        this.keywords = UrlUtils.getUrlVar("keywords");
        this.orderTime = UrlUtils.getUrlVar("orderTime");
        BcOrderListController.orderService.getAllOrderList(this.isCompleted, this.isPayment, this.isPC, this.orderTime, this.keywords, this.pageIndex, this.prePageNum, function (json) {
            BcOrderListController.orderList = json.orderInfoList;
            _this.loading = false;
            if (BcOrderListController.orderList && BcOrderListController.orderList.length > 0) {
                _this.isEmpty = false;
            }
            else {
                if (!_this.isCompleted && !_this.isPayment) {
                    _this.isEmpty = true;
                }
                else {
                    _this.isEmpty = false;
                }
            }
            //加载数据
            _this.render();
            //分页链接
            $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllOrderList'));
        });
    };
    //订单状态帅选
    BcOrderListController.prototype.orderStatusChange = function () {
        var status = $("#selStatus").val();
        switch (status) {
            case "all":
                window.location.href = this.getUrl(StringUtils.empty, StringUtils.empty, UrlUtils.getUrlVar("orderTime"));
                break;
            case "noPay":
                window.location.href = this.getUrl("false", "false", UrlUtils.getUrlVar("orderTime"));
                break;
            case "pay":
                window.location.href = this.getUrl("false", "true", UrlUtils.getUrlVar("orderTime"));
                break;
            case "completed":
                window.location.href = this.getUrl("true", StringUtils.empty, UrlUtils.getUrlVar("orderTime"));
                break;
        }
    };
    //订单时间帅选
    BcOrderListController.prototype.orderTimeChange = function () {
        var time = $("#selTime").val();
        switch (time) {
            case "all":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "all");
                break;
            case "90":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "90");
                break;
            case "180":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "180");
                break;
            case "365":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "365");
                break;
        }
    };
    //订单关键字帅选
    BcOrderListController.prototype.btnSearchClick = function () {
        window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), UrlUtils.getUrlVar("orderTime"), $("#txtKeywords").val());
    };
    //绑定订单状态帅选
    BcOrderListController.prototype.bindOrderStatus = function () {
        if ($("#selStatus").length > 0) {
            if (this.isCompleted == "false" && this.isPayment == "false") {
                $("#selStatus").val("noPay");
            }
            else if (this.isCompleted == "false" && this.isPayment == "true") {
                $("#selStatus").val("pay");
            }
            else if (this.isCompleted == "true") {
                $("#selStatus").val("completed");
            }
        }
    };
    //绑定订单时间帅选
    BcOrderListController.prototype.bindOrderTime = function () {
        if ($("#selTime").length > 0 && this.orderTime) {
            $("#selTime").val(UrlUtils.getUrlVar("orderTime"));
        }
    };
    //绑定订单关键字帅选
    BcOrderListController.prototype.bindOrderKeywords = function () {
        if ($("#txtKeywords").length > 0) {
            $("#txtKeywords").val(UrlUtils.getUrlVar("keywords"));
        }
    };
    //删除订单
    BcOrderListController.prototype.removeOrder = function (orderID) {
        var item = {};
        for (var i = 0; i < BcOrderListController.orderList.length; i++) {
            if (BcOrderListController.orderList[i].orderInfo.id == orderID) {
                item = BcOrderListController.orderList[i];
                break;
            }
        }
        BcOrderListController.orderList.splice($.inArray(item, BcOrderListController.orderList), 1);
        BcOrderListController.orderService.deleteOrder(orderID);
        this.render();
    };
    //渲染数据
    BcOrderListController.prototype.render = function () {
        var html;
        //order head
        var headHtml = '<tr class= "bmr_mtr2" data="true">';
        headHtml += '<td colspan="6" >';
        headHtml += '<span class= "bmrc_s2" > 订单编号: <a href="{3}" class="cor_blue" > {0}</a></span >';
        //headHtml += '<span class= "bmrc_s3" >';
        //headHtml += '<a href="{2}" class= "fl cor_blue" > {1}</a>';
        //headHtml += '</span > <a href="#" class= "bmrc_kf" > </a> <span class= "bmrc_tel" >';
        headHtml += '</span> </td> </tr> ';
        //order body
        var bodyHtml = '<tr class= "bmr_mtr3" data="true">';
        bodyHtml += '<td class= "bmr_mtd1" >';
        bodyHtml += '<a class= "bmr_mp1" href= "{0}" >';
        bodyHtml += '<img src="{1}" width= "50" height= "50" > </a>';
        bodyHtml += '</td>';
        bodyHtml += '<td align="center" > {2} </td>';
        bodyHtml += '<td class= "bmr_mtd1" align= "center" >￥{3} <br>在线支付 </td >';
        bodyHtml += '<td class= "bmr_mtd1 cor_999" align= "center" > {4}<br /> {5} </td>';
        bodyHtml += '<td class= "bmr_mtd1" align= "center" > <span class= "cor_999" > {6} </span > </td > ';
        //action
        var actionHtml = '<td align="center" rowspan="{0}">';
        //actionHtml += '<a class= "cor_blue" href= "#" > 查看 </a>';
        actionHtml += ' | <a class= "cor_blue" onclick= "BcOrderListController.prototype.removeOrder({1}); " href= "javascript: void (0); " > 删除 </a >';
        actionHtml += '<br>';
        actionHtml += '<a class= "cor_blue" href= "#" > 评价晒单 </a >';
        actionHtml += '<br>';
        actionHtml += '<a class= "cor_blue" href= "#" style= "display:none;" > 申请返修 / 退换货 </a>';
        actionHtml += '<br><a href="#" class= "bmr_mby" > 还要买 </a >';
        actionHtml += '</td > ';
        for (var i = 0; i < BcOrderListController.orderList.length; i++) {
            html += StringUtils.format(headHtml, BcOrderListController.orderList[i].orderInfo.orderSN, BcOrderListController.orderList[i].publishmentSystemInfo.publishmentSystemName, BcOrderListController.orderList[i].publishmentSystemInfo.publishmentSystemUrl, BcOrderItemListController.getRedirectUrl(BcOrderListController.orderList[i].orderInfo.id, BcOrderListController.orderList[i].publishmentSystemInfo.publishmentSystemID));
            var orderDetailStatus = "";
            if (BcOrderListController.orderList[i].items.length == 0)
                continue;
            //根据订单状态，得到操作权限
            if (BcOrderListController.orderList[i].orderInfo.orderStatus == "已完成") {
                actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" style="display:none;" href= "javascript: void (0);" onclick="{1}"> 查看 </a> <br><a class="cor_blue" href= "{2}"> 评价晒单</a> <br><a class="cor_blue" href= "javascript: void (0);"  onclick="{3}" style="display:none;"> 申请返修/退换货</a> <br><a href="{4}" class="bmr_mby"> 还要买 </a></td>';
                actionHtml = StringUtils.format(actionHtml, BcOrderListController.orderList[i].items.length, "alert('查看')", BcOrderCommentController.getUrl(BcOrderListController.orderList[i].orderInfo.id, BcOrderListController.orderList[i].publishmentSystemInfo.publishmentSystemID), "alert('返修退换货')", BcOrderListController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "已完成";
            }
            else if (BcOrderListController.orderList[i].orderInfo.orderStatus == "处理中" && BcOrderListController.orderList[i].orderInfo.paymentStatus == "已支付") {
                actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" style="display:none;" href= "javascript: void (0);" onclick="{1}"> 查看 </a> <br><a href="{2}" class="bmr_mby"> 还要买 </a></td>';
                actionHtml = StringUtils.format(actionHtml, BcOrderListController.orderList[i].items.length, "alert('查看')", BcOrderListController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "等待发货";
            }
            else if (BcOrderListController.orderList[i].orderInfo.orderStatus == "处理中" && BcOrderListController.orderList[i].orderInfo.paymentStatus == "未支付") {
                actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" style="display:none;" href= "javascript: void (0);"  onclick="{1}"> 查看 </a> <a class="cor_blue" onclick="{2}" href="javascript: void (0);">删除</a>';
                actionHtml = StringUtils.format(actionHtml, BcOrderListController.orderList[i].items.length, "alert('查看')", "BcOrderListController.prototype.removeOrder(" + BcOrderListController.orderList[i].orderInfo.id + ")");
                if (BcOrderListController.orderList[i].clickString) {
                    actionHtml += StringUtils.format('<br><a href="javascript:void (0);" onclick="{0}" class="cor_blue"> 立即付款 </a>{1}', BcOrderListController.orderList[i].clickString, BcOrderListController.orderList[i].paymentForm);
                }
                else {
                    actionHtml += StringUtils.format('<br><a href="javascript:void (0);" class="cor_blue" style="color:red;"> 货到付款 </a>');
                }
                actionHtml += StringUtils.format('<br><a href="{0}" class="bmr_mby"> 还要买 </a></td>', BcOrderListController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "等待支付";
            }
            else if (BcOrderListController.orderList[i].orderInfo.orderStatus == "已作废") {
                actionHtml = StringUtils.format('<td><a href="{0}" class="bmr_mby"> 还要买 </a></td>', BcOrderListController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "已作废";
            }
            for (var j = 0; j < BcOrderListController.orderList[i].items.length; j++) {
                var date = BcOrderListController.orderList[i].orderInfo.timeOrder.split('T');
                html += StringUtils.format(bodyHtml, BcOrderListController.orderList[i].items[j].navigationUrl, BcOrderListController.orderList[i].items[j].thumbUrl, BcOrderListController.orderList[i].orderInfo.userName, BcOrderListController.orderList[i].items[j].priceSale, date[0], date[1], orderDetailStatus);
                if (j == 0) {
                    html += actionHtml;
                }
                html += "</tr>";
            }
        }
        //添加之前删除原有的tr
        $("tr[data='true']").remove();
        //添加
        $("#orderTab").append(html);
    };
    BcOrderListController.prototype.getUrl = function (isCompleted, isPayment, orderTime, keywords) {
        this.parmMap['isCompleted'] = isCompleted;
        this.parmMap['isPayment'] = isPayment;
        this.parmMap['orderTime'] = orderTime;
        this.parmMap['keywords'] = keywords;
        return "?" + Utils.mapToUrl(this.parmMap);
    };
    BcOrderListController.getRedirectUrl = function () {
        return "myOrder.html";
    };
    return BcOrderListController;
})(baseController);
/**********
* 订单退换货
**********/
var BcOrderReturnListController = (function (_super) {
    __extends(BcOrderReturnListController, _super);
    function BcOrderReturnListController() {
        _super.call(this);
        this.pageIndex = 1;
        this.prePageNum = 10;
        this.isCompleted = "true";
        this.isPayment = "true";
        this.isPC = Utils.isPC();
        this.orderTime = 0;
        this.keywords = StringUtils.empty;
        this.isEmpty = true;
        this.loading = true;
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        BcOrderReturnListController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    BcOrderReturnListController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    BcOrderReturnListController.prototype.bindEvent = function () {
        var _this = this;
        if ($("#selTime").length > 0) {
            $("#selTime").change(function () {
                _this.orderTimeChange();
            });
        }
        if ($("#btnSearch").length > 0) {
            $("#btnSearch").click(function () {
                _this.btnSearchClick();
            });
        }
    };
    //绑定数据
    BcOrderReturnListController.prototype.bindData = function () {
        this.bindOrderReturnList(this.pageIndex, this.prePageNum);
        this.bindOrderTime();
        this.bindOrderKeywords();
    };
    //绑定订单数据
    BcOrderReturnListController.prototype.bindOrderReturnList = function (pageIndex, prePageNum) {
        var _this = this;
        this.pageIndex = pageIndex || this.pageIndex;
        this.prePageNum = prePageNum || this.prePageNum;
        this.isCompleted = UrlUtils.getUrlVar("isCompleted");
        this.isPayment = UrlUtils.getUrlVar("isPayment");
        this.keywords = UrlUtils.getUrlVar("keywords");
        this.orderTime = UrlUtils.getUrlVar("orderTime");
        BcOrderReturnListController.orderService.getAllOrderList("true", "true", this.isPC, this.orderTime, this.keywords, this.pageIndex, this.prePageNum, function (json) {
            BcOrderReturnListController.orderReturnList = json.orderInfoList;
            _this.loading = false;
            if (BcOrderReturnListController.orderReturnList && BcOrderReturnListController.orderReturnList.length > 0) {
                _this.isEmpty = false;
            }
            else {
                if (!_this.isCompleted && !_this.isPayment) {
                    _this.isEmpty = true;
                }
                else {
                    _this.isEmpty = false;
                }
            }
            //加载数据
            _this.render();
            //分页链接
            $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllOrderReturnList'));
        });
    };
    //订单时间帅选
    BcOrderReturnListController.prototype.orderTimeChange = function () {
        var time = $("#selTime").val();
        switch (time) {
            case "all":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "all");
                break;
            case "90":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "90");
                break;
            case "180":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "180");
                break;
            case "365":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "365");
                break;
        }
    };
    //订单关键字帅选
    BcOrderReturnListController.prototype.btnSearchClick = function () {
        window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), UrlUtils.getUrlVar("orderTime"), $("#txtKeywords").val());
    };
    //绑定订单时间帅选
    BcOrderReturnListController.prototype.bindOrderTime = function () {
        if ($("#selTime").length > 0 && this.orderTime) {
            $("#selTime").val(UrlUtils.getUrlVar("orderTime"));
        }
    };
    //绑定订单关键字帅选
    BcOrderReturnListController.prototype.bindOrderKeywords = function () {
        if ($("#txtKeywords").length > 0) {
            $("#txtKeywords").val(UrlUtils.getUrlVar("keywords"));
        }
    };
    //渲染数据
    BcOrderReturnListController.prototype.render = function () {
        var html;
        //order body
        var bodyHtml = '<tr class= "bmr_mtr3"  data="true">';
        bodyHtml += '<td align="center"><span class= "cor_blue"> {0} </span></td>';
        //action
        var actionHtml = '<td class= "bmr_mtd1">';
        actionHtml += "{2}";
        actionHtml += '</td>';
        actionHtml += '<td class= "cor_999" align= "center">{0} <br> {1}</td>';
        actionHtml += '</tr>';
        var applyHtml = '<div class= "bmrd_pro">';
        applyHtml += '<a href="{0}"><img src="{1}" width= "50" height= "50"> </a>';
        applyHtml += '{2}';
        applyHtml += '</div>';
        for (var i = 0; i < BcOrderReturnListController.orderReturnList.length; i++) {
            var date = BcOrderReturnListController.orderReturnList[i].orderInfo.timeOrder.split('T');
            //订单
            html += StringUtils.format(bodyHtml, BcOrderReturnListController.orderReturnList[i].orderInfo.orderSN);
            html += StringUtils.format(actionHtml, date[0], date[1], '{0}');
            var orderDetail = "";
            for (var j = 0; j < BcOrderReturnListController.orderReturnList[i].items.length; j++) {
                var applyA = '<a href= "{0}" {1} class= "bmr_pa1"> {2} </a>';
                applyA = StringUtils.format(applyA, BcOrderReturnListController.orderReturnList[i].items[j].isApplyReturn ? "javascript:;" : BcReturnApplyController.getUrl(BcOrderReturnListController.orderReturnList[i].items[j].orderItemID, BcOrderReturnListController.orderReturnList[i].publishmentSystemInfo.publishmentSystemID), BcOrderReturnListController.orderReturnList[i].items[j].isApplyReturn ? " style='background:#ccc; ' " : "", BcOrderReturnListController.orderReturnList[i].items[j].isApplyReturn ? "已申请" : "申请");
                //订单详情
                orderDetail += StringUtils.format(applyHtml, BcOrderReturnListController.orderReturnList[i].items[j].navigationUrl, BcOrderReturnListController.orderReturnList[i].items[j].thumbUrl, applyA);
            }
            html = StringUtils.format(html, orderDetail);
            html += "</tr>";
        }
        //添加之前删除原有的tr
        $("tr[data='true']").remove();
        //添加
        $("#orderTab").append(html);
    };
    BcOrderReturnListController.prototype.getUrl = function (isCompleted, isPayment, orderTime, keywords) {
        this.parmMap['isCompleted'] = "true";
        this.parmMap['isPayment'] = "true";
        this.parmMap['orderTime'] = orderTime;
        this.parmMap['keywords'] = keywords;
        return "?" + Utils.mapToUrl(this.parmMap);
    };
    return BcOrderReturnListController;
})(baseController);
/**********
* 订单退换货
**********/
var BcOrderItemReturnRecordListController = (function (_super) {
    __extends(BcOrderItemReturnRecordListController, _super);
    function BcOrderItemReturnRecordListController() {
        _super.call(this);
        this.pageIndex = 1;
        this.prePageNum = 10;
        this.isCompleted = "true";
        this.isPayment = "true";
        this.isPC = Utils.isPC();
        this.orderTime = 0;
        this.keywords = StringUtils.empty;
        this.isEmpty = true;
        this.loading = true;
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        BcOrderItemReturnRecordListController.orderItemReturnService = new OrderItemReturnService();
    }
    //初始化页面元素以及事件
    BcOrderItemReturnRecordListController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    BcOrderItemReturnRecordListController.prototype.bindEvent = function () {
        var _this = this;
        if ($("#selTime").length > 0) {
            $("#selTime").change(function () {
                _this.orderTimeChange();
            });
        }
        if ($("#btnSearch").length > 0) {
            $("#btnSearch").click(function () {
                _this.btnSearchClick();
            });
        }
    };
    //绑定数据
    BcOrderItemReturnRecordListController.prototype.bindData = function () {
        this.bindOrderItemReturnRecordList(this.pageIndex, this.prePageNum);
        this.bindOrderTime();
        this.bindOrderKeywords();
    };
    //绑定订单数据
    BcOrderItemReturnRecordListController.prototype.bindOrderItemReturnRecordList = function (pageIndex, prePageNum) {
        var _this = this;
        this.pageIndex = pageIndex || this.pageIndex;
        this.prePageNum = prePageNum || this.prePageNum;
        this.keywords = UrlUtils.getUrlVar("keywords");
        this.orderTime = UrlUtils.getUrlVar("orderTime");
        BcOrderItemReturnRecordListController.orderItemReturnService.getOrderItemReturnRecordList(this.isPC, this.orderTime, this.keywords, this.pageIndex, this.prePageNum, function (json) {
            BcOrderItemReturnRecordListController.orderItemReturnRecordList = json.orderItemReturnRecordList;
            _this.loading = false;
            if (BcOrderItemReturnRecordListController.orderItemReturnRecordList && BcOrderItemReturnRecordListController.orderItemReturnRecordList.length > 0) {
                _this.isEmpty = false;
            }
            else {
                if (!_this.isCompleted && !_this.isPayment) {
                    _this.isEmpty = true;
                }
                else {
                    _this.isEmpty = false;
                }
            }
            //加载数据
            _this.render();
            //分页链接
            $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getOrderItemReturnRecordList'));
        });
    };
    //订单时间帅选
    BcOrderItemReturnRecordListController.prototype.orderTimeChange = function () {
        var time = $("#selTime").val();
        switch (time) {
            case "all":
                window.location.href = this.getUrl("all", UrlUtils.getUrlVar("keywords"));
                break;
            case "90":
                window.location.href = this.getUrl("90", UrlUtils.getUrlVar("keywords"));
                break;
            case "180":
                window.location.href = this.getUrl("180", UrlUtils.getUrlVar("keywords"));
                break;
            case "365":
                window.location.href = this.getUrl("365", UrlUtils.getUrlVar("keywords"));
                break;
        }
    };
    //订单关键字帅选
    BcOrderItemReturnRecordListController.prototype.btnSearchClick = function () {
        window.location.href = this.getUrl(UrlUtils.getUrlVar("orderTime"), $("#txtKeywords").val());
    };
    //绑定订单时间帅选
    BcOrderItemReturnRecordListController.prototype.bindOrderTime = function () {
        if ($("#selTime").length > 0 && this.orderTime) {
            $("#selTime").val(UrlUtils.getUrlVar("orderTime"));
        }
    };
    //绑定订单关键字帅选
    BcOrderItemReturnRecordListController.prototype.bindOrderKeywords = function () {
        if ($("#txtKeywords").length > 0) {
            $("#txtKeywords").val(UrlUtils.getUrlVar("keywords"));
        }
    };
    //渲染数据
    BcOrderItemReturnRecordListController.prototype.render = function () {
        var html;
        //order body
        var bodyHtml = '<tr class= "bmr_mtr3"  data="true">';
        bodyHtml += '<td align="center"><span class= "cor_blue"> {0} </span></td>';
        bodyHtml += '<td align="center" class= "bmr_mtd1"> <span class= "cor_blue"> {1} </span></td>';
        bodyHtml += '<td class= "bmr_mtd1">';
        bodyHtml += '<a class= "cor_blue" href= "{2}">{3}</a>';
        bodyHtml += '</td>';
        bodyHtml += '<td align="center" class= "bmr_mtd1"> {4} </td>';
        bodyHtml += '<td align= "center" class= "bmr_mtd1"> {5} </td>';
        //bodyHtml += '<td class= "cor_999" align= "center">';
        //bodyHtml += '<span class= "cor_blue">';
        //bodyHtml += '<a href="" class= "cor_blue"> 查看 </a>';
        //bodyHtml += '</span>';
        //bodyHtml += '</td>';
        bodyHtml += '</tr>';
        for (var i = 0; i < BcOrderItemReturnRecordListController.orderItemReturnRecordList.length; i++) {
            var date = BcOrderItemReturnRecordListController.orderItemReturnRecordList[i].applyDate.split('T');
            //记录详情
            html += StringUtils.format(bodyHtml, BcOrderItemReturnRecordListController.orderItemReturnRecordList[i].id, BcOrderItemReturnRecordListController.orderItemReturnRecordList[i].goodsSN, BcOrderItemReturnRecordListController.orderItemReturnRecordList[i].navigationUrl, BcOrderItemReturnRecordListController.orderItemReturnRecordList[i].title, date[0], BcOrderItemReturnRecordListController.orderItemReturnRecordList[i].detailStatus);
        }
        //添加之前删除原有的tr
        $("tr[data='true']").remove();
        //添加
        $("#returnRecordTab").append(html);
    };
    BcOrderItemReturnRecordListController.prototype.getUrl = function (orderTime, keywords) {
        this.parmMap['orderTime'] = orderTime;
        this.parmMap['keywords'] = keywords;
        return "?" + Utils.mapToUrl(this.parmMap);
    };
    return BcOrderItemReturnRecordListController;
})(baseController);
/// <reference path="baseController.ts" />
var BcPersonalprofileController = (function (_super) {
    __extends(BcPersonalprofileController, _super);
    function BcPersonalprofileController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcPersonalprofileController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            $(".bmrb_li01 img").attr("src", baseController.user.avatarLarge);
            $(".bmrb_li02 img").attr("src", baseController.user.avatarMiddle);
            $(".bmrb_li03 img").attr("src", baseController.user.avatarSmall);
            $("#txtUserName").val(baseController.user.userName);
            $("#txtRemark").val(baseController.user.signature);
            _this.userService.loadUserProperty(function (json) {
                if (json.isSuccess) {
                    $("#ulUserProperty").html(json.userPropertys);
                    $("#ulUserProperty span").addClass("bmra_s1");
                    $("#ulUserProperty input").addClass("bmra_int");
                    $("#ulUserProperty select").addClass("bmra_sel");
                }
            });
            Utils.fileUpload('fileupload', _this.userService.getUploadImgUrl('UpdateUserAvatar'), _this.setUserAvatar(), _this.progressForUserAvatar(), _this.beforeSubmitUserAvatar());
            $("#btnUpload").click(function () {
                $("#fileupload").click();
            });
            $("#btnSaveUserInfo").click(function () {
                _this.saveBasicUserInfo();
            });
            $("#btnSaveUserDetailInfo").click(function () {
                _this.saveDetailUserInfo();
            });
            _this.getThirdBindInfo();
        });
    };
    BcPersonalprofileController.prototype.setUserAvatar = function () {
        return function (json) {
            if (json.isSuccess) {
                $(".bmrb_li01 img").attr("src", json.avatarLarge);
                $(".bmrb_li02 img").attr("src", json.avatarMiddle);
                $(".bmrb_li03 img").attr("src", json.avatarSmall);
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        };
    };
    BcPersonalprofileController.prototype.progressForUserAvatar = function () {
        return function (json) {
            if (json.total > json.loaded)
                $("#uploadProgress").html("正在上传..." + Math.floor(json.loaded / json.total * 100) + "%");
            else
                $("#uploadProgress").html("上传完成！");
        };
    };
    BcPersonalprofileController.prototype.beforeSubmitUserAvatar = function () {
        return function (json) {
            if (!/(\.|\/)(gif|jpe?g|png)$/i.test(json.files[0].name)) {
                alert("只能上传gif,jpeg,png格式的图片！");
                return false;
            }
        };
    };
    BcPersonalprofileController.prototype.saveBasicUserInfo = function () {
        var userName = $("#txtUserName").val();
        var remark = $("#txtRemark").val();
        if (!userName) {
            Utils.tipAlert(false, "请输入正确的用户名！");
            return;
            this.userService.getUser(function (json) {
                if (userName != json.user.userName)
                    Utils.tipAlert(false, "用户名不能被修改！");
                return;
            });
        }
        this.userService.updateBasicUserInfo(userName, remark, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "用户的基本信息修改成功！");
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    BcPersonalprofileController.prototype.saveDetailUserInfo = function () {
        var keyValueArray = [];
        $("#ulUserProperty input").map(function () {
            keyValueArray.push($(this).attr('name') + "=" + $(this).val());
        });
        $("#ulUserProperty select").map(function () {
            keyValueArray.push($(this).attr('name') + "=" + $(this).val());
        });
        $("#ulUserProperty textarea").map(function () {
            keyValueArray.push($(this).attr('name') + "=" + $(this).html());
        });
        var keyValueStr = keyValueArray.join('&');
        this.userService.updateAutoDetailUserInfo(keyValueStr, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "用户的详细资料修改成功！");
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    BcPersonalprofileController.prototype.getThirdBindInfo = function () {
        this.sdkController = new SDKController();
        this.sdkController.initBind();
    };
    return BcPersonalprofileController;
})(baseController);
/**********
* 订单退货表单
**********/
var BcReturnApplyController = (function (_super) {
    __extends(BcReturnApplyController, _super);
    function BcReturnApplyController() {
        _super.call(this);
        this.isPC = Utils.isPC();
        this.orderService = new OrderService();
        BcReturnApplyController.orderItemReturnService = new OrderItemReturnService();
    }
    //初始化页面元素以及事件
    BcReturnApplyController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    BcReturnApplyController.prototype.bindEvent = function () {
        var _this = this;
        this.registClickSave();
        //提交数量 - 
        $("#downCount").click(function () {
            var num = $("#purchaseNum").val();
            if (num > 1)
                num--;
            $("#purchaseNum").val(num);
        });
        //提交数量 + 
        $("#upCount").click(function () {
            var num = $("#purchaseNum").val();
            if (num < _this.orderItemInfo.purchaseNum)
                num++;
            $("#purchaseNum").val(num);
        });
        //上传图片
        Utils.fileUpload('fileupload', BcReturnApplyController.orderItemReturnService.getUploadImgUrl('UploadReturnImage', BcReturnApplyController.orderItemID, BcReturnApplyController.publishmentSystemID), function (data) {
            if (data.isSuccess) {
                var imgHtml = "";
                imgHtml += '<li>';
                imgHtml += '<a href="{0}" target= "_blank">';
                imgHtml += '<img class= "err-product" width= "50" height= "50" src= "{0}" data-img="1">';
                imgHtml += '</a>';
                imgHtml += '<b>×</b>';
                imgHtml += '<input type="hidden" value="{0}" />';
                imgHtml += '</li>';
                imgHtml = StringUtils.format(imgHtml, data.imageUrl);
                $("#imagePanel").append(imgHtml);
                BcReturnApplyController.imageNum++;
                $("#imagePanel").find("li").unbind("hover");
                $("#imagePanel").find("li").hover(function () {
                    $(this).addClass("hover");
                }, function () {
                    $(this).removeClass("hover");
                });
                $("#imagePanel").find("b").unbind("click");
                $("#imagePanel").find("b").click(function () {
                    $(this).parent("li").remove();
                    BcReturnApplyController.imageNum--;
                });
            }
        });
        $("#btnUpload").click(function () {
            if (BcReturnApplyController.imageNum >= 5) {
                Utils.tipAlert(false, "最多可以上传5张图片！");
                return;
            }
            $("#fileupload").click();
        });
        //手机号码
        $("#samePhone").change(function () {
            if ($(this).is(":checked")) {
                $("#contactPhone").val(BcReturnApplyController.mobile);
                $("#contactPhone").attr("disabled", "disabled");
            }
            else {
                $("#contactPhone").removeAttr("disabled");
            }
        });
    };
    //绑定数据
    BcReturnApplyController.prototype.bindData = function () {
        //服务类型
        var attrs = new Map();
        attrs.set("name", "returnType");
        eOrderItemReturnTypeUtils.addItemsToEle($("#returnTypePanle").get(0), "radio", "bmra_rad", attrs);
        $("input:radio[name='returnType']").eq(0 /* Return */).attr("checked", "checked");
        this.bindOrderItemInfo();
    };
    //绑定订单详情数据
    BcReturnApplyController.prototype.bindOrderItemInfo = function () {
        var _this = this;
        this.orderService.getOrderItem(BcReturnApplyController.orderItemID, BcReturnApplyController.publishmentSystemID, function (json) {
            _this.orderItemInfo = json.orderItemInfo;
            _this.publishmentSystemInfo = json.publishmentSystemInfo;
            _this.orderInfo = json.orderInfo;
            BcReturnApplyController.mobile = json.orderInfo.consignee.mobile;
            BcReturnApplyController.purchaseNum = json.orderItemInfo.purchaseNum;
            _this.render();
        });
    };
    //渲染数据
    BcReturnApplyController.prototype.render = function () {
        var html;
        //order body
        var bodyHtml = '<tr class= "bmr_mtr3"  data="true">';
        bodyHtml += '<td align="left">';
        bodyHtml += '<a href= "{0}" class= "cor_blue">';
        bodyHtml += '<img src="{1}" width= "50" height= "50"> <br>{2}';
        bodyHtml += '</a></td> ';
        bodyHtml += '<td align="center" class= "bmr_mtd1">';
        bodyHtml += '{3}';
        bodyHtml += '</td>';
        bodyHtml += '<td class= "bmr_mtd1" align= "center">{4}</td>';
        bodyHtml += '<td align= "center">{5}</td>';
        bodyHtml += '</tr>';
        html = StringUtils.format(bodyHtml, this.orderItemInfo.navigationUrl, this.orderItemInfo.thumbUrl, this.orderItemInfo.title, this.orderItemInfo.purchaseNum, this.orderItemInfo.priceSale, (this.orderItemInfo.priceSale * this.orderItemInfo.purchaseNum).toString());
        //添加之前删除原有的tr
        $("tr[data='true']").remove();
        //添加
        $("#orderItemTab").append(html);
        //卖家
        $("#publishmentSystemName").html(this.publishmentSystemInfo.publishmentSystemName);
        //买家
        $("#contact").val(this.orderInfo.consignee.userName);
        $("#contactPhone").val(this.orderInfo.consignee.mobile);
    };
    //保存
    BcReturnApplyController.prototype.registClickSave = function () {
        $("#submitReturn").click(function (e) {
            var returnType = $("input:radio[name='returnType']:checked").val();
            var returnCount = $("#purchaseNum").val();
            var inspectReport = $("#inspectReport").is(":checked");
            var description = $("#description").val();
            var images = "";
            $("#imagePanel").find("input[type='hidden']").map(function (index, ele) {
                if (ele.getAttribute("value"))
                    images += ele.getAttribute("value") + ",";
            });
            var contact = $("#contact").val();
            var contactPhone = $("#contactPhone").val();
            if (returnCount < 0 || returnCount > BcReturnApplyController.purchaseNum) {
                Utils.tipAlert(false, "退货数量不正确！");
                return;
            }
            if (!description) {
                Utils.tipAlert(false, "问题描述必须填写！");
                return;
            }
            if (!contact) {
                Utils.tipAlert(false, "联系人姓名必须填写！");
                return;
            }
            if (!contactPhone) {
                Utils.tipAlert(false, "手机号码必须填写！");
                return;
            }
            BcReturnApplyController.orderItemReturnService.saveOrderItemReturn(BcReturnApplyController.orderItemID, BcReturnApplyController.publishmentSystemID, returnType, returnCount, inspectReport, description, images, contact, contactPhone);
        });
    };
    //获取评价订单详情地址
    BcReturnApplyController.getUrl = function (orderItemID, publishmentSystemID) {
        this.parmMap['orderItemID'] = orderItemID;
        this.parmMap['publishmentSystemID'] = publishmentSystemID;
        return "returnApply.html?" + Utils.mapToUrl(this.parmMap);
    };
    BcReturnApplyController.orderItemID = UrlUtils.getUrlVar("orderItemID");
    BcReturnApplyController.publishmentSystemID = UrlUtils.getUrlVar("publishmentSystemID");
    BcReturnApplyController.mobile = "";
    BcReturnApplyController.purchaseNum = 1;
    BcReturnApplyController.imageNum = 0;
    BcReturnApplyController.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
    return BcReturnApplyController;
})(baseController);
var BcSecretPwdController = (function (_super) {
    __extends(BcSecretPwdController, _super);
    function BcSecretPwdController() {
        _super.call(this);
        this.userService = new UserService();
    }
    BcSecretPwdController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            $(".mlayBg").height($(document).height());
            $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
            $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
            $(window).resize(function () {
                $(".mlayBg").height($(document).height());
                $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
                $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
            });
            $(".mrclose").click(function () {
                $(".mlay").slideUp(200);
                $(".mlayBg").hide();
            });
            $("#setSecretPwd").click(function () {
                $(".mlay").slideDown(200);
                $(".mlayBg").show();
            });
            $("#btnUpdate").click(function () {
                $(".mlay").slideDown(200);
                $(".mlayBg").show();
            });
            if (!baseController.user.isSetSQCU) {
                $("#setSecretPwd").html("现在设置");
            }
            else {
                $("#setSecretPwd").html("修改");
            }
            _this.getBasicUserInfo();
            _this.getSecurityQuestionList("selQuestion1");
            _this.getSecurityQuestionList("selQuestion2");
            _this.getSecurityQuestionList("selQuestion3");
            _this.getValidateSecurityQuestionList("selValidate");
            $("#btnValidateQuestion").click(function () {
                _this.validateSecurityQuestion();
            });
            $("#btnSubmitQuestion").click(function () {
                _this.updateSecurityQuestion(1);
            });
            $("#btnUpdateQuestion").click(function () {
                _this.updateSecurityQuestion(2);
            });
            $("#selQuestion1").unbind("change").bind("change", function () {
                _this.checkUserSelectQue("selQuestion1");
            });
            $("#selQuestion2").unbind("change").bind("change", function () {
                _this.checkUserSelectQue("selQuestion2");
            });
            $("#selQuestion3").unbind("change").bind("change", function () {
                _this.checkUserSelectQue("selQuestion3");
            });
        });
    };
    BcSecretPwdController.prototype.checkUserSelectQue = function (selectID) {
        var selectedVal = $("#" + selectID).val();
        var selectArr = $("select");
        for (var i = 0; i < selectArr.length; i++) {
            if ($(selectArr[i]).attr("id") == "selValidate")
                continue;
            if ($(selectArr[i]).attr("id") == selectedVal)
                continue;
            if ($(selectArr[i]).attr("id") != selectID && $(selectArr[i]).val() == selectedVal) {
                Utils.tipAlert(false, "不能选择重复的问题，请重新选择");
                $("#" + selectID).val("0");
                return false;
            }
        }
        return true;
    };
    BcSecretPwdController.prototype.checkUserSelectQues = function () {
        return this.checkUserSelectQue("selQuestion1") && this.checkUserSelectQue("selQuestion2") && this.checkUserSelectQue("selQuestion3");
    };
    BcSecretPwdController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
                if (!json.user.isSetSQCU) {
                    $("#setSecretPwd").html("现在设置");
                }
                else {
                    $("#setSecretPwd").html("修改");
                }
                SecretPwdController.isSetSQCU = json.user.isSetSQCU;
            }
        });
    };
    BcSecretPwdController.prototype.getSecurityQuestionList = function (selectID) {
        this.userService.getSecurityQuestionList(function (json) {
            if (json.isSuccess) {
                $("#" + selectID).html("");
                var selectValue = "0";
                var num = selectID.substr(selectID.length - 1, 1);
                var innerHtml = "<option value='0'>请选择问题</option>";
                for (var i = 0; i < json.securityQuestionList.length; i++) {
                    innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    if (json.securityQuestionList[i].question == eval("(json.que" + num + ")")) {
                        selectValue = json.securityQuestionList[i].id;
                    }
                }
                $("#" + selectID).html(innerHtml);
                $("#" + selectID).val(selectValue);
            }
        });
    };
    //获取用户设置的密保问题
    BcSecretPwdController.prototype.getValidateSecurityQuestionList = function (selectID) {
        this.userService.getSecurityQuestionList(function (json) {
            if (json.isSuccess) {
                $("#" + selectID).html("");
                var innerHtml = "<option value='0'>请选择问题</option>";
                for (var i = 0; i < json.securityQuestionList.length; i++) {
                    if (json.securityQuestionList[i].question == eval("(json.que1)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                    else if (json.securityQuestionList[i].question == eval("(json.que2)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                    else if (json.securityQuestionList[i].question == eval("(json.que3)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                }
                $("#" + selectID).html(innerHtml);
            }
        });
    };
    BcSecretPwdController.prototype.updateSecurityQuestion = function (siteID) {
        if (siteID == 1) {
            var que1 = $("#selQuestion1").find("option:selected").text();
            var que2 = $("#selQuestion2").find("option:selected").text();
            var que3 = $("#selQuestion3").find("option:selected").text();
            var queV1 = $("#selQuestion1").find("option:selected").val();
            var queV2 = $("#selQuestion2").find("option:selected").val();
            var queV3 = $("#selQuestion3").find("option:selected").val();
        }
        else {
            var que1 = $("#spanQuestion1").html();
            var que2 = $("#spanQuestion2").html();
            var que3 = $("#spanQuestion3").html();
        }
        var anw1 = $('#txtAnswer1').val();
        var anw2 = $('#txtAnswer2').val();
        var anw3 = $('#txtAnswer3').val();
        if (queV1 == '0' || queV2 == '0' || queV3 == '0') {
            Utils.tipAlert(false, "问题不能为空");
            return;
        }
        if (!anw1 || !anw2 || !anw3) {
            Utils.tipAlert(false, "答案不能为空");
            return;
        }
        if (!this.checkUserSelectQues()) {
            Utils.tipAlert(false, "密保设置失败-不能选择重复的问题");
            return;
        }
        this.userService.updateSecurityQuestion(que1, que2, que3, anw1, anw2, anw3, function (data) {
            if (data.isSuccess) {
                $(".mlay").slideUp(200);
                $(".mlayBg").hide();
                Utils.tipAlert(true, "密保设置成功！");
            }
            else {
                Utils.tipAlert(false, "密保设置失败-" + data.errorMessage);
            }
        });
        $(".mrclose").click();
    };
    BcSecretPwdController.prototype.validateSecurityQuestion = function () {
        var _this = this;
        var que = $("#selValidate").find("option:selected").text();
        var anw = $('#txtValidateAnswer').val();
        if (que == '0') {
            Utils.tipAlert(false, "问题不能为空");
            return;
        }
        if (!anw) {
            Utils.tipAlert(false, "答案不能为空");
            return;
        }
        this.userService.validateSecurityQuestion(que, anw, function (data) {
            if (data.isSuccess) {
                if (data.isValidate) {
                    //验证通过
                    $("#valDiv").css("display", "none");
                    $("#setDiv").css("display", "block");
                    $("#btnSubmitQuestion").click(function () {
                        _this.updateSecurityQuestion(1);
                    });
                    $("#btnUpdateQuestion").click(function () {
                        _this.updateSecurityQuestion(2);
                    });
                }
                else {
                    //验证不通过
                    Utils.tipAlert(false, "密保验证失败！请重新输入");
                }
            }
            else {
                Utils.tipAlert(false, "密保验证失败-" + data.errorMessage);
            }
        });
    };
    BcSecretPwdController.prototype.getUserSecurityQuestionAnwser = function () {
        this.userService.getUserSecurityQuestionAnwser(function (json) {
            if (json.isSuccess) {
                $("#selQuestion1").find("option[text='" + json.que1 + "']").attr("selected", "true");
                $("#selQuestion2").find("option[text='" + json.que2 + "']").attr("selected", "true");
                $("#selQuestion3").find("option[text='" + json.que3 + "']").attr("selected", "true");
            }
        });
    };
    return BcSecretPwdController;
})(baseController);
/**********
* 订单
**********/
var BcSuggestionController = (function (_super) {
    __extends(BcSuggestionController, _super);
    function BcSuggestionController() {
        _super.call(this);
        this.pageIndex = 1;
        this.prePageNum = 10;
        this.isPC = Utils.isPC();
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        this.keywords = StringUtils.empty;
        BcOrderListController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    BcSuggestionController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindData();
            _this.bindEvent();
        });
    };
    BcSuggestionController.prototype.bindEvent = function () {
        var _this = this;
        if ($("#btnSearch").length > 0) {
            $("#btnSearch").click(function () {
                _this.btnSearchClick();
            });
        }
    };
    BcSuggestionController.prototype.btnSearchClick = function () {
        this.parmMap['keywords'] = $("#txtKeywords").val();
        window.location.href = "?" + Utils.mapToUrl(this.parmMap);
    };
    //绑定数据
    BcSuggestionController.prototype.bindData = function () {
        this.bindOrderList(this.pageIndex, this.prePageNum);
    };
    //绑定订单数据
    BcSuggestionController.prototype.bindOrderList = function (pageIndex, prePageNum) {
        var _this = this;
        this.pageIndex = pageIndex || this.pageIndex;
        this.prePageNum = prePageNum || this.prePageNum;
        this.keywords = UrlUtils.getUrlVar("keywords");
        if ($("#txtKeywords").length > 0) {
            $("#txtKeywords").val(this.keywords);
        }
        BcOrderListController.orderService.getAllOrderListWithSiteInfo("", "", this.isPC, 0, this.keywords, this.pageIndex, this.prePageNum, function (json) {
            BcOrderListController.orderList = json.orderInfoList;
            //加载数据
            _this.render();
            //分页链接
            $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllOrderList1'));
        });
    };
    //渲染数据
    BcSuggestionController.prototype.render = function () {
        var innerHtml = '';
        var htmlTemplate = '';
        var itemTemplate = '';
        htmlTemplate += '<tr class="bmr_mtr3" data="true">';
        htmlTemplate += '    <td align="center"><span class="cor_blue">{0}</span></td>';
        htmlTemplate += '    <td class="bmr_mtd1">';
        htmlTemplate += '{1}';
        itemTemplate += '        <div class="bmrd_pro">';
        itemTemplate += '            <a href="{0}"><img src="{1}" width="50" height="50"></a>';
        itemTemplate += '        </div>';
        htmlTemplate += '    </td>';
        htmlTemplate += '    <td class="cor_999 bmr_mtd1" align="center">{2}</td>';
        htmlTemplate += '    <td class="bmrd_pa1" align="center"><a href="javascript:new BcSuggestionController().openNewWindow(\'{3}\');" class="bmr_pa1">意见建议</a></td>';
        htmlTemplate += '</tr>';
        for (var i = 0; i < BcOrderListController.orderList.length; i++) {
            var itemHtml = '';
            for (var j = 0; j < BcOrderListController.orderList[i].items.length; j++) {
                itemHtml += StringUtils.format(itemTemplate, BcOrderListController.orderList[i].items[j].navigationUrl, BcOrderListController.orderList[i].items[j].thumbUrl);
            }
            innerHtml += StringUtils.format(htmlTemplate, BcOrderListController.orderList[i].orderInfo.orderSN, itemHtml, BcOrderListController.orderList[i].orderInfo.timeOrder.replace('T', '<br/>'), BcOrderListController.orderList[i].qiaoUrl);
        }
        //添加之前删除原有的tr
        $("tr[data='true']").remove();
        //添加
        $("#orderTab").append(innerHtml);
    };
    BcSuggestionController.prototype.openNewWindow = function (url) {
        var w = window.open();
        setTimeout(function () {
            w.location.replace(url);
        }, 500);
        return false;
    };
    return BcSuggestionController;
})(baseController);
var HelpCenterController = (function () {
    function HelpCenterController() {
        this.userService = new UserService();
    }
    HelpCenterController.prototype.init = function () {
        //$("#channelUL").children().eq(4).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("help1.html") != -1) {
        //    $("#accountHelpUrl li a").removeClass("m2menu_cuta");
        //    $("#accountHelpUrl").children().eq(0).children().addClass("m2menu_cuta");
        //}
        //if (locationUrl.indexOf("help2.html") != -1) {
        //    $("#accountHelpUrl li a").removeClass("m2menu_cuta");
        //    $("#accountHelpUrl").children().eq(1).children().addClass("m2menu_cuta");
        //}
        this.getBasicUserInfo();
    };
    HelpCenterController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    return HelpCenterController;
})();
/**********
* 商城用户中心首页
**********/
var BcIndexController = (function (_super) {
    __extends(BcIndexController, _super);
    function BcIndexController() {
        _super.call(this);
        this.pageIndex = 1;
        this.prePageNum = 10;
        this.isCompleted = "";
        this.isPayment = "";
        this.isEmpty = true;
        this.loading = true;
        this.isPC = Utils.isPC();
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        BcIndexController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    BcIndexController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindData();
            _this.bindEvent();
        });
    };
    //绑定事件
    BcIndexController.prototype.bindEvent = function () {
        var _this = this;
        if ($("#selStatus").length > 0) {
            $("#selStatus").change(function () {
                _this.orderStatusChange();
            });
        }
    };
    //绑定数据
    BcIndexController.prototype.bindData = function () {
        //this.bindOrderList(1, 1);//加载最近的一个订单
        this.bindOrderList(this.pageIndex, this.prePageNum); //加载订单列表
        this.bindOrderStatus();
        $("#userAvatar").attr("src", _super.prototype.getUser.call(this)["avatarMiddle"]);
        $("#userName").html(_super.prototype.getUser.call(this)["userName"]);
        _super.prototype.getUserService.call(this).accountSafeLevel(function (json) {
            if (json.isSuccess) {
                if (json.level == 1) {
                    $("#accountSafeLevel").html("低");
                    $("#accountSafePercent").attr("style", "width:30%");
                }
                if (json.level == 2) {
                    $("#accountSafeLevel").html("中");
                    $("#accountSafePercent").attr("style", "width:60%");
                }
                if (json.level == 3) {
                    $("#accountSafeLevel").html("高");
                    $("#accountSafePercent").attr("style", "width:90%");
                }
            }
        });
        //统计信息
        BcIndexController.orderService.getOrderStatistic(function (json) {
            $("#noPay").html(json.noPay);
            $("#noCompleted").html(json.noCompleted);
            $("#total").html(json.total);
            $("#noComment").html(json.noComment);
        });
        //关注商品
        _super.prototype.getUserService.call(this).getUserFollows(1, 20, function (json) {
            var html = '';
            var htmlTemplate = StringUtils.format('<li>');
            htmlTemplate += StringUtils.format('<a href="{0}"><img src="{1}" width="130" height="130"> </a>');
            htmlTemplate += StringUtils.format('<div class="bmr_ixbms1 bmr_ixbms1a" >￥{2} </div>'); //<span class= "bmr_bmtag1" > 直降 < /span>
            // htmlTemplate += StringUtils.format('< div class= "bmr_ixbms2" > <span class= "bmr_bmtag2" > 直降￥118.00</span></div>');
            htmlTemplate += StringUtils.format('</li>');
            for (var i = 0; i < json.followList.length; i++) {
                html += StringUtils.format(htmlTemplate, json.followList[i].navigationUrl, json.followList[i].imageUrl, json.followList[i].goodsPrice);
            }
            $("#followList").html(html);
        });
    };
    //绑定订单数据
    BcIndexController.prototype.bindOrderList = function (pageIndex, prePageNum) {
        var _this = this;
        this.isCompleted = UrlUtils.getUrlVar("isCompleted");
        this.isPayment = UrlUtils.getUrlVar("isPayment");
        //BcIndexController.orderService.getLatestOrderInAll(this.isPC,(json) => {
        BcIndexController.orderService.getAllOrderList(this.isCompleted, this.isPayment, this.isPC, 0, '', this.pageIndex, this.prePageNum, function (json) {
            BcIndexController.orderList = json.orderInfoList;
            _this.loading = false;
            //加载数据
            _this.render();
            //分页链接
            $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllOrderList'));
        });
    };
    //订单状态帅选
    BcIndexController.prototype.orderStatusChange = function () {
        var status = $("#selStatus").val();
        switch (status) {
            case "all":
                window.location.href = this.getUrl(StringUtils.empty, StringUtils.empty, UrlUtils.getUrlVar("orderTime"));
                break;
            case "noPay":
                window.location.href = this.getUrl("false", "false", UrlUtils.getUrlVar("orderTime"));
                break;
            case "pay":
                window.location.href = this.getUrl("false", "true", UrlUtils.getUrlVar("orderTime"));
                break;
            case "completed":
                window.location.href = this.getUrl("true", StringUtils.empty, UrlUtils.getUrlVar("orderTime"));
                break;
        }
    };
    //绑定订单状态帅选
    BcIndexController.prototype.bindOrderStatus = function () {
        if ($("#selStatus").length > 0) {
            if (this.isCompleted == "false" && this.isPayment == "false") {
                $("#selStatus").val("noPay");
            }
            else if (this.isCompleted == "false" && this.isPayment == "true") {
                $("#selStatus").val("pay");
            }
            else if (this.isCompleted == "true") {
                $("#selStatus").val("completed");
            }
        }
    };
    //删除订单
    BcIndexController.prototype.removeOrder = function (orderID) {
        var item = {};
        for (var i = 0; i < BcIndexController.orderList.length; i++) {
            if (BcIndexController.orderList[i].orderInfo.id == orderID) {
                item = BcIndexController.orderList[i];
                break;
            }
        }
        BcIndexController.orderList.splice($.inArray(item, BcIndexController.orderList), 1);
        BcIndexController.orderService.deleteOrder(orderID);
        this.render();
    };
    //渲染数据
    BcIndexController.prototype.render = function () {
        var html;
        //order head
        var headHtml = '<tr class= "bmr_mtr2" data="true">';
        headHtml += '<td colspan="6" >';
        headHtml += '<span class= "bmrc_s2" > 订单编号: <a href="{3}" class="cor_blue" > {0}</a></span >';
        //headHtml += '<span class= "bmrc_s3" >';
        //headHtml += '<a href="{2}" class= "fl cor_blue" > {1}</a>';
        //headHtml += '</span > <a href="#" class= "bmrc_kf" > </a> <span class= "bmrc_tel" >';
        headHtml += '</span> </td> </tr> ';
        //order body
        var bodyHtml = '<tr class= "bmr_mtr3" data="true">';
        bodyHtml += '<td class= "bmr_mtd1" >';
        bodyHtml += '<a class= "bmr_mp1" href= "{0}" >';
        bodyHtml += '<img src="{1}" width= "50" height= "50" > </a>';
        bodyHtml += '</td>';
        bodyHtml += '<td align="center" > {2} </td>';
        bodyHtml += '<td class= "bmr_mtd1" align= "center" >￥{3} <br>在线支付 </td >';
        bodyHtml += '<td class= "bmr_mtd1 cor_999" align= "center" > {4}<br /> {5} </td>';
        bodyHtml += '<td class= "bmr_mtd1" align= "center" > <span class= "cor_999" > {6} </span > </td > ';
        //action
        var actionHtml = '<td align="center" rowspan="{0}">';
        //actionHtml += '<a class= "cor_blue" href= "#" > 查看 </a>';
        actionHtml += ' | <a class= "cor_blue" onclick= "BcIndexController.prototype.removeOrder({1}); " href= "javascript: void (0); " > 删除 </a >';
        actionHtml += '<br>';
        actionHtml += '<a class= "cor_blue" href= "#" > 评价晒单 </a >';
        actionHtml += '<br>';
        actionHtml += '<a class= "cor_blue" href= "#" style= "display:none;" > 申请返修 / 退换货 </a>';
        actionHtml += '<br><a href="#" class= "bmr_mby" > 还要买 </a >';
        actionHtml += '</td > ';
        for (var i = 0; i < BcIndexController.orderList.length; i++) {
            html += StringUtils.format(headHtml, BcIndexController.orderList[i].orderInfo.orderSN, BcIndexController.orderList[i].publishmentSystemInfo.publishmentSystemName, BcIndexController.orderList[i].publishmentSystemInfo.publishmentSystemUrl, BcOrderItemListController.getRedirectUrl(BcIndexController.orderList[i].orderInfo.id, BcIndexController.orderList[i].publishmentSystemInfo.publishmentSystemID));
            var orderDetailStatus = "";
            if (BcIndexController.orderList[i].items.length == 0)
                continue;
            //根据订单状态，得到操作权限
            if (BcIndexController.orderList[i].orderInfo.orderStatus == "已完成") {
                actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" href= "javascript: void (0);" onclick="{1}"  style="display:none;"> 查看 </a> <br><a class="cor_blue" href= "{2}"> 评价晒单</a> <br><a class="cor_blue" href= "javascript: void (0);"  onclick="{3}" style="display:none;"> 申请返修/退换货</a> <br><a href="{4}" class="bmr_mby"> 还要买 </a></td>';
                actionHtml = StringUtils.format(actionHtml, BcIndexController.orderList[i].items.length, "alert('查看')", BcOrderCommentController.getUrl(BcIndexController.orderList[i].orderInfo.id, BcIndexController.orderList[i].publishmentSystemInfo.publishmentSystemID), "alert('返修退换货')", BcIndexController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "已完成";
            }
            else if (BcIndexController.orderList[i].orderInfo.orderStatus == "处理中" && BcIndexController.orderList[i].orderInfo.paymentStatus == "已支付") {
                actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" href= "javascript: void (0);" onclick="{1}"  style="display:none;"> 查看 </a> <br><a href="{2}" class="bmr_mby"> 还要买 </a></td>';
                actionHtml = StringUtils.format(actionHtml, BcIndexController.orderList[i].items.length, "alert('查看')", BcIndexController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "等待发货";
            }
            else if (BcIndexController.orderList[i].orderInfo.orderStatus == "处理中" && BcIndexController.orderList[i].orderInfo.paymentStatus == "未支付") {
                actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" href= "javascript: void (0);"  onclick="{1}"  style="display:none;"> 查看 </a> <a class="cor_blue" onclick="{2}" href="javascript: void (0);">删除</a>';
                actionHtml = StringUtils.format(actionHtml, BcIndexController.orderList[i].items.length, "alert('查看')", "BcIndexController.prototype.removeOrder(" + BcIndexController.orderList[i].orderInfo.id + ")");
                if (BcIndexController.orderList[i].clickString) {
                    actionHtml += StringUtils.format('<br><a href="javascript:void (0);" onclick="{0}" class="cor_blue"> 立即付款 </a>{1}', BcIndexController.orderList[i].clickString, BcIndexController.orderList[i].paymentForm);
                }
                else {
                    actionHtml += StringUtils.format('<br><a href="javascript:void (0);" class="cor_blue" style="color:red;"> 货到付款 </a>');
                }
                actionHtml += StringUtils.format('<br><a href="{0}" class="bmr_mby"> 还要买 </a></td>', BcIndexController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "等待支付";
            }
            else if (BcOrderListController.orderList[i].orderInfo.orderStatus == "已作废") {
                actionHtml = StringUtils.format('<td><a href="{0}" class="bmr_mby"> 还要买 </a></td>', BcOrderListController.orderList[i].items[0].navigationUrl);
                orderDetailStatus = "已作废";
            }
            for (var j = 0; j < BcIndexController.orderList[i].items.length; j++) {
                var date = BcIndexController.orderList[i].orderInfo.timeOrder.split('T');
                html += StringUtils.format(bodyHtml, BcIndexController.orderList[i].items[j].navigationUrl, BcIndexController.orderList[i].items[j].thumbUrl, BcIndexController.orderList[i].orderInfo.userName, BcIndexController.orderList[i].items[j].priceSale, date[0], date[1], orderDetailStatus);
                if (j == 0) {
                    html += actionHtml;
                }
                html += "</tr>";
            }
        }
        //添加之前删除原有的tr
        $("tr[data='true']").remove();
        //添加
        $("#orderTab").append(html);
    };
    BcIndexController.prototype.getUrl = function (isCompleted, isPayment, orderTime, keywords) {
        this.parmMap['isCompleted'] = isCompleted;
        this.parmMap['isPayment'] = isPayment;
        return "?" + Utils.mapToUrl(this.parmMap);
    };
    return BcIndexController;
})(baseController);
/**********
* 订单评价
**********/
var BcOrderCommentController = (function (_super) {
    __extends(BcOrderCommentController, _super);
    function BcOrderCommentController() {
        _super.call(this);
        this.pageIndex = 1;
        this.prePageNum = 10;
        this.isPC = Utils.isPC();
        BcOrderCommentController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    BcOrderCommentController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    BcOrderCommentController.prototype.bindEvent = function () {
    };
    //绑定数据
    BcOrderCommentController.prototype.bindData = function () {
        this.bindOrderItemList(this.pageIndex, this.prePageNum);
    };
    //绑定订单详情数据
    BcOrderCommentController.prototype.bindOrderItemList = function (pageIndex, prePageNum) {
        var _this = this;
        this.pageIndex = pageIndex || this.pageIndex;
        this.prePageNum = prePageNum || this.prePageNum;
        if (BcOrderCommentController.orderInfoID > 0)
            BcOrderCommentController.orderService.getOrderItemList(BcOrderCommentController.orderInfoID, BcOrderCommentController.publishmentSystemID, function (json) {
                BcOrderCommentController.orderList = json.orderList;
                BcOrderCommentController.orderItemList = json.orderItemList;
                _this.render();
                //分页链接
                $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getOrderItemList'));
            });
        else
            BcOrderCommentController.orderService.getAllOrderItemList(this.pageIndex, this.prePageNum, function (json) {
                BcOrderCommentController.orderList = json.orderList;
                BcOrderCommentController.orderItemList = json.orderItemList;
                _this.render();
                //分页链接
                $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getOrderItemList'));
            });
    };
    //渲染数据
    BcOrderCommentController.prototype.render = function () {
        var html = "";
        //orderItem
        var orderItemHtml = '<div data="true" class="bmrp_d2">';
        orderItemHtml += '<div class="bmrp_d2Top clearfix">';
        orderItemHtml += '<a class= "bmrp_pimg" href= "{0}" > <img src="{1}" width= "50" height= "50" > </a><a href= "{0}" class= "bmrp_pname cor_blue" > {2} </a>';
        orderItemHtml += '<span class= "bmrp_stime" > {3} </span><span class= "bmrp_ds3" >';
        orderItemHtml += '<a href="javascript:void(0);" class= "bmrp_tkBtn cor_blue" orderItemID= "{4}" orderSN= "{6}" commentClick= "true" > {5} </a></span > </div>';
        //orderComment
        var orderCommentHtml = '<div class="bmrp_dTk clearfix" id="comment_{0}" style="display:none;">';
        orderCommentHtml += '<i class= "bmrp_ico1" > </i>';
        orderCommentHtml += '<div class= "bmrp_ssd1" orderItemID= "{0}" orderSN= "{3}" starPanel= "true" id= "starPanel_{0}" >';
        orderCommentHtml += '<span class= "bmrp_s3" >';
        orderCommentHtml += '<strong class= "cor_red" >*</strong> 评分：</span>';
        orderCommentHtml += '<i class= "bmrp_xx bmrp_cutxx" > </i>';
        orderCommentHtml += '<i class= "bmrp_xx" > </i>';
        orderCommentHtml += '<i class= "bmrp_xx" > </i>';
        orderCommentHtml += '<i class= "bmrp_xx" > </i>';
        orderCommentHtml += '<i class= "bmrp_xx" > </i>';
        orderCommentHtml += '</div>';
        orderCommentHtml += '<div class= "bmrp_ssd2 clearfix" >';
        orderCommentHtml += '<span class= "bmrp_s3" >';
        orderCommentHtml += '<strong class= "cor_red" >*</strong> 标签：</span>';
        orderCommentHtml += '<div class= "bmrp_tagBox" tagPanel= "true" orderItemID="{0}" orderSN= "{3}" id= "tagPanel_{0}" >';
        orderCommentHtml += '<input type="text" maxlength= "12" style= "width:80px;height:28px;margin-right:2px;border:2px solid #CC0000;float:left;display:none;" orderItemID= "{0}" orderSN= "{3}" extTag= "true" id= "extTag_{0}" />';
        orderCommentHtml += '<a href= "javascript:void(0)" class= "bmrp_a2" style= "display:inline-block;" > 自定义 </a>';
        orderCommentHtml += '</div >';
        orderCommentHtml += '</div>';
        orderCommentHtml += '<div class= "bmrp_ssd3 clearfix" >';
        orderCommentHtml += '<span class= "bmrp_s3" >';
        orderCommentHtml += '<strong class= "cor_red" >*</strong> 心得：</span>';
        orderCommentHtml += '<textarea id="txt_{0}" class= "bmrp_area" name= "" cols= "" rows= "" placeholder= "商品是否给力？快分享你的购买心得吧~" > </textarea>';
        orderCommentHtml += '</div> <div class= "bmrp_ssd4" > 10 - 500字</div>';
        //晒单图片
        orderCommentHtml += '<div class= "bmrp_ssd3 clearfix">';
        orderCommentHtml += '<span class= "bmrp_s3">';
        orderCommentHtml += '<strong class= "cor_red">*</strong> 晒单：</span>';
        orderCommentHtml += '<div class= "bmrf_txt">';
        orderCommentHtml += '<a href="javascript:;" id= "btnUpload_{0}" class="btnUpload"> <img src="images/upImg.jpg" width= "73" height= "25"> </a>';
        orderCommentHtml += '<input id= "fileupload_{0}" type= "file" name= "file" style= "display:none;" />';
        orderCommentHtml += '<div class= "order_return_img">';
        orderCommentHtml += '<ul id="imagePanel_{0}">';
        orderCommentHtml += '</ul>';
        orderCommentHtml += '</div>';
        orderCommentHtml += '<br><div style="clear:both;">为了帮助我们更好的解决问题，请您上传图片<br>';
        orderCommentHtml += '<span class="cor_999">最多可上传5张图片，每张图片大小不超过5M，支持bmp, gif, jpg, png, jpeg格式文件</span></div>';
        orderCommentHtml += '</div>';
        orderCommentHtml += '</div>';
        orderCommentHtml += '<div class= "bmrp_ssd3 clearfix" >';
        orderCommentHtml += '<span class= "bmrp_s3" >&nbsp; </span>';
        orderCommentHtml += '<a class= "bmr_pa1 fl" href= "javascript:void(0);" orderItemID= "{0}" orderSN= "{3}" save= "true" id= "save_{0}" >{1} </a>';
        orderCommentHtml += '<span class= "bmrp_c2x" > <input id="isAnonymous_{0}" class= "bmra_rad" name= "" type= "checkbox" value= "" {2}><label for="isAnonymous_{0}" title= "匿名评价不会展示您的用户昵称，该评价也不会被第三方网站应用" > 匿名评价 <img src= "images/mwh.jpg" width= "16" height= "16" > </label></span>';
        orderCommentHtml += '</div></div> </div>';
        for (var o = 0; o < BcOrderCommentController.orderList.length; o++) {
            var orderInfo = BcOrderCommentController.orderList[o].orderInfo;
            var orderItemList = BcOrderCommentController.orderItemList[orderInfo.orderSN.toLowerCase()];
            for (var i = 0; i < orderItemList.length; i++) {
                var date = orderInfo.timeOrder.split('T');
                if (orderItemList[i].orderItemCommentList.length == 0) {
                    html += StringUtils.format(orderItemHtml, orderItemList[i].navigationUrl, orderItemList[i].thumbUrl, orderItemList[i].title, date[0], orderItemList[i].orderItemID, "发表评价", orderInfo.orderSN);
                    html += StringUtils.format(orderCommentHtml, orderItemList[i].orderItemID, "保存", StringUtils.empty, orderInfo.orderSN);
                }
                else {
                    html += StringUtils.format(orderItemHtml, orderItemList[i].navigationUrl, orderItemList[i].thumbUrl, orderItemList[i].title, date[0], orderItemList[i].orderItemID, "已评价", orderInfo.orderSN);
                    html += StringUtils.format(orderCommentHtml, orderItemList[i].orderItemID, "已评价", "disabled='disabled'", orderInfo.orderSN);
                }
            }
        }
        //添加之前删除原有的tr
        $("div[data='true']").remove();
        //添加
        $("#orderItemList").append(html);
        for (var o = 0; o < BcOrderCommentController.orderList.length; o++) {
            var orderInfo = BcOrderCommentController.orderList[o].orderInfo;
            var orderItemList = BcOrderCommentController.orderItemList[orderInfo.orderSN.toLowerCase()];
            for (var i = 0; i < orderItemList.length; i++) {
                var orderItemID = orderItemList[i].orderItemID;
                if (UrlUtils.getUrlVar("publishmentSystemID") == StringUtils.empty) {
                    BcOrderCommentController.publishmentSystemID = orderInfo.publishmentSystemID;
                }
                var defaultTagArr = orderItemList[i].defaultTags;
                if (orderItemList[i].orderItemCommentList.length > 0) {
                    var firstComment = orderItemList[i].orderItemCommentList[0];
                    for (var j = 0; j < firstComment.star; j++) {
                        $("#starPanel_" + orderItemID).find("i").eq(j).addClass("bmrp_cutxx");
                    }
                    var tagArr = firstComment.tags.split(",");
                    for (var k = 0; k < defaultTagArr.length; k++) {
                        var newTag;
                        if (tagArr.indexOf(defaultTagArr[k]) >= 0) {
                            newTag = StringUtils.format('<a href="javascript:void (0);" class= "bmrp_a1 bmrp_cuta1" value="{0}"> {0} </a>', defaultTagArr[k]);
                            var t = tagArr[k];
                            tagArr.splice($.inArray(tagArr[k], tagArr), 1);
                        }
                        else {
                            newTag = StringUtils.format('<a href="javascript:void (0);" class= "bmrp_a1" value="{0}"> {0} </a>', defaultTagArr[k]);
                        }
                        $(newTag).insertBefore($("#extTag_" + orderItemID));
                    }
                    for (var l = 0; l < tagArr.length; l++) {
                        newTag = StringUtils.format('<a href="javascript:void (0);" class= "bmrp_a1 bmrp_cuta1" value="{0}"> {0} </a>', tagArr[l]);
                        $(newTag).insertBefore($("#extTag_" + orderItemID));
                    }
                    $("#txt_" + orderItemID).val(firstComment.comment);
                    if (firstComment.isAnonymous)
                        $("#isAnonymous_" + orderItemID).attr("checked", "checked");
                    else
                        $("#isAnonymous_" + orderItemID).removeAttr("checked");
                }
                else {
                    for (var k = 0; k < defaultTagArr.length; k++) {
                        newTag = StringUtils.format('<a href="javascript:void (0);" class= "bmrp_a1" value="{0}"> {0} </a>', defaultTagArr[k]);
                        $(newTag).insertBefore($("#extTag_" + orderItemID));
                    }
                }
                if (orderItemList[i].orderItemCommentList.length == 0) {
                    //上传图片
                    Utils.fileUpload('fileupload_' + orderItemID, BcOrderCommentController.orderService.getUploadImgUrl('UploadCommentImage', orderItemID, BcOrderCommentController.publishmentSystemID), function (data) {
                        if (data.isSuccess) {
                            var imgHtml = "";
                            imgHtml += '<li>';
                            imgHtml += '<a href="{0}" target= "_blank">';
                            imgHtml += '<img class= "err-product" width= "50" height= "50" src= "{0}" data-img="1">';
                            imgHtml += '</a>';
                            imgHtml += '<b>×</b>';
                            imgHtml += '<input type="hidden" value="{0}" />';
                            imgHtml += '</li>';
                            imgHtml = StringUtils.format(imgHtml, data.imageUrl);
                            $("#imagePanel_" + data.orderItemID).append(imgHtml);
                            BcReturnApplyController.imageNum++;
                            $("#imagePanel_" + data.orderItemID).find("li").unbind("hover");
                            $("#imagePanel_" + data.orderItemID).find("li").hover(function () {
                                $(this).addClass("hover");
                            }, function () {
                                $(this).removeClass("hover");
                            });
                            $("#imagePanel_" + data.orderItemID).find("b").unbind("click");
                            $("#imagePanel_" + data.orderItemID).find("b").click(function () {
                                $(this).parent("li").remove();
                                BcReturnApplyController.imageNum--;
                            });
                        }
                    });
                }
                else {
                    //已经评价过
                    $("#fileupload_" + orderItemID).remove();
                    if (firstComment.imageUrl.length > 0) {
                        //展示图片地址
                        var li = "";
                        var images = firstComment.imageUrl.split(',');
                        for (var l = 0; l < images.length; l++) {
                            li += StringUtils.format('<li class=""><a href="{0}" target="_blank"><img class="err-product" width="50" height="50" src="{0}" data-img="1"></a></li>', images[l]);
                        }
                        $("#imagePanel_" + orderItemID).html(li);
                    }
                }
            }
        }
        $(".btnUpload").click(function () {
            var oid = $(this).attr("id").split("_")[1];
            if (BcReturnApplyController.imageNum >= 5) {
                Utils.tipAlert(false, "最多可以上传5张图片！");
                return;
            }
            $("#fileupload_" + oid).click();
        });
        //绑定事件
        this.registClickStar();
        this.registshowOrHideComment();
        this.registClickTag();
        this.registClickExtTag();
        this.registClickSave();
    };
    //显示/隐藏评价框
    BcOrderCommentController.prototype.registshowOrHideComment = function () {
        $("a[commentClick='true']").click(function () {
            var orderItemID = $(this).attr("orderItemID");
            var orderSN = $(this).attr("orderSN").toLowerCase();
            var commentPanel = $("#comment_" + orderItemID);
            if (commentPanel.css("display") == "none")
                commentPanel.css("display", "block");
            else
                commentPanel.css("display", "none");
        });
    };
    //星星点击
    BcOrderCommentController.prototype.registClickStar = function () {
        $("div[starPanel='true']").click(function (e) {
            var orderItemID = $(this).attr("orderItemID");
            var orderSN = $(this).attr("orderSN").toLowerCase();
            var event = e;
            var iList = $("#starPanel_" + orderItemID).find("i");
            var orderItemList = BcOrderCommentController.orderItemList[orderSN];
            if (!e && window.event)
                event = window.event;
            if (event.toElement && event.toElement.nodeName != "I") {
                return;
            }
            else {
                for (var j = 0; j < orderItemList.length; j++) {
                    if (orderItemList[j].orderItemID == orderItemID && orderItemList[j].orderItemCommentList.length > 0) {
                        return;
                    }
                }
                $("#starPanel_" + orderItemID).find("i").removeClass("bmrp_cutxx");
                for (var i = 0; i < iList.length; i++) {
                    $("#starPanel_" + orderItemID).find("i").eq(i).addClass("bmrp_cutxx");
                    if (event.toElement === iList[i]) {
                        for (var j = 0; j < orderItemList.length; j++) {
                            var star = orderItemList[j]["star"] || 1;
                            if (orderItemList[j].orderItemID == orderItemID && orderItemList[j].orderItemCommentList.length == 0) {
                                star = i + 1;
                                orderItemList[j]["star"] = star;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        });
    };
    //标签点击事件
    BcOrderCommentController.prototype.registClickTag = function () {
        $("div[tagPanel='true']").click(function (e) {
            var orderItemID = $(this).attr("orderItemID");
            var orderSN = $(this).attr("orderSN").toLowerCase();
            var event = e;
            var orderItemList = BcOrderCommentController.orderItemList[orderSN];
            var iList = $("#tagPanel_" + orderItemID).find("a");
            if (!e && window.event)
                event = window.event;
            if (event.toElement && event.toElement.nodeName != "A") {
                return;
            }
            else if ($(event.toElement).hasClass("bmrp_a2")) {
                for (var j = 0; j < orderItemList.length; j++) {
                    if (orderItemList[j].orderItemID == orderItemID && orderItemList[j].orderItemCommentList.length == 0) {
                        $("#extTag_" + orderItemID).css("display", "inline-block");
                        $("#extTag_" + orderItemID).focus();
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < iList.length; i++) {
                    if (event.toElement === iList[i]) {
                        var currentA = $("#tagPanel_" + orderItemID).find("a").eq(i);
                        for (var j = 0; j < orderItemList.length; j++) {
                            if (orderItemList[j].orderItemID == orderItemID && orderItemList[j].orderItemCommentList.length == 0) {
                                var tags = orderItemList[j]["tags"] || [];
                                if (currentA.hasClass("bmrp_cuta1")) {
                                    currentA.removeClass("bmrp_cuta1");
                                    if (currentA.attr("value") && tags.indexOf(currentA.attr("value")) >= 0) {
                                        tags.splice($.inArray(currentA.attr("value"), tags), 1);
                                    }
                                }
                                else {
                                    currentA.addClass("bmrp_cuta1");
                                    tags.push(currentA.attr("value"));
                                }
                                orderItemList[j]["tags"] = tags;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        });
    };
    //自定义标签回车
    BcOrderCommentController.prototype.registClickExtTag = function () {
        $("input[extTag='true']").keydown(function (e) {
            var orderItemID = $(this).attr("orderItemID");
            var orderSN = $(this).attr("orderSN").toLowerCase();
            var event = e;
            var orderItemList = BcOrderCommentController.orderItemList[orderSN];
            if (!e && window.event)
                event = window.event;
            if (e.keyCode == 13) {
                for (var j = 0; j < orderItemList.length; j++) {
                    if (orderItemList[j].orderItemID == orderItemID && orderItemList[j].orderItemCommentList.length == 0) {
                        var newTag = StringUtils.format('<a href="javascript:void (0);" class= "bmrp_a1 bmrp_cuta1" value="{0}"> {0} </a>', $(this).val());
                        $(newTag).insertBefore(this);
                        var tags = orderItemList[j]["tags"] || [];
                        if ($(this).val() && tags.indexOf($(this).val()) < 0) {
                            tags.push($(this).val());
                        }
                        orderItemList[j]["tags"] = tags;
                    }
                }
                $(this).css("display", "none");
                $(this).val("");
            }
        });
    };
    //保存
    BcOrderCommentController.prototype.registClickSave = function () {
        $("a[save='true']").click(function (e) {
            var orderItemID = $(this).attr("orderItemID");
            var orderSN = $(this).attr("orderSN").toLowerCase();
            var orderItemList = BcOrderCommentController.orderItemList[orderSN];
            var orderItemInfo;
            for (var j = 0; j < orderItemList.length; j++) {
                if (orderItemList[j].orderItemID == orderItemID && orderItemList[j].orderItemCommentList.length == 0) {
                    orderItemInfo = orderItemList[j];
                    var comment = $("#txt_" + orderItemID).val();
                    orderItemList[j]["comment"] = comment;
                    var isAnonymous = $("#isAnonymous_" + orderItemID).is(":checked");
                    orderItemList[j]["isAnonymous"] = isAnonymous;
                    var tags = [];
                    if (!orderItemInfo["tags"])
                        orderItemInfo["tags"] = tags;
                    var star = 1;
                    if (!orderItemInfo["star"])
                        orderItemInfo["star"] = star;
                    //晒单图片
                    var images = "";
                    $("#imagePanel_" + orderItemID).find("input[type='hidden']").map(function (index, ele) {
                        if (ele.getAttribute("value"))
                            images += ele.getAttribute("value") + ",";
                    });
                    if (!orderItemInfo["images"])
                        orderItemInfo["images"] = images;
                    orderItemID = orderItemInfo.orderItemID;
                    BcOrderCommentController.orderService.saveOrderItemComment(BcOrderCommentController.orderInfoID, orderItemID, BcOrderCommentController.publishmentSystemID, orderItemInfo["star"], orderItemInfo["tags"].join(","), orderItemInfo["comment"], orderItemInfo["isAnonymous"], orderItemInfo["images"]);
                    break;
                }
            }
        });
    };
    //获取评价订单详情地址
    BcOrderCommentController.getUrl = function (orderID, publishmentSystemID) {
        BcOrderCommentController.parmMap['orderID'] = orderID;
        BcOrderCommentController.parmMap['publishmentSystemID'] = publishmentSystemID;
        return "myComment.html?" + Utils.mapToUrl(BcOrderCommentController.parmMap);
    };
    BcOrderCommentController.orderInfoID = UrlUtils.getUrlVar("orderID");
    BcOrderCommentController.publishmentSystemID = UrlUtils.getUrlVar("publishmentSystemID");
    BcOrderCommentController.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
    return BcOrderCommentController;
})(baseController);
var SiteMessageController = (function () {
    function SiteMessageController() {
        this.userService = new UserService();
    }
    SiteMessageController.prototype.init = function () {
        //$("#channelUL").children().eq(3).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("sitemessage.html") != -1) {
        //    $("#accountMsgUrl li a").removeClass("m2menu_cuta");
        //    $("#accountMsgUrl").children().eq(2).children().addClass("m2menu_cuta");
        //}
        var _this = this;
        /*弹窗 开始*/
        $(".mlayBg").height($(document).height());
        $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
        $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        $(window).resize(function () {
            $(".mlayBg").height($(document).height());
            $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
            $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        });
        $(".mrclose").click(function () {
            $(".mlay_sm").slideUp(200);
            $(".mlayBg").hide();
        });
        $("#btnSendMsgOpen").click(function () {
            $(".mlay_sm").slideDown(200);
            $(".mlayBg").show();
        });
        /*弹窗 结束*/
        $("#btnSendMsg").click(function () {
            _this.sendMessage();
        });
        this.getBasicUserInfo();
        this.getSiteMessage(1, 10);
    };
    SiteMessageController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    SiteMessageController.prototype.getSiteMessage = function (pageIndex, prePageNum) {
        this.userService.getSiteMessage(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#ulSiteMessage").html("");
                var innerHtml = "";
                for (var i = 0; i < json.userMessageList.length; i++) {
                    if (json.userMessageList[i].isViewed)
                        innerHtml += "<li><a href='" + MessageDetailController.GetRedirectString(json.userMessageList[i].id, HomeUrlUtils.getReturnUrl()) + "' class='fl'>" + json.userMessageList[i].title + "</a><span class='fr'>" + Utils.formatTime(json.userMessageList[i].addDate.replace('T', '  '), "yyyy-MM-dd HH:mm:ss") + "</span></li>";
                    else
                        innerHtml += "<li><a href='" + MessageDetailController.GetRedirectString(json.userMessageList[i].id, HomeUrlUtils.getReturnUrl()) + "' class='class='fl_b'>" + json.userMessageList[i].title + "</a><span class='fr'>" + Utils.formatTime(json.userMessageList[i].addDate.replace('T', '  '), "yyyy-MM-dd HH:mm:ss") + "</span></li>";
                }
                $("#ulSiteMessage").html(innerHtml);
            }
            else {
                Utils.tipAlert(false, "获取消息出错-" + json.errorMessage);
            }
            //分页链接
            var pageHtml = pageDataUtils.getPageHtml(json.pageJson, 'getSiteMessage');
            if (!!pageHtml)
                $("#divPageLink").html(pageHtml);
        });
    };
    SiteMessageController.prototype.sendMessage = function () {
        var userName = $("#userName").val();
        var msg = $("#msg").val();
        var title = $("#title").val();
        var parentID = 0;
        if (!userName) {
            Utils.tipShow($("#userName"), false, "请输入正确的接收人！");
            return;
        }
        else
            Utils.tipShow($("#userName"));
        if (!title) {
            Utils.tipShow($("#title"), false, "请输入标题！");
            return;
        }
        else
            Utils.tipShow($("#title"));
        if (!msg) {
            Utils.tipShow($("#msg"), false, "请输入内容！");
            return;
        }
        else
            Utils.tipShow($("#msg"));
        this.userService.sendMessage(userName, title, msg, function (data) {
            if (data.isSuccess)
                Utils.tipAlert(true, "发送成功！");
            else
                Utils.tipAlert(false, data.errorMessage);
        }, parentID);
    };
    return SiteMessageController;
})();
var BindPhoneController = (function () {
    function BindPhoneController() {
        this.userService = new UserService();
    }
    BindPhoneController.prototype.init = function () {
        //$("#channelUL").children().eq(1).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("bindphone.html") != -1) {
        //    $("#accountSafeUrl li a").removeClass("m2menu_cuta");
        //    $("#accountSafeUrl").children().eq(1).children().addClass("m2menu_cuta");
        //}
        var _this = this;
        /*弹窗 开始*/
        $(".mlayBg").height($(document).height());
        $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
        $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        $(window).resize(function () {
            $(".mlayBg").height($(document).height());
            $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
            $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        });
        $(".mrclose").click(function () {
            $(".mlay").slideUp(200);
            $(".mlayBg").hide();
        });
        this.getEnablePathListForMessage();
        /*弹窗 结束*/
        this.getBasicUserInfo();
        //提交绑定
        $("#btnBindPhone").click(function () {
            _this.bindPhoneValidate();
        });
        //发送验证码
        $("#btnSendPhone").click(function () {
            _this.bindPhone();
        });
    };
    BindPhoneController.prototype.getEnablePathListForMessage = function () {
        this.userService.getEnablePathListForMessage(function (json) {
            if (json.isSuccess) {
                var enable = false;
                for (var i = 0; i < json.list.length; i++) {
                    if (json.list[i] == "ByPhone") {
                        $("#btnBindPhoneOpen").click(function () {
                            $(".mlay").slideDown(200);
                            $(".mlayBg").show();
                        });
                        enable = true;
                        break;
                    }
                }
                if (!enable) {
                    $("#btnBindPhoneOpen").unbind("click");
                    $("#btnBindPhoneOpen").css("background", "#BFBFBF");
                    $("#btnBindPhoneOpen").html("未开通");
                }
            }
        });
    };
    BindPhoneController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
                //绑定信息
                if (json.user.isBindPhone) {
                    $("#phone").html(json.user.mobile);
                    $("#btnBindPhoneOpen").css("display", "none").unbind("click");
                    $("#btnRemoveBindPhoneOpen").css("display", "inline").click(function () {
                        _this.removeBindPhone();
                    });
                    $("#btnReBindPhoneOpen").css("display", "inline").click(function () {
                        $(".mlay").slideDown(200);
                        $(".mlayBg").show();
                    });
                }
            }
        });
    };
    BindPhoneController.prototype.bindPhoneValidate = function () {
        var phoneNum = $("#phoneNum").val();
        var validateCode = $("#validateCode").val();
        if (!phoneNum) {
            Utils.tipAlert(false, "请填写手机号");
            return;
        }
        if (!validateCode) {
            Utils.tipAlert(false, "请填写验证码");
            return;
        }
        this.userService.bindPhoneValidate(phoneNum, validateCode, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "绑定成功");
                HomeUrlUtils.reload();
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    BindPhoneController.prototype.bindPhone = function () {
        var phoneNum = $("#phoneNum").val();
        if (!phoneNum) {
            Utils.tipAlert(false, "请填写手机号");
            return;
        }
        this.userService.bindPhone(phoneNum, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "校验码已经发送到您的手机，请注意查收");
                $("#btnSendPhone").css("display", "none").unbind("click");
                var counterHtml = '<span class="mlay_alr2" id="spanMessage">120秒后可重新获取</span>';
                $(counterHtml).insertAfter($("#validateCode"));
                var interval = 1000;
                var counter = 120;
                var interl = setInterval(function () {
                    var _this = this;
                    counter--;
                    $("#spanMessage").html(counter + "秒后可重新获取");
                    if (counter == 0) {
                        clearInterval(interl);
                        $("#spanMessage").remove();
                        $("#btnSendPhone").css("display", "inline").click(function () {
                            _this.bindPhone();
                        });
                    }
                }, interval);
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    BindPhoneController.prototype.removeBindPhone = function () {
        this.userService.removeBindPhone(function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "解除绑定成功");
                HomeUrlUtils.reload();
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    return BindPhoneController;
})();
var ChangePwdController = (function () {
    function ChangePwdController() {
        this.userService = new UserService();
    }
    ChangePwdController.prototype.init = function () {
        var _this = this;
        //$("#channelUL").children().eq(1).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("changepwd.html") != -1) {
        //    $("#accountSafeUrl li a").removeClass("m2menu_cuta");
        //    $("#accountSafeUrl").children().eq(0).children().addClass("m2menu_cuta");
        //}
        this.getBasicUserInfo();
        $("#btnChangePwd").click(function () {
            _this.ChangePwd();
        });
        this.blurCheck();
    };
    ChangePwdController.prototype.blurCheck = function () {
        $("#txtOldPwd").blur(function () {
            if (!$("#txtOldPwd").val()) {
                Utils.tipShow($("#txtOldPwd"), false, "请输入正确的原始密码！");
            }
            else {
                Utils.tipShow($("#txtOldPwd"), true);
            }
        });
        $("#txtNewPwd").blur(function () {
            if (!$("#txtNewPwd").val()) {
                Utils.tipShow($("#txtNewPwd"), false, "请输入正确的新密码！");
            }
            else {
                Utils.tipShow($("#txtNewPwd"), true);
            }
            if ($("#txtConfimNewPwd").val() != $("#txtNewPwd").val()) {
                Utils.tipShow($("#txtConfimNewPwd"), false, "两次输入的新密码不一致！");
            }
            else {
                Utils.tipShow($("#txtConfimNewPwd"), true);
            }
        });
        $("#txtConfimNewPwd").blur(function () {
            if (!$("#txtConfimNewPwd").val()) {
                Utils.tipShow($("#txtConfimNewPwd"), false, "请输入再一次输入新密码！");
            }
            else if ($("#txtConfimNewPwd").val() != $("#txtNewPwd").val()) {
                Utils.tipShow($("#txtConfimNewPwd"), false, "两次输入的新密码不一致！");
            }
            else {
                Utils.tipShow($("#txtConfimNewPwd"), true);
            }
        });
    };
    ChangePwdController.prototype.ChangePwd = function () {
        var currentPassword = $('#txtOldPwd').val();
        var newPassword = $('#txtNewPwd').val();
        var confimPassword = $('#txtConfimNewPwd').val();
        if (!currentPassword) {
            Utils.tipShow($('#txtOldPwd'), false, "请输入正确的原始密码");
            return;
        }
        else {
            Utils.tipShow($('#txtOldPwd'));
        }
        if (!newPassword) {
            Utils.tipShow($('#txtNewPwd'), false, "请输入正确的新密码");
            return;
        }
        else {
            Utils.tipShow($('#txtNewPwd'));
        }
        if (!confimPassword) {
            Utils.tipShow($('#txtConfimNewPwd'), false, "请输入再一次输入新密码");
            return;
        }
        else if (newPassword != confimPassword) {
            Utils.tipShow($('#txtConfimNewPwd'), false, "两次输入的新密码不一致");
            return;
        }
        else {
            Utils.tipShow($('#txtConfimNewPwd'));
        }
        this.userService.changePassword(currentPassword, newPassword, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "用户密码修改成功！");
                $("#txtOldPwd").val("");
                $("#txtNewPwd").val("");
                $("#txtConfimNewPwd").val("");
            }
            else {
                Utils.tipAlert(false, "用户密码修改失败！" + data.errorMessage);
            }
        });
    };
    ChangePwdController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    return ChangePwdController;
})();
var FindPwdController = (function () {
    function FindPwdController() {
        this.userService = new UserService();
    }
    FindPwdController.prototype.init = function () {
        var _this = this;
        $("#btnSubmitFindStep1").click(function () {
            _this.findPasswordByEmailStep1();
        });
        $("#btnSumbitNewPwd").click(function () {
            var findTypeValue = $(':radio[name="findType"]:checked').val();
            if (findTypeValue == 1) {
                _this.findPassword("phone");
            }
            else if (findTypeValue == 2) {
                _this.findPassword("email");
            }
            else if (findTypeValue == 3) {
                _this.findPassword("sqcu");
            }
        });
        //this.getSecurityQuestionList("selQuestion1");
        //this.getSecurityQuestionList("selQuestion2");
        //this.getSecurityQuestionList("selQuestion3");
        this.getEnablePathList();
        $("#btnSumbitQue").click(function () {
            _this.findPasswordBySCQUStep2();
        });
    };
    FindPwdController.prototype.findPasswordByEmailStep1 = function () {
        var _this = this;
        var txtFindPwdUserName = $("#txtFindPwdUserName").val();
        var txtValidateCode = $("#validateCode").val();
        if (!txtFindPwdUserName) {
            Utils.tipAlert(false, "请填写要找回密码的用户名！");
            return;
        }
        if (!txtValidateCode) {
            Utils.tipAlert(false, "请填写验证码！");
            return;
        }
        var findTypeValue = $(':radio[name="findType"]:checked').val();
        if (!findTypeValue) {
            Utils.tipAlert(false, "请选择找回密码的方式！");
            return;
        }
        if (findTypeValue == 1) {
            this.userService.findPasswordByPhoneStep1(txtFindPwdUserName, function (json) {
                if (json.isSuccess) {
                    $("#btnSendEmail").unbind("click").click(function () {
                        _this.findPasswordByPhoneStep2();
                    });
                    $("#btnSubmitEmail").unbind("click").click(function () {
                        _this.findPasswordByPhoneStep3();
                    });
                    $("#login").attr("placeholder", "请输入您的登录手机");
                    $("#loginKey").html("登录手机：");
                    $("#loginDes").html("我们会向您的手机发送一封验证码，请注意查收。");
                    $("#findPwdStep1").hide();
                    $("#findPwdStep2").show();
                    $("#findPwdStep3").hide();
                    $("#findPwdStep4").hide();
                    $("#findPwdStep5").hide();
                    $("#findStepKey1").val(json.key);
                    $("#btnPre1").click(function () {
                        $("#findPwdStep2").hide();
                        $("#findPwdStep1").show();
                    });
                }
                else {
                    Utils.tipAlert(false, json.errorMessage);
                }
            }, txtValidateCode);
        }
        if (findTypeValue == 2) {
            this.userService.findPasswordByEmailStep1(txtFindPwdUserName, function (json) {
                if (json.isSuccess) {
                    $("#btnSendEmail").unbind("click").click(function () {
                        _this.findPasswordByEmailStep2();
                    });
                    $("#btnSubmitEmail").unbind("click").click(function () {
                        _this.findPasswordByEmailStep3();
                    });
                    $("#login").attr("placeholder", "请输入您的登录邮箱");
                    $("#loginKey").html("登录邮箱：");
                    $("#loginDes").html("我们会向您的邮箱发送一封验证码，请注意查收。");
                    $("#findPwdStep1").hide();
                    $("#findPwdStep2").show();
                    $("#findPwdStep3").hide();
                    $("#findPwdStep4").hide();
                    $("#findPwdStep5").hide();
                    $("#findStepKey1").val(json.key);
                    $("#btnPre1").click(function () {
                        $("#findPwdStep2").hide();
                        $("#findPwdStep1").show();
                    });
                }
                else {
                    Utils.tipAlert(false, json.errorMessage);
                }
            }, txtValidateCode);
        }
        if (findTypeValue == 3) {
            this.userService.findPasswordBySCQUStep1(txtFindPwdUserName, function (json) {
                if (json.isSuccess) {
                    $("#findPwdStep1").hide();
                    $("#findPwdStep2").hide();
                    $("#findPwdStep3").show();
                    $("#findPwdStep4").hide();
                    $("#findPwdStep5").hide();
                    $("#findStepKey1").val(json.key);
                    _this.getValidateSecurityQuestionList("selValidate", txtFindPwdUserName);
                    $("#btnPre2").click(function () {
                        $("#findPwdStep3").hide();
                        $("#findPwdStep1").show();
                    });
                }
                else {
                    Utils.tipAlert(false, json.errorMessage);
                }
            }, txtValidateCode);
        }
    };
    FindPwdController.prototype.findPasswordByEmailStep2 = function () {
        var txtFindPwdUserName = $("#txtFindPwdUserName").val();
        var txtFindPwdEmail = $("#txtFindPwdByEmail").val();
        if (!txtFindPwdEmail) {
            Utils.tipAlert(false, "请填写需要验证的邮箱！");
            return;
        }
        else if (!Utils.isEmail(txtFindPwdEmail)) {
            Utils.tipAlert(false, "请填写正确格式的邮箱！");
            return;
        }
        var key = $("#findStepKey1").val();
        this.userService.findPasswordByEmailStep2(txtFindPwdUserName, txtFindPwdEmail, key, function (json) {
            if (json.isSuccess) {
                $("#findStepKey2").val(json.key);
                $("#spanSendEmail").html("邮件发送成功请查收！");
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    FindPwdController.prototype.findPasswordByEmailStep3 = function () {
        var txtFindPwdUserName = $("#txtFindPwdUserName").val();
        var txtFindPwdEmail = $("#txtFindPwdByEmail").val();
        if (!txtFindPwdUserName) {
            Utils.tipAlert(false, "请填写需要验证的邮箱！");
            return;
        }
        var txtValidateCode = $("#txtValidateCode").val();
        var key = $("#findStepKey2").val();
        this.userService.findPasswordByEmailStep3(txtFindPwdUserName, txtValidateCode, txtFindPwdEmail, key, function (json) {
            if (json.isSuccess) {
                $("#findPwdStep1").hide();
                $("#findPwdStep2").hide();
                $("#findPwdStep3").hide();
                $("#findPwdStep4").show();
                $("#findPwdStep5").hide();
                $("#findStepKey0").val(json.key);
                $("#btnPre3").click(function () {
                    $("#findPwdStep4").hide();
                    var findTypeValue = $(':radio[name="findType"]:checked').val();
                    if (findTypeValue == 1 || findTypeValue == 2) {
                        $("#findPwdStep2").show();
                    }
                    else if (findTypeValue == 3) {
                        $("#findPwdStep3").show();
                    }
                });
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    FindPwdController.prototype.findPasswordByPhoneStep2 = function () {
        var txtFindPwdUserName = $("#txtFindPwdUserName").val();
        var txtFindPwdPhone = $("#txtFindPwdByEmail").val();
        if (!txtFindPwdPhone) {
            Utils.tipAlert(false, "请填写需要验证的手机号！");
            return;
        }
        else if (!Utils.isMobile(txtFindPwdPhone)) {
            Utils.tipAlert(false, "请填写正确格式的手机号！");
            return;
        }
        var key = $("#findStepKey1").val();
        this.userService.findPasswordByPhoneStep2(txtFindPwdUserName, txtFindPwdPhone, key, function (json) {
            if (json.isSuccess) {
                $("#findStepKey2").val(json.key);
                Utils.tipAlert(true, "邮件发送成功请查收！");
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    FindPwdController.prototype.findPasswordByPhoneStep3 = function () {
        var txtFindPwdUserName = $("#txtFindPwdUserName").val();
        var txtFindPwdPhone = $("#txtFindPwdByEmail").val();
        if (!txtFindPwdPhone) {
            Utils.tipAlert(false, "请填写需要验证的手机号！");
            return;
        }
        var txtValidateCode = $("#txtValidateCode").val();
        if (!txtValidateCode) {
            Utils.tipAlert(false, "请填写短信验证码！");
            return;
        }
        var key = $("#findStepKey2").val();
        this.userService.findPasswordByPhoneStep3(txtFindPwdUserName, txtValidateCode, txtFindPwdPhone, key, function (json) {
            if (json.isSuccess) {
                $("#findPwdStep1").hide();
                $("#findPwdStep2").hide();
                $("#findPwdStep3").hide();
                $("#findPwdStep4").show();
                $("#findPwdStep5").hide();
                $("#findStepKey0").val(json.key);
                $("#btnPre3").click(function () {
                    $("#findPwdStep4").hide();
                    var findTypeValue = $(':radio[name="findType"]:checked').val();
                    if (findTypeValue == 1 || findTypeValue == 2) {
                        $("#findPwdStep2").show();
                    }
                    else if (findTypeValue == 3) {
                        $("#findPwdStep3").show();
                    }
                });
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    FindPwdController.prototype.findPassword = function (type) {
        var userName = $("#txtFindPwdUserName").val();
        var email = $("#txtFindPwdByEmail").val();
        var key = $("#findStepKey0").val();
        var newPassword = $("#txtNewPwd").val();
        var newConfimPwd = $("#txtNewConfimPwd").val();
        if (!newPassword) {
            Utils.tipAlert(false, "请输入新的密码");
            return;
        }
        if (!newConfimPwd) {
            Utils.tipAlert(false, "请再一次输入新的密码");
            return;
        }
        if (newPassword != newConfimPwd) {
            Utils.tipAlert(false, "两次输入的密码不一致");
            return;
        }
        this.userService.findPassword(newPassword, userName, email, type, key, function (json) {
            if (json.isSuccess) {
                $("#findPwdStep1").hide();
                $("#findPwdStep2").hide();
                $("#findPwdStep3").hide();
                $("#findPwdStep4").hide();
                $("#findPwdStep5").show();
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    //获取用户设置的密保问题
    FindPwdController.prototype.getValidateSecurityQuestionList = function (selectID, userName) {
        this.userService.getSecurityQuestionList(function (json) {
            if (json.isSuccess) {
                $("#" + selectID).html("");
                var innerHtml = "<option value='0'>请选择问题</option>";
                for (var i = 0; i < json.securityQuestionList.length; i++) {
                    if (json.securityQuestionList[i].question == eval("(json.que1)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                    else if (json.securityQuestionList[i].question == eval("(json.que2)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                    else if (json.securityQuestionList[i].question == eval("(json.que3)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                }
                $("#" + selectID).html(innerHtml);
            }
        }, userName);
    };
    FindPwdController.prototype.getSecurityQuestionList = function (selectID) {
        this.userService.getSecurityQuestionList(function (json) {
            if (json.isSuccess) {
                $("#" + selectID).html("");
                var innerHtml = "<option value='0'>请选择问题</option>";
                for (var i = 0; i < json.securityQuestionList.length; i++) {
                    innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                }
                $("#" + selectID).html(innerHtml);
            }
        });
    };
    FindPwdController.prototype.getEnablePathList = function () {
        this.userService.getEnablePathList(function (json) {
            if (json.isSuccess) {
                for (var i = 0; i < json.list.length; i++) {
                    $("#" + json.list[i]).css("display", "");
                }
            }
        });
    };
    FindPwdController.prototype.findPasswordBySCQUStep2 = function () {
        var userName = $("#txtFindPwdUserName").val();
        var txtFindPwdEmail = $("#txtFindPwdByEmail").val();
        var KeyStep1 = $("#findStepKey1").val();
        var que = $("#selValidate").find("option:selected").text();
        var anw = $('#txtValidateAnswer').val();
        this.userService.findPasswordBySCQUStep2(userName, KeyStep1, que, anw, function (json) {
            if (json.isSuccess) {
                $("#findPwdStep1").hide();
                $("#findPwdStep2").hide();
                $("#findPwdStep3").hide();
                $("#findPwdStep4").show();
                $("#findPwdStep5").hide();
                $("#findStepKey0").val(json.key);
                $("#btnPre3").click(function () {
                    $("#findPwdStep4").hide();
                    var findTypeValue = $(':radio[name="findType"]:checked').val();
                    if (findTypeValue == 1 || findTypeValue == 2) {
                        $("#findPwdStep2").show();
                    }
                    else if (findTypeValue == 3) {
                        $("#findPwdStep3").show();
                    }
                });
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    return FindPwdController;
})();
var HomeController = (function () {
    function HomeController() {
        this.userService = new UserService();
    }
    HomeController.prototype.init = function () {
        //$("#channelUL").children().eq(0).children().addClass("nav_cuta");
        this.getBasicUserInfo();
        this.getUserLoginLog(1, 10);
        this.accountSafeLevel();
    };
    HomeController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                $("#divUserName").html(json.user.userName);
                $("#userImg").attr("src", json.user.avatarMiddle);
                $("#divLastLoginTime").html(json.user.lastActivityDate.replace("T", "  "));
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    HomeController.prototype.getUserLoginLog = function (pageIndex, prePageNum) {
        this.userService.getUserLoginLog(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#tbUserLog").html("");
                var innerHtml = "<tr class='m2r_th'><td>IP地址</td><td>日期</td><td>备注</td></tr>"; //<td>城市</td>
                for (var i = 0; i < json.userLoginInfoList.length; i++) {
                    innerHtml += "<tr>";
                    innerHtml += "<td>" + json.userLoginInfoList[i].ipAddress + "</td>";
                    innerHtml += "<td>" + Utils.formatTime(json.userLoginInfoList[i].addDate.replace("T", "  "), "yyyy-MM-dd HH:mm:ss") + "</td>";
                    //innerHtml += "<td>" + json.userLoginInfoList[i].city + "</td>";
                    innerHtml += "<td>" + json.userLoginInfoList[i].summary + "</td>";
                    innerHtml += "</tr>";
                }
                $("#tbUserLog").html(innerHtml);
                //分页链接
                $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getUserLoginLogData'));
            }
        });
    };
    HomeController.prototype.accountSafeLevel = function () {
        this.userService.accountSafeLevel(function (json) {
            if (json.isSuccess) {
                if (json.level == 1) {
                    $("#spanAccountLevel").html("低");
                    $("#spanAccountNum").attr("style", "width:30%");
                }
                if (json.level == 2) {
                    $("#spanAccountLevel").html("中");
                    $("#spanAccountNum").attr("style", "width:60%");
                }
                if (json.level == 3) {
                    $("#spanAccountLevel").html("高");
                    $("#spanAccountNum").attr("style", "width:90%");
                }
                if (json.isBindEmai) {
                    $(".bindEmail").html("修改");
                    $("#iconEmail").addClass("m2r_ico1");
                    $("#iconEmail").removeClass("m2r_ico2");
                }
                else {
                    $(".bindEmail").html("绑定");
                    $("#iconEmail").removeClass("m2r_ico1");
                    $("#iconEmail").addClass("m2r_ico2");
                }
                if (json.isBindPhone) {
                    $(".bindPhone").html("修改");
                    $("#iconPhone").addClass("m2r_ico1");
                    $("#iconPhone").removeClass("m2r_ico2");
                }
                else {
                    $(".bindPhone").html("绑定");
                    $("#iconPhone").removeClass("m2r_ico1");
                    $("#iconPhone").addClass("m2r_ico2");
                }
                if (json.isSetSQCU) {
                    $(".bindQsuc").html("修改");
                    $("#iconQscu").addClass("m2r_ico1");
                    $("#iconQscu").removeClass("m2r_ico2");
                }
                else {
                    $(".bindQsuc").html("绑定");
                    $("#iconQscu").removeClass("m2r_ico1");
                    $("#iconQscu").addClass("m2r_ico2");
                }
                if (json.pwdComplex) {
                    $(".bindpwd").html("修改");
                    $("#iconPwd").addClass("m2r_ico1");
                    $("#iconPwd").removeClass("m2r_ico2");
                }
                else {
                    $(".bindpwd").html("绑定");
                    $("#iconPwd").removeClass("m2r_ico1");
                    $("#iconPwd").addClass("m2r_ico2");
                }
            }
        });
    };
    return HomeController;
})();
var LoginEmailController = (function () {
    function LoginEmailController() {
        this.userService = new UserService();
    }
    LoginEmailController.prototype.init = function () {
        //$("#channelUL").children().eq(1).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("loginemail.html") != -1) {
        //    $("#accountSafeUrl li a").removeClass("m2menu_cuta");
        //    $("#accountSafeUrl").children().eq(2).children().addClass("m2menu_cuta");
        //}
        var _this = this;
        $(".mlayBg").height($(document).height());
        $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
        $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        $(window).resize(function () {
            $(".mlayBg").height($(document).height());
            $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
            $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        });
        $(".mrclose").click(function () {
            $(".mlay").slideUp(200);
            $(".mlayBg").hide();
        });
        this.getBasicUserInfo();
        $("#btnSetEmail").click(function () {
            $(".mlay").slideDown(200);
            $(".mlayBg").show();
        });
        $("#btnUpdateEmail").click(function () {
            $(".mlay").slideDown(200);
            $(".mlayBg").show();
        });
        $("#btnSendEmail").click(function () {
            _this.bindEmail();
        });
        $("#btnSubmitEmail").click(function () {
            _this.SendEmail();
        });
        this.getEnablePathListForMessage();
    };
    LoginEmailController.prototype.getEnablePathListForMessage = function () {
        this.userService.getEnablePathListForMessage(function (json) {
            if (json.isSuccess) {
                var enable = false;
                for (var i = 0; i < json.list.length; i++) {
                    if (json.list[i] == "ByEmail") {
                        $("#btnSetEmail").click(function () {
                            $(".mlay").slideDown(200);
                            $(".mlayBg").show();
                        });
                        $("#btnUpdateEmail").click(function () {
                            $(".mlay").slideDown(200);
                            $(".mlayBg").show();
                        });
                        enable = true;
                        break;
                    }
                }
                if (!enable) {
                    $("#btnSetEmail").unbind("click");
                    $("#btnSetEmail").css("background", "#BFBFBF");
                    $("#btnSetEmail").html("未开通");
                    $("#btnUpdateEmail").unbind("click");
                    $("#btnUpdateEmail").css("background", "#BFBFBF");
                    $("#btnUpdateEmail").html("未开通");
                }
            }
        });
    };
    LoginEmailController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                $("#spanUserBindEmail").html(json.user.email);
                if (!json.user.email) {
                    $("#divNoBindEmail").show();
                    $("#divBindEmail").hide();
                }
                else if (json.user.email && !json.user.isBindEmail) {
                    $("#divNoBindEmail").hide();
                    $("#divBindEmail").show();
                    $("#btnUpdateEmail").html("绑定");
                    $("#txtSendEmail").val(json.user.email);
                }
                else {
                    $("#divNoBindEmail").hide();
                    $("#divBindEmail").show();
                    $("#btnUpdateEmail").html("修改");
                }
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    LoginEmailController.prototype.bindEmail = function () {
        var email = $("#txtSendEmail").val();
        if (!Utils.isEmail(email)) {
            Utils.tipAlert(false, "请填写正确的邮箱！");
            return;
        }
        this.userService.bindEmail(email, function (json) {
            if (json.isSuccess) {
                Utils.tipAlert(true, "发送成功,请登录邮箱查看");
                $("#btnSendEmail").css("display", "none").unbind("click");
                var counterHtml = '<span class="mlay_alr2" id="spanMessage">120秒后可重新获取</span>';
                $(counterHtml).insertAfter($("#txtValidateCode"));
                var interval = 1000;
                var counter = 120;
                var interl = setInterval(function () {
                    var _this = this;
                    counter--;
                    $("#spanMessage").html(counter + "秒后可重新获取");
                    if (counter == 0) {
                        clearInterval(interl);
                        $("#spanMessage").remove();
                        $("#btnSendEmail").css("display", "inline").click(function () {
                            _this.bindEmail();
                        });
                    }
                }, interval);
            }
            else {
                Utils.tipAlert(false, "发送失败，" + json.errorMessage);
            }
        });
    };
    LoginEmailController.prototype.SendEmail = function () {
        var email = $("#txtSendEmail").val();
        var validateCode = $("#txtValidateCode").val();
        if (!email || !validateCode) {
            Utils.tipAlert(false, "邮箱绑定数据填写不完整！");
            return;
        }
        this.userService.bindEmailValidate(email, validateCode, function (json) {
            if (json.isSuccess) {
                $(".mlay").hide();
                Utils.tipAlert(true, "邮箱绑定成功！");
                HomeUrlUtils.reload();
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        });
    };
    return LoginEmailController;
})();
var LoginRecordController = (function () {
    function LoginRecordController() {
        this.userService = new UserService();
    }
    LoginRecordController.prototype.init = function () {
        //$("#channelUL").children().eq(1).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("loginrecord.html") != -1) {
        //    $("#accountSafeUrl li a").removeClass("m2menu_cuta");
        //    $("#accountSafeUrl").children().eq(4).children().addClass("m2menu_cuta");
        //}
        this.getBasicUserInfo();
        this.getUserLoginLog(1, 10);
    };
    LoginRecordController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    LoginRecordController.prototype.getUserLoginLog = function (pageIndex, prePageNum) {
        this.userService.getUserLoginLog(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#tbUserLog").html("");
                var innerHtml = "<tr class='m2r_th'><td>IP地址</td><td>日期</td><td>备注</td></tr>"; //<td>城市</td>
                for (var i = 0; i < json.userLoginInfoList.length; i++) {
                    innerHtml += "<tr>";
                    innerHtml += "<td>" + json.userLoginInfoList[i].ipAddress + "</td>";
                    innerHtml += "<td>" + Utils.formatTime(json.userLoginInfoList[i].addDate.replace("T", "  "), "yyyy-MM-dd HH:mm:ss") + "</td>";
                    //innerHtml += "<td>" + json.userLoginInfoList[i].city + "</td>";
                    innerHtml += "<td>" + json.userLoginInfoList[i].summary + "</td>";
                    innerHtml += "</tr>";
                }
                $("#tbUserLog").html(innerHtml);
                //分页链接
                $("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getUserLoginLogData'));
            }
        });
    };
    return LoginRecordController;
})();
var UserDetailController = (function () {
    function UserDetailController() {
        this.userService = new UserService();
    }
    UserDetailController.prototype.init = function () {
        //$("#channelUL").children().eq(2).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("detail.html") != -1) {
        //    $("#accountInfoUrl li a").removeClass("m2menu_cuta");
        //    $("#accountInfoUrl").children().eq(2).children().addClass("m2menu_cuta");
        //}
        var _this = this;
        this.getDetailUserInfo();
        $("#btnSaveUserDetailInfo").click(function () {
            _this.saveDetailUserInfo();
        });
    };
    UserDetailController.prototype.saveDetailUserInfo = function () {
        var keyValueArray = [];
        $("#ulUserProperty input").map(function () {
            keyValueArray.push($(this).attr('name') + "=" + $(this).val());
        });
        $("#ulUserProperty select").map(function () {
            keyValueArray.push($(this).attr('name') + "=" + $(this).val());
        });
        $("#ulUserProperty textarea").map(function () {
            keyValueArray.push($(this).attr('name') + "=" + $(this).html());
        });
        var keyValueStr = keyValueArray.join('&');
        this.userService.updateAutoDetailUserInfo(keyValueStr, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "用户的详细资料修改成功！");
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    UserDetailController.prototype.getDetailUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                $("#txtUserName").val(json.user.userName);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
                _this.userService.loadUserProperty(function (json) {
                    if (json.isSuccess) {
                        $("#ulUserProperty").html(json.userPropertys);
                        $("#ulUserProperty input").addClass("mcr_int1 mcr_int2");
                        $("#ulUserProperty select").addClass("mcr_sel");
                    }
                });
            }
        });
    };
    return UserDetailController;
})();
/// <reference path="baseController.ts" />
/**********
* 订单详情
**********/
var BcOrderItemListController = (function (_super) {
    __extends(BcOrderItemListController, _super);
    function BcOrderItemListController() {
        _super.call(this);
        this.isPC = Utils.isPC();
        this.isEmpty = true;
        this.loading = true;
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        BcOrderItemListController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    BcOrderItemListController.prototype.init = function () {
        var _this = this;
        baseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    BcOrderItemListController.prototype.bindEvent = function () {
    };
    //绑定数据
    BcOrderItemListController.prototype.bindData = function () {
        this.bindOrderItemList();
    };
    //绑定订单数据
    BcOrderItemListController.prototype.bindOrderItemList = function () {
        var _this = this;
        BcOrderItemListController.orderService.getOrderItemList(BcOrderItemListController.orderInfoID, BcOrderItemListController.publishmentSystemID, function (json) {
            BcOrderItemListController.orderInfo = json.orderList[0].orderInfo;
            BcOrderItemListController.orderItemList = json.orderItemList;
            BcOrderItemListController.clickString = json.orderList[0].clickString;
            BcOrderItemListController.isPaymentClick = json.orderList[0].isPaymentClick;
            BcOrderItemListController.paymentForm = json.orderList[0].paymentForm;
            //加载数据
            _this.render();
            //分页链接
            //$("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllOrderItemList'));
            //绑定订单信息
            $(".orderSN").html(BcOrderItemListController.orderSN); //订单SN
            $(".orderStatusDescription").html(BcOrderItemListController.orderStatusDescription); //订单状态
            $(".orderComment").attr("href", BcOrderItemListController.urlForComment); //发表评价
            //设置付款信息
            if (BcOrderItemListController.paymentType == 0) {
                $(".payment").html("在线付款");
            }
            else {
                $(".payment").html("货到付款");
            }
            $(".priceTotal").html(BcOrderItemListController.orderInfo.priceTotal);
            $(".priceShipment").html(BcOrderItemListController.orderInfo.priceShipment);
            $(".priceReturn").html(BcOrderItemListController.orderInfo.priceReturn);
            $(".priceActual").html(BcOrderItemListController.orderInfo.priceActual);
            if (BcOrderItemListController.orderStatus >= 2) {
                $(".paidDate").html(BcOrderItemListController.orderInfo.timePayment.replace("T", " "));
            }
            else {
                $(".paidDate").html("-- --");
            }
            //设置收货人信息
            baseController.userService.getUserAddressOne(BcOrderItemListController.orderInfo.consigneeID, function (json) {
                if (json.isSuccess && json.consignee) {
                    $(".consignee").html(json.consignee.consignee);
                    $(".address").html(json.consignee.province + " " + json.consignee.city + " " + json.consignee.area + " " + json.consignee.address);
                    $(".mobile").html(json.consignee.mobile);
                }
            });
            //设置配送方式
            baseController.userService.getUserShipmentOne(BcOrderItemListController.orderInfo.shipmentID, function (json) {
                if (json.isSuccess && json.shipment) {
                    $(".shipment").html(json.shipment);
                }
            });
            //设置发票类型
            baseController.userService.getUserInvoicesOne(BcOrderItemListController.orderInfo.invoiceID, function (json) {
                if (json.isSuccess && json.invoice) {
                    $(".invoice").html(_this.getInvoiceName(json.invoice));
                }
            });
        });
    };
    BcOrderItemListController.prototype.getInvoiceName = function (invoice) {
        var showInvoice = invoice.isInvoice;
        if (!invoice) {
            showInvoice = false;
        }
        else {
            showInvoice = true;
        }
        if (showInvoice) {
            if (invoice.isVat) {
                return "增值税发票 " + invoice.vatCompanyName;
            }
            else {
                return "普通发票 " + (invoice.isCompany ? invoice.companyName : "个人");
            }
        }
        else {
            return "不需要发票";
        }
    };
    //渲染数据
    BcOrderItemListController.prototype.render = function () {
        var itemHtml = '';
        var itemBodyHtml = '<tr><td>{0}</td>';
        itemBodyHtml += '<td>';
        itemBodyHtml += '<div class= "img-list">';
        itemBodyHtml += '<a class= "img-box" target= "_blank" href= "{3}"> <img width="50" height= "50"src= "{2}" title= "{1}" /> </a> ';
        itemBodyHtml += '</div> </td>';
        itemBodyHtml += '<td>';
        itemBodyHtml += '<div class= "al fl">';
        itemBodyHtml += '<a class= "flk13" target= "_blank" href= "{3}" clstag= "click|keycount|orderinfo|product_name">{1}</a> ';
        itemBodyHtml += '</div>';
        itemBodyHtml += '<div class="clr"> </div> ';
        itemBodyHtml += '<div id= "coupon_{0}" class="fl"> </div> </td>';
        itemBodyHtml += '<td><span class="ftx04"> &yen; {4} </span></td>';
        itemBodyHtml += '<td>{5}</td>';
        //action
        var actionHtml = '<td align="center" rowspan="{0}">';
        //actionHtml += '<a class= "cor_blue" href= "#" > 查看 </a>';
        actionHtml += ' <a class= "cor_blue" onclick= "BcOrderItemListController.prototype.removeOrder({1}); " href= "javascript: void (0); " > 删除 </a >';
        actionHtml += '<br>';
        actionHtml += '<a class= "cor_blue" href= "#" > 评价晒单 </a >';
        actionHtml += '<br>';
        actionHtml += '<a class= "cor_blue" href= "#" style= "display:none;" > 申请返修 / 退换货 </a>';
        actionHtml += '<br><a href="#" class= "bmr_mby" > 还要买 </a >';
        actionHtml += '</td > ';
        var orderSN = BcOrderItemListController.orderInfo["orderSN"].toLocaleLowerCase();
        BcOrderItemListController.orderSN = orderSN;
        BcOrderItemListController.urlForComment = "javascript:alert('订单未完成，不能评价！');";
        //根据订单状态，得到操作权限
        if (BcOrderItemListController.orderInfo.orderStatus == "Completed") {
            actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" style="display:none;" href= "javascript: void (0);" onclick="{1}"> 查看 </a> <br><a class="cor_blue" href= "{2}"> 评价晒单</a> <br><a class="cor_blue" href= "javascript: void (0);"  onclick="{3}" style="display:none;"> 申请返修/退换货</a> <br><a href="{4}" class="bmr_mby"> 还要买 </a></td>';
            var publishmentSystemID = 0;
            if (BcOrderItemListController.orderInfo.publishmentSystemInfo)
                publishmentSystemID = BcOrderItemListController.orderInfo.publishmentSystemInfo.publishmentSystemID;
            actionHtml = StringUtils.format(actionHtml, BcOrderItemListController.orderItemList[orderSN].length, "alert('查看')", BcOrderCommentController.getUrl(BcOrderItemListController.orderInfo.id, publishmentSystemID), "alert('返修退换货')", BcOrderItemListController.orderItemList[orderSN][0].navigationUrl);
            BcOrderItemListController.orderStatusDescription = "已完成";
            BcOrderItemListController.orderStatus = 4;
            BcOrderItemListController.urlForComment = BcOrderCommentController.getUrl(BcOrderItemListController.orderInfo.id, publishmentSystemID);
        }
        else if (BcOrderItemListController.orderInfo.orderStatus == "Handling" && BcOrderItemListController.orderInfo.paymentStatus == "Paid" && BcOrderItemListController.orderInfo.shipmentStatus == "Shipment") {
            actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" style="display:none;" href= "javascript: void (0);" onclick="{1}"> 查看 </a> <br><a href="{2}" class="bmr_mby"> 还要买 </a></td>';
            actionHtml = StringUtils.format(actionHtml, BcOrderItemListController.orderItemList[orderSN].length, "alert('查看')", BcOrderItemListController.orderItemList[orderSN][0].navigationUrl);
            BcOrderItemListController.orderStatusDescription = "等待收货";
            BcOrderItemListController.orderStatus = 3;
        }
        else if (BcOrderItemListController.orderInfo.orderStatus == "Handling" && BcOrderItemListController.orderInfo.paymentStatus == "Paid" && BcOrderItemListController.orderInfo.shipmentStatus == "UnShipment") {
            actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" style="display:none;" href= "javascript: void (0);" onclick="{1}"> 查看 </a> <br><a href="{2}" class="bmr_mby"> 还要买 </a></td>';
            actionHtml = StringUtils.format(actionHtml, BcOrderItemListController.orderItemList[orderSN].length, "alert('查看')", BcOrderItemListController.orderItemList[orderSN][0].navigationUrl);
            BcOrderItemListController.orderStatusDescription = "等待发货";
            BcOrderItemListController.orderStatus = 2;
        }
        else if (BcOrderItemListController.orderInfo.orderStatus == "Handling" && BcOrderItemListController.orderInfo.paymentStatus == "Unpaid") {
            actionHtml = '<td align="center" rowspan="{0}"><a class="cor_blue" style="display:none;" href= "javascript: void (0);"  onclick="{1}"> 查看 </a> <a class="cor_blue" onclick="{2}" href="javascript: void (0);">删除</a>';
            actionHtml = StringUtils.format(actionHtml, BcOrderItemListController.orderItemList[orderSN].length, "alert('查看')", "BcOrderItemListController.prototype.removeOrder(" + BcOrderItemListController.orderInfo.id + ")");
            if (BcOrderItemListController.isPaymentClick) {
                actionHtml += StringUtils.format('<br><a href="javascript:void (0);" onclick="{0}" class="cor_blue"> 立即付款 </a>{1}', BcOrderItemListController.clickString, BcOrderItemListController.paymentForm);
                BcOrderItemListController.paymentType = 0;
            }
            else {
                actionHtml += StringUtils.format('<br><a href="javascript:void (0);" class="cor_blue" style="color:red;"> 货到付款 </a>');
                BcOrderItemListController.paymentType = 1;
            }
            actionHtml += StringUtils.format('<br><a href="{0}" class="bmr_mby"> 还要买 </a></td>', BcOrderItemListController.orderItemList[orderSN][0].navigationUrl);
            BcOrderItemListController.orderStatusDescription = "等待支付";
            BcOrderItemListController.orderStatus = 1;
        }
        else if (BcOrderItemListController.orderInfo.orderStatus == "Canceled") {
            actionHtml = StringUtils.format('<td><a href="{0}" class="bmr_mby"> 还要买 </a></td>', BcOrderItemListController.orderItemList[orderSN][0].navigationUrl);
            BcOrderItemListController.orderStatusDescription = "已作废";
            BcOrderItemListController.orderStatus = -1;
        }
        for (var l = 0; l < BcOrderItemListController.orderStatus; l++) {
            $(".process").find(".ready").eq(l * 2 + 1).css("background-position-y", "0px");
            $(".process").find(".ready").eq(l * 2).css("background-position-y", "0px");
        }
        if (BcOrderItemListController.orderStatus == 4) {
            //完成
            $(".process").find(".ready").eq(4 * 2).css("background-position-y", "0px");
        }
        for (var i = 0; i < BcOrderItemListController.orderItemList[orderSN].length; i++) {
            //第一个订单明细的图片
            var imageUrl = BcOrderItemListController.orderItemList[orderSN][i].thumbUrl;
            //下单时间
            var date = BcOrderItemListController.orderInfo.timeOrder.split('T');
            itemHtml += StringUtils.format(itemBodyHtml, BcOrderItemListController.orderItemList[orderSN][i].goodsSN, BcOrderItemListController.orderItemList[orderSN][i].title, imageUrl, BcOrderItemListController.orderItemList[orderSN][i].navigationUrl, BcOrderItemListController.orderItemList[orderSN][i].priceSale, BcOrderItemListController.orderItemList[orderSN][i].purchaseNum);
            if (i == 0)
                itemHtml += actionHtml;
        }
        itemHtml += '</tr>';
        //添加
        $("#tbOrderItem").append(itemHtml);
    };
    //删除订单
    BcOrderItemListController.prototype.removeOrder = function (orderID) {
        BcOrderItemListController.orderService.deleteOrder(orderID);
        alert("删除成功！");
        location.href = BcOrderListController.getRedirectUrl();
    };
    BcOrderItemListController.prototype.getUrl = function (orderID, publishmentSystemID) {
        this.parmMap['orderID'] = orderID;
        this.parmMap['publishmentSystemID'] = publishmentSystemID;
        return "myOrderItem.html?" + Utils.mapToUrl(this.parmMap);
    };
    BcOrderItemListController.getRedirectUrl = function (orderID, publishmentSystemID) {
        return "myOrderItem.html?orderID=" + orderID + "&publishmentSystemID=" + publishmentSystemID;
    };
    BcOrderItemListController.orderInfoID = UrlUtils.getUrlVar("orderID");
    BcOrderItemListController.publishmentSystemID = UrlUtils.getUrlVar("publishmentSystemID");
    BcOrderItemListController.orderStatus = 0; // 0-已下单 1-等待付款 2-等待发货 3-等待收货 4-完成 
    return BcOrderItemListController;
})(baseController);
/**********
* 控制类基类
**********/
var WapBaseController = (function () {
    function WapBaseController() {
        WapBaseController.userService = new UserService();
        //WapBaseController.userAuthValidate();
    }
    WapBaseController.prototype.getUserService = function () {
        return WapBaseController.userService;
    };
    WapBaseController.prototype.getUser = function () {
        return WapBaseController.user;
    };
    //验证用户是否登录
    WapBaseController.userAuthValidate = function (fn) {
        WapBaseController.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToWapLogin();
            }
            else {
                WapBaseController.user = json.user;
                $('#fUserName').html(json.user.userName);
                $('#linkLogout').click(function () {
                    WapBaseController.userService.logout(function (data) {
                        location.href = location.href;
                    });
                });
                if (fn)
                    fn();
            }
        });
    };
    return WapBaseController;
})();
/// <reference path="WapBaseController.ts" />
var WapAddressController = (function (_super) {
    __extends(WapAddressController, _super);
    function WapAddressController() {
        _super.call(this);
    }
    WapAddressController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.getUserAddress();
        });
    };
    WapAddressController.prototype.getUserAddress = function () {
        _super.prototype.getUserService.call(this).getUserAddress(function (json) {
            if (json.isSuccess) {
                $("#ulAddressList").html('');
                var innerHtml = ""; //<td>城市</td>
                for (var i = 0; i < json.consignees.length; i++) {
                    innerHtml += '<li>';
                    innerHtml += '    <div class="mad_bx1"><span class="fl f16">' + json.consignees[i].consignee + '</span><span class="cor_red fl">' + json.consignees[i].mobile + '</span>';
                    if (json.consignees[i].isDefault) {
                        innerHtml += '<span class="fr cor_red"><i class="fa fa-map-marker cor_888"></i> 默认地址</span>';
                    }
                    innerHtml += '</div>    <div class="mad_adrxt cor_888">' + json.consignees[i].province + ' ' + json.consignees[i].city + ' ' + json.consignees[i].area + ' ' + json.consignees[i].address + '</div>';
                    innerHtml += '    <div class="mad_fun"><a href="editAddress.html?id=' + json.consignees[i].id + '">编辑</a> | <a href="javascript:;" onclick="new WapAddressController().removeUserAdress(\'' + json.consignees[i].id + '\');">删除</a></div>';
                    innerHtml += '</li>';
                }
                $("#ulAddressList").html(innerHtml);
            }
        });
    };
    WapAddressController.prototype.removeUserAdress = function (id) {
        var _this = this;
        _super.prototype.getUserService.call(this).deleteUserAddress(id, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "删除成功");
                _this.getUserAddress();
            }
            else {
                Utils.tipAlert(true, data.errorMessage);
            }
        });
    };
    return WapAddressController;
})(WapBaseController);
/// <reference path="WapBaseController.ts" />
var WapChangePwdController = (function (_super) {
    __extends(WapChangePwdController, _super);
    function WapChangePwdController() {
        _super.call(this);
    }
    WapChangePwdController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            $("#btnChangePwd").click(function () {
                _this.ChangePwd();
            });
        });
    };
    WapChangePwdController.prototype.ChangePwd = function () {
        var currentPassword = $('#txtOldPwd').val();
        var newPassword = $('#txtNewPwd').val();
        var confimPassword = $('#txtConfimNewPwd').val();
        if (!currentPassword) {
            Utils.tipAlert(false, "请输入正确的原始密码");
            return;
        }
        else {
        }
        if (!newPassword) {
            Utils.tipAlert(false, "请输入正确的新密码");
            return;
        }
        else {
        }
        if (!confimPassword) {
            Utils.tipAlert(false, "请输入再一次输入新密码");
            return;
        }
        else if (newPassword != confimPassword) {
            Utils.tipAlert(false, "两次输入的新密码不一致");
            return;
        }
        else {
        }
        _super.prototype.getUserService.call(this).changePassword(currentPassword, newPassword, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "用户密码修改成功！");
                $("#txtOldPwd").val("");
                $("#txtNewPwd").val("");
                $("#txtConfimNewPwd").val("");
            }
            else {
                Utils.tipAlert(false, "用户密码修改失败！" + data.errorMessage);
            }
        });
    };
    return WapChangePwdController;
})(WapBaseController);
/// <reference path="WapBaseController.ts" />
var WapEditAddressController = (function (_super) {
    __extends(WapEditAddressController, _super);
    function WapEditAddressController() {
        _super.call(this);
        this.id = 0;
        this.consignee = {
            "groupSN": "",
            "userName": "",
            "isOrder": false,
            "ipAddress": "",
            "isDefault": false,
            "consignee": "",
            "country": "",
            "province": "",
            "city": "",
            "area": "",
            "address": "",
            "zipcode": "",
            "mobile": "",
            "tel": "",
            "email": "",
            "id": 0
        };
    }
    WapEditAddressController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.id = UrlUtils.getUrlVar("id");
            if (_this.id > 0) {
                _this.initConsignee(_this.id);
            }
            $('#saveConsignee').click(function () {
                _this.saveConsignee();
            });
        });
    };
    WapEditAddressController.prototype.initConsignee = function (id) {
        var _this = this;
        _super.prototype.getUserService.call(this).getUserAddressOne(id, function (json) {
            if (json.isSuccess) {
                _this.consignee = json.consignee;
                $('#consignee').val(json.consignee.consignee);
                $('#mobile').val(json.consignee.mobile);
                $('#address').val(json.consignee.address);
            }
        });
    };
    WapEditAddressController.prototype.saveConsignee = function () {
        this.consignee.id = this.id;
        this.consignee.consignee = $('#consignee').val();
        this.consignee.mobile = $('#mobile').val();
        this.consignee.province = $('#province').val();
        this.consignee.city = $('#city').val();
        this.consignee.area = $('#area').val();
        this.consignee.address = $('#address').val();
        if (this.id > 0) {
            _super.prototype.getUserService.call(this).updateUserAddress(this.consignee, function (json) {
                if (json.isSuccess) {
                    Utils.tipAlert(true, "地址保存成功！");
                }
            });
        }
        else {
            _super.prototype.getUserService.call(this).addUserAddress(this.consignee, function (json) {
                if (json.isSuccess) {
                    Utils.tipAlert(true, "地址保存成功！", true, 1500, "address.html");
                }
            });
        }
    };
    return WapEditAddressController;
})(WapBaseController);
/// <reference path="WapBaseController.ts" />
var WapFollowController = (function (_super) {
    __extends(WapFollowController, _super);
    function WapFollowController() {
        _super.call(this);
    }
    WapFollowController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.getUserFollow(1, 12);
        });
    };
    WapFollowController.prototype.getUserFollow = function (pageIndex, prePageNum) {
        _super.prototype.getUserService.call(this).getUserFollows(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#tbUserFollow").html("");
                var innerHtml = ""; //<td>城市</td>
                for (var i = 0; i < json.followList.length; i++) {
                    innerHtml += '<li>';
                    innerHtml += '    <div class="mdf_top">';
                    innerHtml += '        <img src="' + json.followList[i].imageUrl + '">';
                    innerHtml += '        <div class="mdf_tnm">' + json.followList[i].goodsName + '</div>';
                    innerHtml += '        <div class="mdf_tprice"><span class="fl">¥' + json.followList[i].goodsPrice + '</span>';
                    innerHtml += '          <a href="javascript:;" onclick="new WapFollowController().removeUserFollow(\'' + json.followList[i].id + '\')" class="mdf_del">取消关注</a></div>';
                    innerHtml += '    </div>';
                    innerHtml += '</li>';
                }
                $("#tbUserFollow").html(innerHtml);
            }
        });
    };
    WapFollowController.prototype.removeUserFollow = function (ids) {
        var _this = this;
        _super.prototype.getUserService.call(this).removeUserFollows(ids, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "删除成功");
                _this.getUserFollow(1, 12);
            }
            else {
                Utils.tipAlert(true, data.errorMessage);
            }
        });
    };
    return WapFollowController;
})(WapBaseController);
/// <reference path="WapBaseController.ts" />
var WapHistoryController = (function (_super) {
    __extends(WapHistoryController, _super);
    function WapHistoryController() {
        _super.call(this);
    }
    WapHistoryController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.getUserHistory(1, 12);
        });
    };
    WapHistoryController.prototype.getUserHistory = function (pageIndex, prePageNum) {
        _super.prototype.getUserService.call(this).getUserHistory(pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#tbUserHistory").html("");
                var innerHtml = ""; //<td>城市</td>
                for (var i = 0; i < json.historyList.length; i++) {
                    innerHtml += '<li>';
                    innerHtml += '    <div class="mdf_top">';
                    innerHtml += '        <img src="' + json.historyList[i].imageUrl + '">';
                    innerHtml += '        <div class="mdf_tnm">' + json.historyList[i].goodsName + '</div>';
                    innerHtml += '        <div class="mdf_tprice"><span class="fl">¥' + json.historyList[i].goodsPrice + '</span>';
                    innerHtml += '          <a href="javascript:;" onclick="new WapHistoryController().removeUserHistory(\'' + json.historyList[i].id + '\')" class="mdf_del">删除</a></div>';
                    innerHtml += '    </div>';
                    innerHtml += '</li>';
                }
                $("#tbUserHistory").html(innerHtml);
            }
        });
    };
    WapHistoryController.prototype.removeUserHistory = function (ids) {
        var _this = this;
        _super.prototype.getUserService.call(this).removeUserHistory(ids, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "删除成功");
                _this.getUserHistory(1, 12);
            }
            else {
                Utils.tipAlert(true, data.errorMessage);
            }
        });
    };
    return WapHistoryController;
})(WapBaseController);
/**********
* 商城用户中心首页
**********/
var WapIndexController = (function (_super) {
    __extends(WapIndexController, _super);
    function WapIndexController() {
        _super.call(this);
        WapIndexController.orderService = new OrderService();
    }
    WapIndexController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.getUserGuesses();
            _this.getOrderStatistic();
            $('#hUserName').html(_super.prototype.getUser.call(_this).userName);
        });
    };
    WapIndexController.prototype.getUserGuesses = function () {
        _super.prototype.getUserService.call(this).getUserGuesses(function (json) {
            if (json.isSuccess) {
                $("#userguesses").html("");
                var innerHtml = ""; //<td>城市</td>
                for (var i = 0; i < json.guesses.length && i < 3; i++) {
                    innerHtml += '<li><a href="' + json.guesses[i].navigationUrl + '" ><img src="' + json.guesses[i].imageurl + '">' + json.guesses[i].title + '</a></li>';
                }
                $("#userguesses").html(innerHtml);
            }
        });
    };
    WapIndexController.prototype.getOrderStatistic = function () {
        var _this = this;
        WapIndexController.orderService.getOrderStatistic(function (json) {
            $("#noPay").html(json.noPay + "<br>待付款");
            $("#noCompleted").html(json.noCompleted + "<br>待确认收货");
            //super.getUserService()
            _super.prototype.getUserService.call(_this).getUserAllMessage("", 1, 1, function (data) {
                if (data.isSuccess) {
                    if (data.pageJson.total) {
                        $("#msgCount").html(data.pageJson.total + "<br>我的消息");
                    }
                }
            });
        });
    };
    return WapIndexController;
})(WapBaseController);
/// <reference path="wapBaseController.ts" />
/**********
* 订单详情
**********/
var WapOrderItemListController = (function (_super) {
    __extends(WapOrderItemListController, _super);
    function WapOrderItemListController() {
        _super.call(this);
        this.isPC = Utils.isPC();
        this.isEmpty = true;
        this.loading = true;
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        WapOrderItemListController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    WapOrderItemListController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    WapOrderItemListController.prototype.bindEvent = function () {
    };
    //绑定数据
    WapOrderItemListController.prototype.bindData = function () {
        this.bindOrderItemList();
    };
    //绑定订单数据
    WapOrderItemListController.prototype.bindOrderItemList = function () {
        var _this = this;
        WapOrderItemListController.orderService.getOrderItemList(WapOrderItemListController.orderInfoID, WapOrderItemListController.publishmentSystemID, function (json) {
            WapOrderItemListController.orderInfo = json.orderList[0].orderInfo;
            WapOrderItemListController.orderItemList = json.orderItemList;
            //加载数据
            _this.render();
            //分页链接
            //$("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllOrderItemList'));
        });
    };
    //删除订单
    WapOrderItemListController.prototype.removeOrder = function (orderID) {
        var item = {};
        var orderSN = WapOrderItemListController.orderInfo["orderSN"].toLocaleLowerCase();
        for (var i = 0; i < WapOrderItemListController.orderItemList[orderSN].length; i++) {
            if (WapOrderItemListController.orderItemList[orderSN][i].orderInfo.id == orderID) {
                item = WapOrderItemListController.orderItemList[orderSN][i];
                break;
            }
        }
        WapOrderItemListController.orderItemList[orderSN].splice($.inArray(item, WapOrderItemListController.orderItemList[orderSN]), 1);
        WapOrderItemListController.orderService.deleteOrder(orderID);
        this.render();
    };
    //渲染数据
    WapOrderItemListController.prototype.render = function () {
        var itemHtml = '';
        var itemBodyHtml = '<li data= "true" >';
        itemBodyHtml += '<div class= "mdf_top">';
        itemBodyHtml += '<a href="{5}" target="_blank"><img src="{1}" alt="{0}"></a>';
        itemBodyHtml += '<div class= "mdf_tnm">{0}</div>';
        itemBodyHtml += '<div class="mdf_tprice">¥{2} </div>';
        itemBodyHtml += '<div class="mdf_time"> {3}&nbsp;{4} </div>';
        itemBodyHtml += '</div>';
        itemBodyHtml += '</li>';
        var orderSN = WapOrderItemListController.orderInfo["orderSN"].toLocaleLowerCase();
        for (var i = 0; i < WapOrderItemListController.orderItemList[orderSN].length; i++) {
            //第一个订单明细的图片
            var imageUrl = WapOrderItemListController.orderItemList[orderSN][i].thumbUrl;
            //下单时间
            var date = WapOrderItemListController.orderInfo.timeOrder.split('T');
            itemHtml += StringUtils.format(itemBodyHtml, WapOrderItemListController.orderItemList[orderSN][i].title, imageUrl, (parseInt(WapOrderItemListController.orderItemList[orderSN][i].priceSale) * parseInt(WapOrderItemListController.orderItemList[orderSN][i].purchaseNum)).toString(), date[0], date[1], WapOrderItemListController.orderItemList[orderSN][i].navigationUrl);
        }
        //添加
        $("#orderItemUl").append(itemHtml);
    };
    WapOrderItemListController.prototype.getUrl = function (orderID, publishmentSystemID) {
        this.parmMap['orderID'] = orderID;
        this.parmMap['publishmentSystemID'] = publishmentSystemID;
        return "myOrderItem.html?" + Utils.mapToUrl(this.parmMap);
    };
    WapOrderItemListController.getRedirectUrl = function (orderID, publishmentSystemID) {
        return "myOrderItem.html?orderID=" + orderID + "&publishmentSystemID=" + publishmentSystemID;
    };
    WapOrderItemListController.orderInfoID = UrlUtils.getUrlVar("orderID");
    WapOrderItemListController.publishmentSystemID = UrlUtils.getUrlVar("publishmentSystemID");
    return WapOrderItemListController;
})(WapBaseController);
/// <reference path="wapBaseController.ts" />
/**********
* 订单
**********/
var WapOrderListController = (function (_super) {
    __extends(WapOrderListController, _super);
    function WapOrderListController() {
        _super.call(this);
        this.isCompleted = "false";
        this.isPayment = "false";
        this.isPC = Utils.isPC();
        this.orderTime = 0;
        this.keywords = StringUtils.empty;
        this.isEmpty = true;
        this.loading = true;
        this.parmMap = Utils.urlToMap(window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : "");
        WapOrderListController.orderService = new OrderService();
    }
    //初始化页面元素以及事件
    WapOrderListController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.bindEvent();
            _this.bindData();
        });
    };
    //绑定事件
    WapOrderListController.prototype.bindEvent = function () {
        var _this = this;
        if ($("#selStatus").length > 0) {
            $("#selStatus").change(function () {
                _this.orderStatusChange();
            });
        }
        if ($("#selTime").length > 0) {
            $("#selTime").change(function () {
                _this.orderTimeChange();
            });
        }
        if ($("#btnSearch").length > 0) {
            $("#btnSearch").click(function () {
                _this.btnSearchClick();
            });
        }
    };
    //绑定数据
    WapOrderListController.prototype.bindData = function () {
        this.bindOrderList(WapOrderListController.pageIndex, WapOrderListController.prePageNum);
        this.bindOrderStatus();
        this.bindOrderTime();
        this.bindOrderKeywords();
    };
    //绑定订单数据
    WapOrderListController.prototype.bindOrderList = function (pageIndex, prePageNum) {
        var _this = this;
        WapOrderListController.pageIndex = pageIndex || WapOrderListController.pageIndex;
        WapOrderListController.prePageNum = prePageNum || WapOrderListController.prePageNum;
        this.isCompleted = UrlUtils.getUrlVar("isCompleted");
        this.isPayment = UrlUtils.getUrlVar("isPayment");
        this.keywords = UrlUtils.getUrlVar("keywords");
        this.orderTime = UrlUtils.getUrlVar("orderTime");
        WapOrderListController.orderService.getAllOrderList(this.isCompleted, this.isPayment, this.isPC, this.orderTime, this.keywords, WapOrderListController.pageIndex, WapOrderListController.prePageNum, function (json) {
            json.pageJson = eval("(" + json.pageJson + ")");
            if (json.pageJson.last < WapOrderListController.pageIndex) {
                WapOrderListController.pageIndex--;
                Utils.tipAlert(false, "到底了！");
                return;
            }
            WapOrderListController.orderList = json.orderInfoList;
            _this.loading = false;
            if (WapOrderListController.orderList && WapOrderListController.orderList.length > 0) {
                _this.isEmpty = false;
            }
            else {
                if (!_this.isCompleted && !_this.isPayment) {
                    _this.isEmpty = true;
                }
                else {
                    _this.isEmpty = false;
                }
            }
            //加载数据
            _this.render();
            //分页链接
            //$("#divPageLink").html(pageDataUtils.getPageHtml(json.pageJson, 'getAllOrderList'));
        });
    };
    //瀑布流加载
    WapOrderListController.prototype.waterfallList = function () {
        WapOrderListController.pageIndex++;
        this.bindOrderList(WapOrderListController.pageIndex, WapOrderListController.prePageNum);
    };
    //订单状态帅选
    WapOrderListController.prototype.orderStatusChange = function () {
        var status = $("#selStatus").val();
        switch (status) {
            case "all":
                window.location.href = this.getUrl(StringUtils.empty, StringUtils.empty, UrlUtils.getUrlVar("orderTime"));
                break;
            case "noPay":
                window.location.href = this.getUrl("false", "false", UrlUtils.getUrlVar("orderTime"));
                break;
            case "pay":
                window.location.href = this.getUrl("false", "true", UrlUtils.getUrlVar("orderTime"));
                break;
            case "completed":
                window.location.href = this.getUrl("true", StringUtils.empty, UrlUtils.getUrlVar("orderTime"));
                break;
        }
    };
    //订单时间帅选
    WapOrderListController.prototype.orderTimeChange = function () {
        var time = $("#selTime").val();
        switch (time) {
            case "all":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "all");
                break;
            case "90":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "90");
                break;
            case "180":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "180");
                break;
            case "365":
                window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), "365");
                break;
        }
    };
    //订单关键字帅选
    WapOrderListController.prototype.btnSearchClick = function () {
        window.location.href = this.getUrl(UrlUtils.getUrlVar("isCompleted"), UrlUtils.getUrlVar("isPayment"), UrlUtils.getUrlVar("orderTime"), $("#txtKeywords").val());
    };
    //绑定订单状态帅选
    WapOrderListController.prototype.bindOrderStatus = function () {
        if ($("#selStatus").length > 0) {
            if (this.isCompleted == "false" && this.isPayment == "false") {
                $("#selStatus").val("noPay");
            }
            else if (this.isCompleted == "false" && this.isPayment == "true") {
                $("#selStatus").val("pay");
            }
            else if (this.isCompleted == "true") {
                $("#selStatus").val("completed");
            }
        }
    };
    //绑定订单时间帅选
    WapOrderListController.prototype.bindOrderTime = function () {
        if ($("#selTime").length > 0 && this.orderTime) {
            $("#selTime").val(UrlUtils.getUrlVar("orderTime"));
        }
    };
    //绑定订单关键字帅选
    WapOrderListController.prototype.bindOrderKeywords = function () {
        if ($("#txtKeywords").length > 0) {
            $("#txtKeywords").val(UrlUtils.getUrlVar("keywords"));
        }
    };
    //删除订单
    WapOrderListController.prototype.removeOrder = function (orderID) {
        var item = {};
        for (var i = 0; i < WapOrderListController.orderList.length; i++) {
            if (WapOrderListController.orderList[i].orderInfo.id == orderID) {
                item = WapOrderListController.orderList[i];
                break;
            }
        }
        WapOrderListController.orderList.splice($.inArray(item, WapOrderListController.orderList), 1);
        WapOrderListController.orderService.deleteOrder(orderID);
        this.render();
    };
    //渲染数据
    WapOrderListController.prototype.render = function () {
        var html = '';
        var itemHtml = '';
        //order body
        var bodyHtml = '<li data= "true" >';
        bodyHtml += '<div class= "mdf_top">';
        bodyHtml += '<img src="{1}" alt="{0}">';
        bodyHtml += '<div class= "mdf_tnm">订单号： {0}</div>';
        bodyHtml += '<div class="mdf_tprice">¥{2} </div>';
        bodyHtml += '<div class="mdf_time"> {3}&nbsp;{4} </div>';
        bodyHtml += '<a class="mx_more" href= "{6}"> <i class="fa fa-chevron-right"> </i></a>';
        bodyHtml += '</div>';
        bodyHtml += '{5}';
        bodyHtml += '</li>';
        //action
        var actionHtml = '<a class= "mdf_go" href= "javascript: void (0);"> {0} </a>';
        for (var i = 0; i < WapOrderListController.orderList.length; i++) {
            if (WapOrderListController.orderList[i].items.length == 0)
                continue;
            //第一个订单明细的图片
            var imageUrl = WapOrderListController.orderList[i].items[0].thumbUrl;
            //下单时间
            var date = WapOrderListController.orderList[i].orderInfo.timeOrder.split('T');
            //代付款-已付款
            var payStatus = "待付款";
            //根据订单状态，得到操作权限
            if (WapOrderListController.orderList[i].orderInfo.orderStatus == "已完成") {
                actionHtml = '<a class= "mdf_go" href= "javascript: void (0);"> {0} </a>';
                actionHtml = StringUtils.format(actionHtml, "已完成");
                $("#orderStatus").html("已完成订单");
            }
            else if (WapOrderListController.orderList[i].orderInfo.orderStatus == "处理中" && WapOrderListController.orderList[i].orderInfo.paymentStatus == "已支付") {
                actionHtml = '<a class= "mdf_go" href= "javascript: void (0);"> {0} </a>';
                actionHtml = StringUtils.format(actionHtml, "待发货");
                $("#orderStatus").html("待发货订单");
            }
            else if (WapOrderListController.orderList[i].orderInfo.orderStatus == "处理中" && WapOrderListController.orderList[i].orderInfo.paymentStatus == "未支付") {
                if (WapOrderListController.orderList[i].clickString) {
                    actionHtml = '<a class= "mdf_go" href= "javascript: void (0);" onclick="{1}"> {0} </a>{2}';
                    actionHtml = StringUtils.format(actionHtml, "立即付款", WapOrderListController.orderList[i].clickString, WapOrderListController.orderList[i].paymentForm);
                    $("#orderStatus").html("待付款订单");
                }
            }
            html += StringUtils.format(bodyHtml, WapOrderListController.orderList[i].orderInfo.orderSN, imageUrl, WapOrderListController.orderList[i].orderInfo.priceTotal, date[0], date[1], actionHtml, WapOrderItemListController.getRedirectUrl(WapOrderListController.orderList[i].orderInfo.id, WapOrderListController.orderList[i].publishmentSystemInfo.publishmentSystemID));
        }
        //添加
        $("#orderUl").append(html);
    };
    WapOrderListController.prototype.getUrl = function (isCompleted, isPayment, orderTime, keywords) {
        this.parmMap['isCompleted'] = isCompleted;
        this.parmMap['isPayment'] = isPayment;
        this.parmMap['orderTime'] = orderTime;
        this.parmMap['keywords'] = keywords;
        return "?" + Utils.mapToUrl(this.parmMap);
    };
    WapOrderListController.pageIndex = 1;
    WapOrderListController.prePageNum = 10;
    return WapOrderListController;
})(WapBaseController);
/// <reference path="WapBaseController.ts" />
var WapUserMessageController = (function (_super) {
    __extends(WapUserMessageController, _super);
    function WapUserMessageController() {
        _super.call(this);
    }
    WapUserMessageController.prototype.init = function () {
        var _this = this;
        WapBaseController.userAuthValidate(function () {
            _this.getUserMessage(1, 5);
        });
    };
    WapUserMessageController.prototype.getUserMessage = function (pageIndex, prePageNum) {
        _super.prototype.getUserService.call(this).getUserAllMessage('SystemAnnouncement', pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                json.pageJson = eval("(" + json.pageJson + ")");
                if (json.pageJson.last < WapUserMessageController.pageIndex) {
                    WapUserMessageController.pageIndex--;
                    Utils.tipAlert(false, "到底了！");
                    return;
                }
                var innerHtml = "";
                for (var i = 0; i < json.userMessageList.length; i++) {
                    innerHtml += '<div class="mxx_bx" id="msg' + json.userMessageList[i].id + '" ' + (json.userMessageList[i].isViewed ? '' : 'style="font-weight: bold;"') + ' onclick="new WapUserMessageController().updateMsgStatus(' + json.userMessageList[i].id + ');">';
                    innerHtml += '    <div class="mxx_top"><span class="fl">' + (json.userMessageList[i].MessageType == 'SystemAnnouncement' ? '[公告]' : '') + json.userMessageList[i].title + '</span><span class="fr">' + Utils.formatTime(json.userMessageList[i].addDate.replace('T', '  '), "yyyy-MM-dd HH:mm:ss") + '</span></div>';
                    innerHtml += '    <div class="mxx_txt">';
                    innerHtml += json.userMessageList[i].content;
                    innerHtml += '    </div>';
                    innerHtml += '</div>';
                }
                $("#msgtop").after(innerHtml);
            }
            else {
                Utils.tipAlert(false, "获取消息出错-" + json.errorMessage);
            }
            //分页链接
        });
    };
    //瀑布流加载
    WapUserMessageController.prototype.waterfallList = function () {
        WapUserMessageController.pageIndex++;
        this.getUserMessage(WapUserMessageController.pageIndex, WapUserMessageController.prePageNum);
    };
    WapUserMessageController.prototype.updateMsgStatus = function (id) {
        _super.prototype.getUserService.call(this).getUserMessageDetail(id, function (data) {
            if (data.isSuccess) {
                $('#msg' + id).css('font-weight', '100');
            }
        });
    };
    WapUserMessageController.pageIndex = 1;
    WapUserMessageController.prePageNum = 10;
    return WapUserMessageController;
})(WapBaseController);
var SDKController = (function () {
    function SDKController() {
        this.isLoading = false;
        //public publishmentSystemID: number = 0;//HomeUrlUtils.publishSystemID;
        this.returnUrl = HomeUrlUtils.getReturnUrl();
        this.userService = new UserService();
    }
    SDKController.prototype.init = function () {
        var _this = this;
        this.userService.getThirdLoginTypeParameter(function (data) {
            _this.getThirdLoginTypeParameter(data);
        });
    };
    SDKController.prototype.initBind = function () {
        var _this = this;
        this.userService.getThirdLoginTypeParameter(function (data) {
            _this.getThirdBindTypeParameter(data);
        });
    };
    SDKController.prototype.getThirdLoginTypeParameter = function (data) {
        var _this = this;
        var thirdHtml = '';
        if (data.thirdLoginList.length > 0) {
            thirdHtml += '<span class="fl">其他帐号登录注册:&nbsp;</span>';
        }
        for (var i = 0; i < data.thirdLoginList.length; i++) {
            if (data.thirdLoginList[i].thirdLoginType == 0) {
                thirdHtml += '<a id="qq" href="#" class="mfm_lga"><img src="images/mn_ico2.png" width="35" height="35" /></a>';
            }
            if (data.thirdLoginList[i].thirdLoginType == 1) {
                thirdHtml += '<a id="wb" href="#" class="mfm_lga"><img src="images/mn_ico3.png" width="35" height="35" /></a> ';
            }
            if (data.thirdLoginList[i].thirdLoginType == 2) {
                thirdHtml += '<a id="wx" href="#" class="mfm_lga"><img src="images/mn_ico4.png" width="35" height="35" /></a>';
            }
        }
        $("#thirdLoginPanel").append($(thirdHtml));
        if ($("a[id='qq']"))
            $("a[id='qq']").click(function () {
                _this.qqLogin();
            });
        if ($("#eb"))
            $("#wb").click(function () {
                _this.wbLogin();
            });
        if ($("#wx"))
            $("#wx").click(function () {
                _this.wxLogin();
            });
    };
    SDKController.prototype.qqLogin = function () {
        this.sdkLogin(1);
    };
    SDKController.prototype.wbLogin = function () {
        this.sdkLogin(2);
    };
    SDKController.prototype.wxLogin = function () {
        this.sdkLogin(3);
    };
    SDKController.prototype.sdkLogin = function (sdkType) {
        this.userService.sdkLogin(sdkType, this.returnUrl, function (data) {
            if (data.length > 0) {
                window.top.location.href = data;
            }
            else {
                Utils.tipAlert(false, "第三方登陆失败!");
            }
        });
    };
    SDKController.prototype.getThirdBindTypeParameter = function (data) {
        var _this = this;
        if (data.thirdLoginList.length == 0) {
            $("a[id='qq']").parents(".m2r_dl").html("<span style='color:red;font-size:15px;'>该功能没有启用！</span>");
            $("a[id='qq']").unbind("click").click(function () {
                alert("QQ绑定功能没有启用");
            });
            $("#wb").unbind("click").click(function () {
                alert("微博绑定功能没有启用");
            });
            $("#wx").unbind("click").click(function () {
                alert("微信绑定功能没有启用");
            });
        }
        else {
            for (var i = 0; i < data.thirdLoginList.length; i++) {
                if (data.thirdLoginList[i].thirdLoginType == 0) {
                    if (data.bindedThirdLoginList.indexOf(data.thirdLoginList[i].thirdLoginType) != -1) {
                        $("a[id='qq']").unbind("click").click(function () {
                            _this.qqUnBind();
                        });
                        $("a[id='qq']").html("解除绑定");
                        $("a[id='qq']").removeClass("m2l_isbtn").addClass("m2l_isUnbtn");
                    }
                    else {
                        $("a[id='qq']").unbind("click").click(function () {
                            _this.qqBind();
                        });
                        $("a[id='qq']").html("点击绑定");
                        $("a[id='qq']").removeClass("m2l_isUnbtn").addClass("m2l_isbtn");
                    }
                }
                else {
                    $("a[id='qq']").html("未启用").css("background", "#C4C4C4");
                    $("a[id='qq']").unbind("click");
                }
                if (data.thirdLoginList[i].thirdLoginType == 1) {
                    if (data.bindedThirdLoginList.indexOf(data.thirdLoginList[i].thirdLoginType) != -1) {
                        $("#wb").unbind("click").click(function () {
                            _this.wbUnBind();
                        });
                        $("#wb").html("解除绑定");
                        $("#wb").removeClass("m2l_isbtn").addClass("m2l_isUnbtn");
                    }
                    else {
                        $("#wb").unbind("click").click(function () {
                            _this.wbBind();
                        });
                        $("#wb").html("点击绑定");
                        $("#wb").removeClass("m2l_isUnbtn").addClass("m2l_isbtn");
                    }
                }
                else {
                    $("#wb").html("未启用").css("background", "#C4C4C4");
                    $("#wb").unbind("click");
                }
                if (data.thirdLoginList[i].thirdLoginType == 2) {
                    if (data.bindedThirdLoginList.indexOf(data.thirdLoginList[i].thirdLoginType) != -1) {
                        $("#wx").unbind("click").click(function () {
                            _this.wxUnBind();
                        });
                        $("#wx").html("解除绑定");
                        $("#wx").removeClass("m2l_isbtn").addClass("m2l_isUnbtn");
                    }
                    else {
                        $("#wx").unbind("click").click(function () {
                            _this.wxBind();
                        });
                        $("#wx").html("点击绑定");
                        $("#wx").removeClass("m2l_isUnbtn").addClass("m2l_isbtn");
                    }
                }
                else {
                    $("#wx").html("未启用").css("background", "#C4C4C4");
                    $("#wx").unbind("click");
                }
            }
        }
    };
    SDKController.prototype.qqBind = function () {
        this.sdkBind(1);
    };
    SDKController.prototype.wbBind = function () {
        this.sdkBind(2);
    };
    SDKController.prototype.wxBind = function () {
        this.sdkBind(3);
    };
    SDKController.prototype.qqUnBind = function () {
        this.sdkUnBind(1);
    };
    SDKController.prototype.wbUnBind = function () {
        this.sdkUnBind(2);
    };
    SDKController.prototype.wxUnBind = function () {
        this.sdkUnBind(3);
    };
    SDKController.prototype.sdkBind = function (sdkType) {
        this.userService.sdkBind(sdkType, this.returnUrl, function (data) {
            if (data.length > 0) {
                window.top.location.href = data;
            }
            else {
                Utils.tipAlert(false, "第三方绑定失败!");
            }
        });
    };
    SDKController.prototype.sdkUnBind = function (sdkType) {
        this.userService.sdkUnBind(sdkType, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "解绑成功!");
                HomeUrlUtils.reload();
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    return SDKController;
})();
/// <reference path="sdkController.ts" />
var RegisterController = (function () {
    function RegisterController() {
        this.userService = new UserService();
    }
    RegisterController.prototype.init = function () {
        var _this = this;
        this.IsPersistent();
        $("#btnRegister").click(function () {
            _this.submitRegister();
        });
        $("#txtUserName").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#btnLogin").click();
            }
        });
        $("#txtPassword").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#btnLogin").click();
            }
        });
        $("#btnLogin").click(function () {
            _this.submitLogin();
        });
        $("#ckGreen").change(function () {
            _this.ckGreenChange();
        });
        this.blurCheck();
        this.sdkController = new SDKController();
        this.sdkController.init();
    };
    RegisterController.prototype.IsPersistent = function () {
        this.userService.IsPersistent(function (data) {
            if (data.isSuccess) {
                HomeUrlUtils.redirectToIndex();
            }
        });
    };
    RegisterController.prototype.ckGreenChange = function () {
        if ($("#ckGreen:checked").length > 0)
            $("#btnRegister").removeAttr("disabled").removeClass("mfm_submit_disabled").addClass("mfm_submit");
        else
            $("#btnRegister").attr("disabled", "disabled").removeClass("mfm_submit").addClass("mfm_submit_disabled");
    };
    RegisterController.prototype.blurCheck = function () {
        $("#txtUserName").blur(function () {
            if (!$("#txtUserName").val()) {
                Utils.tipShow($("#txtUserName"), false, "请输入正确的用户名！");
            }
            else {
                Utils.tipShow($("#txtUserName"), true);
            }
        });
        $("#txtPassword").blur(function () {
            if (!$("#txtPassword").val()) {
                Utils.tipShow($("#txtPassword"), false, "密码不能为空！");
            }
            else {
                Utils.tipShow($("#txtPassword"), true);
            }
        });
        $("#txtEmail").blur(function () {
            if (!$("#txtEmail").val()) {
                Utils.tipShow($("#txtEmail"), false, "邮箱不能为空！");
            }
            else if (!Utils.isEmail($("#txtEmail").val())) {
                Utils.tipShow($("#txtEmail"), false, "请输入正确的邮箱！");
            }
            else {
                Utils.tipShow($("#txtEmail"), true);
            }
        });
        $("#txtConfimPassword").blur(function () {
            if ($("#txtPassword").val() != $("#txtConfimPassword").val()) {
                Utils.tipShow($("#txtConfimPassword"), false, "密码输入不一致重新输入！");
            }
            else {
                Utils.tipShow($("#txtConfimPassword"), true);
            }
        });
        $("#validateCode").blur(function () {
            if (!$("#validateCode").val()) {
                Utils.tipShow($("#validateCode"), false, "请输入正确的验证码！");
            }
            else {
                Utils.tipShow($("#validateCode"), true);
            }
        });
    };
    RegisterController.prototype.submitRegister = function () {
        var userName = $('#txtUserName').val();
        var email = $('#txtEmail').val();
        var password = $('#txtPassword').val();
        var confimPassword = $('#txtConfimPassword').val();
        var validCode = $('#validateCode').val();
        var returnUrl = "/wait.html";
        if ($("#ckGreen:checked").length == 0)
            return;
        if (!userName) {
            Utils.tipShow($('#txtUserName'), false, "请输入正确的用户名！");
            return;
        }
        else {
            Utils.tipShow($('#txtUserName'), true);
        }
        if (!email) {
            Utils.tipShow($('#txtEmail'), false, "请输入正确的邮箱！");
            return;
        }
        else if (!Utils.isEmail(email)) {
            Utils.tipShow($('#txtEmail'), false, "请输入正确的邮箱！");
            return;
        }
        else {
            Utils.tipShow($('#txtEmail'), true);
        }
        if (!password) {
            Utils.tipShow($('#txtPassword'), false, "请输入正确的密码！");
            return;
        }
        else {
            Utils.tipShow($('#txtPassword'), true);
        }
        if (!confimPassword) {
            Utils.tipShow($('#txtConfimPassword'), false, "请再一次确认密码！");
            return;
        }
        else if (password != confimPassword) {
            Utils.tipShow($('#txtConfimPassword'), false, "密码输入不一致重新输入！");
            return;
        }
        else {
            Utils.tipShow($('#txtConfimPassword'), true);
        }
        if (!validCode) {
            Utils.tipShow($('#validateCode'), false, "请输入正确的验证码！");
            return;
        }
        else {
            Utils.tipShow($('#validateCode'), true);
        }
        this.userService.register(userName, email, password, validCode, returnUrl, function (data) {
            if (data.isSuccess) {
                var returnUrl = HomeUrlUtils.getReturnUrl();
                if (data.isRedirectToLogin)
                    UrlUtils.redirect(returnUrl);
                else
                    Utils.tipAlert(false, data.successMessage);
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    RegisterController.prototype.submitLogin = function () {
        var userName = $('#txtUserName').val();
        var password = $('#txtPassword').val();
        var isPersistent = "false";
        if ($('#isPersistent').attr("checked"))
            isPersistent = "true";
        if (!userName) {
            Utils.tipShow($('#txtUserName'), false, "请输入正确的用户名！");
            return;
        }
        else {
            Utils.tipShow($('#txtUserName'), true);
        }
        if (!password) {
            Utils.tipShow($('#txtPassword'), false, "请输入正确的密码！");
            return;
        }
        else {
            Utils.tipShow($('#txtPassword'), true);
        }
        this.userService.login(userName, StringUtils.base64encode(password), isPersistent, true, function (data) {
            if (data.isSuccess) {
                var returnUrl = HomeUrlUtils.getReturnUrl();
                UrlUtils.redirect(returnUrl);
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    return RegisterController;
})();
var UserCenterController = (function () {
    function UserCenterController() {
        this.userService = new UserService();
    }
    UserCenterController.prototype.init = function () {
        //$("#channelUL").children().eq(2).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("info.html") != -1) {
        //    $("#accountInfoUrl li a").removeClass("m2menu_cuta");
        //    $("#accountInfoUrl").children().eq(1).children().addClass("m2menu_cuta");
        //}
        var _this = this;
        this.getBasicUserInfo();
        $("#btnSaveUserInfo").click(function () {
            _this.saveBasicUserInfo();
        });
    };
    UserCenterController.prototype.saveBasicUserInfo = function () {
        var userName = $("#txtUserName").val();
        //var email: string = $("#txtEmail").val();
        //var phone: string = $("#txtPhone").val();
        var remark = $("#txtRemark").val();
        if (!userName) {
            Utils.tipAlert(false, "请输入正确的用户名！");
            return;
            this.userService.getUser(function (json) {
                if (userName != json.user.userName)
                    Utils.tipAlert(false, "用户名不能被修改！");
                return;
            });
        }
        //if (!email && !Utils.isEmail(email)) {
        //    Utils.tipAlert("请输入正确格式的邮箱！");
        //    return;
        //}
        //if (!phone && !Utils.isMobile(phone)) {
        //    Utils.tipAlert("请输入正确格式的手机号码！");
        //    return;
        //}
        this.userService.updateBasicUserInfo(userName, remark, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "用户的基本信息修改成功！");
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    UserCenterController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                $("#txtUserName").val(json.user.userName);
                $("#txtEmail").val(json.user.email);
                $("#txtPhone").val(json.user.mobile);
                $("#txtRemark").val(json.user.signature);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    return UserCenterController;
})();
var MyPicController = (function () {
    function MyPicController() {
        this.userService = new UserService();
    }
    MyPicController.prototype.init = function () {
        var _this = this;
        //$("#channelUL").children().eq(2).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("mypic.html") != -1) {
        //    $("#accountInfoUrl li a").removeClass("m2menu_cuta");
        //    $("#accountInfoUrl").children().eq(0).children().addClass("m2menu_cuta");
        //}
        this.getBasicUserInfo();
        Utils.fileUpload('fileupload', this.userService.getUploadImgUrl('UpdateUserAvatar'), this.setUserAvatar(), this.progressForUserAvatar(), this.beforeSubmitUserAvatar());
        $("#btnUpload").click(function () {
            $("#fileupload").click();
        });
        //普通上传按钮
        $("#commonUploadSwitch").click(function () {
            $("#commonUploadPannel").show();
            $("#commonUploadSwitch").hide();
        });
        $("#commonUploadBtn").click(function () {
            _this.commonUpload();
        });
    };
    MyPicController.prototype.progressForUserAvatar = function () {
        return function (json) {
            if (json.total > json.loaded)
                $("#uploadProgress").html("正在上传..." + Math.floor(json.loaded / json.total * 100) + "%");
            else
                $("#uploadProgress").html("上传完成！");
        };
    };
    MyPicController.prototype.beforeSubmitUserAvatar = function () {
        return function (json) {
            if (!/(\.|\/)(gif|jpe?g|png)$/i.test(json.files[0].name)) {
                alert("只能上传gif,jpeg,png格式的图片！");
                return false;
            }
        };
    };
    MyPicController.prototype.commonUpload = function () {
        $.ajax({
            url: this.userService.getUploadImgUrl('UpdateUserAvatar'),
            data: $('#commonUploadForm').serializeArray(),
            type: "post",
            cache: false,
            success: function (data) {
                alert(data);
            }
        });
    };
    MyPicController.prototype.setUserAvatar = function () {
        return function (json) {
            if (json.isSuccess) {
                $("#myPic").attr("src", json.avatarLarge);
                $("#myMidPic").attr("src", json.avatarMiddle);
                $("#mySmallPic").attr("src", json.avatarSmall);
            }
            else {
                Utils.tipAlert(false, json.errorMessage);
            }
        };
    };
    MyPicController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                $("#myPic").attr("src", json.user.avatarLarge);
                $("#myMidPic").attr("src", json.user.avatarMiddle);
                $("#mySmallPic").attr("src", json.user.avatarSmall);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    return MyPicController;
})();
var UserMessageController = (function () {
    function UserMessageController() {
        this.userService = new UserService();
    }
    UserMessageController.prototype.init = function () {
        //$("#channelUL").children().eq(3).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("message.html") != -1) {
        //    $("#accountMsgUrl li a").removeClass("m2menu_cuta");
        //    $("#accountMsgUrl").children().eq(0).children().addClass("m2menu_cuta");
        //}
        this.getBasicUserInfo();
        this.getUserMessage(1, 10);
    };
    UserMessageController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                    //系统消息
                    if (json.user.newMsgCount > 0)
                        $("#systemMsg").html($("#systemMsg").html() + "<img src='" + HomeUrlUtils.homeUrl + "/images/icon-2.png' class='message_tip'/>");
                    //系统公告
                    if (json.user.systemNoticeCount > 0) {
                        $("#systemNotice").html($("#systemNotice").html() + "<img src='" + HomeUrlUtils.homeUrl + "/images/icon-2.png' class='message_tip'/>");
                    }
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    UserMessageController.prototype.getUserMessage = function (pageIndex, prePageNum) {
        this.userService.getUserMessage('SystemAnnouncement', pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#ulMessage").html("");
                var innerHtml = "";
                for (var i = 0; i < json.userMessageList.length; i++) {
                    innerHtml += "<li><a href='" + MessageDetailController.GetRedirectString(json.userMessageList[i].id, HomeUrlUtils.getReturnUrl()) + "' >" + json.userMessageList[i].title + "</a><span class='fr'>" + Utils.formatTime(json.userMessageList[i].addDate.replace('T', '  '), "yyyy-MM-dd HH:mm:ss") + "</span></li>";
                }
                $("#ulMessage").html(innerHtml);
            }
            else {
                Utils.tipAlert(false, "获取消息出错-" + json.errorMessage);
            }
            //分页链接
            var pageHtml = pageDataUtils.getPageHtml(json.pageJson, 'getUserMessageData');
            if (!!pageHtml)
                $("#divPageLink").html(pageHtml);
        });
    };
    return UserMessageController;
})();
var UserMessageNoticeController = (function () {
    function UserMessageNoticeController() {
        this.userService = new UserService();
    }
    UserMessageNoticeController.prototype.init = function () {
        //$("#channelUL").children().eq(3).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("usermessagenotice.html") != -1) {
        //    $("#accountMsgUrl li a").removeClass("m2menu_cuta");
        //    $("#accountMsgUrl").children().eq(1).children().addClass("m2menu_cuta");
        //}
        this.getBasicUserInfo();
        this.getUserMessageNotice(1, 10);
    };
    UserMessageNoticeController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                    //系统消息
                    if (json.user.newMsgCount > 0)
                        $("#systemMsg").html($("#systemMsg").html() + "<img src='" + HomeUrlUtils.homeUrl + "/images/icon-2.png' class='message_tip'/>");
                    //系统公告
                    if (json.user.systemNoticeCount > 0) {
                        $("#systemNotice").html($("#systemNotice").html() + "<img src='" + HomeUrlUtils.homeUrl + "/images/icon-2.png' class='message_tip'/>");
                    }
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    UserMessageNoticeController.prototype.getUserMessageNotice = function (pageIndex, prePageNum) {
        this.userService.getUserMessage('System', pageIndex, prePageNum, function (json) {
            if (json.isSuccess) {
                $("#ulMessageNotice").html("");
                var innerHtml = "";
                for (var i = 0; i < json.userMessageList.length; i++) {
                    if (json.userMessageList[i].isViewed)
                        innerHtml += "<li><a href='" + MessageDetailController.GetRedirectString(json.userMessageList[i].id, HomeUrlUtils.getReturnUrl()) + "' class='fl'>" + json.userMessageList[i].title + "</a><span class='fr'>" + Utils.formatTime(json.userMessageList[i].addDate.replace('T', '  '), "yyyy-MM-dd HH:mm:ss") + "</span></li>";
                    else
                        innerHtml += "<li><a href='" + MessageDetailController.GetRedirectString(json.userMessageList[i].id, HomeUrlUtils.getReturnUrl()) + "' class='fl_b'>" + json.userMessageList[i].title + "</a><span class='fr'>" + Utils.formatTime(json.userMessageList[i].addDate.replace('T', '  '), "yyyy-MM-dd HH:mm:ss") + "</span></li>";
                }
                $("#ulMessageNotice").html(innerHtml);
            }
            else {
                Utils.tipAlert(false, "获取消息出错-" + json.errorMessage);
            }
            //分页链接
            var pageHtml = pageDataUtils.getPageHtml(json.pageJson, 'getUserMessageNotice');
            if (!!pageHtml)
                $("#divPageLink").html(pageHtml);
        });
    };
    return UserMessageNoticeController;
})();
var SecretPwdController = (function () {
    function SecretPwdController() {
        this.userService = new UserService();
    }
    SecretPwdController.prototype.init = function () {
        var _this = this;
        //$("#channelUL").children().eq(1).children().addClass("nav_cuta");
        //var locationUrl = window.location.href.toLowerCase();;
        //if (locationUrl.indexOf("secretpwd1.html") != -1) {
        //    $("#accountSafeUrl li a").removeClass("m2menu_cuta");
        //    $("#accountSafeUrl").children().eq(5).children().addClass("m2menu_cuta");
        //}
        $(".mlayBg").height($(document).height());
        $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
        $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        $(window).resize(function () {
            $(".mlayBg").height($(document).height());
            $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
            $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        });
        $(".mrclose").click(function () {
            $(".mlay").slideUp(200);
            $(".mlayBg").hide();
        });
        $("#setSecretPwd").click(function () {
            $("#selValidate").find("option").eq(0).attr("selected", "true");
            $("#txtValidateAnswer").val("");
            $("#txtAnswer1").val("");
            $("#txtAnswer2").val("");
            $("#txtAnswer3").val("");
            $(".mlay").slideDown(200);
            $(".mlayBg").show();
            if (SecretPwdController.isSetSQCU) {
                $("#valDiv").css("display", "block");
                $("#setDiv").css("display", "none");
                $("#btnSubmitQuestion").unbind("click");
                $("#btnUpdateQuestion").unbind("click");
            }
            else {
                $("#valDiv").css("display", "none");
                $("#setDiv").css("display", "block");
            }
        });
        $("#btnUpdate").click(function () {
            $(".mlay").slideDown(200);
            $(".mlayBg").show();
        });
        this.getBasicUserInfo();
        this.getSecurityQuestionList("selQuestion1");
        this.getSecurityQuestionList("selQuestion2");
        this.getSecurityQuestionList("selQuestion3");
        this.getValidateSecurityQuestionList("selValidate");
        $("#btnValidateQuestion").click(function () {
            _this.validateSecurityQuestion();
        });
        $("#btnSubmitQuestion").click(function () {
            _this.updateSecurityQuestion(1);
        });
        $("#btnUpdateQuestion").click(function () {
            _this.updateSecurityQuestion(2);
        });
        $("#selQuestion1").unbind("change").bind("change", function () {
            _this.checkUserSelectQue("selQuestion1");
        });
        $("#selQuestion2").unbind("change").bind("change", function () {
            _this.checkUserSelectQue("selQuestion2");
        });
        $("#selQuestion3").unbind("change").bind("change", function () {
            _this.checkUserSelectQue("selQuestion3");
        });
    };
    SecretPwdController.prototype.checkUserSelectQue = function (selectID) {
        var selectedVal = $("#" + selectID).val();
        var selectArr = $("select");
        for (var i = 0; i < selectArr.length; i++) {
            if ($(selectArr[i]).attr("id") == "selValidate")
                continue;
            if ($(selectArr[i]).attr("id") == selectedVal)
                continue;
            if ($(selectArr[i]).attr("id") != selectID && $(selectArr[i]).val() == selectedVal) {
                Utils.tipAlert(false, "不能选择重复的问题，请重新选择");
                $("#" + selectID).val("0");
                return false;
            }
        }
        return true;
    };
    SecretPwdController.prototype.checkUserSelectQues = function () {
        return this.checkUserSelectQue("selQuestion1") && this.checkUserSelectQue("selQuestion2") && this.checkUserSelectQue("selQuestion3");
    };
    SecretPwdController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
                if (!json.user.isSetSQCU) {
                    $("#setSecretPwd").html("现在设置");
                }
                else {
                    $("#setSecretPwd").html("修改");
                }
                SecretPwdController.isSetSQCU = json.user.isSetSQCU;
            }
        });
    };
    SecretPwdController.prototype.getSecurityQuestionList = function (selectID) {
        this.userService.getSecurityQuestionList(function (json) {
            if (json.isSuccess) {
                $("#" + selectID).html("");
                var selectValue = "0";
                var num = selectID.substr(selectID.length - 1, 1);
                var innerHtml = "<option value='0'>请选择问题</option>";
                for (var i = 0; i < json.securityQuestionList.length; i++) {
                    innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    if (json.securityQuestionList[i].question == eval("(json.que" + num + ")")) {
                        selectValue = json.securityQuestionList[i].id;
                    }
                }
                $("#" + selectID).html(innerHtml);
                $("#" + selectID).val(selectValue);
            }
        });
    };
    //获取用户设置的密保问题
    SecretPwdController.prototype.getValidateSecurityQuestionList = function (selectID) {
        this.userService.getSecurityQuestionList(function (json) {
            if (json.isSuccess) {
                $("#" + selectID).html("");
                var innerHtml = "<option value='0'>请选择问题</option>";
                for (var i = 0; i < json.securityQuestionList.length; i++) {
                    if (json.securityQuestionList[i].question == eval("(json.que1)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                    else if (json.securityQuestionList[i].question == eval("(json.que2)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                    else if (json.securityQuestionList[i].question == eval("(json.que3)")) {
                        innerHtml += " <option value=" + json.securityQuestionList[i].id + ">" + json.securityQuestionList[i].question + "</option>";
                    }
                }
                $("#" + selectID).html(innerHtml);
            }
        });
    };
    SecretPwdController.prototype.updateSecurityQuestion = function (siteID) {
        if (siteID == 1) {
            var que1 = $("#selQuestion1").find("option:selected").text();
            var que2 = $("#selQuestion2").find("option:selected").text();
            var que3 = $("#selQuestion3").find("option:selected").text();
            var queV1 = $("#selQuestion1").find("option:selected").val();
            var queV2 = $("#selQuestion2").find("option:selected").val();
            var queV3 = $("#selQuestion3").find("option:selected").val();
        }
        else {
            var que1 = $("#spanQuestion1").html();
            var que2 = $("#spanQuestion2").html();
            var que3 = $("#spanQuestion3").html();
        }
        var anw1 = $('#txtAnswer1').val();
        var anw2 = $('#txtAnswer2').val();
        var anw3 = $('#txtAnswer3').val();
        if (queV1 == '0' || queV2 == '0' || queV3 == '0') {
            Utils.tipAlert(false, "问题不能为空");
            return;
        }
        if (!anw1 || !anw2 || !anw3) {
            Utils.tipAlert(false, "答案不能为空");
            return;
        }
        if (!this.checkUserSelectQues()) {
            Utils.tipAlert(false, "密保设置失败-不能选择重复的问题");
            return;
        }
        this.userService.updateSecurityQuestion(que1, que2, que3, anw1, anw2, anw3, function (data) {
            if (data.isSuccess) {
                $(".mlay").slideUp(200);
                $(".mlayBg").hide();
                Utils.tipAlert(true, "密保设置成功！");
                window.location.reload();
            }
            else {
                Utils.tipAlert(false, "密保设置失败-" + data.errorMessage);
            }
        });
    };
    SecretPwdController.prototype.validateSecurityQuestion = function () {
        var _this = this;
        var que = $("#selValidate").find("option:selected").text();
        var anw = $('#txtValidateAnswer').val();
        if (que == '0') {
            Utils.tipAlert(false, "问题不能为空");
            return;
        }
        if (!anw) {
            Utils.tipAlert(false, "答案不能为空");
            return;
        }
        this.userService.validateSecurityQuestion(que, anw, function (data) {
            if (data.isSuccess) {
                if (data.isValidate) {
                    //验证通过
                    $("#valDiv").css("display", "none");
                    $("#setDiv").css("display", "block");
                    $("#btnSubmitQuestion").click(function () {
                        _this.updateSecurityQuestion(1);
                    });
                    $("#btnUpdateQuestion").click(function () {
                        _this.updateSecurityQuestion(2);
                    });
                }
                else {
                    //验证不通过
                    Utils.tipAlert(false, "密保验证失败！请重新输入");
                }
            }
            else {
                Utils.tipAlert(false, "密保验证失败-" + data.errorMessage);
            }
        });
    };
    SecretPwdController.prototype.getUserSecurityQuestionAnwser = function () {
        this.userService.getUserSecurityQuestionAnwser(function (json) {
            if (json.isSuccess) {
                $("#selQuestion1").find("option[text='" + json.que1 + "']").attr("selected", "true");
                $("#selQuestion2").find("option[text='" + json.que2 + "']").attr("selected", "true");
                $("#selQuestion3").find("option[text='" + json.que3 + "']").attr("selected", "true");
            }
        });
    };
    return SecretPwdController;
})();
/// <reference path="controllers/registercontroller.ts" />
/// <reference path="controllers/usercentercontroller.ts" />
/// <reference path="controllers/userdetailcontroller.ts" />
/// <reference path="controllers/changepwdcontroller.ts" />
/// <reference path="controllers/homecontroller.ts" />
/// <reference path="controllers/mypiccontroller.ts" />
/// <reference path="controllers/accountbindcontroller.ts" />
/// <reference path="controllers/accountsafecontroller.ts" />
/// <reference path="controllers/bindphonecontroller.ts" />
/// <reference path="controllers/loginemailcontroller.ts" />
/// <reference path="controllers/loginrecordcontroller.ts" /> 
/// <reference path="controllers/usermessagecontroller.ts" />
/// <reference path="controllers/usermessagenoticecontroller.ts" />
/// <reference path="controllers/secretpwdcontroller.ts" />
/// <reference path="controllers/findpwdcontroller.ts" />
/// <reference path="controllers/baseController.ts" />
/// <reference path="controllers/bcPersonalprofileController.ts" />
window.onload = function () {
    HomeUrlUtils.getHomeUrl(function () {
        var controllerName = $("#controllerName").attr("data-controller-name");
        if (controllerName === 'register') {
            (new RegisterController()).init();
        }
        else if (controllerName == 'userCenter') {
            (new UserCenterController()).init();
        }
        else if (controllerName == 'userDetail') {
            (new UserDetailController()).init();
        }
        else if (controllerName == 'changePwd') {
            (new ChangePwdController()).init();
        }
        else if (controllerName == 'index') {
            (new HomeController()).init();
        }
        else if (controllerName == 'myPic') {
            (new MyPicController()).init();
        }
        else if (controllerName == 'accountBind') {
            (new AccountBindController()).init();
        }
        else if (controllerName == 'accountSafe') {
            (new AccountSafeController()).init();
        }
        else if (controllerName == 'bindPhone') {
            (new BindPhoneController()).init();
        }
        else if (controllerName == 'loginEmail') {
            (new LoginEmailController()).init();
        }
        else if (controllerName == 'loginRecord') {
            (new LoginRecordController()).init();
        }
        else if (controllerName == 'userMessage') {
            (new UserMessageController()).init();
        }
        else if (controllerName == 'userMessageNotice') {
            (new UserMessageNoticeController()).init();
        }
        else if (controllerName == 'secretPwd') {
            (new SecretPwdController()).init();
        }
        else if (controllerName == 'findpwd') {
            (new FindPwdController()).init();
        }
        else if (controllerName == 'wait') {
            (new WaitController()).init();
        }
        else if (controllerName == 'siteMessage') {
            (new SiteMessageController()).init();
        }
        else if (controllerName == 'helpCenter') {
            (new HelpCenterController()).init();
        }
        else if (controllerName == 'messageDetail') {
            (new MessageDetailController()).init();
        }
        else if (controllerName == 'orderList') {
            (new BcOrderListController()).init();
        }
        else if (controllerName == 'orderComment') {
            (new BcOrderCommentController()).init();
        }
        else if (controllerName == 'consultationList') {
            (new BcConsultationListController()).init();
        }
        else if (controllerName == 'b2c_index') {
            (new BcIndexController()).init();
        }
        else if (controllerName == 'bcPersonalprofile') {
            (new BcPersonalprofileController()).init();
        }
        else if (controllerName == 'bcChangePwd') {
            (new BcChangePwdController()).init();
        }
        else if (controllerName == 'bcBindPhone') {
            (new BcBindPhoneController()).init();
        }
        else if (controllerName == 'bcBindEmail') {
            (new BcBindEmailController()).init();
        }
        else if (controllerName == 'bcLoginRecord') {
            (new BcLoginRecordController()).init();
        }
        else if (controllerName == 'bcSecretPwd') {
            (new BcSecretPwdController()).init();
        }
        else if (controllerName == 'bcAccountSafe') {
            (new BcAccountSafeController()).init();
        }
        else if (controllerName == 'bcInvoice') {
            (new BcInvoiceController()).init();
        }
        else if (controllerName == 'bcFollow') {
            (new BcFollowController()).init();
        }
        else if (controllerName == 'bcHistory') {
            (new BcHistoryController()).init();
        }
        else if (controllerName == 'bcSuggestion') {
            (new BcSuggestionController()).init();
        }
        else if (controllerName == 'orderReturnList') {
            (new BcOrderReturnListController()).init();
        }
        else if (controllerName == 'returnApply') {
            (new BcReturnApplyController()).init();
        }
        else if (controllerName == 'orderItemReturnRecordList') {
            (new BcOrderItemReturnRecordListController()).init();
        }
        else if (controllerName == 'orderItemList') {
            (new BcOrderItemListController()).init();
        }
        else if (controllerName == 'wapOrderList') {
            (new WapOrderListController()).init();
        }
        else if (controllerName == 'wapOrderItemList') {
            (new WapOrderItemListController()).init();
        }
        else if (controllerName == 'wapIndex') {
            (new WapIndexController()).init();
        }
        else if (controllerName == 'wapAddress') {
            (new WapAddressController()).init();
        }
        else if (controllerName == 'wapChangePwd') {
            (new WapIndexController()).init();
        }
        else if (controllerName == 'wapEditAddress') {
            (new WapEditAddressController()).init();
        }
        else if (controllerName == 'wapFollow') {
            (new WapFollowController()).init();
        }
        else if (controllerName == 'wapHistory') {
            (new WapHistoryController()).init();
        }
        else if (controllerName == 'wapUserMessage') {
            (new WapUserMessageController()).init();
        }
        else if (controllerName == 'wapProfiles') {
            (new WapBaseController());
        }
    });
};
var MessageDetailController = (function () {
    function MessageDetailController() {
        //获取ID，返回地址
        this.userService = new UserService();
        this.msgID = parseInt(HomeUrlUtils.getUrlVar("msgID"));
        this.returnUrl = HomeUrlUtils.getUrlVar("returnUrl");
    }
    MessageDetailController.prototype.init = function () {
        var _this = this;
        this.getBasicUserInfo();
        /*弹窗 开始*/
        $(".mlayBg").height($(document).height());
        $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
        $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        $(window).resize(function () {
            $(".mlayBg").height($(document).height());
            $(".mbody2").css("padding-top", ($(document).height() - 655) / 2);
            $(".mbody3").css("padding-top", ($(document).height() - 755) / 2);
        });
        $(".mrclose").click(function () {
            $(".mlay_sm").slideUp(200);
            $(".mlayBg").hide();
        });
        $("#btnReplyMsgOpen").click(function () {
            $(".mlay_sm").slideDown(200);
            $(".mlayBg").show();
        });
        /*弹窗 结束*/
        //绑定事件
        $("#btnReturn").click(function () {
            HomeUrlUtils.redirectToReturnUrl();
        });
        $("#btnDeleteMsg").click(function () {
            _this.deleteMsg(_this.msgID);
        });
        $("#btnReplyMsg").click(function () {
            _this.sendMessage();
        });
        //绑定信息
        this.userService.getUserMessageDetail(this.msgID, function (data) {
            if (data.isSuccess) {
                if (data.info.messageType == '1') {
                    $("#msgType").html("站内信");
                    $("#btnReplyMsgOpen").css("display", "inline");
                }
                else if (data.info.messageType == '2') {
                    $("#msgType").html("系统通知");
                    $("#btnReplyMsgOpen").remove();
                    $("#btnReplyMsg").remove();
                }
                else if (data.info.messageType == '3') {
                    $("#msgType").html("系统公告");
                    $("#btnReplyMsgOpen").remove();
                    $("#btnReplyMsg").remove();
                    $("#btnDeleteMsg").remove();
                }
                $("#title").html(data.info.title);
                $("#msg").html(data.info.content);
                $("#from").html(data.info.messageFrom);
                $("#addDate").html(data.info.addDate.replace("T", " "));
                $("#replyUserName").val(data.info.messageFrom);
            }
        });
    };
    MessageDetailController.prototype.getBasicUserInfo = function () {
        var _this = this;
        this.userService.getUser(function (json) {
            if (json.isAnonymous) {
                HomeUrlUtils.redirectToLogin();
            }
            else {
                $("#spanUserName").html(json.user.userName);
                $("#spanUserName").attr("href", HomeUrlUtils.homeUrl);
                if (json.user.hasNewMsg) {
                    $("#userMsgTip").css("display", "inline");
                    $("#userMsgCount").html(json.user.newMsgCount);
                }
                $("#btnLogout").click(function (e) {
                    _this.userService.logout(function () {
                        HomeUrlUtils.redirectToLogin(HomeUrlUtils.homeUrl);
                    });
                });
            }
        });
    };
    MessageDetailController.prototype.deleteMsg = function (msgID) {
        if (!confirm("确定要删除该消息吗？"))
            return;
        this.userService.deleteUserMessage(msgID, function (data) {
            if (data.isSuccess) {
                Utils.tipAlert(true, "删除成功！");
                HomeUrlUtils.redirectToReturnUrl();
            }
            else {
                Utils.tipAlert(false, data.errorMessage);
            }
        });
    };
    MessageDetailController.prototype.sendMessage = function () {
        var userName = $("#replyUserName").val();
        var msg = $("#replyMsg").val();
        var title = $("#replyTitle").val();
        var parentID = this.msgID;
        if (!userName) {
            Utils.tipShow($("#replyUserName"), false, "请输入正确的接收人！");
            return;
        }
        else
            Utils.tipShow($("#replyUserName"));
        if (!title) {
            Utils.tipShow($("#replyTitle"), false, "请输入标题！");
            return;
        }
        else
            Utils.tipShow($("#replyTitle"));
        if (!msg) {
            Utils.tipShow($("#replyMsg"), false, "请输入内容！");
            return;
        }
        else
            Utils.tipShow($("#replyMsg"));
        this.userService.sendMessage(userName, title, msg, function (data) {
            if (data.isSuccess)
                Utils.tipAlert(true, "发送成功！");
            else
                Utils.tipAlert(false, data.errorMessage);
        }, parentID);
    };
    MessageDetailController.GetRedirectString = function (msgID, returnUrl) {
        var retUrl = MessageDetailController.url;
        retUrl += "?msgID=" + msgID + "&returnUrl=" + returnUrl;
        return retUrl;
    };
    MessageDetailController.url = "messageDetail.html";
    return MessageDetailController;
})();
var WaitController = (function () {
    function WaitController() {
        this.seconds = 5;
        this.returnUrl = HomeUrlUtils.getUrlVar("returnUrl");
    }
    WaitController.prototype.init = function () {
        var _this = this;
        if (this.returnUrl.length > 0) {
            var intID = setInterval(function () {
                _this.seconds--;
                if (_this.seconds == 0) {
                    window.top.location.href = _this.returnUrl;
                    clearInterval(intID);
                }
                else
                    $("#leftSeconds").html(_this.seconds + "s...");
            }, 1000);
        }
    };
    return WaitController;
})();
/// <reference path="../../../defs/jquery.d.ts" />
var HomeUrlUtils = (function () {
    function HomeUrlUtils() {
    }
    HomeUrlUtils.getHomeUrl = function (fn) {
        HomeUrlUtils.homeUrl = "/home/";
        var userService = new UserService();
        userService.getHomeUrl(function (data) {
            if (data.isSuccess) {
                HomeUrlUtils.homeUrl = "/" + data.homeUrl + "/";
                if (fn)
                    fn();
            }
        });
    };
    HomeUrlUtils.getAPI = function (controllerName, action, id) {
        if (id) {
            return HomeUrlUtils.apiUrl + controllerName + '/' + action + '/' + id;
        }
        return HomeUrlUtils.apiUrl + controllerName + '/' + action;
    };
    HomeUrlUtils.getAbsoluteUrl = function (url) {
        return "http://" + window.location.hostname.toLowerCase() + "/" + url.replace(/(^\/*)|(\/*$)/g, "");
    };
    HomeUrlUtils.getReturnUrl = function (defaultUrl) {
        var reg = new RegExp("(^|&)" + "returnUrl" + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return defaultUrl || window.location.href;
        }
    };
    HomeUrlUtils.getUrlVar = function (key) {
        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        return result && decodeURIComponent(result[1]) || "";
    };
    HomeUrlUtils.redirectToReturnUrl = function (defaultUrl) {
        location.href = HomeUrlUtils.getReturnUrl(defaultUrl);
    };
    HomeUrlUtils.redirectToIndex = function () {
        location.href = HomeUrlUtils.homeUrl + 'index.htm';
    };
    HomeUrlUtils.redirectToWapIndex = function () {
        location.href = HomeUrlUtils.homeUrl + 'wap/index.htm';
    };
    HomeUrlUtils.redirectToLogin = function (returnUrl) {
        returnUrl = returnUrl || window.location.href;
        location.href = HomeUrlUtils.homeUrl + 'login.html?returnUrl=' + returnUrl;
    };
    HomeUrlUtils.redirectToWapLogin = function (returnUrl) {
        returnUrl = returnUrl || window.location.href;
        location.href = HomeUrlUtils.homeUrl + 'wap/login.html?returnUrl=' + returnUrl;
    };
    HomeUrlUtils.reload = function () {
        location.reload(true);
    };
    HomeUrlUtils.apiUrl = "/api/";
    return HomeUrlUtils;
})();
var pageDataUtils = (function () {
    function pageDataUtils() {
    }
    pageDataUtils.getPageHtml = function (pageJson, getData) {
        var pageHtml = "";
        if (pageJson.length == 0)
            return pageHtml;
        pageJson = eval("(" + pageJson + ")");
        var total = pageJson.total;
        var pageIndex = pageJson.pageIndex;
        var prePageNum = pageJson.prePageNum;
        pageHtml += "&nbsp;<span class='mpage_Nonum' id='spanTotal'>共" + total + "条</span>&nbsp;";
        pageHtml += "&nbsp;<a href='javascript:void(0)' class='mpage_num' pageIndex='" + pageJson.pre + "' prePageNum='" + prePageNum + "' onclick='" + getData + "(" + pageJson.pre + "," + prePageNum + ")'>上一页</a>&nbsp;";
        for (var j = 0; j < pageJson.list.length; j++) {
            if (pageJson.list[j] == pageIndex)
                pageHtml += "&nbsp;<a href='javascript:void(0)' class='mpage_num mpage_cutnum' pageIndex='" + pageJson.list[j] + "' prePageNum='" + prePageNum + "'>" + pageJson.list[j] + "</a>&nbsp;";
            else
                pageHtml += "&nbsp;<a href='javascript:void(0)' class='mpage_num' pageIndex='" + pageJson.list[j] + "' prePageNum='" + prePageNum + "' onclick='" + getData + "(" + pageJson.list[j] + "," + prePageNum + ")'>" + pageJson.list[j] + "</a>&nbsp;";
        }
        pageHtml += "&nbsp;<a href='javascript:void(0)' class='mpage_num' pageIndex='" + pageJson.next + "' prePageNum='" + prePageNum + "' onclick='" + getData + "(" + pageJson.next + "," + prePageNum + ")'>下一页</a>&nbsp;";
        return pageHtml;
    };
    return pageDataUtils;
})();
//==========getData========================
function getUserLoginLogData(pageIndex, prePageNum) {
    var hc = new HomeController();
    hc.getUserLoginLog(pageIndex, prePageNum);
}
function getUserMessageData(pageIndex, prePageNum) {
    var uc = new UserMessageController();
    uc.getUserMessage(pageIndex, prePageNum);
}
function getUserMessageNotice(pageIndex, prePageNum) {
    var unc = new UserMessageNoticeController();
    unc.getUserMessageNotice(pageIndex, prePageNum);
}
function getAllOrderList(pageIndex, prePageNum) {
    var ol = new BcOrderListController();
    ol.bindOrderList(pageIndex, prePageNum);
}
function getAllOrderList1(pageIndex, prePageNum) {
    var ol = new BcSuggestionController();
    ol.bindOrderList(pageIndex, prePageNum);
}
function getAllConsultationList(pageIndex, prePageNum) {
    var cl = new BcConsultationListController();
    cl.bindConsultationList(pageIndex, prePageNum);
}
function getUserFollow(pageIndex, prePageNum) {
    var flc = new BcFollowController();
    flc.getUserFollow(pageIndex, prePageNum);
}
function getUserHistory(pageIndex, prePageNum) {
    var flc = new BcHistoryController();
    flc.getUserHistory(pageIndex, prePageNum);
}
function getOrderItemList(pageIndex, prePageNum) {
    var bc = new BcOrderCommentController();
    bc.bindOrderItemList(pageIndex, prePageNum);
}
//# sourceMappingURL=D:/JLiang/programe/GeXia/V4/Web/Home/js/app.js.map