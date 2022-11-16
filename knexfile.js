import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const development = {
  client: "sqlite3",
  connection: {
    filename: resolve(__dirname, "src", "database", "database.db"),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys=ON", cb),
  },
  migrations: {
    directory: resolve(__dirname, "src", "database", "knex", "migrations"),
  },
  useNullAsDefault: true,
};
