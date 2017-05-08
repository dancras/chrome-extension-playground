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


let facebookTabs = {};

chrome.tabs.onCreated.addListener(function (tab) {

    console.log('onCreated', tab);

    if (!tab.url || !tab.url.includes('facebook.com')) {
        return;
    }

    console.log('addingFacebookTab', tab.id);
    facebookTabs[tab.id] = true;

});

chrome.tabs.onUpdated.addListener(function (tabId, info) {

    console.log('onUpdated', info.url);

    if (!info.url) {
        return;
    }

    if (!info.url.includes('facebook.com') && facebookTabs[tabId]) {
        console.log('removingFacebookTab', tabId);
        delete facebookTabs[tabId];
        return;
    }

    console.log('addingFacebookTab', tabId);
    facebookTabs[tabId] = true;
});

chrome.tabs.onRemoved.addListener(function (tabId, info) {
    console.log('onRemoved', tabId, info);

    if (facebookTabs[tabId]) {
        console.log('facebookTabClosed', tabId);
        delete facebookTabs[tabId];
    }
});
