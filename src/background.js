// add listeners
chrome.runtime.onMessage.addListener(function(message, sender) {
	switch(message) {
		case "optionsStashHostSetEvent":
			startRequest();
			break;
		default:
			break;
		}
});
chrome.browserAction.onClicked.addListener(function(){
	startRequest();
	chrome.storage.local.get('stashHost', function(obj) {
		if (!$.isEmptyObject(obj)) {
			chrome.tabs.query({url:obj.stashHost + '*'}, function(result){
				if (result.length === 0) {
					chrome.tabs.create({url:obj.stashHost + 'projects'});
				} else {
					var tab = result.shift();
					chrome.tabs.update(tab.id, {selected:true});
				}
			});
		}
	});
});

/** start the app here */
chrome.storage.local.set({isLoaded:true});
chrome.storage.local.get('stashHost', checkHostOrigin);
startRequest();
