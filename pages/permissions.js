navigator.webkitGetUserMedia(
    {
        audio: true,
    },
    function () {
        window.close();
    },
    function () {
    }
);
