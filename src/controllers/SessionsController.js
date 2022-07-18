const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsControllers {
  async create(req, res, next) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();
    const user_id = user.id;

    if (!user) {
      throw new AppError("Email or password is incorrect", 401);
    }

    if (!(password == user.password)) {
      throw new AppError("Email or password is incorrect", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ user_id }, secret, {
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionsControllers;
