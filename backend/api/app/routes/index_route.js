const express = require('express');
const router = express.Router();
const qq = require('../database/database');
const users = require('../helper/users');
const format = require('../helper/format');
var bodyParser = require('body-parser');




const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

router.get('/', async (req, res) => {
    res.send("Hoooola");
    console.log( await qq.run('select count(*) as x from usuarios', [], false));
});

router.post('/authuser', async (req, res) => {
    
    const a = await users.requestUser(req.body.ids, req.body.pss);

    if(a.length==0){
        res.status(200).json({
            tipo:'inv',
            id_usuario:'inv'
        });
    }else{
        res.status(200).json({
            tipo:a[0].TIPO,
            id_usuario:a[0].ID_USUARIO
        });
    }
    
});


router.post('/newuser', async (req, res) => {
    
    const { email, name, lname, country, nac, pss } = req.body;
    const lx= await users.register(email, name, lname, country, nac, pss);
    res.status(200).json({
        status: lx
    });
    
});

router.post('/confirmar', async (req, res) => {
    
    const { hmail, email } = req.body;
    await users.confirmar(hmail, email);
    res.status(200).json({
        status: 'dokix'
    });
    
});




router.get('/sss', async (req, res) => {
    //res.send("Hoooola");
    res.send( await qq.run('select * from usuarios', [], false));
});


router.get('/delete', async (req, res) => {
    //res.send("Hoooola");
    await format.truncate();
    res.send( {dato:"bye"});
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