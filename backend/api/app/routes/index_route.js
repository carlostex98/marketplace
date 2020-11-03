const express = require('express');
const router = express.Router();
const qq = require('../database/database');
const users = require('../helper/users');
const format = require('../helper/format');
const categories = require('../helper/category');
const product = require('../helper/products');
const cart = require('../helper/cart');
const denuncias = require('../helper/denuncias');
const chat = require('../helper/chat');
const buy = require('../helper/buy');
var bodyParser = require('body-parser');




const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

router.get('/', async (req, res) => {
    res.send("Hoooola");
    //console.log(await product.d_like(2, 1));
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

    const { id_usuario, nombre, detalle, precio, id_categoria, claves } = req.body;
    const t1 = await product.nuevo(id_usuario, nombre, detalle, precio, id_categoria, claves);
    res.status(200).json(t1);

});


router.get('/products', async (req, res) => {
    //res.send("Hoooola");
    const e = await product.ver();
    res.send(e);
});

router.get('/detail/:id', async (req, res) => {
    //res.send("Hoooola");
    const a = req.params.id;
    const e = await product.verUno(a);
    res.send(e);
});


router.get('/comments/:id', async (req, res) => {
    //res.send("Hoooola");
    const a = req.params.id;
    const e = await product.comments(a);
    res.send(e);
});

router.get('/likes/:id', async (req, res) => {
    const a = req.params.id;
    const e = await product.likesProd(a);
    res.send(e);
});

router.get('/mylike/:ids/:idp', async (req, res) => {
    const a = req.params.ids;
    const b = req.params.idp;
    const e = await product.gu_like(a, b);
    res.send({ estado: e });
});


router.get('/cart/:ids', async (req, res) => {
    const a = req.params.ids;
    const e = await cart.verCarrito(a);
    res.send(e);
});

router.get('/ctotal/:ids', async (req, res) => {
    const a = req.params.ids;
    const e = await cart.montoCarrito(a);
    res.send({
        total: e
    });
});

router.get('/denuncias', async (req, res) => {
    const e = await denuncias.listar();
    res.send(e);
});

router.post('/desactivar', async (req, res) => {

    const { id_producto } = req.body;
    const e = await denuncias.desactivar(id_producto);
    res.status(200).json(e);

});

router.post('/activar', async (req, res) => {

    const { id_producto } = req.body;
    const e = await denuncias.activar(id_producto);
    res.status(200).json(e);

});


router.post('/ncprod', async (req, res) => {

    const { id_usuario, id_producto } = req.body;
    const e = await cart.agregarCarrito(id_usuario, id_producto);
    res.status(200).json(e);

});

router.post('/delcart', async (req, res) => {

    const { id_usuario } = req.body;
    const e = await cart.eliminarCarritoTodo(id_usuario);
    res.status(200).json(e);

});

router.post('/dcprod', async (req, res) => {

    const { id_usuario, id_producto } = req.body;
    const e = await cart.quitarCarrito(id_usuario, id_producto);
    res.status(200).json(e);

});

router.post('/mcprod', async (req, res) => {

    const { id_usuario, id_producto, cantidad } = req.body;
    const e = await cart.cantidadCarrito(id_usuario, id_producto, cantidad);
    res.status(200).json(e);

});


router.post('/newcomment', async (req, res) => {

    const { id_usuario, id_producto, comentario } = req.body;
    const e = await product.newComment(id_usuario, id_producto, comentario);
    res.status(200).json(e);

});

router.post('/newden', async (req, res) => {

    const { id_usuario, id_producto, comentario } = req.body;
    await product.newDen(id_usuario, id_producto, comentario);
    res.status(200).json({ e: 'doki' });

});


router.post('/dlike', async (req, res) => {

    const { id_usuario, id_producto } = req.body;
    await product.d_like(id_usuario, id_producto);
    res.status(200).json({ e: 'doki' });

});


router.post('/mlike', async (req, res) => {

    const { id_usuario, id_producto, tipo } = req.body;
    await product.m_like(id_usuario, id_producto, tipo);
    res.status(200).json({ e: 'doki' });

});

router.post('/nlike', async (req, res) => {

    const { id_usuario, id_producto, tipo } = req.body;
    const c = await product.n_like(id_usuario, id_producto, tipo);
    res.status(200).json(c);

});

router.post('/ncons', async (req, res) => {
    const { id_usuario, id_vendedor } = req.body;
    const c = await chat.crearChat(id_usuario, id_vendedor);
    res.status(200).json(c);
});

router.get('/cvendedor/:ids', async (req, res) => {
    const a = req.params.ids;
    const e = await chat.listarChatsVendedor(a);
    res.send(e);
});

router.get('/ccliente/:ids', async (req, res) => {
    const a = req.params.ids;
    const e = await chat.listarChatsCliente(a);
    res.send(e);
});


router.get('/conv/:idc', async (req, res) => {
    const a = req.params.idc;
    const e = await chat.mensajes(a);
    res.send(e);
});

router.post('/nmens', async (req, res) => {
    const { id_conv, id_usuario, texto } = req.body;
    const c = await chat.nuevo(id_conv, id_usuario, texto);
    res.status(200).json(c);
});

router.post('/xcompra', async (req, res) => {
    const { id_usuario } = req.body;
    const c = await buy.comprar(id_usuario);
    res.status(200).json(c);
});


module.exports = router;