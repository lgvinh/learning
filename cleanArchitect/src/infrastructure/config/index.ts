import * as entities from "../entity";
import { ConnectionOptions } from 'typeorm';

const getConfig = () => Object.values(entities);

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const config: ConnectionOptions = {
  type: "postgres",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 5432,
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "postgres",
  database: DB_NAME || "carrot",
  synchronize: false,
  logging: false,
  migrationsRun: false,
  migrations: [
    "dist/domain/migration/**/*.js"
  ],
  entities: getConfig(),
  cli: {
    entitiesDir: "src/infrastructure/entity",
    migrationsDir: "src/domain/migration",
  }
};

export = config;
