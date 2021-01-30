const { createEventAdapter, errorCodes } = require("@slack/events-api");

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

const { sendMessage } = require("./webclient");

slackEvents.on("message", async (ev) => {
  if (ev.channel_type === "im") {
    if (ev.text.includes("Hello!")) {
      await sendMessage(ev.user, "Hello there! This is a DM!");
    }
  }
});

slackEvents.on("app_mention", async (ev) => {
  if (ev.text.includes("Hi!")) {
    await sendMessage(ev.channel, "Hi there!");
  } else if (ev.text.includes("DM me!")) {
    await sendMessage(ev.user, "You called?");
  }
});

slackEvents.on("team_join", async (ev) => {
  await sendMessage(
    ev.user.id,
    "Welcome to PES Open Source! Here are a few instructions on how to get started! Type your type `github: <username>` to connect your github account.(?)"
  );
});

exports.slackEvents = slackEvents;
