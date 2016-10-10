var makeRequest = function(host) {
	var pullRequestUrl = '%srest/inbox/latest/pull-requests/count';
	chrome.browserAction.setTitle({title:"PullStashIo (v" + chrome.app.getDetails().version + ")\n" + new Date().toTimeString()});
	$.ajax(pullRequestUrl.replace(/%s/, host), {
		contentType: 'application/json',
		method: 'GET',
		headers: {}
	}).success(function(respBody) {
		if (respBody.count > 0) {
			chrome.browserAction.setBadgeBackgroundColor({color:'#f71'});
			chrome.browserAction.setBadgeText({text:'' + respBody.count});
		} else {
			chrome.browserAction.setBadgeBackgroundColor({color:'#205081'});
			chrome.browserAction.setBadgeText({text:'0'});
		}
	})
	.error(function(respBody){
		if (respBody.status === 401) {
			chrome.tabs.query({url:host + 'login'}, function(result){
				if (result.length === 0) {
					chrome.tabs.create({url:host + 'login'});
				} else {
					var tab = result.shift();
					chrome.tabs.update(tab.id, {selected:true});
				}
			});
		}
		chrome.browserAction.setBadgeText({text:'?'});
	});
};

var checkHostOrigin = function(storageHost) {
	if (!$.isEmptyObject(storageHost)) {
		chrome.permissions.contains({
			origins: [storageHost.stashHost]
			}, function(result) {
				if (result) {
					// The extension has the permissions.
					makeRequest(storageHost.stashHost);
				} else {
					// The extension doesn't have the permissions for the stash host as origin.
					chrome.permissions.request({
							origins: [storageHost.stashHost]
						}, function(approved) {
							if (!approved) {
								chrome.browserAction.setBadgeText({text:'?'});
								chrome.runtime.openOptionsPage();
							}
						});
				}
		});
	} else {
		chrome.browserAction.setBadgeText({text:'?'});
		chrome.runtime.openOptionsPage();
	}
};

var pullRequests = function() {
	chrome.storage.local.get('stashHost', checkHostOrigin(obj));
};