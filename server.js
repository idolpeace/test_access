const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

if (!config.channelAccessToken || !config.channelSecret) {
  console.error('LINE_CHANNEL_ACCESS_TOKEN and LINE_CHANNEL_SECRET must be set');
  process.exit(1);
}

const client = new line.Client(config);
const app = express();

app.use('/webhook', line.middleware(config));

app.post('/webhook', (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  const echo = { type: 'text', text: `You said: ${event.message.text}` };
  return client.replyMessage(event.replyToken, echo);
}

app.get('/send/:userId', async (req, res) => {
  const userId = req.params.userId;
  const message = req.query.message || 'Hello from LINE bot';
  try {
    await client.pushMessage(userId, { type: 'text', text: message });
    res.send('Message sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending message');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
