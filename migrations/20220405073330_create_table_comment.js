export const up = async (knex) => {
await knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.string("content", 250);
    table.datetime("createdAt").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("id").inTable("users");
    table.integer("post_id").unsigned();
    table.foreign("post_id").references("id").inTable("posts");
});
};

export const down = async (knex) => {
await knex.schema.dropTable("comments");
await knex.schema.dropTable("posts");
await knex.schema.dropTable("users");
};
  