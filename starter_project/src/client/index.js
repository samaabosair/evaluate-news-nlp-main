// js files

import { handleSubmit } from './js/formHandler';


//alert("I EXIST")
// console.log("CHANGE!!");

// sass files
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

const form = document.querySelector('form');
const resultContainer = document.getElementById('results');

// Event listener to handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.querySelector('#name').value;

    try {
        console.log("sama<#");
        const response = await fetch('http://localhost:8000/analyze-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        // Display the result in the frontend
        if (data.error) {
            resultContainer.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
        //    resultContainer.innerHTML = `<p>Analysis Result: ${JSON.stringify(data)}</p>`;
        }
    } catch (error) {
        resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
