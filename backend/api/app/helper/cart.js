const qq = require('../database/database');

async function verCarrito(id_us) {
    const sql = `select id_producto, p.nombre, p.precio, cantidad from carritos
    inner join carrito_usuario cu on carritos.id_carrito = cu.id_carrito_fk
    inner join producto_carrito pc on carritos.id_carrito = pc.id_carrito_fk
    inner join productos p on p.id_producto = pc.id_producto_fk
    where id_usuario_fk = :a`;

    const e = (await qq.run(sql, [id_us], true)).rows;
    return e;
}

async function agregarCarrito(id_usuario, id_producto) {
    const sql = `insert into producto_carrito(id_carrito_fk, id_producto_fk, cantidad)
    values(:a, :b, :c)`;

    const t1 = `select id_carrito_fk from carrito_usuario where id_usuario_fk = :a`
    let a1 = (await qq.run(t1, [id_usuario], true)).rows[0];
    let a2 = a1.ID_CARRITO_FK; //id del carrito del usuario

    await qq.run(sql, [a2, id_producto, 1], true);
    return {e: 'doki'};
}
async function eliminarCarritoTodo(id_usuario) {
    const sql = `delete from producto_carrito where id_carrito_fk = :a`;

    const t1 = `select id_carrito_fk from carrito_usuario where id_usuario_fk = :a`
    let a1 = (await qq.run(t1, [id_usuario], true)).rows[0];
    let a2 = a1.ID_CARRITO_FK;

    await qq.run(sql, [a2], true);
    return {e: 'doki'};
}

async function quitarCarrito(id_usuario, id_producto) {
    const sql = `delete from producto_carrito where id_carrito_fk = :a and id_producto_fk = :b`;

    const t1 = `select id_carrito_fk from carrito_usuario where id_usuario_fk = :a`
    let a1 = (await qq.run(t1, [id_usuario], true)).rows[0];
    let a2 = a1.ID_CARRITO_FK;

    await qq.run(sql, [a2, id_producto], true);
    return {e: 'doki'};
}

async function cantidadCarrito(id_usuario, id_producto, cant) {
    //modifica la cant de un producto

    const sql = `update producto_carrito set cantidad =:a where id_carrito_fk = :b and id_producto_fk = :c`;

    const t1 = `select id_carrito_fk from carrito_usuario where id_usuario_fk = :a`
    let a1 = (await qq.run(t1, [id_usuario], true)).rows[0];
    let a2 = a1.ID_CARRITO_FK;

    await qq.run(sql, [cant, a2, id_producto], true);
    return {e: 'doki'};
}

async function montoCarrito(id_usuario) {
    const sql = `select sum(cantidad * precio) as x from producto_carrito
    inner join productos p on p.id_producto = producto_carrito.id_producto_fk
    inner join carrito_usuario cu on producto_carrito.id_carrito_fk = cu.id_carrito_fk
    where id_usuario_fk = :a`;

    

    const f = (await qq.run(sql, [id_usuario], false)).rows[0].X;
    return f;
}
 

module.exports.verCarrito = verCarrito;
module.exports.agregarCarrito = agregarCarrito;
module.exports.eliminarCarritoTodo = eliminarCarritoTodo;
module.exports.quitarCarrito = quitarCarrito;
module.exports.cantidadCarrito = cantidadCarrito;
module.exports.montoCarrito =  montoCarrito;