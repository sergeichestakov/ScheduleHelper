$(document).ready(function(){
	injectScript("src/data.js");
	injectScript("src/conflict.js");
	injectScript("src/inlineSearch.js");
	injectScript("src/textSearch.js");
	injectCSS("libs/balloon.min.css");
});

function injectCSS(fileName){
	var body = document.getElementsByTagName("head")[0];
	var sheet = document.createElement("link");
	sheet.setAttribute("rel", "stylesheet");
	sheet.setAttribute("type", "text/css");
	sheet.setAttribute("href", chrome.extension.getURL(fileName));
	body.appendChild(sheet);
}

function injectScript(fileName){
	var body = document.getElementsByTagName("body")[0];
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", chrome.extension.getURL(fileName));
	body.appendChild(script);
}
