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

    const requestBody = {
        messages: [
            { role: "system", content: "You are a friendly assistant that helps write stories" },
            { role: "user", content: prompt }
        ]
    };

    fetch('https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_TOKEN'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result-image').src = data.imageUrl;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}