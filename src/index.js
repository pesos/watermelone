const express = require("express");
const { slackEvents } = require("./slack/events");
const { slackInteractions } = require("./slack/interactions");
const commandsRouter = require("./slack/commands");

const PORT = process.env.PORT || 8080;

const app = express();

app.use("/api/events/", slackEvents.requestListener());
app.use("/api/interactions/", slackInteractions.requestListener());
app.use(express.json());
app.use("/api/commands/", commandsRouter);

app.get('/', (req, res) => {
  res.status(200).send("App status: Online");
})

app.listen(PORT, async () => {
  console.log(`PES Open Source Slack Bot running on ${PORT}`);
});
