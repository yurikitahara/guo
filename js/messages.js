window.addEventListener('load', function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const messageRef = firebase.database().ref('messages')
                .orderByChild(user.uid)
                .equalTo(true);

            messageRef.on('child_added', function (snapshot) {
                console.log(snapshot.key, snapshot.val());
                createMessage(snapshot.key, snapshot.val());


            });
        }
    });


    // global variables
    const messagesDiv = document.getElementById('conversations');


    function createMessage(key) {

        const title = document.createElement('div');
        const link = document.createElement('a');
        title.classList.add('result-title');
        link.href = `direct-message.html?id=${key}`;
        link.textContent = key;
        title.appendChild(link);

        messagesDiv.appendChild(title);
    }
});