const { WebClient } = require("@slack/web-api");

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const webClient = new WebClient(SLACK_TOKEN);


async function sendFirstGreet(_cid) {
    await webClient.chat.postEphemeral({
        user: _cid,
        channel: "#general",
        text: "Hi there! Welcome to PES Open Source!",
        attachments: [{
            title: "Important!",
            text: "Please check your DMs to complete your registeration process for PES Open Source!"
        }]
    }).catch(console.error)
    await webClient.chat.postMessage({
        channel: _cid,
        blocks: [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Welcome to PES Open Source!",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "We are excited to have you here! As the joining process for PES Open Source, we have a really simple task for you to complete!\nIf you have already sent Pull Request to the `pesos/members-list` repository, you may skip to the last step!\n1. Sign up for a <github.com | Github > account.\n2. Visit the <https://github.com/pesos/members-list | members-list repository> and click on the *Fork* button on the top right.\n3. In your forked repository, follow the written instruction to create your first pull request!\n4. Great! You're all done! Now wait for a maintainer to merge your pull request. If there are any changes to be made, the maintainer will let you know!\n5. Once your pull request has been merged, type `/verify <your_github_username>` here to verify yourself on the slack channel!\n\nIf you need any assistance, feel free to ask questions on the #general channel!\n\nAlso, take a look at our <https://pesos.github.io/coc | Code of Conduct>!"
                }
            }
        ]
    }).catch(console.error);
}

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

async function createModal() {
    await webClient.views.open().catch(console.error);
}

exports.sendText = sendText;
exports.sendBlocks = sendBlocks;
exports.sendFirstGreet = sendFirstGreet;