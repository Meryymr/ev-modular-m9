import { Router } from 'express';
import Tarea from '../models/Tarea.js';
import { verificarToken } from '../middlewares/auth.js';

const router = Router();

router.post('/', verificarToken, async (req, res) => {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
        return res.status(400).json({ error: 'El título y la descripción son obligatorios.' });
    }

    try {
        const usuarioId = req.usuario.id;

        const nuevaTarea = await Tarea.create({
            titulo,
            descripcion,
            estado: 'Pendiente',
            asignadoA: usuarioId 
        });

        return res.status(201).json({ mensaje: 'Tarea guardada con éxito en PostgreSQL', tarea: nuevaTarea });
    } catch (error) {
        console.error(' Error en la ruta protegida de tareas:', error);
        return res.status(500).json({ error: 'Error interno al guardar la tarea.' });
    }
});

export default router;