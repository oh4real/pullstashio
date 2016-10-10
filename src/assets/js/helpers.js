var timerId;
function getClient() {
	return APP_KEYS[getExtensionId()];
}
function getExtensionId() {
	return chrome.runtime.id;
}
function startRequest() {
	stopRequest();
	chrome.storage.local.get('stashHost', checkHostOrigin);
	timerId = window.setTimeout(startRequest, getClient().interval);
}
function stopRequest() {
	window.clearTimeout(timerId);
}