const express = require("express");
const app = express();
const cors = require("cors");
const sql = require("mssql");
const { dbConfig } = require("./configs");
const appPool = new sql.ConnectionPool(dbConfig);

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

appPool
  .connect()
  .then(() => {
    console.log("Connected to SQLServer...");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server in running on ${PORT}`));
  })
  .catch((err) => console.log("Database Connection Failed", err));

const employeeRoute = require("./routes/employee.route");
employeeRoute(app);
