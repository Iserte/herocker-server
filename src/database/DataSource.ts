import { DataSource } from "typeorm";
import { resolve } from "path";

export default new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [resolve(__dirname, "..", "app", "models", "*.ts"), resolve(__dirname, "..", "app", "models", "*.js")],
  migrations: [resolve(__dirname, "migrations", "*.ts"), resolve(__dirname, "migrations", "*.js")],
  logging: true,
  synchronize: true
});
