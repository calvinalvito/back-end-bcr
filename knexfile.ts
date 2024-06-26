import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.DB_TEST_HOST || process.env.DB_HOST,
      user: process.env.DB_TEST_USER || process.env.DB_USER,
      password: process.env.DB_TEST_PASSWORD || process.env.DB_PASSWORD,
      database: process.env.DB_TEST_DATABASE || process.env.DB_DATABASE,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  // Tambahkan konfigurasi untuk environment lain seperti 'production', 'staging', dll.
};

export default knexConfig;
