exports.up = (knex) =>
  knex.schema.createTable("tournaments", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(
        knex.raw(
          "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
        )
      );
    table.string("title");
    table
      .uuid("id_historic")
      .references("id")
      .inTable("historical")
      .onDelete("CASCADE");
    table.datetime("tournament_start");
    table.datetime("tournament_end");
    table.integer("court_time");
    table.boolean("court_time_infinite").notNullable();
    table.integer("duos_limit");
    table.boolean("duos_limit_infinite").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("tournaments");
