import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import { jwt } from "../configs/auth.js";
import sign from "jsonwebtoken";

class SessionsControllers {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();
    const user_id = user.id;

    if (!user) {
      throw new AppError("Email or password is incorrect", 401);
    }

    if (!(password == user.password)) {
      throw new AppError("Email or password is incorrect", 401);
    }

    const { secret, expiresIn } = jwt;
    const token = sign({ user_id }, secret, {
      expiresIn,
    });

    return res.json({ user, token });
  }
}

export default SessionsControllers;
