var links = document.getElementsByTagName("link");
var foundBootstrap = false;
for (var i = 0, l = links.length; i < l; i++) {
    var sheet = links[i];
    if (sheet.href.indexOf("bootstrap.css") > -1 || sheet.href.indexOf("bootstrap.min.css") > -1 ) {
        sheet.id = "original-stylesheet";
        foundBootstrap = true;
        break;
    }
}

if (!foundBootstrap) {
	/*global alert*/
	alert("Bootstrap is not installed on this page!");
}
else {
	
	var newsheet = document.getElementById("bootswatch-style");
	
	if (newsheet === null) {
		var headHTML = document.getElementsByTagName('head')[0].innerHTML;
		headHTML    += '<!--DO NOT DOWNLOAD THIS VERSION. I have made customizations for it to work with the extension. Please use the Download button.-->'+"\n"+'<link id="bootswatch-style" rel="stylesheet" href="" />';
		document.getElementsByTagName('head')[0].innerHTML = headHTML;
	}

}