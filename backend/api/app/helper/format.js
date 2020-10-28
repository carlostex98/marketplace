const qq = require('../database/database');

async function truncate (){
    

    await qq.run(`delete from carrito_usuario cascade`,[],true);
    await qq.run(`delete from catogoria_producto cascade`,[],true);
    await qq.run(`delete from cliente_producto cascade`,[],true);


    await qq.run(`delete from usuarios `,[],true);
    await qq.run(`delete from paises `,[],true);
    await qq.run(`delete from categorias `,[],true);
    await qq.run(`delete from carritos `,[],true);
    await qq.run(`delete from productos `,[],true);
    

}


module.exports.truncate = truncate;