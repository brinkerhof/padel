exports.up = (knex) =>
  knex.schema.createTable("courts", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(
        knex.raw(
          "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
        )
      );
    table.string("name");
    table
      .uuid("id_tournament")
      .references("id")
      .inTable("tournaments")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("courts");
