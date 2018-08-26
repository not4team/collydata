function DoTk() {
    var c = "";
    var d = { "x1": "./", "x2": "aj", "x3": "ax/", "x4": "Se", "x5": "c/", "x7": "v.as", "x8": "px" };
    var e = { "x1": "d", "x2": "=g", "x3": "t&", "x4": "ke", "x5": "y=" };
    var f = "";
    var g = "";
    for (var h in d) { f += d[h] };
    for (var h in e) { g += e[h] };
    g += "8dc2f179c8ea41ad";
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
                // if ($("#hidTkey").val() != l) { $("#hidTkey").val(l) };
                // $("body").append(k);
                var m = $(k).find("table").eq(0);
                // m.hide();
                console.log("m is " + m.text());
                var n = m.attr("s");
                console.log("n = " + n);
                var o = m.attr("p");
                console.log("o = " + o);
                // m.remove();
                c = eval(function(p, q, r, s, e, t) {
                    e = function(u) { return (u < q ? "" : e(parseInt(u / q))) + ((u = u % q) > 35 ? String.fromCharCode(u + 29) : u.toString(36)) };
                    if (!''.replace(/^/, String)) {
                        console.log("********q:" + q);
                        while (r--) t[e(r)] = s[r] || e(r);
                        console.log("*******t:" + JSON.stringify(t));
                        s = [function(u) { return t[u] }];
                        e = function() { return '\\w+' };
                        r = 1
                    };
                    console.log("****** r:" + r);
                    while (r--)
                        if (s[r]) {
                            p = p.replace(new RegExp('\\b' + e(r) + '\\b', 'g'), s[r]);
                        }
                    console.log("***********p:" + p);
                    return p
                }(n, 17, 17, o.split('|'), 0, {}))
            }
        }
    });
    return c
}

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

(function() { alert(DoTk()); })();