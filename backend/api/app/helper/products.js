const qq = require('../database/database');


async function nuevo(id_usuario, nombre, detalle, precio, id_categoria){
    let sql = `insert into productos(id_producto, nombre, detalle, precio, imagen) 
    values(:a, :b, :c, :d, :e)`;

    //calcular id 
    const t1 = `select count(*) as x from productos`;
    const b = (await qq.run(t1, [], false)).rows;
    let ids = b[0].X;

    //crea producto
    await qq.run(sql, [ids+1,nombre, detalle, precio, 'f'], true);


    //producto usuario
    let t2 = `insert into cliente_producto(id_producto_fk, id_usuario_fk) 
    values(:a, :b)`;
    await qq.run(t2, [ids+1, id_usuario], true);

    //categoria producto
    let t3 = `insert into catogoria_producto(id_categoria_fk, id_producto_fk) values(:a, :b) `;
    await qq.run(t3, [id_categoria, ids+1], true);

    return{mensaje:"hoalmudo"};
}


async function ver(){
    const sql = `select usuarios.nombre as usuario, p.nombre as producto, c2.nombre as categoria, p.precio, p.detalle from usuarios
    inner join cliente_producto cp on usuarios.id_usuario = cp.id_usuario_fk
    inner join productos p on p.id_producto = cp.id_producto_fk
    inner join catogoria_producto cp2 on p.id_producto = cp2.id_producto_fk
    inner join categorias c2 on c2.id_categoria = cp2.id_categoria_fk`;

    const res = (await qq.run(sql, [], false)).rows;
    return res;
}


module.exports.nuevo = nuevo;
module.exports.ver = ver;