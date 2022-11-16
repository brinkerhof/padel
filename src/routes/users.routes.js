import { Router } from "express";

import UsersControllers from "../controllers/UsersController.js";

import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const usersRoutes = Router();

const usersController = new UsersControllers();

usersRoutes.get("/", ensureAuthenticated, usersController.index);
usersRoutes.get("/:id", ensureAuthenticated, usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

export default usersRoutes;
