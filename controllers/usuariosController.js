import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, contrasena, rol } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        const sal = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, sal);

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contrasena: contrasenaEncriptada,
            rol: rol || 'usuario'
        });

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuarioId: nuevoUsuario.id });
    } catch (error) {
        console.error('Error en el registro:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al registrar el usuario.' });
    }
};

// LOGIN
export const loginUsuario = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
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
        console.error('Error en el login:', error.message);
        res.status(500).json({ error: 'Error interno del servidor durante el inicio de sesión.' });
    }
};