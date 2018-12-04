window.addEventListener('load', function () {


    const sendBtn = document.getElementById('send');
    const supportInput = document.getElementById('support-question');
    sendBtn.addEventListener('click', submitFeedback);
    
    function submitFeedback() {
        const uid = firebase.auth().currentUser.uid;
        const db = firebase.database();
        const ref = db.ref('support');
        const info = {
            text: supportInput.value,
            date: Date.now(),
            author: firebase.auth().currentUser.displayName,
            id: uid
        };
        const promise = ref.push(info);
        promise.then(function(success){
            document.getElementById('greeting').style.display="block";
        });
    }
                     
});