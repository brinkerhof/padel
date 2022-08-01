const knex = require("../database/knex");

const AppError = require("../utils/AppError");

class TournamentsController {
  async index(req, res, next) {
    const tournaments = await knex("tournaments");
    return res.json(tournaments);
  }

  async show(req, res, next) {
    const tournament_id = req.params.id;

    const tournament = await knex("tournaments")
      .where({ id: tournament_id })
      .first();

    if (!tournament) {
      throw new AppError("No tournament found");
    }

    return res.json(tournament);
  }

  async create(req, res, next) {
    const {
      title,
      tournament_start,
      tournament_end,
      court_time,
      court_time_infinite,
      duos_limit,
      duos_limit_infinite,
    } = req.body;

    if (court_time_infinite) {
      court_time = 0;
    }
    if (duos_limit_infinite) {
      duos_limit = 0;
    }

    await knex("tournaments").insert({
      title,
      tournament_start,
      tournament_end,
      court_time,
      court_time_infinite,
      duos_limit,
      duos_limit_infinite,
    });
    return res.json("Ta criado chefia");
  }

  async update(req, res, next) {
    const tournament_id = req.params.id;
    const {
      title,
      tournament_start,
      tournament_end,
      court_time,
      court_time_infinite,
      duos_limit,
      duos_limit_infinite,
    } = req.body;

    if (court_time_infinite) {
      court_time = 0;
    }
    if (duos_limit_infinite) {
      duos_limit = 0;
    }

    await knex("tournaments").where({ id: tournament_id }).update({
      title,
      tournament_start,
      tournament_end,
      court_time,
      court_time_infinite,
      duos_limit,
      duos_limit_infinite,
    });
  }

  async delete(req, res, next) {
    const tournament_id = req.params.id;

    const tournament = await knex("tournaments")
      .where({ id: tournament_id })
      .first();

    if (!tournament) {
      throw new AppError("No tournament found");
    }

    await knex("tournaments").where({ id: tournament_id }).del();

    return res.json("Success, tournament deleted");
  }
}

module.exports = TournamentsController;
