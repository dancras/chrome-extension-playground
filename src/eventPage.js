console.log('LOADED');

let recognition = new webkitSpeechRecognition();

recognition.onresult = function (e) {
    console.log('onresult', e);
    console.log('transcript', e.results[0][0].transcript);
}

recognition.onerror = function (e) {
    console.log('onerror', e);

    if (e.error === 'not-allowed') {
        chrome.tabs.create({
            url: chrome.runtime.getURL('pages/permissions.html')
        });
    }
}

recognition.onend = function (e) {
    console.log('onend', e);
}

chrome.browserAction.onClicked.addListener(function () {
    console.log('CLICKED');

    recognition.start();

    console.log('STARTED');
});

chrome.tabs.onCreated.addListener(function (tab) {

    console.log('onCreated', tab);
    onTabCreatedOrUpdated(tab.id, tab.url);

});

chrome.tabs.onUpdated.addListener(function (tabId, info) {

    console.log('onUpdated', info.url);
    onTabCreatedOrUpdated(tabId, info.url);

});

chrome.tabs.onRemoved.addListener(function (tabId, info) {

    console.log('onRemoved', tabId, info);
    onTabRemoved(tabId);

});
