window.addEventListener('load', function () {

    // posting a message
    const publishButton = document.getElementById('submit-message');
    const messageInput = document.getElementById('message-body');
    publishButton.addEventListener('click', publishMessage);

    function publishMessage() {
        const uid = firebase.auth().currentUser.uid;
        const db = firebase.database();
        const ref = db.ref('messages').child(key).child('messages');
        const messageInfo = {
            text: messageInput.value,
            date: Date.now(),
            author: firebase.auth().currentUser.displayName
        };
        ref.push(messageInfo);
        messageInput.value = "";
    }

    // global variables
    const messagesDiv = document.getElementById('message');
    const key = location.search.split('=')[1];
    const messageRef = firebase.database().ref('messages').child(key).child('messages');

    messageRef.on('child_added', function (snapshot) {
        createMessage(snapshot.key, snapshot.val());
    });

    function createMessage(key, message) {
        
        console.log(message);

        // post container
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        // post text
        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = message.text;

        // post info 
        const messageInfo = document.createElement('div');
        messageInfo.classList.add('message-info');

        const messageAuthor = document.createElement('span');
        messageAuthor.classList.add('message-author');
        messageAuthor.textContent = message.author;

        const messageDate = document.createElement('span');
        messageDate.classList.add('message-date');
        messageDate.textContent = new Date(message.date).toLocaleString('en-us', {
            month: 'long',
            year: 'numeric',
            weekday: 'long',
            day: 'numeric'
        });

        messageInfo.innerHTML += "by ";
        messageInfo.appendChild(messageAuthor);
        messageInfo.innerHTML += " on ";
        messageInfo.appendChild(messageDate);

        messageDiv.appendChild(messageText);
        messageDiv.appendChild(messageInfo);

        messagesDiv.insertBefore(messageDiv, messagesDiv.firstElementChild);
    }
});