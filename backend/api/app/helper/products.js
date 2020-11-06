const qq = require('../database/database');


async function nuevo(id_usuario, nombre, detalle, precio, id_categoria, claves) {
    let sql = `insert into productos(id_producto, nombre, detalle, precio, imagen, p_clave, estado, ventas) 
    values(:a, :b, :c, :d, :e, :f, :g, :h)`;

    //calcular id 
    const t1 = `select count(*) as x from productos`;
    const b = (await qq.run(t1, [], false)).rows;
    let ids = b[0].X;

    //crea producto
    await qq.run(sql, [ids + 1, nombre, detalle, precio, 'f', claves, 1, 0], true);


    //producto usuario
    let t2 = `insert into cliente_producto(id_producto_fk, id_usuario_fk) 
    values(:a, :b)`;
    await qq.run(t2, [ids + 1, id_usuario], true);

    //categoria producto
    let t3 = `insert into catogoria_producto(id_categoria_fk, id_producto_fk) values(:a, :b) `;
    await qq.run(t3, [id_categoria, ids + 1], true);

    return { mensaje: "hoalmudo" };
}


async function ver() {
    const sql = `select id_producto, usuarios.nombre as usuario, p.nombre as producto, c2.nombre as categoria, p.precio, p.detalle, p.p_clave from usuarios
    inner join cliente_producto cp on usuarios.id_usuario = cp.id_usuario_fk
    inner join productos p on p.id_producto = cp.id_producto_fk
    inner join catogoria_producto cp2 on p.id_producto = cp2.id_producto_fk
    inner join categorias c2 on c2.id_categoria = cp2.id_categoria_fk
    where estado = :a
    order by p.precio
    `;

    const res = (await qq.run(sql, [1], false)).rows;
    return res;
}


async function verUno(id) {
    const sql = `select id_producto,p_clave, usuarios.nombre as usuario,usuarios.apellido as apellido ,p.nombre as producto, 
    c2.nombre as categoria, p.precio, p.detalle, id_usuario from usuarios
    inner join cliente_producto cp on usuarios.id_usuario = cp.id_usuario_fk
    inner join productos p on p.id_producto = cp.id_producto_fk
    inner join catogoria_producto cp2 on p.id_producto = cp2.id_producto_fk
    inner join categorias c2 on c2.id_categoria = cp2.id_categoria_fk
    where id_producto = :a`;

    const res = (await qq.run(sql, [id], false)).rows[0];
    return res;
}

function likes() {

}

async function comments(id) {
    const sql = `select nombre, apellido, id_comentario, comentario, fecha from usuarios
    inner join comentario_producto cp on usuarios.id_usuario = cp.id_usuario_fk
    where id_producto_fk = :a
    order by id_comentario`;
    const res = (await qq.run(sql, [id], false)).rows;
    return res;
}


async function newComment(id_usuario, id_producto, comentario) {
    const sql = `insert into comentario_producto(id_comentario, id_producto_fk, id_usuario_fk, comentario, fecha)
    values(:a, :b, :c, :d, :e)`;


    const t1 = `select count(*) as x from comentario_producto`;
    const b = (await qq.run(t1, [], false)).rows;
    let id_comentario = b[0].X;
    id_comentario++;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;


    await qq.run(sql, [id_comentario, id_producto, id_usuario, comentario, today], true);

    let m1 = `select nombre, apellido, id_comentario, comentario, fecha from usuarios
    inner join comentario_producto cp on usuarios.id_usuario = cp.id_usuario_fk
    where id_producto_fk = :a and id_comentario= : b`;

    const res = (await qq.run(m1, [id_producto, id_comentario], false)).rows[0];
    return res;
}

async function newDen(id_usuario, id_producto, comentario) {
    const sql = `insert into denuncia_producto(id_denuncia_fk, id_producto_fk, id_usuario_fk, comentario, fecha)
    values(:a, :b, :c, :d, :e)`;


    const t1 = `select count(*) as x from denuncia_producto`;
    const b = (await qq.run(t1, [], false)).rows;
    let id_comentario = b[0].X;
    id_comentario++;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;


    await qq.run(sql, [id_comentario, id_producto, id_usuario, comentario, today], true);

    /*let m1 = `select nombre, apellido, id_comentario, comentario, fecha from usuarios
    inner join comentario_producto cp on usuarios.id_usuario = cp.id_usuario_fk
    where id_producto_fk = :a and id_comentario= : b`;

    const res = (await qq.run(m1, [id_producto, id_comentario], false)).rows[0];
    return res;*/
}

async function likesProd(id_producto) {
    const t1 = `select count(*) as likes from productos
    inner join like_producto lp on productos.id_producto = lp.id_producto_fk
    where tipo = 'L' and id_producto = :a`;

    const a = (await qq.run(t1, [id_producto], false)).rows[0].LIKES;

    const t2 = `select count(*) as dislikes from productos
    inner join like_producto lp on productos.id_producto = lp.id_producto_fk
    where tipo = 'D' and id_producto = :a`;

    const b = (await qq.run(t2, [id_producto], false)).rows[0].DISLIKES;



    let pinf = {
        likes: a,
        dislikes: b
    }

    return pinf;

}


async function d_like(id_usuario, id_producto) {

    const sql = `delete from like_producto where id_producto_fk=:a and id_usuario_fk = :b`;
    const a = await qq.run(sql, [+id_producto, +id_usuario], true);
    console.log(id_usuario, id_producto);
}

async function n_like(id_usuario, id_producto, tipo) {
    //console.log(id_usuario, id_producto, tipo);
    let e = Math.random() * 10000;
    const sql = `insert into like_producto(id_like ,id_producto_fk, id_usuario_fk, tipo) values(:a, :b, :c, :d)`;
    await qq.run(sql, [e, id_producto, id_usuario, tipo], true);
    return {e: 'doki'};
    
}


async function m_like(id_usuario, id_producto, tipo) {
    const sql = `update like_producto set tipo= :a where id_producto_fk=:b and id_usuario_fk = :c`;
    await qq.run(sql, [tipo, +id_producto, +id_usuario], true);
}

async function gu_like(id_usuario, id_producto){
    const sql = `select tipo from like_producto where id_usuario_fk = :a and id_producto_fk= :b`;
    const a = (await qq.run(sql, [+id_usuario,+id_producto], false)).rows;
    if(a.length == 0){
        return 0;
    }else{
        let e = a[0].TIPO;
        if(e=='L'){
            return 1;
        }else{
            return 2;
        }
    }

}

module.exports.nuevo = nuevo;
module.exports.ver = ver;
module.exports.verUno = verUno;
module.exports.comments = comments;
module.exports.newComment = newComment;
module.exports.newDen = newDen;
module.exports.likesProd = likesProd;
module.exports.d_like = d_like;
module.exports.n_like = n_like;
module.exports.m_like = m_like;
module.exports.gu_like = gu_like;