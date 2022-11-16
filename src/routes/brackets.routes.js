import { Router } from "express";

import BracketsController from "../controllers/BracketsController.js";

import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const bracketsRoutes = Router();

const bracketsController = new BracketsController();

export default bracketsRoutes;
