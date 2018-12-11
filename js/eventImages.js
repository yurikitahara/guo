window.addEventListener('load', function () {

    /* adding an image */
    const submitButton = document.getElementById('submit-photo');
    submitButton.addEventListener('click', function () {

        // get the file
        const file = document.getElementById('event-photo-file').files[0];

        // upload to storage
        const storage = firebase.storage();
        const ref = storage.ref('events').child('123456').child('event-photo');
        const filePromise = ref.put(file);
        filePromise.then(function (success) {
            return success.ref.getDownloadURL();
        }).then(function (photoURL) {
            const eventRef = firebase.database().ref('events').child('123456');
            eventRef.update({
                photoURL: photoURL
            });
            document.getElementById('event-photo').src = photoURL;
        });


    });
});
