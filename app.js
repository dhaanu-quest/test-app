const express = require('express');
const app = express();
const port = 8080;
const { WebClient } = require('@slack/web-api');
require('dotenv').config()

app.use(express.json())

const web = new WebClient(process.env.BOT_TOKEN);

const randomResponses = [
    "I'm doing great, thanks for asking!",
    "Not bad, how about you?",
    "Feeling awesome today!",
    "Just chilling, you?",
    "Pretty good, thanks!",
    "Could be better, but hanging in there!",
    "Not too shabby!",
    "Living the dream!",
];


function getRandomResponse() {
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}


app.post('/test', async (req, res) => {
    console.log("testSlackFunction");
    try {
        console.log(req?.body)
        console.log(req?.body?.event?.text);
        const eventData = req.body;

        if (eventData.type === 'event_callback' && eventData.event && eventData.event.type === 'message' && !eventData.event.bot_id) {
            console.log("Received user message:", eventData.event.text);

            const randomMessage = getRandomResponse();
            const thread_ts = eventData?.event?.thread_ts || eventData?.event?.ts; 

            const result = await web.chat.postMessage({
                channel: eventData.event.channel,
                text: randomMessage,
                thread_ts: thread_ts,
            });
            console.log("Sent reply to user message:", result);
        } else if (eventData.ok === true && eventData.message && eventData.message.bot_id) {
            console.log("Received bot reply:", eventData.message.text);
        }
        res.json({ challenge: req?.body?.challenge });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Unable to process" }); // Sending error response
    }
});


app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
