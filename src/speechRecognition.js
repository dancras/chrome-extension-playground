(function () {

    window.speechRecognition = {

        initialise: function (sendMessage) {

            const recognition = new webkitSpeechRecognition();

            recognition.onresult = function (e) {
                console.log('onresult', e);
                console.log('transcript', e.results[0][0].transcript);
                sendMessage(e.results[0][0].transcript);
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

            return function () {
                recognition.start();
                console.log('STARTED');
            };

        }

    };

}());
