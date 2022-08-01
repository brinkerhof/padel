const { Router } = require("express");

const BracketsController = require("../controllers/BracketsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const bracketsRoutes = Router();

const bracketsController = new BracketsController();

module.exports = bracketsRoutes;
