import { dataB, closeConnection } from "@/app/model/configDB";

export async function POST(req) {
  const { nombre, correo, telefono, contraseña } = await req.json();

  let connection;

  try {
    connection = await dataB();

    if (nombre && telefono) {
      await connection.execute(
        "INSERT INTO usersDakota(name, email, phoneNumber, password) VALUES (?, ?, ?, ?)",
        [nombre, correo, telefono, contraseña]
      );
      return new Response(
        JSON.stringify({ message: "Usuario registrado con éxito" }),
        { status: 200 }
      );
    } else {
      const [rows] = await connection.execute(
        "SELECT * FROM usersDakota WHERE email = ? AND password = ?",
        [correo, contraseña]
      );

      if (rows.length > 0) {
        return new Response(
          JSON.stringify({ message: "Inicio de sesión exitoso" }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Correo o contraseña incorrectos" }),
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  } finally {
    if (connection) {
      await closeConnection(connection);
    }
  }
}
