const port = chrome.runtime.connect({
    name: 'messengerSpeechToTextPort'
});

port.onMessage.addListener(function (msg) {

    console.log('msg received', msg);

    const messageInputElement = findMessageInputElement();

    messageInputElement.focus();

    requireSpaceEvent(messageInputElement).then((spaceEvent) => {
        window.setTimeout(() => {
            messageInputElement.dispatchEvent(spaceEvent);
            document.execCommand('insertText', false, msg);

            window.setTimeout(() => {
                const messageSendElement = findMessageSendElement();
                console.log('clicking send', messageSendElement);
                messageSendElement.click();
            }, 0);
        }, 0);
    });

});

function findMessageInputElement () {

    const matches = document.querySelectorAll('[aria-label="New message"] [contenteditable="true"]');

    if (!matches) {
        throw new Error('Unable to find message input element');
    }

    return matches[0];
}

function findMessageSendElement () {

    const matches = document.querySelectorAll('[aria-label="New message"] a');

    if (!matches) {
        throw new Error('Unable to find message send element');
    }

    return matches[matches.length - 1];
}

function requireSpaceEvent (element) {

    if (!element.messengerSpeechToTextSpaceEvent) {
        element.messengerSpeechToTextSpaceEvent = new Promise(function (resolve) {

            element.addEventListener('keypress', resolveOnSpaceKeypress, false);

            function resolveOnSpaceKeypress (e) {

                if (e.code === 'Space') {
                    console.log('Space tracked');
                    resolve(e);
                }

                element.removeEventListener('keypress', resolveOnSpaceKeypress);

            }

        });
    }

    return element.messengerSpeechToTextSpaceEvent;

}

console.log('messengerSpeechToTextPort created');
