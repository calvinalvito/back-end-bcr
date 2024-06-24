import { Model } from "objection";
import db from "../../db/db";

class Cars extends Model {
  static get tableName() {
    return "cars";
  }

  id!: number;
  name!: string;
  price!: string;
  picture!: string;
  start_rent!: Date;
  finish_rent!: Date;
  created_at!: Date;
  updated_at!: Date;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price", "start_rent", "finish_rent"],
      properties: {
        name: { type: "string", minLength: 1 },
        price: { type: "string"},
        picture: { type: "string" },
        start_rent: { type: "string", format: "date-time" },
        finish_rent: { type: "string", format: "date-time" }
      }
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

Cars.knex(db);
export default Cars;
