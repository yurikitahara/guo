window.addEventListener('load', function () {
    const addButton = document.getElementById('add-self');
    const removeButton = document.getElementById('remove-self');
    const response = document.getElementById('response');

    addButton.addEventListener('click', addSelf);
    removeButton.addEventListener('click', removeSelf);

    function addSelf() {
        const uid = firebase.auth().currentUser.uid;
        const db = firebase.database();
        const ref = db.ref('events').child("123456").child("guests");
        const guests = {};
        guests[uid] = true;

        const promise = ref.update(guests);
        promise.then(function (success) {
            response.textContent = "You are part of the event.";
        });

    }

    function removeSelf() {
        const uid = firebase.auth().currentUser.uid;
        const db = firebase.database();
        const ref = db.ref('events').child("123456").child("guests");
        const guests = {};
        guests[uid] = false;

        const promise = ref.update(guests);
        promise.then(function (success) {
            response.textContent = "You are not part of the event.";
        });
    }

    function initMap() {
        const db = firebase.database();
        const ref = db.ref('locations');

        /* load events from the database */
        const eventRef = db.ref('events');

        var map = new google.maps.Map(
            document.getElementById('map'), {
                center: {
                    lat: 40.718802437879894,
                    lng: -74.01154518127441
                },
                zoom: 10
            }
        );

        eventRef.on('child_added', function (snapshot) {
            const event = snapshot.val();
            const url = 'event.html?id=' + snapshot.key;
            console.log(event);

            console.log('<a href="' + url + '">Click here</a>');

            const locationRef = db.ref('locations').child(event.location);
            const locPromise = locationRef.once('value');
            locPromise.then(function (response) {
                if (response) {
                    const location = response.val();
                    console.log(location);

                    var contentString =
                        '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' +
                        event.date + event.description +
                        '</h1>' +

                        '<div id="bodyContent">' +
                        '<p><b>Event</b>, Join us </b></p>' +
                        '<p><a href="' + url + '">' +
                        '</p></a>' +
                        '</div>' +
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var marker = new google.maps.Marker({
                        position: location.position,
                        title: location.title,
                        map: map
                    });

                    marker.addListener('click', function () {
                        map.setZoom(10);
                        map.setCenter(marker.getPosition());
                        infowindow.open(map, marker);
                    });
                }

            });
            locPromise.catch(function (error) {
                console.log(error);
            });
        });

        map.addListener('click', function (event) {
            console.log(event.latLng.lat());
            console.log(event.latLng.lng());



            const postInfo = {
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                },
                title: "Event Location"
            };
            ref.push(postInfo);
        });
    }
});