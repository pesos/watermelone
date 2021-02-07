const { Client }= require('pg');


async function display_tokens(){
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query("SELECT * FROM app_tokens;", (err, res) => {
        if(err) console.log(err);
        else return res;
    })
}

exports.display_tokens = display_tokens;