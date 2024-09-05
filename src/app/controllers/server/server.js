import express from "express";
import mysql from "mysql2/promise";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
};

// Ruta para probar la conexión
app.get("/api/test-connection", async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    res.send("Conexión exitosa a la base de datos");
  } catch (error) {
    res
      .status(500)
      .send(`Error al conectar a la base de datos: ${error.message}`);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// Ruta para registrar o iniciar sesión
app.post("/api/auth", async (req, res) => {
  const { nombre, correo, teléfono, contraseña } = req.body;

  if (!nombre || !correo || !teléfono || !contraseña) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT * FROM usersDakota WHERE email = ?",
      [correo]
    );

    if (rows.length > 0) {
      const user = rows[0];
      if (user.password === contraseña) {
        return res.json({ message: "Inicio de sesión exitoso" });
      } else {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
    } else {
      await connection.execute(
        "INSERT INTO usersDakota (name, email, phoneNumber, password) VALUES (?, ?, ?, ?)",
        [nombre, correo, teléfono, contraseña]
      );
      return res.json({ message: "Usuario registrado y sesión iniciada" });
    }
  } catch (error) {
    console.error("Error en la base de datos:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
