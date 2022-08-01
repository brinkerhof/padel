const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const duosRoutes = require("./duos.routes");
const bracketsRoutes = require("./brackets.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/duos", duosRoutes);
routes.use("/brackets", bracketsRoutes);

module.exports = routes;
