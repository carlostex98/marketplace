const qq = require('../database/database');
const mail = require('../helper/mail');
//compras

async function comprar(id_usuario) {

    const sql = `select id_carrito from carritos
    inner join carrito_usuario cu on carritos.id_carrito = cu.id_carrito_fk
    inner join usuarios u on u.id_usuario = cu.id_usuario_fk
    where id_usuario = :a`;

    let id_carrito = (await qq.run(sql, [id_usuario], false)).rows[0].ID_CARRITO;

    let t1 = `select creditos from usuarios where id_usuario = :a`;
    let a1 = (await qq.run(t1, [id_usuario], false)).rows[0].CREDITOS;
    let a2 = await montoCarrito(id_usuario);

    if (a1 < a2) {
        //no cuenta con los creditos
        return { mensaje: "no" };
    }

    //aqui si todo ok

    //recorrer carrito
    let cart = await verCarrito(id_usuario);

    for (const prod of cart) {
        await alertarCompra(prod.ID_PRODUCTO, prod.NOMBRE, prod.PRECIO, prod.CANTIDAD);
        await transferirVendedor(prod.ID_PRODUCTO, prod.PRECIO, prod.CANTIDAD);
    }


    //fin vendedores
    await debitarCliente(id_usuario, a2);
    await notificarComprador(id_usuario,cart, a2);
    await eliminarCarritoTodo(id_usuario);
    return { mensaje: "yes" }

}


async function montoCarrito(id_usuario) {
    const sql = `select sum(cantidad * precio) as x from producto_carrito
    inner join productos p on p.id_producto = producto_carrito.id_producto_fk
    inner join carrito_usuario cu on producto_carrito.id_carrito_fk = cu.id_carrito_fk
    where id_usuario_fk = :a`;
    const f = (await qq.run(sql, [id_usuario], false)).rows[0].X;
    return f;
}

async function verCarrito(id_us) {
    const sql = `select id_producto, p.nombre, p.precio, cantidad from carritos
    inner join carrito_usuario cu on carritos.id_carrito = cu.id_carrito_fk
    inner join producto_carrito pc on carritos.id_carrito = pc.id_carrito_fk
    inner join productos p on p.id_producto = pc.id_producto_fk
    where id_usuario_fk = :a`;

    const e = (await qq.run(sql, [id_us], true)).rows;
    return e;
}

async function alertarCompra(id_producto, nombre, precio, cantidad) {
    /**
     * seleccionar correo vendedor
     * enviar correo con el monto transferido, cantidad y producto comprado
     * 
     */

    const sql = `select correo from productos
    inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
    inner join usuarios u on u.id_usuario = cp.id_usuario_fk
    where id_producto = :a`;

    let a1 = (await qq.run(sql, [id_producto], false)).rows[0].CORREO;
    let corr = a1;

    let body = `<h1>Venta de producto(s)</h1>
    <br>
    <strong>Te han comprado${nombre}</strong><br>
    <strong>Unidades: ${cantidad}</strong><br>
    <strong>Se transfiere a tu cuenta: ${cantidad * precio}</strong>
    `;


    try {
        await mail.send(corr, body);
    } catch (error) {
        console.log(error);
    }

}

async function transferirVendedor(id_producto, precio, cantidad) {
    /**
     * seleccionar vendedor
     * seleccionar creditos
     * hacer suma
     * hacer update
     * 
     */

    const a1 = `select creditos, id_usuario from productos
    inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
    inner join usuarios u on u.id_usuario = cp.id_usuario_fk
    where id_producto = :a`;

    let cr = (await qq.run(a1, [id_producto], false)).rows[0].CREDITOS;
    let transferir = precio * cantidad;
    transferir = transferir + cr;
    let id_usr = (await qq.run(a1, [id_producto], false)).rows[0].ID_USUARIO;

    const sql = `update usuarios set creditos = :a where id_usuario = :b`;
    await qq.run(sql, [transferir, id_usr], true);

    const sm = `select ventas from productos where id_producto = :a`;
    let az = (await qq.run(sm, [id_producto], false)).rows[0].VENTAS;

    const sq2 = `update productos set ventas = :a where id_producto = :b`;
    await qq.run(sq2, [cantidad+az, id_producto], true);

}

async function debitarCliente(id_usuario, monto) {
    /**
     * seleccionar creditos cliente
     * calcular
     * debitar
     */

    const a1 = `select creditos from usuarios where id_usuario = :a`;
    let cr = (await qq.run(a1, [id_usuario], false)).rows[0].CREDITOS;
    const sql = `update usuarios set creditos = :a where id_usuario = :b`;
    let transferir = cr - monto;
    //console.log(transferir);
    await qq.run(sql, [transferir, id_usuario], true);

}

async function eliminarCarritoTodo(id_usuario) {
    const sql = `delete from producto_carrito where id_carrito_fk = :a`;

    const t1 = `select id_carrito_fk from carrito_usuario where id_usuario_fk = :a`
    let a1 = (await qq.run(t1, [id_usuario], true)).rows[0];
    let a2 = a1.ID_CARRITO_FK;

    await qq.run(sql, [a2], true);
}

async function notificarComprador(id_usuario, productos, total){
    const sql = `select correo from usuarios where id_usuario = :a`;
    let a = (await qq.run(sql, [id_usuario], false)).rows[0].CORREO;

    let temp = `<h1>Compra de producto(s)</h1>`;
    productos.forEach(prod => {
        temp += `<strong>${prod.NOMBRE}, precio: ${prod.PRECIO}  cantidad: ${prod.CANTIDAD} </strong><br>`;
    });
    temp += `Por un total de: ${total}`;

    try {
        await mail.send(a, temp);
    } catch (error) {
        console.log(error);
    }
}

async function creditos(id_usuario){
    const sql = `select creditos from usuarios where id_usuario = :a`;
    let a = (await qq.run(sql, [id_usuario], false)).rows[0].CREDITOS;
    return {creditos: a};
}

module.exports.comprar = comprar;
module.exports.creditos = creditos;