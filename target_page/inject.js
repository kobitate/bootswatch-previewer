/*global chrome*/

var links = document.getElementsByTagName("link");
var foundBootstrap = false;
for (var i = 0, l = links.length; i < l; i++) {
    var sheet = links[i];
    if (sheet.href.indexOf("bootstrap.css") > -1 || sheet.href.indexOf("bootstrap.min.css") > -1 ) {
        sheet.id = "original-stylesheet";
        foundBootstrap = true;
        break;
    }
}

if (!foundBootstrap) {
	chrome.runtime.sendMessage({method:'bootstrapStatus',title:'false'});
}
else {
	chrome.runtime.sendMessage({method:'bootstrapStatus',title:'true'});
}

var newsheet = document.getElementById("bootswatch-style");

if (newsheet === null) {
	var headHTML = document.getElementsByTagName('head')[0].innerHTML;
	headHTML    += '<!--DO NOT DOWNLOAD THIS VERSION. I have made customizations for it to work with the extension. Please use the Download button in the popup.-->'+
	"\n"+
	'<link id="bootswatch-style" rel="stylesheet" href="" />'+
	'<input type="hidden" id="last-theme" value="" />';
	document.getElementsByTagName('head')[0].innerHTML = headHTML;
}
else {
	var lastTheme = document.getElementById("last-theme").value;
	if (lastTheme !== "") {
		chrome.runtime.sendMessage({method:'themeAlreadySet',title:lastTheme});
	}
}

function updateURL(string) {
	window.history.pushState("bspr","Bootswatch Previewer State", string);
}

function paramUpdate(key, value) {
    key = escape(key); value = escape(value);

    var kvp = document.location.search.substr(1).split('&');
    if (kvp === '') {
        updateURL('?' + key + '=' + value);
    }
    else {

        var i = kvp.length; var x; while (i--) {
            x = kvp[i].split('=');

            if (x[0] === key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
		var params = kvp.join('&');
		
		if (params.charAt(0) == '&') {
			params = params.substr(1);
		}
		
        updateURL("?" + params);
    }
}

function cacheControl() {
	paramUpdate("bspr",Math.floor(Date.now()));
}