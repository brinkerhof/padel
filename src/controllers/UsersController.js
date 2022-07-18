const knex = require("../database/knex");

const { cpf, cnpj } = require("cpf-cnpj-validator");
const AppError = require("../utils/AppError");
const emailVerify = require("../utils/emailVerify");
const phoneVerify = require("../utils/phoneVerify");

class UsersControllers {
  async index(req, res, next) {
    const users = await knex("users");

    return res.json({ users });
  }

  async show(req, res, next) {
    const user_id = req.params.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return res.json(user);
  }

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
    const { name, email, gender, birth_date, document, phone } = req.body;
    const user_id = req.user.id;

    const { password } = await knex("users")
      .where({ id: user_id })
      .select("password")
      .first();

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

    await knex("users").where({ id: user_id }).update({
      name,
      email,
      gender,
      birth_date,
      document,
      phone,
      password,
    });

    const userUpdated = await knex("users").where({ id: user_id }).first();

    return res.json(userUpdated);
  }

  async delete(req, res, next) {
    const user_id = req.params.id;

    const user = await knex("users").where({ id: user_id });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await knex("users").where({ id: user_id }).del();

    return res.json("Success, user deleted");
  }
}

module.exports = UsersControllers;
