import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("car_logs", (table) => {
        table.increments("id").primary();
        table.string("activity_type").notNullable();
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.integer("car_id").unsigned().references("id").inTable("cars");
        table.timestamp("activity_time").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("car_logs");
}
