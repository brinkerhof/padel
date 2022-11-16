import { Router } from "express";

import usersRoutes from "./users.routes.js";
import sessionsRoutes from "./sessions.routes.js";
import duosRoutes from "./duos.routes.js";
import bracketsRoutes from "./brackets.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/duos", duosRoutes);
routes.use("/brackets", bracketsRoutes);

export default routes;
