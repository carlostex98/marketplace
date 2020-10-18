const qq = require('../database/database');

async function requestUser(mailUs, passUs){
    let sql = `select tipo, id_usuario from usuarios  
    where correo = :us and contrasenia = :ps`;
    const res = await qq.run(sql, [mailUs, passUs], false);
    return res.rows;
}

function register(){
    
}


module.exports.requestUser = requestUser;