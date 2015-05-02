// JSHint definitions
/*global chrome */

// define our themes
var themes = ['cerulean','cosmo','cyborg','darkly','flatly','journal','lumen','paper','readable','sandstone','simplex','slate','spacelab','superhero','united','yeti'];

var pagePrepped = false;

function prepPage() {
	chrome.tabs.executeScript(null, {file: "target_page/inject.js"});
}

function setTheme(t) {
		
	var themeFile = chrome.extension.getURL('themes/'+t+'.css');
	chrome.tabs.executeScript(null, {
		code: 'document.getElementById("bootswatch-style").setAttribute("href", "'+ themeFile +'");'+
			'document.getElementById("original-stylesheet").disabled = true;'
	});
	
	$("#download").attr('href', "http://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/"+ t +"/bootstrap.min.css");
	
}

function clearTheme() {
	chrome.tabs.executeScript(null, {file: "target_page/reset.js"});
}

$(document).ready(function(){
	
	if (!pagePrepped) {
		prepPage();
		pagePrepped = true;
	}
	
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
	});
	
	$("#reset").click(function(){
		clearTheme();
	});
	
	$("a:not(#reset)").click(function(){
		chrome.tabs.create({url: $(this).attr('href')});
		return false;
	});
	
});