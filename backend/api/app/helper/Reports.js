const qq = require('../database/database');

async function reporte1(){
    //bitacora
    return [];
}

async function reporte2(){
    //bitacora
    const sql = `select productos.nombre as producto, productos.ventas,u.nombre as nombre, u.apellido as apellido from productos
    inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
    inner join usuarios u on u.id_usuario = cp.id_usuario_fk
    where ROWNUM <= 10
    order by productos.ventas desc`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}

async function reporte3(){
    const sql = `select count(*) as likes, u.nombre as nombre, u.apellido as apellido, productos.nombre as producto from productos
    inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
    inner join usuarios u on u.id_usuario = cp.id_usuario_fk
    inner join like_producto lp on productos.id_producto = lp.id_producto_fk
    where lp.tipo = 'L' and ROWNUM <= 10
    group by u.nombre, u.apellido, productos.nombre
    order by likes desc`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}

async function reporte4(){
    const sql = `select count(*) as dislikes, u.nombre as nombre, u.apellido as apellido, productos.nombre as producto from productos
    inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
    inner join usuarios u on u.id_usuario = cp.id_usuario_fk
    inner join like_producto lp on productos.id_producto = lp.id_producto_fk
    where lp.tipo = 'D' and ROWNUM <= 10
    group by u.nombre, u.apellido, productos.nombre
    order by dislikes asc`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}

async function reporte5(){
    const sql = `select nombre, apellido, correo, creditos from usuarios
    where ROWNUM <= 10 and tipo = 'C'
    order by creditos asc`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}
async function reporte5x(){
    const sql = `select nombre, apellido, correo, creditos from usuarios
    where ROWNUM <= 10 and tipo = 'C'
    order by creditos desc`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}

async function reporte6(){
    const sql = `select count(*) as cant, u.nombre as nombre, u.apellido as apellido, u.correo as correo, u.nacimiento as fecha_nac from denuncia_producto
    inner join productos p on p.id_producto = denuncia_producto.id_producto_fk
    inner join usuarios u on u.id_usuario = denuncia_producto.id_usuario_fk
    where ROWNUM <= 1
    group by u.nombre, u.apellido, u.correo, u.nacimiento
    order by cant desc`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}

async function reporte7(){
    const sql = `select count(id_producto) as cant, u.nombre as nombre, u.apellido as apellido, u.correo as correo, u.creditos as creditos from productos
    inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
    inner join usuarios u on u.id_usuario = cp.id_usuario_fk
    where ROWNUM <= 10
    group by u.nombre, u.apellido, u.correo, u.creditos`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}

async function reporte8(){
    const sql = `select sum(creditos) as creditos, nombre_pais, count(u.id_usuario) as usuarios,(
        select count(id_producto) as productos from productos
        inner join cliente_producto cp on productos.id_producto = cp.id_producto_fk
        inner join usuarios u on u.id_usuario = cp.id_usuario_fk
        inner join pais_usuario pu on u.id_usuario = pu.id_usuario_fk
        inner join paises p on p.id_pais = pu.id_pais_fk
        where p.nombre_pais = paises.nombre_pais
        )as productos from paises
    inner join pais_usuario pu on paises.id_pais = pu.id_pais_fk
    inner join usuarios u on u.id_usuario = pu.id_usuario_fk
    where ROWNUM <= 10
    group by nombre_pais`;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}

module.exports.reporte1 = reporte1;
module.exports.reporte2 = reporte2;
module.exports.reporte3 = reporte3;
module.exports.reporte4 = reporte4;
module.exports.reporte5 = reporte5;
module.exports.reporte5x = reporte5x;
module.exports.reporte6 = reporte6;
module.exports.reporte7 = reporte7;
module.exports.reporte8 = reporte8;