(function () {

    window.speechRecognition = {

        initialise: function (sendMessage) {

            const recognition = new webkitSpeechRecognition();
            let isStarted = false;

            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = function (e) {

                console.log('onresult', e);

                if (e.results[0].isFinal) {
                    console.log('transcript', e.results[0][0].transcript);
                    sendMessage(e.results[0][0].transcript);
                } else {
                    stopOnBreak();
                }

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

                if (isStarted) {
                    console.log('RESTARTING');
                    recognition.start();
                }
            }

            const stopOnBreak = debounce(
                recognition.stop.bind(recognition),
                2000
            );

            return function () {

                if (!isStarted) {
                    recognition.start();
                    isStarted = true;
                    console.log('STARTED');
                } else {
                    recognition.stop();
                    isStarted = false;
                    console.log('STOPPED');
                }

            };

        }

    };

    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

}());
