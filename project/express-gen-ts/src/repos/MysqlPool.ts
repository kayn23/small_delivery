import EnvVars from '@src/constants/EnvVars'
import mysql from 'mysql2/promise'
import { Connection } from 'mysql2/promise'
let connection: Connection | undefined
export function useConnectionPool() {
  const pool = mysql.createPool({
    host: EnvVars.Db.Host,
    user: EnvVars.Db.User,
    password: EnvVars.Db.Password,
    // database: 'deliveryService',
    database: EnvVars.Db.DbName,
  })
  return pool
}
export async function useMysqlConnection() {
  if (connection) return connection
  connection = await mysql.createConnection({
    host: EnvVars.Db.Host,
    user: EnvVars.Db.User,
    password: EnvVars.Db.Password,
    // database: 'deliveryService',
    database: EnvVars.Db.DbName,
  })
  return connection
}
