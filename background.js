"use strict";

var ua = "Merda (1.2.3)";

function rewriteUserAgentHeader(e) {
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

var API = chrome || browser;

API.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
                                          {urls: ['https://*/*', "http://*/*"]},
                                          ["blocking", "requestHeaders"]);
