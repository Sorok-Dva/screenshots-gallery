import dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'
dotenv.config()

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST_DEV,
  port: 3306,
  username: process.env.DB_USER_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_DATABASE_DEV
  ,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../entities/**/*.ts'],
  migrations: ['orm/migrations/*.ts'],
  subscribers: ['orm/subscribers/*.ts'],
  cli: {
    entitiesDir: 'orm/entities',
    migrationsDir: 'orm/migrations',
    subscribersDir: 'orm/subscribers',
  },
}

export default config
