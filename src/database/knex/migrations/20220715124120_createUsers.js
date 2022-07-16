exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
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
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("users");
