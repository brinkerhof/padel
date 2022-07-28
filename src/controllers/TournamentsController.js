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
  }

  async update(req, res, next) {}

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
