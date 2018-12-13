const eventId = location.search.split('=')[1];
const eventdiv = document.getElementById('event');

const promise = firebase.database()
            .ref("events")
            .child(eventId);

        promise.once("value", function (event) {
            console.log(event.val())
            createResult(event.key, event.val());

        });

        function createResult(key, event) {

            const result = document.createElement('div');
            result.classList.add('result');

            const title = document.createElement('div');
            const link = document.createElement('a');
            title.classList.add('result-title');
            link.href = `event.html?id=${key}`;
            
            
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
            eventdiv.appendChild(result);
            
        }