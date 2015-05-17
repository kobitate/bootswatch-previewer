chrome.runtime.onInstalled.addListener(function(details){
	if (details.reason == "install") {
		alert("Thank you for installing Bootswatch Previewer!");
		chrome.storage.sync.set({"favorites": ""});
    }
});