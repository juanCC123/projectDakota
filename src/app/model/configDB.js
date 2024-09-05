import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos en Railway
const connectionConfig = {
  host: "junction.proxy.rlwy.net", // Usa el host que te da Railway
  user: "root", // El usuario proporcionado por Railway
  password: "FfEmxSaSEnhhgLURLIMcHfdiGqvlbpAn", // La contraseña proporcionada por Railway
  database: "railway", // El nombre de la base de datos en Railway
  port: 29472, // Generalmente MySQL usa el puerto 3306, pero revisa en Railway por si es otro
};

// Crear y exportar la conexión a la base de datos
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

// Asegúrate de cerrar la conexión en el manejo de la petición
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
