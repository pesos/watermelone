const express = require("express");
const router = express.Router();
const { display_tokens } = require('../database/pg');

router.get('/', async (req,res) => {
    let r = await display_tokens();
    res.status(200).send(r);
});


module.exports = router;