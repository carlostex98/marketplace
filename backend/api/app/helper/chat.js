const qq = require('../database/database');

/**
 * 
 * 
 * si yo soy el cliente soy el emisor
 * 
 * si reviso el chat con mis clientes yo soy el receptor
 * 
 */


async function crearChat(id_usuario, id_vendedor){
    //chechea si existe
    const t1 = `select count(*) as x from conversacion where id_emisor_fk = :a and id_receptor_fk = :b`;
    let a = (await qq.run(t1, [id_usuario, id_vendedor], false)).rows[0].X;
    if(a==0){
        //inserta
        const t2 = `select count(*) as x from conversacion`;
        let b = (await qq.run(t2, [], false)).rows[0].X;

        const t3 = `insert into conversacion(id_cons, id_emisor_fk, id_receptor_fk)
        values(:a, :b, :c)`;

        await qq.run(t3, [b+1,id_usuario, id_vendedor], true);
    }
    return { e: 'doki' };
}

async function listarChatsCliente(id_usuario){
    const sql = `select id_cons, u.nombre, u.apellido from conversacion
    inner join usuarios u on u.id_usuario = conversacion.id_receptor_fk
    inner join usuarios u2 on u2.id_usuario = conversacion.id_emisor_fk
    where u2.id_usuario = :a`;

    let a = (await qq.run(sql, [id_usuario], true)).rows;
     
    return a;
}

async function listarChatsVendedor(id_usuario){
    const sql = `select id_cons, u.nombre, u.apellido from conversacion
    inner join usuarios u on u.id_usuario = conversacion.id_emisor_fk
    inner join usuarios u2 on u2.id_usuario = conversacion.id_receptor_fk
    where u2.id_usuario = :a`;

    let a = (await qq.run(sql, [id_usuario], true)).rows;
     
    return a;
}

module.exports.crearChat = crearChat;
module.exports.listarChatsCliente = listarChatsCliente;
module.exports.listarChatsVendedor = listarChatsVendedor;