const { createMessageAdapter } = require("@slack/interactive-messages");
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;

const slackInteractions = createMessageAdapter(SLACK_SIGNING_SECRET);

exports.slackInteractions = slackInteractions;


