const qq = require('../database/database');
const mail = require('../helper/mail');
var md5 = require('md5');


async function requestUser(mailUs, passUs) {
    let sql = `select tipo, id_usuario from usuarios  
    where correo = :us and contrasenia = :ps`;
    const res = await qq.run(sql, [mailUs, passUs], false);
    return res.rows;
}

async function register(email, name, lname, country, nac, pss) {

    if ((await exists()) > 0) {
        return 'usr_exists';
    }
    let n = 0;

    country = country.toUpperCase();
    const cnt = `select id_pais from paises where nombre_pais = :d`;
    const a = (await qq.run(cnt, [country], false)).rows;

    if (a.length == 0) {
        //crear pais
        const t1 = `select count(*) as x from paises`;
        const b = (await qq.run(t1, [], false)).rows;
        let idp = b[0].X;
        n = idp;
        const t2 = `insert into paises(id_pais, nombre_pais) values(:a,:b)`;
        await qq.run(t2, [idp + 1, country], true);
    }


    //crear usuario

    const usr = `select count(*) as x from usuarios`;
    const b = (await qq.run(usr, [], false)).rows;
    let ids = b[0].X;


    const in_usr = `insert into usuarios(id_usuario, nombre, apellido, correo, nacimiento, ruta_foto, contrasenia, creditos, tipo)
    values (:a, :b, :c, :d, :f, :g, :h, :i, :j)`;
    await qq.run(in_usr, [ids + 1, name, lname, email, nac, 'default.jpg', pss, 10000, 'C'], true);


    //crea carrito
    const t2 = `select count(*) as x from carritos`;
    const t3 = (await qq.run(t2, [], false)).rows;
    const t4 = ` insert into carritos(id_carrito, smt) values(:a, :b)`;
    const t5 = `insert into carrito_usuario(id_carrito_fk, id_usuario_fk) values(:a, :b)`;
    let idc = t3[0].X;
    await qq.run(t4, [idc + 1, 'blabla'], true);//crea carrito
    await qq.run(t5, [idc + 1, ids + 1], true);//crea la relacion carrito usuario

    //pais usuario
    const t10 = `insert into pais_usuario(id_usuario_fk, id_pais_fk) values(:a, :b)`;
    await qq.run(t10, [ids + 1, n + 1], true);


    //enviar correo
    /*let cod = md5(email);
    let body = `<h1>Codigo de activacion de cuenta</h1>
    <br>
    <strong>${cod}</strong>`;
    try {
        await mail.send(email, body);
    } catch (error) {
        console.log(error);
    }*/

    return 'usr_create';

}

async function exists(email) {
    let sql = `select count(*) as xc from usuarios  
    where correo = :us`;
    const res = (await qq.run(sql, [email], false)).rows;

    return res[0].XC;
}


async function confirmar(hash, mail) {
    let mailh = md5(mail);
    if (mailh == hash) {
        //modificamos

        let sql = ` update usuarios set tipo = :p where correo = :s `;
        await qq.run(sql, ['C', mail], true);
    }

}


async function listar() {
    const sql = `select nombre, apellido, correo, creditos from usuarios where tipo = :a`;
    const a = (await qq.run(sql, ['C'], false)).rows;
    return a;
}

async function getuser(id) {
    const sql = `select * from usuarios where tipo = :a and id_usuario = :f`;
    const a = (await qq.run(sql, ['C', id], false)).rows;
    return a[0];
}

async function editUserInfo(email, name, lname, country, nac) {
    const sql = `update usuarios set nombre = :a, apellido = :b, nacimiento = :d 
    where correo = :ff `;
    let data = [name, lname, nac, email];
    await qq.run(sql, data, true);
    return { dato:"hola mundo" };
}

async function editUserPass(email, pass) {
    const sql = `update usuarios set contrasenia = :a where correo = :b`;
    let data = [pass, email];
    await qq.run(sql, data, true);

}


module.exports.requestUser = requestUser;
module.exports.register = register;
module.exports.confirmar = confirmar;
module.exports.listar = listar;
module.exports.editUserInfo = editUserInfo;
module.exports.editUserPass = editUserPass;
module.exports.getuser = getuser;