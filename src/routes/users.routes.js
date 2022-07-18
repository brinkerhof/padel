const { Router } = require("express");

const UsersControllers = require("../controllers/UsersController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersControllers();

usersRoutes.get("/", ensureAuthenticated, usersController.index);
usersRoutes.get("/:id", ensureAuthenticated, usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

module.exports = usersRoutes;
