package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/debug"
	"github.com/gocolly/colly/extensions"
)

/* __VIEWSTATE	/wEPDwUKLTEzNTAwODM0MA9kFgICAQ9kFgICAQ8PFgIeCEltYWdlVXJsBUAvL2ltZzA3LjUxam9iY2RuLmNvbS9pbWVoaXJlL2VoaXJlMjAwNy9kZWZhdWx0bmV3L2ltYWdlL2xhbmcuZ2lmFgIeB09uQ2xpY2sFE3JldHVybiBTZXRMYW5nKCcnKTtkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQtja2JSZW1lbWJlcg==
checkCode
ctmName	中软国际总部
ec	1d7d7e40924740c8881f963d314c7e52
fksc	8dc2f179c8ea41ad
hidAccessKey	ea3754050a13448
hidEhireGuid	1d7d7e40924740c8881f963d314c7e52
hidLangType	Lang=&Flag=1
hidRetUrl
hidTkey	80eafaed9c06419
hidVGuid	D75C095738076ADDA4A6
isRememberMe	false
langtype	Lang=&Flag=1
oldAccessKey	ea3754050a13448
password	zhongruan201
referrurl
returl
sc	8dc2f179c8ea41ad
sk	80eafaed9c06419
tk	713dbe1af74e475
txtMemberNameCN	中软国际总部
txtPasswordCN	zhongruan201
txtUserNameCN	GRC2_TEMP_Test
userName	GRC2_TEMP_Test
verifyGuid	D75C095738076ADDA4A6 */

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("51job.com"),
		colly.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0"),
		colly.AllowURLRevisit(),
		colly.Debugger(&debug.LogDebugger{}),
	)

	c.IgnoreRobotsTxt = true
	c.RedirectHandler = func(req *http.Request, via []*http.Request) error {
		fmt.Println("redirectHandler:", req.URL.String())
		return nil
	}

	extensions.RandomUserAgent(c)
	extensions.Referrer(c)

	// On every a element which has href attribute call callback
	c.OnHTML("form#form1", func(e *colly.HTMLElement) {
		_ViewState, exists := e.DOM.Find("input#__VIEWSTATE").Eq(0).Attr("value")
		if exists {
			fmt.Println("__VIEWSTATE is:", _ViewState)
		}
		hidLangType, exists := e.DOM.Find("input#hidLangType").Eq(0).Attr("value")
		if exists {
			fmt.Println("hidLangType is:", hidLangType)
		}
		hidAccessKey, exists := e.DOM.Find("input#hidAccessKey").Eq(0).Attr("value")
		if exists {
			fmt.Println("hidAccessKey is:", hidAccessKey)
		}
		fksc, exists := e.DOM.Find("input#fksc").Eq(0).Attr("value")
		if exists {
			fmt.Println("fksc is:", fksc)
		}
		ec, exists := e.DOM.Find("input#hidEhireGuid").Eq(0).Attr("value")
		if exists {
			fmt.Println("ec is:", ec)
		}
		hidTkey, exists := e.DOM.Find("input#hidTkey").Eq(0).Attr("value")
		if exists {
			fmt.Println("hidTkey is:", hidTkey)
		}
		hidVGuid, exists := e.DOM.Find("input#hidVGuid").Eq(0).Attr("value")
		if exists {
			fmt.Println("hidVGuid is:", hidVGuid)
		}

		// authenticate
		// tk是同步请求https://ehire.51job.com/ajax/Sec/v.aspx后的值
		err := c.Post(RealLoginURL, map[string]string{"__VIEWSTATE": _ViewState, "checkCode": "", "ctmName": "中软国际总部", "ec": ec, "fksc": fksc, "hidAccessKey": hidAccessKey,
			"hidEhireGuid": ec, "hidLangType": hidLangType, "hidRetUrl": "", "hidTkey": hidTkey, "hidVGuid": hidVGuid, "isRememberMe": "false", "langtype": hidLangType,
			"oldAccessKey": hidAccessKey, "password": "zhongruan201", "referrurl": "", "returl": "", "sc": fksc, "sk": hidTkey, "tk": "暂定",
			"txtMemberNameCN": "中软国际总部", "txtPasswordCN": "zhongruan201", "txtUserNameCN": "GRC2_TEMP_Test", "userName": "GRC2_TEMP_Test", "verifyGuid": hidVGuid})
		if err != nil {
			log.Fatal(err)
		}
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Visited", r.Request.URL)
		cookies := c.Cookies(r.Request.URL.String())
		fmt.Printf("cookies is:%v\n", cookies)
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// Start scraping on https://hackerspaces.org
	c.Visit(LoginURL)

}
