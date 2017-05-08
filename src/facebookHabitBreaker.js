console.log('HABITS');

let state = {};

function onTabCreatedOrUpdated(tabId, url) {

    if (!url) {
        return;
    }

    if (!url.includes('facebook.com')) {

        if (state[tabId]) {
            console.log('removingFacebookTab', tabId);
            delete state[tabId];
        }

        return;
    }

    console.log('addingFacebookTab', tabId);
    state[tabId] = true;

}

function onTabRemoved(tabId) {

    if (state[tabId]) {
        console.log('facebookTabClosed', tabId);
        delete state[tabId];
    }

}
