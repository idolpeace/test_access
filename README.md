# LINE OA Backend

This repository includes a simple Node.js backend that connects to the LINE Official Account API.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file or export the following environment variables:

- `LINE_CHANNEL_ACCESS_TOKEN` – your channel access token
- `LINE_CHANNEL_SECRET` – your channel secret
- `PORT` *(optional)* – port to run the server (defaults to 3000)

3. Start the server:

```bash
npm start
```

The server exposes two endpoints:

- `POST /webhook` – handles incoming webhook events from LINE.
- `GET /send/:userId?message=Hello` – sends a push message to a user.

Make sure your LINE OA webhook URL points to `/webhook` on this server.
