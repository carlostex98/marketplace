const oracledb = require('oracledb');

const { llaves } = require('../../keys');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;



async function run(queryx) {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : 'system',
      password      : 'oracle',
      connectString : "localhost:49161"
    });

    const result = await connection.execute(
      queryx
    );
    return result;

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports.run = run;
