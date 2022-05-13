const employeeController = require("../controllers/employee.controller");

module.exports = (app) => {
  app.get("/api/employee", employeeController.getAll);
  app.get("/api/employee/:id", employeeController.getById);
  app.post("/api/employee/create", employeeController.create);
  app.put("/api/employee/edit/:id", employeeController.edit);
  app.delete("/api/employee/delete/:id", employeeController.delete);
};
