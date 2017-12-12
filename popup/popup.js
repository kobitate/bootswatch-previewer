// @codekit-prepend "../js/analytics.js","../js/settings_functions.js","../js/theme_functions.js"

var sendAnalytics = true;

checkAnalyticsOptout(function(optout){
	sendAnalytics = !optout;
});

if (sendAnalytics) {
	ga('send', 'pageview', '/popup.html');
}

var closeSnackbar = null;

function snackbar(text){
	if ($("#snackbar").hasClass("open")) {
		$("#snackbar").text(text);
		clearTimeout(closeSnackbar);
		closeSnackbar = setTimeout(function(){
			$("#snackbar").removeClass('open');
		}, 3000);
	}
	else {
		setTimeout(function(){
			$("#snackbar").text(text).addClass('open');
		}, 500);
		closeSnackbar = setTimeout(function(){
			$("#snackbar").removeClass('open');
		}, 3000);
	}
}

$(document).ready(function(){

	prepPage();

	$(".dialog").hide();

	$("a").click(function(){
		var href = $(this).attr('href');
		var gaLabel = $(this).data('galabel') ? $(this).data('galabel') : $(this).text();

		if (href !== "#") {
			linkEvent(gaLabel);
			chrome.tabs.create({url: $(this).attr('href')});
			return false;
		}

	});
	
	getShowUpdatev2Dialog(function(toShow) {
		if (toShow) {
			dialogEvent("update-v2");
			$("#update-v2").show();
		} 
	});

	chrome.runtime.onMessage.addListener(function(message){
		if (message.method === "bootstrapStatus") {
			var hasBootstrap = (message.title === "true") ? true : false;

			loadThemes();

			if (!hasBootstrap) {
				$("#no-bootstrap").show();
				dialogEvent("no-bootstrap");
			}

		}

		if (message.method === "themeAlreadySet") {
			$("#no-bootstrap").hide();
			if (message.title !== "") {
				$("#theme-" + message.title + " .theme-icon").addClass('active');
				$("#theme-specific-actions .button").removeClass('disabled');
				//$("#theme-specific-actions").show();

				checkFaved(message.title, function(isFaved){
					if (isFaved) {
						$("#favorite i").addClass("md-favorite").removeClass("md-favorite-outline");
					}
				});
			}

		}
	});

	$("#load-anyway").click(function(){
		$("#reset,#theme-actions").show();
		$("#no-bootstrap").hide();
		dialogButton("no-bootstrap: continue");
	});

	$("#load-anyway-cancel").click(function(){
		clearTheme();
		dialogButton("no-bootstrap: cancel");
		window.close();
	});

	$("#not-allowed-close").click(function(event) {
		window.close();
	});
	
	$("#update-v2-close").click(function() {
		setShowUpdatev2Dialog(false);
		dialogButton("update-v2: close");
		$("#update-v2").hide();
	});

	$("#reset").click(function(){
		clearTheme();
		themeEvent("reset","");
	});

	$("#hamburger").click(function(){
		$("menu").toggleClass("open");
		$("#menu-shade").fadeIn();
	});

	$("#menu-shade").click(function(){
		$("menu").toggleClass("open");
		$("#menu-shade").fadeOut();
	});

	$("menu ul li:not([data-target=faves]):not(.menu-divider)").click(function(){
		$("section.active").removeClass('active');
		$("#themes .theme-block").show();

		$("#no-faves").hide();

		$("menu ul li.active").removeClass('active');
		$(this).addClass('active');

		var targetName = $(this).data("target");

		var target = $("section#section-" + targetName);
		target.addClass('active');

		$("menu").toggleClass("open");
		$("#menu-shade").fadeOut();

		if (targetName !== "themes") {
			$("#theme-actions").hide();
		}
		else {
			$("#theme-actions").show();
		}

		tabEvent(targetName);

	});

	$("menu ul li[data-target=faves]").click(function(){
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

		if ($(".theme-block.theme-faved").length === 0) {
			$("#no-faves").show();
		}

		tabEvent("faves");

	});


	$("#favorite").click(function(){
		var item = $(".theme-block .theme-icon.active").parent();
		var t = item.data('theme');

		item.toggleClass("theme-faved");

		toggleFave(t);
		$("#favorite i").toggleClass("md-favorite").toggleClass("md-favorite-outline");

		if ($("menu ul li[data-target=faves]").hasClass('active')) {
			$("#theme-specific-actions .button").addClass('disabled');
		}

	});

	$("#fave-clear").click(function(){
		$("#fave-clear-verify").show();
		dialogEvent("clear-faves");
	});

	$("#fave-clear-no").click(function(){
		$("#fave-clear-verify").hide();
		dialogButton("clear-faves: no");
	});

	$("#fave-clear-yes").click(function(){
		clearFaves();
		$("#fave-clear-verify").hide();
		$(".theme-block.theme-faved").removeClass("theme-faved");
		snackbar("Favorites Cleared!");
		dialogButton("clear-faves: yes");
	});

	$("#startup-select").change(function(){
		var mode = $(this).val().toLowerCase().replace(" ", "-");
		chrome.storage.sync.set({startupmode: mode});
		settingEvent("startup", mode);
	});

	$("#card-analytics input[type=checkbox]").change(function(event) {
		var checked = $(this).prop('checked');
		chrome.storage.sync.set({analyticsoptout: checked});
		settingEvent("analytics opt out", (checked?"enable":"disable"));
		sendAnalytics = !checked;
	});

});
