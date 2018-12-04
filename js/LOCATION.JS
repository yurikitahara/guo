window.addEventListener('load', function() {

	const db = firebase.database();
	var input = document.getElementById('location-input');
    const search = document.getElementById('search');
    var fbLocations = firebase.database().ref('locations').child('654321').child('address');
    
    const locationList = document.getElementById('firebase-locations');
    const locationsRef = db.ref('locations');
    
    locationsRef.on('child_added', function(snapshot) {
        console.log(snapshot.val());
//		createPost(snapshot.key, snapshot.val());
        const loc = snapshot.val();
        var dbLocation = document.createElement('option');
        dbLocation.innerHTML = loc.name;
        locationList.append(dbLocation);
	});
    
    search.addEventListener("click", function(){
        const addInput = document.getElementById('address-input');
        const createLoc = document.getElementById('add');
        document.getElementById('address-label').style.display = "block";
        addInput.style.display = "block";
        createLoc.style.display = "block";
        document.getElementById('search').style.display = "none";

        createLoc.addEventListener("click", function(){
            locationsRef.push({
                name: input.value,
                address: addInput.value
            });
        });
    });
});
