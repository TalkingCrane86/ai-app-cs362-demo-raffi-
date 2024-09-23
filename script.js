document.getElementById('generate-button').addEventListener('click', generateImage);
document.getElementById('prompt-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        generateImage();
    }
});

function generateImage() {
    const prompt = document.getElementById('prompt-input').value;
    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    fetch('https://your-cloudflare-ai-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result-image').src = data.imageUrl;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}