import EnvVars from '@src/constants/EnvVars'
import mysql from 'mysql2/promise'
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
export function useMysqlConnection() {
  return mysql.createConnection({
    host: EnvVars.Db.Host,
    user: EnvVars.Db.User,
    password: EnvVars.Db.Password,
    // database: 'deliveryService',
    database: EnvVars.Db.DbName,
  })
}
