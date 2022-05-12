const { v4: uuidv4 } = require("uuid");
const sqlQuery = require("../services/sqlQuery");
const Employee = require("../models/Employee");

exports.getAll = async (req, res) => {
  const { id } = req.query;
  const response = await sqlQuery(
    `SELECT * FROM employee
    ${id && `WHERE employee.id = '${id}'`}`
  );
  console.log(response);
  if (response.isSuccess) {
    res.status(200).json(response.recordset);
  } else {
    res.status(400).send({ message: "No data in database." });
  }
};

exports.getById = async (req, res) => {
  const response = await sqlQuery(
    `SELECT * FROM employee WHERE id = '${req.params.id}'`
  );
  console.log(response);
  if (response.isSuccess) {
    res.status(200).json(response.recordset);
  } else {
    res.status(400).send({ message: "No data in database." });
  }
};

exports.create = async (req, res) => {
  const id = uuidv4();
  const { name, gender, address, salary } = req.body;

  const response = await sqlQuery(
    `INSERT INTO employee (id, name, gender, address, salary)
        VALUES ('${id}', '${name}', '${gender}', '${address}', ${salary})`
  );
  console.log(response);
  if (response.isSuccess) {
    res.status(201).send({ message: "User created successful!!" });
  } else {
    res.status(400).send({ error: response.error });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const { name, address, salary } = req.body;
  const user = await sqlQuery(`SELECT * FROM employee WHERE id = '${id}'`);
  if (!user.recordset) {
    res.status(400).send({ message: "User not found !!" });
    return;
  }

  const employee = new Employee(
    user.recordset[0].name,
    user.recordset[0].gender,
    user.recordset[0].address,
    user.recordset[0].salary
  );

  const response = await sqlQuery(
    `UPDATE employee SET name = '${name || employee.name}', gender = '${
      employee.gender
    }', address = '${address || employee.address}', salary = ${
      salary || employee.salary
    } WHERE id = '${id}'`
  );
  console.log(response);
  if (response.isSuccess) {
    res.status(201).send({ message: "User updated successful!!" });
  } else {
    res.status(400).send({ error: response.error });
  }
};

exports.delete = async (req, res) => {
  const response = await sqlQuery(
    `DELETE FROM employee WHERE id = '${req.params.id}'`
  );

  if (response.isSuccess) {
    res.status(200).json({ message: "User deleted successful." });
  } else {
    res.status(400).send({ message: "User not exist." });
  }
};
