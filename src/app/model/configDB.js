/* 
import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
};

// Crear y exportar la conexión a la base de datos
export const dataB = async () => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log("Conexión a la base de datos exitosa");
    return connection;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    throw error;
  }
};
 */
