const { Router } = require("express");

const SessionsControllers = require("../controllers/SessionsController");

const sessionRoutes = Router();

const sessionsController = new SessionsControllers();

sessionRoutes.post("/", sessionsController.create);

module.exports = sessionRoutes;
