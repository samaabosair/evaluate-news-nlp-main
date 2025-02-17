# Evaluate a News Article with Natural Language Processing

## Project Overview
This project is a web application that I developed to evaluate news articles using Natural Language Processing (NLP). The application integrates with the Udacity-hosted AWS NLP API to analyze user-submitted URLs and extract sentiment analysis, subjectivity, and other useful insights.

## My Contributions
During this project, I worked on:
- Setting up Webpack for both development and production.
- Implementing SCSS for styling different UI components.
- Configuring Express.js to handle API requests securely.
- Integrating the Udacity NLP API for text analysis.
- Implementing service workers for offline functionality.
- Writing unit tests using Jest to ensure code reliability.
- Handling form validation and error management.

## Installation
To run the project locally, follow these steps:

1. Clone the repository:
```bash
git clone <repository_url>
cd project-directory
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file to store the API key securely:
```
API_KEY=your_api_key_here
```

## Running the App

### Development Mode
Run the app in development mode with:
```bash
npm run build-dev
```
The app will start on `http://localhost:8080`.

### Production Mode
To build and run the app in production mode:
```bash
npm run build-prod
npm start
```

## API Integration
I set up the server-side API integration to keep the API key secure. The server processes the user input, sends the request to the NLP API, and returns the results to the frontend.

### Example API Response
```json
{
  "sentiment": "POSITIVE",
  "sentiment_scores": {
    "Positive": 0.95,
    "Negative": 0.02,
    "Neutral": 0.03,
    "Mixed": 0.00
  },
  "text": "I love building serverless applications with AWS!"
}
```

## Service Workers
To enhance the user experience, I implemented service workers using Workbox in `webpack.prod.js`, enabling the app to function offline.

### How to Test Service Workers:
1. **Build the project for production:**
   ```bash
   npm run build-prod

2. **Start a server to serve the build:**
   ```bash
serve -s dist

3. **Open the app in a browser at http://localhost:3000.**

4. **Test offline functionality by disconnecting your internet and refreshing the page. The site should still be accessible, thanks to service worker caching.**
```

## Testing
To ensure reliability, I wrote unit tests using Jest. Run tests with:
```bash
npm run test
```

## Deployment
I successfully deployed the project. If you want to deploy it yourself, consider:
- [Netlify](https://evaluate-news-nlp-main-by-samaabosair.netlify.app/)

## Dependencies
- Webpack
- Babel
- Express
- Jest
- Workbox
- Dotenv

## .gitignore
```
/node_modules
/dist
/.env
```

## Conclusion
This project helped me gain hands-on experience in integrating Webpack, Express, and an external API while ensuring best practices in security, testing, and deployment. I learned a lot while developing it and look forward to improving it further!

