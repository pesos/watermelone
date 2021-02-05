const express = require("express");
const { callOauth } = require("./webclient");
const router = express.Router();

router.get('/', async (req,res) => {
    if(req.params.error) {
        res.status(401).send("Cannot authorise.");
        return;
    }
    var r = await callOauth(req.params.code);
    if(r) res.status(200).send("Auth completed.");
})

module.exports = router;