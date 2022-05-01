export const up = async (knex) => {
await knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.varchar("title").notNullable();
    table.string("content", 1000);
    table.datetime("createdAt").defaultTo(knex.fn.now());
    table.boolean("isPublished").notNullable();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("id").inTable("users");
});
};

export const down = async (knex) => {
await knex.schema.dropTable("posts");
await knex.schema.dropTable("users");
};
  