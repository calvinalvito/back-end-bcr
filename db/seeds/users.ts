import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { 
        id: 1, 
        username:"superadmin",
        password:"$2a$12$drXXhhAyl14uLeQcAYEy/e00yL94RnwFKMuraIX/Ym2MBVcdWciu6",
        email:"superadmin@gmail.com",
        role:"superadmin"
        }
    ]);
};
