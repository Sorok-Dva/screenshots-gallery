import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import config from './config/config'

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default async () => {
  try {
    return await createConnection()
  } catch(e) {
    throw new Error(e)
  }
}