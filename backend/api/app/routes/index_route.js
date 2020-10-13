const express = require('express');
const router = express.Router();
const qq = require('../database/database');


const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

router.get('/', async (req, res) => {
    res.send("Hoooola");
    console.log( await qq.run('select * from usuarios'));
});

module.exports = router;