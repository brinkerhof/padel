export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(
        knex.raw(
          "(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
        )
      );
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("gender").notNullable();
    table.string("password").notNullable();
    table.date("birth_date").notNullable();
    table.string("document").unique().notNullable();
    table.string("phone");
    table.boolean("isAdmin").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}
