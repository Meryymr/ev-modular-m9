import { Router } from "express";
import Tarea from '../models/Tarea.js';
import Usuario from '../models/Usuario.js'; 

const router = Router(); 

// Crear Nueva Tarea
router.post('/', async (req, res) => {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
        return res.status(400).json({ error: 'El título y la descripción son obligatorios.' });
    }

    try {
        const primerUsuario = await Usuario.findOne();
        const asignadoA = primerUsuario ? primerUsuario.id : null;
        
        const nuevaTarea = await Tarea.create({
            titulo,
            descripcion,
            estado: 'Pendiente',
            asignadoA 
        });

     
        return res.status(201).json({ 
            mensaje: 'Tarea guardada con éxito en PostgreSQL', 
            tarea: nuevaTarea 
        });

    } catch (error) {
        console.error('Error exacto en la ruta de tareas:', error);
        return res.status(500).json({ 
            error: 'Error interno en el servidor al intentar guardar la tarea.' 
        });
    }
});

export default router;