fetch('https://pitching-rotation-api.onrender.com/api/pitching-rotation')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error))