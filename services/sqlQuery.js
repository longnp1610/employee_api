const sql = require("mssql");
const { dbConfig } = require("../configs");

module.exports = async (sqlString) => {
  try {
    const pool = await sql.connect(dbConfig);
    const response = await pool.request().query(sqlString);
    if (response.rowsAffected[0]) {
      return {
        isSuccess: true,
        recordset: response.recordset || []
      };
    }
    return {
      isSuccess: false
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: error.message
    };
  }
};
