const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Import the firebase configs from environment variable
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Import the api key for historical events from environment variable
const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

// Set up an endpoint that returns the firebase configuration object
app.get('/firebase-config', (req, res) => {
  res.json(firebaseConfig);
});

// Set up an endpoint that returns historical events
app.get('/historical-events', async (req, res) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const url = `https://api.api-ninjas.com/v1/historicalevents?month=${month}&day=${day}`;

  const options = {
    headers: { 'X-Api-Key': apiKey },
    contentType: 'application/json',
  };

  try {
    const { data } = await axios.get(url, options);
    if (data) {
      return res.status(200).json({ message: 'Success', data });
    } else {
      return res.status(404).json({ message: 'Something went wrong!' });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
