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
        promise.then(function(success) {
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
        promise.then(function(success) {
            response.textContent = "You are not part of the event.";
        });
                     





    }
});