package main

import (
	"fmt"
	"strings"

	"github.com/antchfx/htmlquery"
	"github.com/gocolly/colly"
	"github.com/robertkrimen/otto"
)

func getTk(prevC *colly.Collector, fksc string, hidTkey string, callback func(tk string, hidTkey string, err error)) {
	c := prevC.Clone()
	c.IgnoreRobotsTxt = true
	c.OnResponse(func(r *colly.Response) {
		fmt.Println("tk Visited", r.Request.URL)
	})
	c.OnXML("//message", func(e *colly.XMLElement) {
		msgtype := e.ChildText("//msgtype")
		if msgtype == "1" {
			h := e.ChildText("//h")
			k := e.ChildText("//k")
			if hidTkey != k {
				hidTkey = k
			}
			fmt.Println("k is " + k)

			doc, err := htmlquery.Parse(strings.NewReader(h))
			if err == nil {
				table := htmlquery.FindOne(doc, "//table")
				n := htmlquery.SelectAttr(table, "s")
				fmt.Println("n is " + n)
				o := htmlquery.SelectAttr(table, "p")
				fmt.Println("o is " + o)
				callback(DoTk(n, o), hidTkey, nil)
			} else {
				callback("", hidTkey, err)
			}
		} else {
			callback("", hidTkey, nil)
		}
	})
	err := c.Post(TkURL, map[string]string{"d": "gt", "key": fksc})
	if err != nil {
		callback("", hidTkey, err)
	}
}

func DoTk(n string, o string) string {
	code := `
			BaseDecode = function(c) {
				var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				var e = arguments.length;
				if (e == 3) {
				d = arguments[2];
				}
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
				if (m != 64) {
					f = f + String.fromCharCode(i);
				}
				if (n != 64) {
					f = f + String.fromCharCode(j);
				}
				}
				return f;
			};
			(function(){
			c = eval(
				(function(p, q, r, s, e, t) {
				e = function(u) {
					return (
					(u < q ? "" : e(parseInt(u / q))) +
					((u = u % q) > 35
						? String.fromCharCode(u + 29)
						: u.toString(36))
					);
				};
				if (!"".replace(/^/, String)) {
					console.log("********q:" + q);
					while (r--) t[e(r)] = s[r] || e(r);
					console.log("*******t:" + JSON.stringify(t));
					s = [
					function(u) {
						return t[u];
					}
					];
					e = function() {
					return "\\w+";
					};
					r = 1;
				}
				console.log("****** r:" + r);
				while (r--)
					if (s[r]) {
					p = p.replace(new RegExp("\\b" + e(r) + "\\b", "g"), s[r]);
					}
				console.log("***********p:" + p);
				return p;
				})(
			`
	code = code + "\"" + n + "\", 17, 17, \"" + o + "\".split('|'), 0, {}));return c;})()"
	// fmt.Println("js code : ", code)
	vm := otto.New()
	value, err := vm.Run(code)
	if err != nil {
		fmt.Printf("error: %s\n", err.Error())
		return ""
	} else {
		return value.String()
	}
}
