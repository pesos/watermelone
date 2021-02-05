const express = require("express");
const { callOauth } = require("./webclient");
const router = express.Router();

router.get('/', async (req,res) => {
    if(req.query.error) {
        res.status(401).send("Cannot authorise.");
        return;
    }
    var r = await callOauth(req.query.code);
    if(r) res.status(200).send("Auth completed.");
})

module.exports = router;