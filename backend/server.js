const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const WEBHOOK_URL = 'https://webhook.site/682ce7b3-5263-4ba1-a6a6-50b6ce649925'; // Put your webhook.site URL here

app.post('/send-to-webhook', async (req, res) => {
  try {
    const webhookResponse = await axios.post(WEBHOOK_URL, req.body);
    res.status(webhookResponse.status).send(webhookResponse.data);
  } catch (error) {
    console.error('Error sending to webhook.site:', error.message);
    res.status(500).send('Failed to send to webhook.site');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend proxy listening on port ${PORT}`);
});
