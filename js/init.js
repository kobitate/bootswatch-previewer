function saveSetting(name, value) {
	chrome.storage.sync.set({name: value});
}

chrome.runtime.onInstalled.addListener(function(details){
	if (details.reason == "install") {
		saveSetting("favorites", " ");
		alert("Thank you for installing Bootswatch Previewer!");
    }
});