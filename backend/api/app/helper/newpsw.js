const qq = require('../database/database');
var crc32 = require('crc32');
const mail = require('../helper/mail');
var md5 = require('md5');

async function enviarCorreo(mailx) {
    const sql = `select count(*) as x from usuarios where correo = :a`;
    let a = (await qq.run(sql, [mailx], false)).rows[0].X;

    if (a == 1) {
        //operar correo
        let body = `<h2>Recuperacion de contraseña</h2>
        <strong>Codigo: ${crc32(mailx, true)}</strong>`;
        try {
            await mail.send(mailx, body);
        } catch (error) {
            console.log(error);
        }
        //console.log('yes');
    }
    return { e: 'doki' };
}

async function modifx(mail, hs, ps){
    if(crc32(mail) == hs){
        const sql = `update usuarios set contrasenia = :a where correo = :b`;
        await qq.run(sql, [md5(ps), mail], true);
    }
    return { e: 'doki' };
}

module.exports.enviarCorreo = enviarCorreo;
module.exports.modifx = modifx;