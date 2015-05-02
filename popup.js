// define our themes
var themes = ['cerulean','cosmo','cyborg','darkly','flatly','journal','lumen','paper','readable','sandstone','simplex','slate','spacelab','superhero','united','yeti'];

function prepPage() {
	chrome.tabs.executeScript(null, {file: "target_page_inject.js"});
}

function setTheme(t) {
	chrome.tabs.executeScript(null, {
		code: 'document.getElementById("bootswatch-style").setAttribute("href", "//maxcdn.bootstrapcdn.com/bootswatch/3.3.1/'+ t +'/bootstrap.min.css")'
	});
}

$(document).ready(function(){
	
	prepPage();
	
	for (t in themes) {
		t = themes[t];
		if(typeof t !="string"){
			continue;
		}
		
		$("#themes").append('<div class="theme-block" id="theme-' + t + '" data-theme="' + t + '">' + t + '</div>');
	}
	
	$(".theme-block").click(function(){
		setTheme($(this).data('theme'));
	});
	
});