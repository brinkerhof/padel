export function up(knex) {
  return knex.schema.createTable("categories_tournaments", (table) => {
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
      .uuid("id_category")
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table
      .uuid("id_tournament")
      .references("id")
      .inTable("tournaments")
      .onDelete("CASCADE");
  });
}

export function down(knex) {
  return knex.schema.dropTable("categories_tournaments");
}
