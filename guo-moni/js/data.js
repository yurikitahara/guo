window.addEventListener('load', function() {

	const dataDiv = document.getElementById('data');
	const db = firebase.database().ref();
	
	db.on('value', function(snapshot) {
		/*const data = snapshot.val();
		for (const key in data) {
			const elem = document.createElement('div');
			elem.id = key;
			elem.textContent = data[key];
			dataDiv.appendChild(elem);
		}*/
	});
	
	db.on('child_added', function(snapshot) {
		const elem = document.createElement('div');
		elem.id = snapshot.key;
		elem.textContent = snapshot.val();
		dataDiv.appendChild(elem);
	});
		
	
	db.on('child_removed', function(snapshot) {
		const elem = document.getElementById(snapshot.key);
		elem.remove();
	});
	
	db.on('child_changed', function(snapshot) {
		const elem = document.getElementById(snapshot.key);
		elem.textContent = snapshot.val();
	});
	
});