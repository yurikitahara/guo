window.addEventListener('load', function() {
	const db = firebase.database();
    const eventsRef = firebase.database().ref('events').child('123456');
    
    eventsRef.once('value').then(function(snapshot) {
        
        let data = snapshot.val();
        
//        if(firebase.auth().currentUser.uid == data.host) {
            const table = document.getElementById('event-table');
            const editable = document.getElementsByClassName('editable');

            for(let i = 0; i < editable.length; i++){
                editable[i].contentEditable = 'true';
            }
        
            const dateInput = document.getElementById('date-input');
            dateInput.innerHTML = data.date;
            const timeInput = document.getElementById('time-input');
            timeInput.innerHTML = data.time;
            const durationInput = document.getElementById('duration-input');
            durationInput.innerHTML = data.duration;
            const locationInput = document.getElementById('location-input');
            locationInput.innerHTML = data.location;
            const descriptionInput = document.getElementById('description-input');
            descriptionInput.innerHTML = data.description;
        
            const update = document.getElementById('update');

            update.addEventListener('click', function(){
                eventsRef.update({
                    date: dateInput.textContent,
                    time: timeInput.textContent,
                    duration: durationInput.textContent,
                    location: locationInput.textContent,
                    description: descriptionInput.textContent
                });
            });
            
            
//        } else {
//            alert("Please Sign In");
//        }
        
        
    });
});
