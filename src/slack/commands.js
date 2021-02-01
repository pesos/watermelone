const express = require("express");
const router = express.Router();

const { sendMessage } = require("./webclient");


router.post('/resources', (req,res) => {
    res.status(200).send("https://pesos.github.io/resources/");
});

module.exports = router;