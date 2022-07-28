const { Router } = require("express");

const TournamentsController = require("../controllers/TournamentsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tournamentsRoutes = Router();

const tournamentsController = new TournamentsController();

tournamentsRoutes("/", tournamentsController.create);

module.exports = tournamentsRoutes;
