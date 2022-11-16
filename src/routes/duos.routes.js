import { Router } from "express";

import DuosControllers from "../controllers/DuosController.js";

import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const duosRoutes = Router();

const duosController = new DuosControllers();

duosRoutes.get("/", ensureAuthenticated, duosController.index);
duosRoutes.get("/:id", ensureAuthenticated, duosController.show);
duosRoutes.post("/", ensureAuthenticated, duosController.create);
//duosRoutes.put("/id", ensureAuthenticated, duosController.update);
duosRoutes.delete("/", ensureAuthenticated, duosController.delete);

export default duosRoutes;
