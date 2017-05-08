console.log('LOADED');

chrome.browserAction.onClicked.addListener(function () {
    console.log('CLICKED');
    speechRecognition.onClicked();
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
