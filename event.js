function initMap() {
    const db = firebase.database();
    const ref = db.ref('events');

    var bmccLocation = {
        lat: 40.718802437879894,
        lng: -74.01154518127441
    };
    

   var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Jacky Chan</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Jacky Chan</b>, is looking for yoga coach</b></p>'+
            '<p><a href="#">Please visit my profile for more information </p></a>'
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          // position: uluru,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });
        



    var map = new google.maps.Map(
        document.getElementById('map'), 
        {
            center: bmccLocation,
            zoom: 10
        }
    );
    
    ref.on('child_added', function(snapshot) {
        const event = snapshot.val();
        var marker = new google.maps.Marker({
            position: event.position,
            title: event.title,
            map: map

        });

        marker.addListener('click', function() {
            map.setZoom(10);
            map.setCenter(marker.getPosition());
            infowindow.open(map, marker);
        });
    });

    
    
    
    
    map.addListener('click', function(event) {
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
        

        
        const postInfo = {
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            },
            title: "New Location"
         };
        ref.push(postInfo);
    });
}















