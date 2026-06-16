import express from 'express';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

app.post('/api/usuarios/registro', (req, res) => {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email,
        password, 
        rol,
        creadoEn: new Date().toISOString()
    };

    const filePath = join(__dirname, 'users.txt');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        let listaUsuarios = [];
        if (!err && data) {
            try { listaUsuarios = JSON.parse(data); } catch (e) { listaUsuarios = []; }
        }

        const existe = listaUsuarios.find(u => u.email === email);
        if (existe) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        listaUsuarios.push(nuevoUsuario);

        fs.writeFile(filePath, JSON.stringify(listaUsuarios, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error al registrar el usuario.' });
            return res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
        });
    });
});

app.post('/api/usuarios/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
    }

    const filePath = join(__dirname, 'users.txt');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err || !data) {
            return res.status(400).json({ error: 'Credenciales incorrectas o no existen usuarios.' });
        }

        let listaUsuarios = [];
        try { listaUsuarios = JSON.parse(data); } catch (e) { listaUsuarios = []; }

        const usuarioEncontrado = listaUsuarios.find(u => u.email === email && u.password === password);

        if (!usuarioEncontrado) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos.' });
        }

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                rol: usuarioEncontrado.rol
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});