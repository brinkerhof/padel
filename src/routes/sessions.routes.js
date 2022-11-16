import { Router } from "express";

import SessionsControllers from "../controllers/SessionsController.js";

const sessionRoutes = Router();

const sessionsController = new SessionsControllers();

sessionRoutes.post("/", sessionsController.create);

export default sessionRoutes;
