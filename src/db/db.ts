import { Pool } from "pg";

const dbConnOptions = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number.parseInt(process.env.DB_PORT, 10),
};

const dbConnPool = new Pool(dbConnOptions);

export { dbConnPool };
