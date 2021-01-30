const { createEventAdapter, errorCodes } = require("@slack/events-api");

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

const { webClient } = require("./webclient");

slackEvents.on("message", async (ev) => {
  if (ev.channel_type === "im") {
    if (ev.text.includes("Hello!")) {
      await webClient.chat
        .postMessage({
          channel: ev.channel,
          text: "This is a DM!",
        })
        .catch(console.error);
    }
  }
});

slackEvents.on("app_mention", async (ev) => {
  if (ev.text.includes("Hi!")) {
    await webClient.chat
      .postMessage({
        channel: ev.channel,
        text: "Hi There!",
      })
      .catch(console.error);
  } else if (ev.text.includes("DM me!")) {
    await webClient.chat
      .postMessage({
        channel: ev.user,
        as_user: true,
        text: "Test successful!",
      })
      .catch(console.error);
  }
});

slackEvents.on("team_join", async (ev) => {
  console.log(`Joined User:\nUser: ${ev.user.id}`);
  await webClient.chat
    .postMessage({
      channel: ev.user.id,
      as_user: true,
      text: "Welcome to PES Open Source... test message",
    })
    .catch(console.error);
});

exports.slackEvents = slackEvents;
