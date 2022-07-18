const knex = require("../database/knex");

const { cpf, cnpj } = require("cpf-cnpj-validator");
const AppError = require("../utils/AppError");
const emailVerify = require("../utils/emailVerify");
const phoneVerify = require("../utils/phoneVerify");

class UsersControllers {
  async index(req, res, next) {}

  async show(req, res, next) {}

  async create(req, res, next) {
    const { name, email, gender, password, birth_date, document, phone } =
      req.body;
    9;
    const emailVerifyIfExists = await knex("users").where({ email }).first();

    const documentVerifyIfExists = await knex("users")
      .where({ document })
      .first();

    if (!!emailVerifyIfExists) {
      throw new AppError({ message: "Email already exists" });
    }
    if (!cpf.isValid(document) && !cnpj.isValid(document)) {
      throw new AppError({ message: "Document is not valid" });
    }
    if (!!documentVerifyIfExists) {
      throw new AppError({ message: "Document already exists" });
    }
    if (!emailVerify(email)) {
      throw new AppError({ message: "Email is not valid" });
    }
    if (!phoneVerify(phone)) {
      throw new AppError({ message: "Phone is not valid" });
    }

    await knex("users").insert({
      name,
      email,
      gender,
      password,
      birth_date,
      document,
      phone,
    });

    return res.json("Deu certo fé ");
  }

  async update(req, res, next) {
    return res.json(req.user.id);
  }

  async delete(req, res, next) {}
}

module.exports = UsersControllers;
