const { WebClient } = require("@slack/web-api");

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const webClient = new WebClient(SLACK_TOKEN);

async function sendText(_cid, _message) {
    await webClient.chat
        .postMessage({ channel: _cid, text: _message })
        .catch(console.error);
}

async function sendBlocks(_cid, _message) {
    await webClient.chat.postMessage({
        channel: _cid,
        blocks: _message
    }).catch(console.error)
}

async function createModal(){
    await webClient.views.open().catch(console.error);
}

exports.sendText = sendText;
exports.sendBlocks = sendBlocks;