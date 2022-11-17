import knex from "../database/knex/index.js";

import AppError from "../utils/AppError.js";

class TournamentsController {
  async index(_req, res) {
    const tournaments = await knex("tournaments");
    return res.json(tournaments);
  }

  async show(req, res) {
    const tournament_id = req.params.id;

    const tournament = await knex("tournaments")
      .where({ id: tournament_id })
      .first();

    if (!tournament) {
      throw new AppError("No tournament found");
    }

    return res.json(tournament);
  }

  async create(req, res) {
    const {
      title,
      tournament_start,
      tournament_end,
      court_time,
      court_time_infinite,
      duos_limit,
      duos_limit_infinite,
      courts,
    } = req.body;

    if (court_time_infinite) {
      // eslint-disable-next-line no-const-assign
      court_time = 0;
    }
    if (duos_limit_infinite) {
      // eslint-disable-next-line no-const-assign
      duos_limit = 0;
    }

    const allCategories = await knex("categories");

    await knex("tournaments").insert({
      title,
      tournament_start,
      tournament_end,
      court_time,
      court_time_infinite,
      duos_limit,
      duos_limit_infinite,
    });

    const { id } = await knex("tournaments").where({ title }).first();

    allCategories.map(async ({ id: id_category, gender }) => {
      await knex("categories_tournaments").insert({
        id_tournament: id,
        id_category,
        gender,
      });
    });

    courts.map(async (name) => {
      await knex("courts").insert({ id_tournament: id, name: name });
    });

    return res.json("Ta criado chefia");
  }

  async update(req, res) {
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
      // eslint-disable-next-line no-const-assign
      court_time = 0;
    }
    if (duos_limit_infinite) {
      // eslint-disable-next-line no-const-assign
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
    return res.json("Tournament updated_at");
  }

  async delete(req, res) {
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

export default TournamentsController;
