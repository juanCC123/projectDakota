import { NextResponse } from "next/server";
import { dataB } from "@/app/model/configDB";

export async function POST(request) {
  let connection;

  try {
    // Obtener datos del request
    const { nombre, correo, teléfono, contraseña } = await request.json();

    // Validar que los campos no estén vacíos
    if (!nombre || !correo || !teléfono || !contraseña) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Conectar a la base de datos
    connection = await dataB();

    // Consulta SQL para verificar si el usuario ya existe
    const [rows] = await connection.execute(
      "SELECT * FROM usersDakota WHERE email = ?",
      [correo]
    );

    if (rows.length > 0) {
      // El usuario existe, verificamos la contraseña
      const user = rows[0];
      if (user.password === contraseña) {
        // Usuario autenticado exitosamente
        return NextResponse.json({
          message: "Inicio de sesión exitoso",
          name: user.name,
        });
      } else {
        // Contraseña incorrecta
        return NextResponse.json(
          { error: "Contraseña incorrecta" },
          { status: 401 }
        );
      }
    } else {
      // El usuario no existe, lo registramos
      await connection.execute(
        "INSERT INTO usersDakota (name, email, phoneNumber, password) VALUES (?, ?, ?, ?)",
        [nombre, correo, teléfono, contraseña]
      );
      // Después de registrar, podemos enviar un mensaje para indicar que se ha registrado exitosamente y solicitar que inicie sesión nuevamente
      return NextResponse.json({
        message:
          "Usuario registrado exitosamente. Por favor, inicia sesión con tus datos.",
      });
    }
  } catch (error) {
    // Log de errores detallados
    console.error("Error en la base de datos:", error.message);
    console.error("Stack Trace:", error.stack);

    // Manejo de errores específicos para cada etapa
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: "Ya existe un usuario con este correo" },
        { status: 409 }
      );
    }

    // Manejo de errores de conexión a la base de datos
    if (error.message.includes("ECONNREFUSED")) {
      return NextResponse.json(
        { error: "No se pudo conectar a la base de datos" },
        { status: 503 }
      );
    }

    // Error general
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  } finally {
    // Asegúrate de cerrar la conexión a la base de datos si fue abierta
    if (connection && connection.end) {
      try {
        await connection.end();
      } catch (error) {
        console.error(
          "Error al cerrar la conexión a la base de datos:",
          error.message
        );
      }
    }
  }
}
