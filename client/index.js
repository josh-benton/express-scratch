fetch('https://pitching-rotation-frontend.onrender.com/api/pitching-rotation')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error))