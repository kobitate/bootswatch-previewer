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
			'document.getElementById("last-theme").value = \''+ t +'\';\n'+
			'window.location.hash="swatch-preview-'+t+'";'
	});
	
	$("#download").attr('href', "http://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/"+ t +"/bootstrap.min.css");
	
	checkFaved(t, function(isFaved){
		if (isFaved) {
			$("#favorite i").addClass("md-favorite").removeClass("md-favorite-outline");
		} 
		else {
			$("#favorite i").removeClass("md-favorite").addClass("md-favorite-outline");
		}
	});
	
}

function clearTheme() {
	chrome.tabs.executeScript(null, {file: "target_page/reset.js"});
	//$("#theme-specific-actions").hide();
	$('.theme-icon.active').toggleClass('active');
	$("#theme-specific-actions .button").addClass('disabled');
	
	chrome.tabs.executeScript(null, {
		code: 'document.getElementById("last-theme").value = \'\';'
	});
}

function loadThemes() {
	$("#no-bootstrap").hide();
	$("#theme-actions").show();
	
	for (var t in themes) {
		t = themes[t];
			
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
				'<div class="theme-name">'+
					t + 
				'</div>'+
			'</div>');
		
		
	}
	
	$(".theme-block").click(function(){
		setTheme($(this).data('theme'));
		$('.theme-icon.active').toggleClass('active');
		$(this).find('.theme-icon').toggleClass('active');
		//$("#theme-specific-actions").show();
		$("#theme-specific-actions .button").removeClass('disabled');
	}).each(function(){
		var t = $(this).data('theme');
		checkFaved(t, function(isFaved){
			//console.log("hi");
			if (isFaved) {
				//console.log("hello");
				$("#theme-"+t).addClass('theme-faved');
			}
		});
	});
}