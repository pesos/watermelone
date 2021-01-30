const express = require("express");
const { slackEvents } = require('./events');
const { webClient } = require('./webclient');

const PORT = process.env.PORT || 8080;

const app = express();

app.use("/api/events/", slackEvents.requestListener());
app.use(express.json());

app.listen(PORT, async () => {
  /*
  await webClient.chat
    .postMessage({
      channel: "#general",
      text: "PES Open Source bot online!",
    })
    .catch(console.error);
    */
  console.log(`PES Open Source Slack Bot running on ${PORT}`);
});
