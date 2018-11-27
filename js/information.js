window.addEventListener('load', function() {


  firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
      const uid = firebase.auth().currentUser.uid;
      const db = firebase.database();
      const ref = db.ref('users').child(uid);
      ref.on('value', function(user) {
          const data = user.val();
          console.log(data);
          if (data.age) {
            document.getElementById('profile-age').style.display = 'none';
            document.getElementById('display-age').textContent = "Age " + data.age;
          }
          if (data.bio) {
            document.getElementById('profile-bio').style.display = 'none';
            document.getElementById('display-bio').textContent = "Bio " + data.bio;
          }
      });
    }
  });

  const ageBtn = document.getElementById('age-btn');
  const bioBtn = document.getElementById('bio-btn');
  ageBtn.addEventListener('click', function(event) {
    updateInfo('age');
  });
  bioBtn.addEventListener('click', function(event) {
    updateInfo('bio');
  });

  function updateInfo(info) {
    const value = document.getElementById(info).value;
    const uid = firebase.auth().currentUser.uid;
    const db = firebase.database();
    const ref = db.ref('users').child(uid);
    const data = {};
    data[info] = value;
    const promise = ref.update(data);
    promise.then(function() {
      console.log(info);
      document.getElementById('profile-' + info).style.display = 'none';
      document.getElementById('display-' + info).textContent = info + " " + value;
    });
    promise.catch(function(error) {
      console.log(error);
    });
  }
//just for age//
  // function updateAge() {
  //   const age = document.getElementById('age').value;
  //   const uid = firebase.auth().currentUser.uid;
  //   const db = firebase.database();
  //   const ref = db.ref('users').child(uid);
  //   const promise = ref.update({ "age": age });
  //   promise.then(function() {
  //     document.getElementById('profile-age').style.display = 'none';
  //     document.getElementById('display-age').textContent = "Age " + age;
  //   });
  //   promise.catch(function(error) {
  //     console.log(error);
  //   });
  // }
});


// const submitButton = document.getElementById('add-age');
// submitButton.addEventListener('click', function(){
//   const age = document.getElementById('age');
// }
