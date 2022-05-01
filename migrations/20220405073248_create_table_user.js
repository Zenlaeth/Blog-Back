export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.varchar("email").notNullable().unique();
    table.text("firstName");
    table.text("lastName");
    table.text("passwordHash").notNullable();
    table.text("passwordSalt").notNullable();
    table.boolean("activated");
    table.integer("role_id").unsigned();
    table.foreign("role_id").references("id").inTable("roles");
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("users");
};
