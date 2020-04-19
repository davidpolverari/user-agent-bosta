"use strict";

var API = chrome || browser;

function pegarStorageUA() {
		API.storage.sync.get("ua", function(result) {
			if (result.ua == undefined) {
				pegarStorageUA.ua = navigator.userAgent;
			} else {
				pegarStorageUA.ua = result.ua;
			}
		});
}

function rewriteUserAgentHeader(e) {
	for (var header of e.requestHeaders) {
		if (header.name.toLowerCase() === "user-agent") {
			header.value = pegarStorageUA.ua;
			console.log('Definius::'+ header.value);
		}
	}
	return {requestHeaders: e.requestHeaders};
}

pegarStorageUA();

API.storage.onChanged.addListener(pegarStorageUA);

API.webRequest.onBeforeSendHeaders.addListener(
	rewriteUserAgentHeader,
	{urls: ['<all_urls>']},
	["blocking", "requestHeaders"]
);
