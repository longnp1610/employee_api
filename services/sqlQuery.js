const sql = require("mssql");
const { dbConfig } = require("../configs");

module.exports = async (sqlString) => {
  let pool = await sql.connect(dbConfig);
  let response = await pool.request().query(sqlString);
  return response;
};
