/*global ga*/

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here
 
ga('create', 'UA-37203159-4', 'auto');
ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('require', 'displayfeatures');

function event(category, action, label) {
	if (sendAnalytics){
		ga('send', {
			'hitType': 'event',          // Required.
			'eventCategory': category,   // Required.
			'eventAction': action,      // Required.
			'eventLabel': label
		});
	}
}

function valueEvent(category, label, action, value) {
	if (sendAnalytics){
		ga('send', {
			'hitType': 'event',          // Required.
			'eventCategory': category,   // Required.
			'eventAction': action,      // Required.
			'eventLabel': label,
			'eventValue': value
		});
	}
}

function noninteractionEvent(category, label) {
	if (sendAnalytics){
		ga('send', {
			'hitType': 'event',          // Required.
			'eventCategory': category,   // Required.
			'eventAction': action,      // Required.
			'eventLabel': label,
			'nonInteraction': 1
		});
	}
}

function buttonEvent(label) {
	event('button','click', label);
}

function linkEvent(label) {
	event('link','click', label);
}

function dialogEvent(label) {
	event('dialog', 'trigger', label);
}

function dialogButton(label) {
	event('dialog', 'action', label);
}

function tabEvent(label) {
	event('tab', 'switch', label);
}

function themeEvent(category, label) {
	event('theme', category, label);
}

function settingEvent(category, label) {
	event('setting', category, label);
}