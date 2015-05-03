// JSHint definitions
/*global chrome */

// define our themes
var themes = ['cerulean','cosmo','cyborg','darkly','flatly','journal','lumen','paper','readable','sandstone','simplex','slate','spacelab','superhero','united','yeti'];

function prepPage() {
	chrome.tabs.executeScript(null, {file: "target_page/inject.js"});
}

function setTheme(t) {
		
	var themeFile = chrome.extension.getURL('themes/'+t+'.css');
	chrome.tabs.executeScript(null, {
		code: 'document.getElementById("bootswatch-style").setAttribute("href", "'+ themeFile +'");'+
			'document.getElementById("original-stylesheet").disabled = true;'+
			'document.getElementById("last-theme").setAttribute("value","'+ t +'");'
	});
	
	$("#download").attr('href', "http://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/"+ t +"/bootstrap.min.css");
	
}

function clearTheme() {
	chrome.tabs.executeScript(null, {file: "target_page/reset.js"});
}

function loadThemes() {
	$("#no-bootstrap").hide();
	$("#reset,#themes").show();
	
	for (var t in themes) {
		t = themes[t];
		if(typeof t !== "string"){
			continue;
		}
		
		$("#themes").append('<div class="theme-block" id="theme-' + t + '" data-theme="' + t + '"><div class="theme-icon">'+ t.toUpperCase().charAt(0) +'</div>' + t + '</div>');
	}
	
	$(".theme-block").click(function(){
		setTheme($(this).data('theme'));
		$('.theme-icon.active').toggleClass('active');
		$(this).find('.theme-icon').toggleClass('active');
		$("#download").show();
	});
}

$(document).ready(function(){
	
	prepPage();
	
	chrome.runtime.onMessage.addListener(function(message){
		if (message.method === "bootstrapStatus") {
			var hasBootstrap = (message.title === "true") ? true : false;
			
			loadThemes();
			
			if (!hasBootstrap) {
				$("#reset,#download,#themes").hide();
				$("#no-bootstrap").show();
			}
			
		}
		
		if (message.method === "themeAlreadySet") {
			$("#theme-" + message.title + " .theme-icon").addClass('active');
		}
	});
	
	$("#load-anyway").click(function(){
		$("#reset,#download,#themes").show();
		$("#no-bootstrap").hide();
	});
	
	$("#reset").click(function(){
		clearTheme();
	});
	
	$("a:not(#reset):not(#load-anyway").click(function(){
		chrome.tabs.create({url: $(this).attr('href')});
		return false;
	});
});