const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DuosController {
  async index(req, res, next) {
    const duos = await knex("duos");
    res.json({ duos });
  }
  async show(req, res, next) {
    const duo_id = req.params.id;

    const duo = await knex("duos").where({ id: duo_id }).first();

    if (!duo) {
      throw new AppError("Duo not found");
    }

    return res.json(duo);
  }
  async create(req, res, next) {}
  async update(req, res, next) {}
  async delete(req, res, next) {}
}

module.exports = DuosController;
