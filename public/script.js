let btn = document.querySelector('button');
let display = document.querySelector('.display');

btn.addEventListener('click', async event => {
	
	try {
		const response = await fetch('/hamsters');
		const json = await response.json();

		let text = JSON.stringify(json);
		display.innerHTML = text;

	} catch {
		console.log('Hamsters have not been displayed');
	}
})