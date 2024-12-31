import dotenv from "dotenv";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/MainSeeder";

const env = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${env}`),
});
console.log("---------------------------------------",env);
const baseConfig: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [`${__dirname}/../entities/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  seeds: [MainSeeder],
};

const configs: { [key: string]: DataSourceOptions & SeederOptions } = {
  development: {
    ...baseConfig,
    logging: true,
  },
  test: {
    ...baseConfig,
    logging: false,
  },
  production: {
    ...baseConfig,
    logging: false,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const AppDataSource = new DataSource(configs[env]);
