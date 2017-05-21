const port = chrome.runtime.connect({
    name: 'messengerSpeechToTextPort'
});

port.onMessage.addListener(function (msg) {
    console.log('msg received', msg);
});

console.log('messengerSpeechToTextPort created');
