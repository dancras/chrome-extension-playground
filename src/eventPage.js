console.log('LOADED');

chrome.runtime.onConnect.addListener(function(port) {

    console.log('onConnect', port);

    if (port.name === 'messengerSpeechToTextPort') {

        const toggleSpeech = speechRecognition.initialise(function (message) {
            port.postMessage(message);
        });

        chrome.browserAction.onClicked.addListener(function () {
            console.log('CLICKED');
            toggleSpeech();
        });

    }

});

chrome.tabs.onCreated.addListener(function (tab) {

    console.log('onCreated', tab);
    facebookHabitBreaker.onTabCreatedOrUpdated(tab.id, tab.url);

});

chrome.tabs.onUpdated.addListener(function (tabId, info) {

    console.log('onUpdated', info.url);
    facebookHabitBreaker.onTabCreatedOrUpdated(tabId, info.url);

});

chrome.tabs.onRemoved.addListener(function (tabId, info) {

    console.log('onRemoved', tabId, info);
    facebookHabitBreaker.onTabRemoved(tabId);

});
