// @codekit-prepend "../js/fave_functions.js","../js/theme_functions.js"

$(document).ready(function(){
	
	prepPage();
	
	$("a").click(function(){
		var href = $(this).attr('href');
		
		if (href !== "#") {
			chrome.tabs.create({url: $(this).attr('href')});
			return false;
		}
	});
	
	chrome.runtime.onMessage.addListener(function(message){
		if (message.method === "bootstrapStatus") {
			var hasBootstrap = (message.title === "true") ? true : false;
			
			loadThemes();
			
			if (!hasBootstrap) {
				$("#no-bootstrap").show();
			}
			
		}
		
		if (message.method === "themeAlreadySet") {
			$("#theme-" + message.title + " .theme-icon").addClass('active');
			$("#no-bootstrap").hide();
			//$("#theme-specific-actions").show();
			
			checkFaved(message.title, function(isFaved){
				if (isFaved) {
					$("#favorite i").addClass("md-favorite").removeClass("md-favorite-outline");
				}
			});
			
		}
	});
	
	$("#load-anyway").click(function(){
		$("#reset,#theme-actions").show();
		$("#no-bootstrap").hide();
	});
	
	$("#reset").click(function(){
		clearTheme();
	});
	
	$("#hamburger").click(function(){
		$("menu").toggleClass("open");
		$("#menu-shade").fadeIn();
	});
	
	$("#menu-shade").click(function(){
		$("menu").toggleClass("open");
		$("#menu-shade").fadeOut();
	});
	
	$("menu ul li:not([data-target=fave-themes])").click(function(){
		$("section.active").removeClass('active');
		$("#themes .theme-block").show();
		
		$("menu ul li.active").removeClass('active');
		$(this).addClass('active');
		
		var targetName = $(this).data("target");
		
		var target = $("section#section-" + targetName);
		target.addClass('active');
		
		$("menu").toggleClass("open");
		$("#menu-shade").fadeOut();
		
		if (targetName == "about" || targetName == "help") {
			$("#theme-actions").hide();
		}
		else {
			$("#theme-actions").show();
		}
		
	});
	
	$("menu ul li[data-target=fave-themes").click(function(){
		var startSection = $("section.active");
		
		if (startSection.attr('id') !== "section-themes") {
			$("section.active").removeClass('active');
		}
		
		$("#section-themes").addClass('active');
		$("#theme-actions").show();
		
		$("#themes .theme-block:not(.theme-faved)").hide();
		
		$("menu ul li.active").removeClass('active');
		$(this).addClass('active');
		
		$("menu").toggleClass("open");
		$("#menu-shade").fadeOut();
	});
	
	$("#load-anyway-cancel").click(function(){
		window.close();
	});
	
	$("#favorite").click(function(){
		var item = $(".theme-block .theme-icon.active").parent();
		var t = item.data('theme');
		
		item.toggleClass("theme-faved");
		
		toggleFave(t);
		$("#favorite i").toggleClass("md-favorite").toggleClass("md-favorite-outline");
	});
	
});