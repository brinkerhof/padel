const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const genderVerify = require("../utils/genderVerify");
const { cpf, cnpj } = require("cpf-cnpj-validator");

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
  async create(req, res, next) {
    const { document, gender, sum_ranking } = req.body;
    const user_id = req.user.id;

    const documentVerifyIfExists = await knex("users")
      .where({ document })
      .first();

    if (!genderVerify(gender)) {
      throw new AppError("Gender do not exists");
    }

    if (!cpf.isValid(document) && !cnpj.isValid(document)) {
      throw new AppError({ message: "Document is not valid" });
    }

    if (!!!documentVerifyIfExists) {
      throw new AppError({ message: "Document do not exists" });
    }

    const { id } = await knex("users")
      .where({ document: document })
      .select("id")
      .first();

    await knex("duos").insert({
      gender,
      sum_ranking,
      id_player_one: user_id,
      id_player_two: id,
    });

    return res.json("Deu certo fé");
  }
  async update(req, res, next) {}
  async delete(req, res, next) {}
}

module.exports = DuosController;
