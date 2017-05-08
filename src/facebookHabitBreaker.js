(function () {

    const TIMEOUT = 15 * 60 * 1000;

    let state = {
        facebookTabs: {},
        lastClosedTabTimestamp: 0
    };

    function onTabCreatedOrUpdated(tabId, url) {

        if (!url) {
            return;
        }

        if (!url.includes('facebook.com')) {

            if (state.facebookTabs[tabId]) {
                console.log('removingFacebookTab', tabId);
                delete state.facebookTabs[tabId];
            }

            return;
        }

        console.log('addingFacebookTab', tabId);
        state.facebookTabs[tabId] = true;

        if (state.lastClosedTabTimestamp > Date.now() - TIMEOUT) {

            chrome.tabs.update(tabId, {
                url: 'https://messenger.com/'
            });

        }

    }

    function onTabRemoved(tabId) {

        if (state.facebookTabs[tabId]) {
            console.log('facebookTabClosed', tabId);
            delete state.facebookTabs[tabId];

            if (Object.keys(state.facebookTabs).length === 0) {
                state.lastClosedTabTimestamp = Date.now();
            }
        }

    }

    window.facebookHabitBreaker = {
        onTabCreatedOrUpdated: onTabCreatedOrUpdated,
        onTabRemoved: onTabRemoved
    };

}());
