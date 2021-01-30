const { WebClient } = require("@slack/web-api");

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const webClient = new WebClient(SLACK_TOKEN);

exports.webClient = webClient;