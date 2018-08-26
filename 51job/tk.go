package main

import (
	"log"

	"github.com/gocolly/colly"
)

func getTk(fksc string, hidTkey string, callback func(tk string, hidTkey string, err error)) {
	c := colly.NewCollector(colly.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0"))
	c.IgnoreRobotsTxt = true
	c.OnHTML("message", func(e *colly.HTMLElement) {
		msgtype := e.DOM.Find("msgtype").Eq(0).Text()
		if msgtype == "1" {
			h := e.DOM.Find("h").Eq(0).Text()
			k := e.DOM.Find("k").Eq(0).Text()
			if hidTkey != k {
				hidTkey = k
			}
			n, exists := e.DOM.Find("#divTLoading > table").Eq(0).Attr("s")
			o, exists := e.DOM.Find("#divTLoading > table").Eq(0).Attr("p")
		} else {
			callback("", hidTkey, nil)
		}
	})
	err := c.Post("https://ehire.51job.com/ajax/Sec/v.aspx", map[string]string{"d": "gt", "key": fksc})
	if err != nil {
		log.Fatal(err)
		callback("", hidTkey, err)
	}
}
