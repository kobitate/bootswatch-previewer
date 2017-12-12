/*global chrome*/

function getSetting(name, callback) {
	chrome.storage.sync.get(name, function(data) {
		callback(data);
	}); 
}

function getStartpage(callback) {
	getSetting("startupmode", function(data) {
		if (data.startupmode === undefined) {
			chrome.storage.sync.set({startupmode: "all-themes"});
		}
		callback(data.startupmode);
	});
}

function checkAnalyticsOptout(callback){
	getSetting("analyticsoptout", function(data){
		if (data.analyticsoptout === undefined) {
			chrome.storage.sync.set({analyticsoptout: false});
		}
		callback(data.analyticsoptout);
	});
}

function setFaves(faves){
	chrome.storage.sync.set({favorites: faves});
}

function getFaves(callback){
	getSetting("favorites", function(data) {
		if (data.favorites === undefined) {
			setFaves("");
		}
		callback(data.favorites);
	});
}


function checkFaved(t, callback) {
	getFaves(function(data){
		var faves = data.split(" ");
		if (faves.indexOf(t) > -1) {
			callback(true);
		}
		else {
			callback(false);
		}
	});
}

function addFave(t) {
	getFaves(function(data){
		var s = data+" "+t;
		s = s.trim();
		setFaves(s);
		themeEvent("add-fave", t);
	});
}

function removeFave(t) {
	getFaves(function(data){
		data = data.replace(t + " ", "");
		data = data.replace(t, "");
		setFaves(data.trim());
		themeEvent("remove-fave", t);
	});
}

function toggleFave(t) {
	checkFaved(t, function(isFaved) {
		if (isFaved) {
			removeFave(t);
			
			var activeTab = $("menu li.active").data('target');
			
			if (activeTab === "faves") {
				$("#theme-" + t).hide();
				if ($(".theme-block.theme-faved").length === 0) {
					$("#no-faves").show();
				}
			}
		}
		else {
			addFave(t);
		}
	});
}

function clearFaves(){
	setFaves("");
}

function setShowUpdatev2Dialog(toShow){
	chrome.storage.sync.set({showUpdatev2Dialog: toShow});
}

function getShowUpdatev2Dialog(callback) {
	getSetting("showUpdatev2Dialog", function(data) {
		if (data.showUpdatev2Dialog === undefined) {
			setShowUpdatev2Dialog(false);
		} else {
			callback(data.showUpdatev2Dialog);
		}
	});
}