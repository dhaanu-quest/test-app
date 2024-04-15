const express = require('express');
const app = express();
const port = 8080;
const { WebClient } = require('@slack/web-api');
require('dotenv').config()
console.log(process.env.BOT_TOKEN)

const web = new WebClient(process.env.BOT_TOKEN);

app.post('/', async (req, res) => {
    console.log("MiscFunctions:testSlackFunction")
    try {
        // const result = await web.chat.postMessage({
        //     channel: req.body.event.channel,
        //     text: "How are you",
        // });
        console.log("Slack chat")
        return { success: true, challenge: req?.body?.challenge } 
    } catch (error) {
        console.log(error)
        return { success: false, error: "Unable to process" } 
    }
});

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
