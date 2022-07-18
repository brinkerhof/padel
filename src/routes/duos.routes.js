const { Router } = require("express");

const DuosControllers = require("../controllers/DuosController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const duosRoutes = Router();

const duosController = new DuosControllers();

duosRoutes.get("/", ensureAuthenticated, duosController.index);
duosRoutes.get("/:id", ensureAuthenticated, duosController.show);
duosRoutes.post("/", ensureAuthenticated, duosController.create);
duosRoutes.put("/ïd", ensureAuthenticated, duosController.update);
duosRoutes.delete("/", ensureAuthenticated, duosController.delete);

module.exports = duosRoutes;
