const qq = require('../database/database');

async function inBit(id_usuario, texto){
    const sql = `insert into bitacora(id_bitacora, id_usuario_fk, asunto, fecha)
    values(:a, :b, :c, :d)`;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const t1 =  `select count(*) as x from bitacora`;
    const a1 = (await qq.run(t1, [], false)).rows[0].X;

    await qq.run(sql, [a1+1, id_usuario, texto, today], true);
}


async function listar(){
    const sql  = `select nombre, apellido, correo, fecha, asunto from bitacora
    inner join usuarios u on u.id_usuario = bitacora.id_usuario_fk 
    order by  id_bitacora `;
    let a = (await qq.run(sql, [], false)).rows;
    return a;
}


module.exports.inBit = inBit;
module.exports.listar = listar;