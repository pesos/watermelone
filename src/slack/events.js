const { createEventAdapter, errorCodes } = require("@slack/events-api");

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET, {
  includeBody: true,
  includeHeaders: true
});

const { sendBlocks, sendText, sendFirstGreet } = require("./webclient");

slackEvents.on("message", async (ev, body) => {
  if (ev.channel_type === "im") {
    if (ev.text.includes("Hello!")) {
      await sendText(ev.user, "Hello there! This is a DM!");
    }
  }
});

slackEvents.on("app_mention", async (ev, body) => {
  if (ev.text.includes("Hi!")) {
    await sendText(ev.channel, "Hi there!");
  } else if (ev.text.includes("DM me!")) {
    await sendText(ev.user, "You called?");
  }
});

slackEvents.on("team_join", async (ev, body) => {
  await sendFirstGreet(ev.user.id);
});

exports.slackEvents = slackEvents;
