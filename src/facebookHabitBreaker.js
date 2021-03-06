(function () {

    const TIMEOUT = 15 * 60 * 1000;

    let state = {
        facebookTabs: {},
        lastClosedTabTimestamp: 0
    };

    initialiseState();

    function onTabCreatedOrUpdated(tabId, url) {

        if (!url) {
            return;
        }

        if (!url.includes('facebook.com')) {
            removeTabFromState(tabId);
            return;
        }

        console.log('Adding tab to state', tabId);
        state.facebookTabs[tabId] = true;

        if (state.lastClosedTabTimestamp > Date.now() - TIMEOUT) {

            chrome.tabs.update(tabId, {
                url: 'https://messenger.com/'
            });

        }

    }

    function onTabRemoved(tabId) {
        removeTabFromState(tabId);
    }

    function initialiseState() {

        chrome.tabs.query({
            url: 'https://www.facebook.com/*'
        }, function (tabs) {

            tabs.forEach(function (tab) {
                state.facebookTabs[tab.id] = true;
            });

            console.log('Initialised state', state);

        });

    }

    function removeTabFromState(tabId) {

        if (state.facebookTabs[tabId]) {
            console.log('Removing tab from state', tabId);
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
