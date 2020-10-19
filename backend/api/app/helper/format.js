const qq = require('../database/database');

async function truncate (){
    
    await qq.run(`delete from usuarios cascade`,[],true);
    await qq.run(`delete from paises cascade`,[],true);
}


module.exports.truncate = truncate;