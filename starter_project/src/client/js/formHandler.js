// Import necessary functions
import { checkForName } from './nameChecker';

// Replace checkForName with URL validation
function isValidUrl(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
}

const serverURL = 'http://localhost:8000';

const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
}


function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Validate URL
    if (isValidUrl(formText)) {
        console.log('Valid URL:', formText);

        // Send valid URL to the server
        sendDataToServer(formText);
    } else {
        alert('Please enter a valid URL.');
    }
}


async function sendDataToServer(url) {
    try {
        const response = await fetch(`${serverURL}/analyze-url`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        // Handle the response from the server
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            console.log("sama", data);
            displayResults(data);
        }
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
}

// Function to display the results in the frontend
function displayResults(data) {
    const resultContainer = document.getElementById('results');

    resultContainer.innerHTML = '';

    const header = document.createElement('h2');
    header.innerText = 'Analysis Results';
    resultContainer.appendChild(header);
    resultContainer.appendChild(document.createElement('hr'));

    const sentimentElement = document.createElement('p');
    sentimentElement.innerHTML = `<strong>Sentiment:</strong> <span class="sentiment ${data.sentiment.toLowerCase()}">${data.sentiment}</span>`;
    resultContainer.appendChild(sentimentElement);
    resultContainer.appendChild(document.createElement('hr'));

    const sentimentScores = data.sentiment_scores;
    const sentimentScoresElement = document.createElement('p');
    sentimentScoresElement.innerHTML = `
        <strong>Sentiment Scores:</strong><br>
        Positive: ${sentimentScores.Positive.toFixed(2)}<br>
        Negative: ${sentimentScores.Negative.toFixed(2)}<br>
        Neutral: ${sentimentScores.Neutral.toFixed(2)}<br>
        Mixed: ${sentimentScores.Mixed.toFixed(2)}
    `;
    resultContainer.appendChild(sentimentScoresElement);
    resultContainer.appendChild(document.createElement('hr'));

    const inputTextElement = document.createElement('p');
    inputTextElement.innerHTML = `<strong>Input Text Preview:</strong> <span class="input-text">${data.text.substring(0, 200)}...</span>`;
    resultContainer.appendChild(inputTextElement);

    resultContainer.appendChild(document.createElement('hr'));
}

// Export the handleSubmit function
export { handleSubmit };
