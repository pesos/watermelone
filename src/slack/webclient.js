const { WebClient } = require("@slack/web-api");
const { Client } = require("pg");

//const SLACK_TOKEN = process.env.SLACK_TOKEN;
const webClient = new WebClient();

const { saveToken } = require('../database/pg');


async function sendFirstGreet(_cid, _team_id) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query(`SELECT bot_token from app_tokens where team_id='${_team_id}';`, (err, res) => {
        if (err) console.error(err);
        await webClient.chat.postEphemeral({
            user: _cid,
            token: res[0],
            channel: "#general",
            text: "Hi there! Welcome to PES Open Source!",
            attachments: [{
                title: "Important!",
                text: "Please check your DMs to complete your registeration process for PES Open Source!"
            }]
        }).catch(console.error)
        await webClient.chat.postMessage({
            channel: _cid,
            token: res[0],
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
        client.end()
    })
}

async function sendText(_cid, _message, _team_id) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query(`SELECT bot_token from app_tokens where team_id='${_team_id}';`, (err, res) => {
        if (err) throw err;
        await webClient.chat
            .postMessage({ channel: _cid, text: _message, token: res[0] })
            .catch(console.error);
    })
}

async function sendBlocks(_cid, _message, _token) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query(`SELECT bot_token from app_tokens where team_id='${_team_id}';`, (err, res) => {
        await webClient.chat.postMessage({
            channel: _cid,
            blocks: _message,
            token: res[0]
        }).catch(console.error)
    })
}

async function createModal() {
    await webClient.views.open().catch(console.error);
}

async function callOauth(code) {
    var res = await webClient.oauth.v2.access(
        {
            code: code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }
    ).catch(console.error);
    await saveToken(res.team.id, res.access_token);
    if (res.ok == true) return 1; else return 0;
}

exports.sendText = sendText;
exports.sendBlocks = sendBlocks;
exports.sendFirstGreet = sendFirstGreet;
exports.callOauth = callOauth;