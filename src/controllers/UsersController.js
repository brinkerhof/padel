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

    if (!emailVerify(email)) {
      return res.json(AppError({ message: "Invalid email" }));
    }
    if (!phoneVerify(phone)) {
      return res.json(AppError({ message: "Invalid phone number" }));
    }
    if (!cpf.isValid(document) && !cnpj.isValid(document)) {
      return res.json(AppError({ message: "Invalid phone number" }));
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
  async update(req, res, next) {}
  async delete(req, res, next) {}
}

module.exports = UsersControllers;
