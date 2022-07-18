exports.up = (knex) =>
  knex.schema.createTable("duos", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(
        knex.raw(
          "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
        )
      );
    table
      .uuid("id_player_one")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .uuid("id_player_two")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("gender").notNullable();
    table.integer("sum_ranking").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("duos");
