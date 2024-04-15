const express = require('express');
const app = express();
const port = 8080;
const { WebClient } = require('@slack/web-api');
require('dotenv').config()

app.use(express.json())

const web = new WebClient(process.env.BOT_TOKEN);

app.post('/test', async (req, res) => { 
    console.log("testSlackFunction");
    try {
        console.log(req?.body)
        console.log(req?.body?.event?.text);
        const result = await web.chat.postMessage({
            channel: req.body.event.channel,
            text: "How are you",
        });
        console.log(result); 
        res.json({ challenge: req?.body?.challenge });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Unable to process" }); // Sending error response
    }
});


app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
