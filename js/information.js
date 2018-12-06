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
          if (data.phone) {
            document.getElementById('profile-phone').style.display = 'none';
            document.getElementById('display-phone').textContent = "Get"+ " "+"in"+" "+"touch"+ " "+data.phone;
          }
          if (data.location) {
            document.getElementById('profile-location').style.display = 'none';
            document.getElementById('display-location').textContent = "My"+ " "+"location"+" "+data.location;
          }
          if (data.interest) {
            document.getElementById('profile-interest').style.display = 'none';
            document.getElementById('display-interest').textContent = "My"+ " "+"interests"+" "+ data.interest;
          }
      });
    }
  });
  const interestBtn = document.getElementById('interest-btn');
  const locationBtn = document.getElementById('location-btn');
  const phoneBtn = document.getElementById('phone-btn');
  const ageBtn = document.getElementById('age-btn');
  const bioBtn = document.getElementById('bio-btn');
  ageBtn.addEventListener('click', function(event) {
    updateInfo('age');
  });
  bioBtn.addEventListener('click', function(event) {
    updateInfo('bio');
  });
  phoneBtn.addEventListener('click', function(event) {
    updateInfo('phone');
  });
  locationBtn.addEventListener('click', function(event) {
    updateInfo('location');
  });
  interestBtn.addEventListener('click', function(event) {
    updateInfo('interest');
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
  // function updatePhone() {
  //   const phone = document.getElementById('phone').value;
  //   const uid = firebase.auth().currentUser.uid;
  //   const db = firebase.database();
  //   const ref = db.ref('users').child(uid);
  //   const promise = ref.update({ "phone": phone });
  //   promise.then(function() {
  //     document.getElementById('profile-phone').style.display = 'none';
  //     document.getElementById('display-phone').textContent = "Age " + phone;
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
