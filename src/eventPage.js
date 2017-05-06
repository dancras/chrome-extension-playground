console.log('LOADED');

chrome.browserAction.onClicked.addListener(function () {
    console.log('CLICKED');
});
