const { Client }= require('pg');


async function display_tokens(){
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    var temp; 
    client.query("SELECT * FROM app_tokens;", (err, res) => {
        if(err) console.error(err);
        else temp = res; 
    })
    client.end();
    return temp; 
}

async function saveToken(team_id, token){
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query(`INSERT INTO app_tokens values('${team_id}','${token}')`, (err, res) => {
        if(err) console.error(error);
    })
    client.end();
}

exports.display_tokens = display_tokens;
exports.saveToken = saveToken;