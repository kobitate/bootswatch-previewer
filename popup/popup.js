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
		code: 'document.getElementById("bootswatch-style").setAttribute("href", "'+ themeFile +'");'+"\n"+
			'var originalSheet=document.getElementById("original-stylesheet");'+"\n"+
			'if (originalSheet!=null) { originalSheet.disabled = true; }'+"\n"+
			'document.getElementById("last-theme").value = \''+ t +'\';'
	});
	
	$("#download").attr('href', "http://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/"+ t +"/bootstrap.min.css");
	
}

function clearTheme() {
	chrome.tabs.executeScript(null, {file: "target_page/reset.js"});
	$("#theme-specific-actions").hide();
	$('.theme-icon.active').toggleClass('active');
}

function loadThemes() {
	$("#no-bootstrap").hide();
	$("#theme-actions").show();
	
	for (var t in themes) {
		t = themes[t];
		if(typeof t !== "string"){
			continue;
		}
		
		$("#themes").append(''+
			'<div class="theme-block" id="theme-' + t + '" data-theme="' + t + '">'+
				'<div class="theme-icon">'+
					'<span>Sample</span>'+
					'<div class="color primary"></div>'+
					'<div class="color color-half success"></div>'+
					'<div class="color color-half info"></div>'+
					'<div class="color color-half warning"></div>'+
					'<div class="color color-half danger"></div>'+
				'</div>' +
				t + 
			'</div>');
	}
	
	$(".theme-block").click(function(){
		setTheme($(this).data('theme'));
		$('.theme-icon.active').toggleClass('active');
		$(this).find('.theme-icon').toggleClass('active');
		$("#theme-specific-actions").show();
	});
}

$(document).ready(function(){
	
	prepPage();
	
	chrome.runtime.onMessage.addListener(function(message){
		if (message.method === "bootstrapStatus") {
			var hasBootstrap = (message.title === "true") ? true : false;
			
			loadThemes();
			
			if (!hasBootstrap) {
				$("#no-bootstrap").show();
			}
			
		}
		
		if (message.method === "themeAlreadySet") {
			console.log(message.title);
			$("#theme-" + message.title + " .theme-icon").addClass('active');
			$("#no-bootstrap").hide();
			$("#theme-specific-actions").show();
		}
	});
	
	$("#load-anyway").click(function(){
		$("#reset,#theme-actions").show();
		$("#no-bootstrap").hide();
	});
	
	$("#reset").click(function(){
		clearTheme();
	});
	
	$("a").click(function(){
		var href = $(this).attr('href');
		
		if (href != "#") {
			chrome.tabs.create({url: $(this).attr('href')});
			return false;
		}
	});
	
	$("#hamburger").click(function(){
		$("menu").toggleClass("open");
		$("#menu-shade").fadeIn();
	});
	
	$("#menu-shade").click(function(){
		$("menu").toggleClass("open");
		$("#menu-shade").fadeOut();
	});
	
	$("menu ul li").click(function(){
		$("section.active").removeClass('active');
		
		$("menu ul li.active").removeClass('active');
		$(this).addClass('active');
		
		var target = $("section#section-" + $(this).data("target"));
		target.addClass('active');
		
		$("menu").toggleClass("open");
		$("#menu-shade").fadeOut();
	});
	
	$("#load-anyway-cancel").click(function(){
		window.close();
	});
	
});