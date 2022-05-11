const { v4: uuidv4 } = require("uuid");
const sqlQuery = require("../services/sqlQuery");

exports.getAll = async (req, res) => {
  let response = await sqlQuery(
    `SELECT * FROM employee
    ${req.query.id && `WHERE employee.id = '${req.query.id}'`}`
  );
  console.log(response);
  if (response.rowsAffected[0]) res.status(200).json(response.recordset);
  else res.status(404).send({ message: "No data in database" });
};

exports.getById = async (req, res) => {
  let response = await sqlQuery(
    `SELECT * FROM employee WHERE id = '${req.params.id}'`
  );
  console.log(response);
  if (response.rowsAffected[0]) res.status(200).json(response.recordset);
  else res.status(404).send({ message: "No data in database" });
};

exports.create = async (req, res) => {
  let _id = uuidv4();
  const { name, gender, address, salary } = req.body;

  let response = await sqlQuery(
    `INSERT INTO employee (id, name, gender, address, salary)
        VALUES ('${_id}', '${name}', '${gender}', '${address}', ${salary})`
  );
  console.log(response);
  if (response.rowsAffected[0])
    res.status(200).send({ message: "User created !!" });
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const { name, address, salary } = req.body;
  let user = await sqlQuery(`SELECT * FROM employee WHERE id = '${id}'`);
  if (!user.recordset) {
    res.status(404).send({ message: "User not found !!" });
    return;
  }

  let user_name = user.recordset[0].name;
  let user_gender = user.recordset[0].gender;
  let user_address = user.recordset[0].address;
  let user_salary = user.recordset[0].salary;

  let response = await sqlQuery(
    `UPDATE employee SET name = '${
      name ? name : user_name
    }', gender = '${user_gender}', address = '${
      address ? address : user_address
    }', salary = ${salary ? salary : user_salary} WHERE id = '${req.params.id}'`
  );
  if (response.rowsAffected[0])
    res.status(200).send({ message: "User updated !!" });
};

exports.delete = async (req, res) => {
  let response = await sqlQuery(
    `DELETE FROM employee WHERE id = '${req.params.id}'`
  );

  if (response.rowsAffected[0])
    res.status(200).json({ message: "User deleted successful." });
  else res.status(404).send({ message: "User not exist." });
};
