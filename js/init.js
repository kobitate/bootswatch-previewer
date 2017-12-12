// @codekit-prepend "analytics.js"

/*global chrome*/
chrome.runtime.onInstalled.addListener(function(details){
	if (details.reason === "install") {
		chrome.tabs.create({url: "http://kobitate.com/bootswatch-previewer"});
		chrome.storage.sync.set({favorites: ""});
		chrome.storage.sync.set({startupMode: "all_themes"});
		noninteractionEvent('extension', 'install');
    } else if (details.reason === "update" && chrome.runtime.getManifest().version === "2.0") {
	    chrome.storage.sync.set({showUpdatev2Dialog: true});
		chrome.storage.sync.set({favorites: ""});
		chrome.storage.sync.set({startupMode: "all_themes"});
    }
});