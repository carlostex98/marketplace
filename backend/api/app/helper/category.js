const qq = require('../database/database');

async function crear(cat){
    const sql = `insert into categorias(id_categoria, nombre) values(:id, :cat)`;

    const cnt = `select id_categoria from categorias where nombre = :d`;
    const a = (await qq.run(cnt, [cat], false)).rows;
    if(a.length>0){
        //nada bro
        return ['no', 0];
    }else{
        const t1 = `select count(*) as x from categorias`;
        const b = (await qq.run(t1, [], false)).rows;
        let idp = b[0].X;
        await qq.run(sql, [idp+1, cat], true);
        return ['yes', idp+1];
    }    
}

async function ver(){
    const sql = `select * from categorias`;
    const e = (await qq.run(sql, [], false)).rows;
    return e;
}


module.exports.crear = crear;
module.exports.ver = ver;