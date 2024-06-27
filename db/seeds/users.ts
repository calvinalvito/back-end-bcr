import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").where('id', 1).del();

    // Inserts seed entries
    await knex("users").insert([
    ]);
};
