const express = require('express');
const app = express();
const port = 8080;
const { WebClient } = require('@slack/web-api');
const botToken = 'xoxb-6065759651110-6927398352627-bR92IkrST2Q2QPo4ZmpSGF1S';

const web = new WebClient(botToken);

app.post('/', async (req, res) => {
    console.log("MiscFunctions:testSlackFunction")
    try {
        // const result = await web.chat.postMessage({
        //     channel: req.body.event.channel,
        //     text: "How are you",
        // });
        console.log("Slack chat")
        return { status: 200, json: { success: true, challenge: req?.body?.challenge } }
    } catch (error) {
        console.log(error)
        return { status: 500, json: { success: false, error: "Unable to process" } }
    }
});

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
