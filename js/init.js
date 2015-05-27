/*global chrome*/
chrome.runtime.onInstalled.addListener(function(details){
	if (details.reason === "install") {
		chrome.tabs.create({url: "http://kobitate.com/bootswatch-previewer"});
		chrome.storage.sync.set({favorites: ""});
		chrome.storage.sync.set({startupMode: "all_themes"});
    }
});