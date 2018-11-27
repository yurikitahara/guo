const postInput = document.getElementById('send');


function publishPost() {
	const uid = firebase.auth().currentUser.uid;
	const db = firebase.database();
	const ref = db.ref('send').child(uid);
	const postInfo = {
		text: postInput.value,
		date: Date.now(),
		author: firebase.auth().currentUser.displayName,
		id: uid
	};
	ref.push(postInfo);
	postInput.value = "Thank you!";
}
