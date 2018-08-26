function ShowArea(c) {
    document.getElementById("allchannel").style.display = "block";
    var d = 0,
        e = 0;
    var f = c.offsetParent;
    if (f) {
        d += f.offsetLeft;
        e += f.offsetTop
    }
    while (f = f.offsetParent) {
        d += f.offsetLeft;
        e += f.offsetTop
    };
    document.getElementById("allchannel").style.left = (c.offsetLeft + d - 395) + "px";
    document.getElementById("allchannel").style.top = (c.offsetTop + e + c.offsetHeight - 2) + "px"
};

function HideArea(c) { document.getElementById("allchannel").style.display = "none" };

function SetLang(c) { window.location.href = "MainLoginEN.aspx"; return false; if (c == 'en-us') { SetCookie("LangType", 'Lang=') } else { SetCookie("LangType", 'Lang=en-us') } };

function SetCookie(c, d) { document.cookie = c + "=" + d };

function js_callpage(c) { var d = window.open(c, "newwin", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=700px,height=550px") };

function js_callpagebig(c) { var d = window.open(c, "newwin", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=700px,height=550px") };

function MM_jumpMenu(c, d, e) { eval(c + ".location='" + d.options[d.selectedIndex].value + "'"); if (e) d.selectedIndex = 0 };

function showObj(c, d) {
    obj = getObj(c);
    obj.visibility = (d) ? visible : hidden
};

function redirect(c) { area = c.value; if (area == "") { window.a = "http://www.51job.com/default-hr.php" }; if (area == "0000") { window.a = "http://www.51job.com/default-qz.php" } else { window.a = "http://www.51job.com/default-area.php?area=" + area } };

function setCookie(c, d, e, f, g, h) {
    var i = c + "=" + d;
    var j = (e == null) ? "" : " ;expires = " + e.toGMTString();
    var k = (f == null) ? "" : " ;path = " + f;
    var l = (g == null) ? "" : " ;domain = " + g;
    var m = (h) ? ";secure" : "";
    document.cookie = i + j + k + l + m
};

function getCookie(c) {
    var d = false;
    var e = 0;
    var f = 0;
    var g = document.cookie;
    var h = 0;
    while (h <= g.length) {
        e = h;
        f = e + c.length;
        if (g.substring(e, f) == c) { d = true; break };
        h++
    };
    if (d) {
        e = f + 1;
        f = g.indexOf(";", e);
        if (f < e) f = g.length;
        return unescape(g.substring(e, f))
    };
    return ""
};

function deleteCookie(c, d, e, f, g) {
    var h = new Date();
    h.setTime(h.getTime() - 1);
    setCookie(c, d, h, e, f, g)
};

function setDefault(c) {
    if (c.checked) {
        var d = new Date();
        d.setTime(d.getTime() + 3 * 30 * 24 * 60 * 60 * 1000);
        setCookie("SetHeadPage", "1", d, "/", "51job.com", false)
    } else { deleteCookie("SetHeadPage", "1", "/", "51job.com", false) }
};

function ShowNotice() {};

function FindPwd(c) { window.open('./Member/FindPassword.aspx', '_blank', ''); return false };

function showPop() {
    var c = 318;
    var d = 300;
    var e = document.getElementById("pop");
    e.style.display = "block";
    e.style.position = "absolute";
    e.style.zindex = "-1";
    e.style.width = c + "px";
    e.style.height = d + "px";
    e.style.background = "#3366FF";
    e.style.left = 0 + "px";
    e.style.top = 0 + "px"
};

function hidePop() { document.getElementById("pop").style.display = "none" };

function chkCodeLoad(c) { document.getElementById("imgCheckCode" + c).src = "./CommonPage/RandomNumber.aspx?type=login&r=" + Math.random() };

function iGetAbsPos(c) {
    var d = hi = 0;
    while (c) {
        d += c['offsetLeft'];
        hi += c['offsetTop'];
        c = c.offsetParent
    };
    return [d, hi]
};
var b = false;

function loginSubmit(c, d) {
    if (b) return;
    var e = c.id.indexOf("EN") > -1 ? true : false;
    var f = e ? document.getElementById("txtMemberNameEN").value : document.getElementById("txtMemberNameCN").value;
    var g = e ? document.getElementById("txtUserNameEN").value : document.getElementById("txtUserNameCN").value;
    var h = e ? document.getElementById("txtPasswordEN").value : document.getElementById("txtPasswordCN").value;
    var i = e ? document.getElementById("txtCheckCodeEN") : document.getElementById("txtCheckCodeCN");
    var j = document.getElementById("ckbRemember");
    var k = document.getElementById("hidLangType").value;
    var l = document.getElementById("hidAccessKey").value;
    var m;
    var n = !1;
    var o = e ? "MemberNameEN" : "MemberNameCN";
    var p = e ? "UserNameEN" : "UserNameCN";
    var q = e ? "PasswordEN" : "PasswordCN";
    var r = e ? "CheckCodeEN" : "CheckCodeCN";
    n = CheckValue(o);
    if (!n) { return };
    n = CheckValue(p);
    if (!n) { return };
    n = CheckValue(q);
    if (!n) { return };
    if (d == "true") { n = CheckValue(r); if (!n) { return } };
    if (ehr.succValidate == "0" && d == "true") {
        $("#btnBeginValidate").click();
        if (ehr.lang == "en") ehr.clickSourceID = "Login_btnLoginEN";
        else ehr.clickSourceID = "Login_btnLoginCN";
        return
    };
    b = true;
    $('#errOther').html('');
    var s = DoTk();
    var t = document.getElementById("hidTkey").value;
    post_to_urlFix(loginPath + "Member/UserLogin.aspx?", { ctmName: (trim(f)), userName: (trim(g)), password: (trim(h)), checkCode: trim(i ? i.value : ""), oldAccessKey: l, langtype: k, isRememberMe: j.checked, sc: getId("fksc") ? trim(getId("fksc").value) : "", ec: getId("hidEhireGuid") ? trim(getId("hidEhireGuid").value) : "", returl: $("#hidRetUrl").val(), referrurl: document.referrer, tk: s, sk: t, verifyGuid: $("#hidVGuid").val() }, "form1")
};

function showErrMess(c, d, e, f) {
    if (f && 0 == 1) { alert(e) } else {
        $('#errOther').attr('style', 'display:none;');
        c.attr('style', 'display:block;');
        d.html(e)
    }
};

function hideErrMess(c, d) {
    c.attr('style', 'display:none;');
    d.html('')
};

function CheckValue(c) {
    var d = c.indexOf("EN") > -1 ? true : false;
    var e = $("#txt" + c);
    var f = $("#err" + c);
    var g = $("#err" + c + "Txt");
    var h = $("#" + c + "div");
    var i = "";
    var j = !1;
    var k = e.attr("ph");
    if (e && f && e.val() != null && e.val() != undefined) {
        switch (c) {
            case "MemberNameCN":
            case "MemberNameEN":
                if (e.val().length == 0 || e.val() == k) { i = d ? "Member Name must input!" : "会员名不能为空！" };
                if (getStrLength(trim(e.val())) > 20) { i = d ? "Length of member name beyond range!" : "会员名长度不能超过20个字符！" };
                break;
            case "UserNameCN":
            case "UserNameEN":
                if (e.val().length == 0 || e.val() == k) { i = d ? "User Name must input!" : "用户名不能为空！" };
                if (getStrLength(trim(e.val())) > 80) { i = d ? "Length of user name beyond range!" : "用户名长度不能超过80个字符！" };
                break;
            case "PasswordCN":
            case "PasswordEN":
                if (e.val().length == 0 || e.val().length < 6 || e.val().length > 12 || e.val() == k) { i = d ? "Password should be between 6 and 12 characters!" : "密码必须在6到12位！" };
                break;
            case "CheckCodeCN":
            case "CheckCodeEN":
                break;
            default:
                break
        }
    };
    if (i) {
        $("#errOther").attr("style", "display:none;");
        h.addClass("inpList_error");
        var l = setTimeout(function() {
            showErrMess(f, g, i, d);
            clearTimeout(l)
        }, 150);
        return !1
    } else {
        hideErrMess(f, g);
        h.removeClass("inpList_error");
        return !0
    }
};

function filldePWText(c) {
    var d = $("#err" + c);
    var e = $("#err" + c + "Txt");
    var f = $("#txt" + c);
    var g = $("#" + c + "div");
    var h = $("#weizao" + c);
    var i = f.attr("ph");
    if (document.getElementById("txt" + c).value != "") { h.css('display', 'none') };
    setTimeout(function() { if (document.getElementById("txt" + c).value != "") { h.css('display', 'none') } }, 100);
    $('input:password').focus(function() {
        h.css('display', 'none');
        g.addClass("Common_onHere");
        hideErrMess(d, e)
    });
    $('input:password').blur(function() {
        if (f.val() == '' || f.attr('ph') == f.val()) { h.css('display', '') };
        $('#' + c + 'div').removeClass('Common_onHere');
        CheckValue(c)
    });
    $("input:password").keydown(function() {
        if (i == f.val()) { $(this).val('') };
        $(this).css('color', '#3b3b3b');
        hideErrMess(d, e)
    });
    h.bind('click', function() {
        $("#password_txt").css('display', 'none');
        $('input:password').focus()
    })
};

function filldefaultText(c) {
    var d = $("#txt" + c);
    var e = $("#" + c + "div");
    var f = d.attr('ph');
    var g = $("#err" + c);
    var h = $("#err" + c + "Txt");
    if (f) {
        if (d.val() == "" || (d.val() == f && d.attr("readonly"))) { d.val(f).css('color', '#b4b4b4') };
        if (d.attr("type") == "text" && !d.attr("readonly")) {
            if (d.val() == f) { d.css('color', '#b4b4b4') };
            d.focus(function() {
                if (d.attr('id')) hideErrMess(g, h);
                e.removeClass("inpList_error");
                e.addClass("Common_onHere");
                if (d.val() == f) {
                    d.attr('ph', "");
                    d.val("").css('color', '#3b3b3b')
                } else { d.css('color', '#3b3b3b') }
            });
            d.blur(function() {
                if (d.val() == "") { d.val(f).attr('ph', f).css('color', '#b4b4b4') };
                if (d.attr('id')) {
                    e.removeClass("Common_onHere");
                    CheckValue(c)
                }
            })
        }
    }
};

function BaseDecode(c) {
    var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var e = arguments.length;
    if (e == 3) { d = arguments[2] };
    var f = "";
    var h, i, j;
    var k, l, m, n;
    var o = 0;
    c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (o < c.length) {
        k = d.indexOf(c.charAt(o++));
        l = d.indexOf(c.charAt(o++));
        m = d.indexOf(c.charAt(o++));
        n = d.indexOf(c.charAt(o++));
        h = (k << 2) | (l >> 4);
        i = ((l & 15) << 4) | (m >> 2);
        j = ((m & 3) << 6) | n;
        f = f + String.fromCharCode(h);
        if (m != 64) { f = f + String.fromCharCode(i) };
        if (n != 64) { f = f + String.fromCharCode(j) }
    };
    return f
};

function DoTk() {
    var c = "";
    var d = { "x1": "./", "x2": "aj", "x3": "ax/", "x4": "Se", "x5": "c/", "x7": "v.as", "x8": "px" };
    var e = { "x1": "d", "x2": "=g", "x3": "t&", "x4": "ke", "x5": "y=" };
    var f = "";
    var g = "";
    for (var h in d) { f += d[h] };
    for (var h in e) { g += e[h] };
    g += $("#fksc").val();
    $.ajax({
        url: f,
        type: "POST",
        async: false,
        dataType: "xml",
        data: g,
        success: function(i) {
            var j = $(i).find("msgtype").eq(0).text();
            if (j == "1") {
                var k = $(i).find("h").eq(0).text();
                var l = $(i).find("k").eq(0).text();
                if ($("#hidTkey").val() != l) { $("#hidTkey").val(l) };
                $("body").append(k);
                var m = $("#divTLoading table");
                m.hide();
                var n = m.attr("s");
                var o = m.attr("p");
                m.remove();
                c = eval(function(p, q, r, s, e, t) {
                    e = function(u) { return (u < q ? "" : e(parseInt(u / q))) + ((u = u % q) > 35 ? String.fromCharCode(u + 29) : u.toString(36)) };
                    if (!''.replace(/^/, String)) {
                        while (r--) t[e(r)] = s[r] || e(r);
                        s = [function(u) { return t[u] }];
                        e = function() { return '\\w+' };
                        r = 1
                    };
                    while (r--)
                        if (s[r]) p = p.replace(new RegExp('\\b' + e(r) + '\\b', 'g'), s[r]);
                    return p
                }(n, 17, 17, o.split('|'), 0, {}))
            }
        }
    });
    return c
}