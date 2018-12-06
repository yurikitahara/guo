const promise = firebase.database()
            .ref("events")
            .orderByChild(`tags/${q}`)
            .equalTo(true);

        promise.once("value", function (events) {
            for (var key in events.val()) {
                console.log(key);
                createResult(key, events.val()[key]);
            }
        });

        function createResult(key, event) {

            const result = document.createElement('div');
            result.classList.add('result');

            const title = document.createElement('div');
            const link = document.createElement('a');
            title.classList.add('result-title');
            link.href = `event.html?id=${key}`;
            
            /*
                get id: 
                location.search.split('=')[1]
                firebase.database().ref('events').child(id);
                
                event.html duplicate
                event.js
                event.css
            */
            
            
            link.textContent = event.description;
            title.appendChild(link);

            const time = document.createElement('div');
            time.classList.add('result-time');
            time.textContent = event.time;

            const location = document.createElement('div');
            location.classList.add('result-location');
            location.textContent = event.location;

            const duration = document.createElement('div');
            duration.classList.add('result-duration');
            duration.textContent = event.duration;


            result.appendChild(title);
            result.appendChild(location);
            result.appendChild(time);
            result.appendChild(duration);
            
            // append new result to results
            results.appendChild(result);
            
        }
    }
});