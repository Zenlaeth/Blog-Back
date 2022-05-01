export const up = async (knex) => {
    await knex.schema.createTable("roles", (table) => {
        table.increments("id");
        table.varchar("label").notNullable();
    }).then(function () {
        return knex("roles").insert([
            {label: 'ROLE_READER'},
            {label: 'ROLE_AUTHOR'},
            {label: 'ROLE_ADMIN'},
        ]);
    });
};
export const down = async (knex) => {
    await knex.schema.dropTable("roles");
    await knex.schema.dropTable("comments");
    await knex.schema.dropTable("posts");
    await knex.schema.dropTable("users");
};
  