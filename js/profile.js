<<<<<<< HEAD
window.addEventListener('load', function() {

	/* adding an image */
	const submitButton = document.getElementById('submit-photo');
	submitButton.addEventListener('click', function() {

		// get the file
		const file = document.getElementById('profile-photo-file').files[0];


		
		// upload to storage
		const storage = firebase.storage();
		const user = firebase.auth().currentUser;
		const ref = storage.ref('users').child(user.uid).child('profile-photo');
		const filePromise = ref.put(file);
		filePromise.then(function(success) {
			return success.ref.getDownloadURL();
		}).then(function(photoURL) {
			user.updateProfile({photoURL: photoURL});
			document.getElementById('profile-photo').src = photoURL;
		});


	});

	/* display the image */
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			document.getElementById('profile-name').textContent = user.displayName;
			document.getElementById('profile-photo').src = user.photoURL;
		}
	});













});
=======



// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
>>>>>>> 72b83664892dfdb91f6b49334b12a03a7ff4af44
