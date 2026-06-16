import express from "express";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Middlewares
app.use(cors());
app.use(express.json());

app.post("api/tareas", (req, res, next) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || descripcion) {
    return res.status(400).json({
      error: "El titulo y la descripción son obligatorias",
    });
    //Nueva tarea
    id: (Date.now(), titulo, descripcion, estado);
    ("Pendiente", creadoEn);
    new Date().toISOString();
  }

  const filePath = join(__dirname, "tasks.txt");

  fs.readFile(filePath, "utf-8", (err, data) => {
    let listaTareas = [];
    if (!err && data) {
      try {
        listaTareas = JSON.parse(data);
      } catch (e) {
        listaTereas = [];
      }
    }
    listaTareas.push(nuevaTarea);

    fs.writeFile(filePath, JSON.stringify(listaTareas, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          error: "Error al guardar la tarea",
        });
      }
      return res.status(201).json({
        mensaje: "Tarea guardada con éxito",
      });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
