var sheet = document.getElementById("bootswatch-style");
if (sheet == null) {
	var headHTML = document.getElementsByTagName('head')[0].innerHTML;
	headHTML    += '<link id="bootswatch-style" rel="stylesheet" href="" />';
	document.getElementsByTagName('head')[0].innerHTML = headHTML;
}