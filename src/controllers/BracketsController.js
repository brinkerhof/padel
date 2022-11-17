import knex from "../database/knex/index.js";

import AppError from "../utils/AppError.js";

class BracketsController {
  async index(req, res, next) {}
  async show(req, res, next) {}
  async create(req, res, next) {}
  async update(req, res, next) {}
  async delete(req, res, next) {}
}

export default BracketsController;

/**
 * Logica para criar brackets
 *
 * EU preciso pegar o id das duplas inscritas no torneio
 * pegar o sum ranking de cada dupla e começar a montar as chaves
 * percebendo q a logica de criançao de cada bracket é aqui
 *
 * mas a geracao delas é em caregories_tournaments
 *
 * aqui fica a logica de montar uma chave digamos a chave A com 3 duplas
 * la fica a logica de quantas chaves vao ter q existir para tal torneio
 * baseado no numero de duplas que existem.
 *
 * aqui obviamente é gerada as partidas e em partidas ficam as quadras onde cada um vai
 * jogar
 *
 * Basicamente chaves é uma query que busca todas as duplas que estão inscritas em tal torneio em tal categoria
 * usa da logica de comparar o sum_ranking das duplas para montar as chaves
 *
 * ex : ela monta a chave A, monta a chave B, monta a chave C
 * e ai categorias_torneio junta todas as chaves da 5 categoria
 *
 * essa montagem de chaves é um botão que a pessoa clica para montar chaves se ela for o administrador do torneio ou
 * a montagem acontece quando acabar a validade de inscriçao
 *
 * cada chave montada tem 3 partidas
 *
 * mas a logica de onde vai ser a partida e em que momento acontece na tabela Partida
 *
 * onde ela puxa de chaves quem vai jogar contra quem, ve uma quadra disponivel e ve um horario disponivel
 *
 * uma quadra so pode ser usada por uma partida em um certo horario
 */
