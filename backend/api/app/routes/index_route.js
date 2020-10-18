const express = require('express');
const router = express.Router();
const qq = require('../database/database');
const users = require('../helper/users');
var bodyParser = require('body-parser');




const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

router.get('/', async (req, res) => {
    res.send("Hoooola");
    console.log( await qq.run('select count(*) as x from usuarios', [], false));
});

router.get('/authuser/:ids/:pss', async (req, res) => {
    
    const a = await users.requestUser(req.params.ids, req.params.pss);
    res.status(200).json({
        tipo:a[0].TIPO,
        id_usuario:a[0].ID_USUARIO
    });
});

router.get('/load', async (req, res) => {
    let sql = `insert into usuarios
    (id_usuario, nombre, apellido, correo, nacimiento, ruta_foto, contrasenia, creditos, tipo)
    values
    (:a,:b,:c, :d, :e, :f, :g,:h,:i)`;
    let vals = [1,'Carlos', 'tenes', 'cctenes@gmail.com', '04-06-1998', 'nope', '81dc9bdb52d04dc20036dbd8313ed055',1,'A'];
    const user=await qq.run(sql,vals,true);
    res.send({
        dato: "cargado"
    });
});


module.exports = router;