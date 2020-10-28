const oracledb = require('oracledb');
//const { options } = require('../routes/index_route');
oracledb.fetchAsString = [ oracledb.CLOB ];
cns = {
  user: "system",
  password: "oracle",
  connectString: "localhost:49161",
  sid: 'xe'
}



async function run(queryx, binds, aut) {
  try {
    options = {
      autoCommit: aut
    };
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(queryx,binds, options);
    cnn.release();
    return result;
  } catch (error) {
    console.log(error);
  }


}

module.exports.run = run;
