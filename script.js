document.getElementById('generate-button').addEventListener('click', generateImage);
document.getElementById('prompt-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        generateImage();
    }
});

function generateImage() {
    const prompt = document.getElementById('prompt-input').value;
    const errorMessageElement = document.getElementById('error-message');
    const resultImageElement = document.getElementById('result-image');

    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    const requestBody = { prompt };

    fetch('https://text-to-image.vford.workers.dev/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.blob();
    })
    .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        resultImageElement.src = imageUrl;
        errorMessageElement.textContent = ''; // Clear any previous error message
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessageElement.textContent = 'Error: ' + error.message;
        resultImageElement.src = 'default-image.png'; // Set to default image
    });
}