// configdb.js
import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos en Railway
const connectionConfig = {
  host: "junction.proxy.rlwy.net",
  user: "root",
  password: "FfEmxSaSEnhhgLURLIMcHfdiGqvlbpAn",
  database: "railway",
  port: "29472",
};

export const dataB = async () => {
  let connection;
  try {
    connection = await mysql.createConnection(connectionConfig);
    console.log("Conexión a la base de datos en Railway exitosa");
    return connection;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    throw error;
  }
};

export const closeConnection = async (connection) => {
  try {
    await connection.end();
    console.log("Conexión a la base de datos cerrada");
  } catch (error) {
    console.error(
      "Error al cerrar la conexión a la base de datos:",
      error.message
    );
  }
};
