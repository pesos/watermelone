const { createEventAdapter, errorCodes } = require("@slack/events-api");

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

const { sendBlocks, sendText } = require("./webclient");

slackEvents.on("message", async (ev) => {
  if (ev.channel_type === "im") {
    if (ev.text.includes("Hello!")) {
      await sendText(ev.user, "Hello there! This is a DM!");
    }
  }
});

slackEvents.on("app_mention", async (ev) => {
  if (ev.text.includes("Hi!")) {
    await sendText(ev.channel, "Hi there!");
  } else if (ev.text.includes("DM me!")) {
    await sendText(ev.user, "You called?");
  } else if (ev.text.includes("Verify me!")) {
    let test_message = [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "PR Verification!",
            "emoji": true
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Click here to verify!",
                "emoji": true
              },
              "value": "verify_btn",
              "action_id": "actionId-0"
            }
          ]
        }
      ];
    await sendBlocks(ev.channel, test_message);
  }
});

slackEvents.on("team_join", async (ev) => {
  await sendText(
    ev.user.id,
    "Welcome to PES Open Source! Here are a few instructions on how to get started! Type your type `github: <username>` to connect your github account.(?)"
  );
});

exports.slackEvents = slackEvents;
