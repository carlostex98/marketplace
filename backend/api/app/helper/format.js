const qq = require('../database/database');

async function truncate (){
    

    await qq.run(`delete from carrito_usuario cascade`,[],true);
    await qq.run(`delete from catogoria_producto cascade`,[],true);
    await qq.run(`delete from cliente_producto cascade`,[],true);
    await qq.run(`delete from pais_usuario cascade`,[],true);

    await qq.run(`delete from like_producto cascade`,[],true);
    await qq.run(`delete from producto_carrito cascade`,[],true);

    await qq.run(`delete from denuncia_producto cascade`,[],true);

    await qq.run(`delete from comentario_producto cascade`,[],true);

    await qq.run(`delete from usuarios `,[],true);
    await qq.run(`delete from paises `,[],true);
    await qq.run(`delete from categorias `,[],true);
    await qq.run(`delete from carritos `,[],true);
    await qq.run(`delete from productos `,[],true);
    await qq.run(`delete from bitacora`,[],true);
    await qq.run(`delete from chat`,[],true);
    

}


module.exports.truncate = truncate;