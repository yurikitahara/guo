window.addEventListener('load', function () {
    //search code goes here
    const submit = document.getElementById('submit');
    const query = document.getElementById('query');
    const results = document.getElementById('results');
    submit.addEventListener('click', search);
    addEventListener('keydown', function (event) {
        if (event.which == 13) {
            search();
        }
    });
    function search(){
        const q = query.value;
//        console.log(q);
        const promise = firebase.database()
                .ref("events")
                .orderByChild(`tags/${q}`)
                .equalTo(true);
        
        promise.once("value", function(events){
            for (var key in events.val()) {
                createResult(events.val()[key]);
            }
        });
        
        function createResult(event) {
            console.log(event);
            
            const result = document.createElement('div');
	       result.classList.add('result');
            result.textContent = event.description;
            results.appendChild(result);
        }
    }
});