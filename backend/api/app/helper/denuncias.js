const qq = require('../database/database');


async function desactivar(id_produto) {
    const sql = `update productos set estado = :a where id_producto = :b`;
    await qq.run(sql, [0, id_produto], true);
    return { e: 'doki' };
}

async function activar(id_produto) {
    const sql = `update productos set estado = :a where id_producto = :b`;
    await qq.run(sql, [1, id_produto], true);
    return { e: 'doki' };
}

async function listar() {
    const sql = `select id_producto_fk, id_usuario_fk, comentario, fecha, u.nombre, apellido, p.nombre as producto, estado from denuncia_producto
    inner join usuarios u on u.id_usuario = denuncia_producto.id_usuario_fk
    inner join productos p on p.id_producto = denuncia_producto.id_producto_fk`;
    const e = (await qq.run(sql, [], false)).rows;
    return e;
}

module.exports.desactivar = desactivar;
module.exports.activar = activar;
module.exports.listar = listar;