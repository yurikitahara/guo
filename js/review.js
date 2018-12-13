window.addEventListener('load', function () {
    
    const reviewId = location.search.split('=')[1];

    
    firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
            if (user.uid == reviewId) {
                document.getElementById('write-review').style.display='none';
            }
        }
    });

    const userDiv = document.getElementById('user');
    const reviewButton = document.getElementById('submit-review');
    const reviewInput = document.getElementById('review-body');

    const db = firebase.database();
    const ref = db.ref('users').child(reviewId);
    ref.once('value', function (user) {
        const data = user.val();
        console.log(data);
        // console.log(data);

        // display user name

        const div = document.createElement('div');
        div.textContent = "User: " + data.displayName;
        userDiv.appendChild(div);
        
        for (const key in data.reviews) {
            const review = data.reviews[key];
            console.log(review);
            const div = document.createElement('div');
            div.textContent = "Review: " + review.text;
            userDiv.appendChild(div);
            
            const author = document.createElement('a');
            author.href = "reviews.html?id=" + review.authorId;
            author.textContent = "by " + review.author;
            userDiv.appendChild(author);
        }

    });

    reviewButton.addEventListener('click', function () {
        const uid = firebase.auth().currentUser.uid;
        const db = firebase.database();
        const ref = db.ref('users').child(reviewId).child('reviews');
        const review = {
            text: reviewInput.value,
            date: Date.now(),
            author: firebase.auth().currentUser.displayName,
            authorId: uid
        };
        ref.push(review);
        reviewInput.value = "";
    });


});
