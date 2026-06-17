import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mi_clave_1234';

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        
        const sal = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(password, sal);

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contrasena: contrasenaEncriptada,
            rol: rol || 'usuario'
        });

        return res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuarioId: nuevoUsuario.id });
    } catch (error) {
        console.error('Error en el registro:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor al registrar el usuario.' });
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const contrasenaValida = await bcrypt.compare(password, usuario.contrasena);
        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('Error en el login:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor durante el inicio de sesión.' });
    }
};