const express = require("express");
const { createEventAdapter } = require("@slack/events-api");

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const PORT = process.env.PORT || 8080;

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);
const app = express();

app.use('/api/events/', slackEvents.requestListener());
app.use(express.json());


slackEvents.on('message', (ev)=>{
    console.log(`Received message:\nUser: ${ev.user}\nChannel: ${ev.channel}\nMessage: ${ev.text}`);
});

slackEvents.on('app_mention', (ev) => {
    console.log(`MENTION: Received message:\nUser: ${ev.user}\nChannel: ${ev.channel}\nMessage: ${ev.text}`);
})

/*
slackEvents.on('team_join', (ev)=>{

});
*/

//TESTS
const { WebClient } = require("@slack/web-api");

const SLACK_TOKEN = process.env.SLACK_TOKEN

const web = new WebClient(SLACK_TOKEN);


app.listen(PORT, async ()=>{
    await web.chat.postMessage({
        channel: "#general",
        text: "Hellow, world!"
    }).catch(console.error)
    console.log(`PES Open Source Slack Bot running on ${PORT}`);
});