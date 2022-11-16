export function up(knex) {
  return knex.schema.createTable("matches", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(
        knex.raw(
          "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
        )
      );
    table
      .uuid("id_duo_one")
      .references("id")
      .inTable("duos")
      .onDelete("CASCADE");
    table
      .uuid("id_duo_two")
      .references("id")
      .inTable("duos")
      .onDelete("CASCADE");
    table
      .uuid("id_court")
      .references("id")
      .inTable("courts")
      .onDelete("CASCADE");
    table.datetime("match_start");
    table.integer("duo_one_points");
    table.integer("duo_two_points");
    table.string("result");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("matches");
}
