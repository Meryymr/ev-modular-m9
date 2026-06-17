import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const router = Router(); 
const JWT_SECRET = 'mi_clave_1234'

//Registro usuarios 
router.post('/registro', async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const existeUsuario = await Usuario.findOne({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt)

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contrasena: passwordEncriptada,
            rol
        });

        return res.status(201).json({ mensaje: 
            'Usuario registrado con éxito', 
            usuario: { id: nuevoUsuario.id, nombre, email, rol}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno en la Base de Datos.' });
    }
});

//Login usuarios
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
    }

    try {
        const usuarioEncontrado = await Usuario.findOne({ where: { email } });

        if (!usuarioEncontrado || !(await bcrypt.compare(password, usuarioEncontrado.contrasena))) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos.' });
        }

        //Generar Token JWT 
        const token = jwt.sign(
            { id:usuarioEncontrado.id, 
            nombre: usuarioEncontrado.nombre,
            rol: usuarioEncontrado.rol },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                rol: usuarioEncontrado.rol
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno durante el login.' });
    }
});

export default router;