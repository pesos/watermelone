const { WebClient } = require("@slack/web-api");

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const webClient = new WebClient(SLACK_TOKEN);

async function sendMessage(_cid, _message) {
    await webClient.chat
        .postMessage({ channel: _cid, text: _message })
        .catch(console.error);
}

exports.sendMessage = sendMessage;
