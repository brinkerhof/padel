exports.up = (knex) =>
  knex.schema.createTable("brackets", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(
        knex.raw(
          "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
        )
      );
    table.string("gender");
    table
      .uuid("id_tournament_category")
      .references("id")
      .inTable("categories_tournaments")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("brackets");
