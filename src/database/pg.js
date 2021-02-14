const { Client }= require('pg');


async function display_tokens(){
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    let r = await client.query("SELECT * FROM app_tokens;", async (err, res) => {
        if(err) console.error(err);
        client.end();
        //console.log(JSON.stringify(res)); 
    })
    let rows = [];
    for (let row of r.rows){
        //console.log(row.bot_token);
        rows.push(row.bot_token);
        //NEED TO USE A CALLBACK
    }
    return rows; 
}

async function saveToken(team_id, token){
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query(`INSERT INTO app_tokens values('${team_id}','${token}');`, (err, res) => {
        if(err) console.error(error);
        client.end();
    })
}

exports.display_tokens = display_tokens;
exports.saveToken = saveToken;