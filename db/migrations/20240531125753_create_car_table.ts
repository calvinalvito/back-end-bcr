import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('cars', function(table) {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('price').notNullable();
        table.text('picture').notNullable();
        table.timestamp('start_rent').notNullable();
        table.timestamp('finish_rent').notNullable();
        table.timestamp('created_at').nullable();
        table.timestamp('updated_at').nullable();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      });
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('cars');
}

