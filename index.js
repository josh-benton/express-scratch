fetch('http://localhost:3000/api/pitching-rotation')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error))