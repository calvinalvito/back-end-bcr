import { Model } from 'objection';
import db from '../../db/db';


class Users extends Model {
  static get tableName() {
    return 'users';
  }

  id!: number;
  username!: string;
  password!: string;
  email!: string;
  role!: string;
  created_at!: Date;
  updated_at!: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password', 'email'],

      properties: {
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        role: { type: 'string', enum: ['member', 'admin'], default: 'member' },
      },
    };
  }
}

Users.knex(db);
export default Users;
