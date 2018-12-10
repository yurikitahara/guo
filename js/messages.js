window.addEventListener('load', function () {
    
    // posting a message
    const publishButton = document.getElementById('submit-message');
const messageInput = document.getElementById('message-body');
publishButton.addEventListener('click', publishMessage);
    
    function publishMessage() {
	const uid = firebase.auth().currentUser.uid;
	const db = firebase.database();
	const ref = db.ref('posts').child(uid);
	const messageInfo = {
		text: messageInput.value,
		date: Date.now(),
		author: firebase.auth().currentUser.displayName,
		id: uid
	};
	ref.push(messageInfo);
	messageInput.value = "";
}

    // global variables
    const messageDiv = document.getElementById('message');
    const messageRef = firebase.database().ref('message');

    messageRef.on('child_added', function (snapshot) {
        createMessage(snapshot.key, snapshot.val());
    });

    function createPost(key, message) {

        // post container
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        // post text
        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = post.text;

        // post info 
        const postInfo = document.createElement('div');
        messageInfo.classList.add('message-info');

        const postAuthor = document.createElement('span');
        messageAuthor.classList.add('message-author');
        messageAuthor.textContent = message.author;

        const postDate = document.createElement('span');
        messageDate.classList.add('message-date');
        messageDate.textContent = new Date(message.date).toLocaleString('en-us', {
            month: 'long',
            year: 'numeric',
            weekday: 'long',
            day: 'numeric'
        });

        messageInfo.innerHTML += "by ";
        messageInfo.appendChild(postAuthor);
        messageInfo.innerHTML += " on ";
        messageInfo.appendChild(postDate);

        messageDiv.appendChild(postText);
        messageDiv.appendChild(postInfo);

        messageDiv.insertBefore(postDiv, postsDiv.firstElementChild);
    }
});