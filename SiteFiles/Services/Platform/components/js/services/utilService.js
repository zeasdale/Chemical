var utilService = {
    getDate: function (d) {
        return d.substr(0, d.indexOf('T'));
    },
    getDateTime: function (d) {
        return d.substr(0, d.indexOf('T')) + ' ' + d.substr(d.indexOf('T') + 1);
    },
    formatTime: function (time, fmt) {
        var S = '';
        if (time.indexOf("-") > 0)
            time = time.replace(/-/g, "/");
        if (time.indexOf(".") > 0) {
            time = time.substring(0, time.indexOf("."));
            S = time.substring(time.indexOf(".") + 1);
        }
        var datetime = eval("(new Date('" + time + "'))")
        var o = {
            "M+": datetime.getMonth() + 1,
            "d+": datetime.getDate(),
            "h+": datetime.getHours() % 12 == 0 ? 12 : datetime.getHours() % 12,
            "H+": datetime.getHours(),
            "m+": datetime.getMinutes(),
            "s+": datetime.getSeconds(),
            "q+": Math.floor((datetime.getMonth() + 3) / 3),
            "S": S
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
    },
    /*
    * 添加两个处理事件
    * onPreLoad -- 渲染之前，对数据源做处理
    * onLoaded  -- 渲染之后，执行自定义数据
    */
    render: function (controllerName, controller, onPreLoad, onLoaded) {
        if (typeof (onPreLoad) == "function") {
            onPreLoad(controller);
        }

        $("." + controllerName + "Html").remove();
        var i = 0;
        $("." + controllerName).each(function () {
            $(this).attr('id', controllerName + i++);
            var html = template.render($(this).attr('id'), controller);
            var div = $('<div>' + html + '</div>');
            div.children().addClass(controllerName + 'Html');
            $(this).after(div.html());
        });

        if (typeof (onLoaded) == "function") {
            onLoaded(controller);
        }
    },
    getUrlVar: function (key) {
        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        return result && decodeURIComponent(result[1]) || "";
    },
    urlToMap: function (url) {
        url = decodeURIComponent(url);
        var objResult = {};
        $.each(url.split('&'), function (i, item) {
            var prm = item.split('=');
            if (prm[0] && prm[1]) {
                objResult[prm[0]] = prm[1];
            }
        });
        return objResult;
    },
    random: function () {
        return parseInt(1000 * Math.random());
    },
    mapToUrl: function (map) {
        return $.param(map);
    },
    clone: function (obj) {
        return $.extend(true, {}, obj);
    },
    isEmail: function (str) {
        return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str);
    },
    isMobile: function (str) {
        return /^0{0,1}1[0-9]{10}$/.test(str);
    },
    isPC: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
};

if (!$pageInfo) {
    var $pageInfo = { siteUrl: utilService.getUrlVar('siteUrl'), rootUrl: '', publishmentSystemID: utilService.getUrlVar('publishmentSystemID'), apiUrl: "/api" };
}