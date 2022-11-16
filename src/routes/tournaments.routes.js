import { Router } from "express";

import TournamentsController from "../controllers/TournamentsController.js";

import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const tournamentsRoutes = Router();

const tournamentsController = new TournamentsController();

tournamentsRoutes("/", tournamentsController.index);
tournamentsRoutes("/:id", ensureAuthenticated, tournamentsController.show);
tournamentsRoutes("/", ensureAuthenticated, tournamentsController.create);
tournamentsRoutes("/:id", ensureAuthenticated, tournamentsController.update);
tournamentsRoutes("/:id", ensureAuthenticated, tournamentsController.delete);

export default tournamentsRoutes;
