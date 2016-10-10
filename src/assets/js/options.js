var hostPattern = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;

function setStashVal() {
	chrome.storage.local.get('stashHost', function(data){
		if (!$.isEmptyObject(data)) {
			$('#stashHost').val(data.stashHost);
			// and change button to Update or Change?
		}
	});
}
$('#save').click(function(el){
	var host = $('#stashHost').val();
	function resetStatusField(close) {
		setTimeout(function(){
			$('#status').html('').attr('style','');
			if (close) {
				window.close();
			}
		}, 3000);
	}
	if (hostPattern.test(host)) {
		// make certain trailing slash, permissions origin requires it
		if (host.lastIndexOf('/') !== (host.length - 1)) {
			host += '/';
		}
		chrome.permissions.request({
			origins: [host]
        }, function(granted) {
			if (granted) {
				chrome.storage.local.set({'stashHost':host});
				$('#status').html('Stash host updated.').attr('style','');
				setStashVal();
				chrome.runtime.sendMessage(chrome.runtime.id, "optionsStashHostSetEvent");
				resetStatusField(true);
			} else {
				$('#status').html('You must approve web requests to your Stash host. Try again.').attr('style','color:red;font-weight:bold');
				setStashVal();
				resetStatusField();
			}
        });
	} else {
		$('#status').html('Stash host is invalid. Check and try again.').attr('style','color:red;font-weight:bold');
		setStashVal();
		resetStatusField();
	}
});

setStashVal();