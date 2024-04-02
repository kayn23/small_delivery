import EnvVars from "@src/constants/EnvVars";
import mysql from "mysql2";
export function useConnectionPool() {
  const pool = mysql.createPool({
    host: EnvVars.Db.Host,
    user: EnvVars.Db.User,
    password: EnvVars.Db.Password,
    // database: 'deliveryService',
    database: "delivery_control_system",
  });
  return { pool };
}
