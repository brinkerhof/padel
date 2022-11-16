import { development } from "../../../knexfile.js";

import Knex from "knex";

const knex = Knex(development);

export default knex;
