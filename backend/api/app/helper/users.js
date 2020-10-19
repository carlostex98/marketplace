const qq = require('../database/database');
const mail = require('../helper/mail');


async function requestUser(mailUs, passUs) {
    let sql = `select tipo, id_usuario from usuarios  
    where correo = :us and contrasenia = :ps`;
    const res = await qq.run(sql, [mailUs, passUs], false);
    return res.rows;
}

async function register(email, name, lname, country, nac, pss) {
    country = country.toUpperCase();
    const cnt = `select id_pais from paises where nombre_pais = :d`;
    const a = (await qq.run(cnt, [country], false)).rows;
    
    if (a.length == 0) {
        //crear pais
        const t1 = `select count(*) as x from paises`;
        const b = (await qq.run(t1, [], false)).rows;
        let idp = b[0].X;

        const t2 = `insert into paises(id_pais, nombre_pais) values(:a,:b)`;
        await qq.run(t2,[idp+1, country]);
    }


    //crear usuario

    const usr = `select count(*) as x from usuarios`;
    const b = (await qq.run(usr, [], false)).rows;
    let ids=b[0].X;


    const in_usr = `insert into usuarios(id_usuario, nombre, apellido, correo, nacimiento, ruta_foto, contrasenia, creditos, tipo)
    values (:a, :b, :c, :d, :f, :g, :h, :i, :j)`;
    await qq.run(in_usr, [ids+1, name, lname, email, nac, 'default.jpg', pss, 10000, 'B'], true);

    //enviar correo

    await mail.send(email, "debes activar blabla");

}


module.exports.requestUser = requestUser;
module.exports.register = register;