exports.up = (knex) =>
  knex.schema.createTable("categories", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(
        knex.raw(
          "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
        )
      );
    table.string("name");
  });

exports.down = (knex) => knex.schema.dropTable("categories");
