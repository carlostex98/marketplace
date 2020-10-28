const express = require('express');
const router = express.Router();
const qq = require('../database/database');
const users = require('../helper/users');
const format = require('../helper/format');
const categories = require('../helper/category');
const product = require('../helper/products');
var bodyParser = require('body-parser');




const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

router.get('/', async (req, res) => {
    res.send("Hoooola");
    console.log(await qq.run('select count(*) as x from usuarios', [], false));
});

router.post('/authuser', async (req, res) => {

    const a = await users.requestUser(req.body.ids, req.body.pss);

    if (a.length == 0) {
        res.status(200).json({
            tipo: 'inv',
            id_usuario: 'inv'
        });
    } else {
        res.status(200).json({
            tipo: a[0].TIPO,
            id_usuario: a[0].ID_USUARIO
        });
    }

});


router.post('/newuser', async (req, res) => {

    const { email, name, lname, country, nac, pss } = req.body;
    const lx = await users.register(email, name, lname, country, nac, pss);
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
    res.send(await qq.run('select * from usuarios', [], false));
});


router.get('/getcategories', async (req, res) => {
    res.send(await categories.ver());
});

router.post('/addcat', async (req, res) => {

    const { cat } = req.body;
    const t1 = await categories.crear(cat);
    res.status(200).json({
        status: t1[0],
        id: t1[1]
    });

});


router.get('/delete', async (req, res) => {
    //res.send("Hoooola");
    await format.truncate();
    res.send({ dato: "bye" });
});


router.get('/users', async (req, res) => {
    //res.send("Hoooola");
    const e = await users.listar();
    res.send(e);
});

router.get('/load', async (req, res) => {
    let sql = `insert into usuarios
    (id_usuario, nombre, apellido, correo, nacimiento, ruta_foto, contrasenia, creditos, tipo)
    values
    (:a,:b,:c, :d, :e, :f, :g,:h,:i)`;
    let vals = [1, 'Carlos', 'tenes', 'cctenes@gmail.com', '04-06-1998', 'nope', '81dc9bdb52d04dc20036dbd8313ed055', 1, 'A'];
    const user = await qq.run(sql, vals, true);
    res.send({
        dato: "cargado"
    });
});


router.post('/account', async (req, res) => {

    const { id_usuario } = req.body;
    const t1 = await users.getuser(id_usuario);
    res.status(200).json(t1);

});


router.post('/modifaccount', async (req, res) => {

    const { email, name, lname, nac } = req.body;
    const t1 = await users.editUserInfo(email, name, lname, 'f', nac);
    res.status(200).json(t1);

});


router.post('/newproduct', async (req, res) => {

    const { id_usuario, nombre, detalle, precio, id_categoria } = req.body;
    const t1 = await product.nuevo(id_usuario, nombre, detalle, precio, id_categoria);
    res.status(200).json(t1);

});


router.get('/products', async (req, res) => {
    //res.send("Hoooola");
    const e = await product.ver();
    res.send(e);
});


module.exports = router;