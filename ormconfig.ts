import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'cryptoapp',

  port: 5432,
  username: 'postgres',
  password: 'rita20',

  entities: [
    'dist/src/**/*.entity{.ts,.js}'
  ],
  synchronize: false,
  migrations: [
    "dist/src/db/migrations/*.js"
  ],
  cli: {
    migrationsDir: 'src/db/migrations'
  },
  // url: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false }
}
export default config;