import Tarea from '../models/Tarea.js'; 

// CREATE
export const crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, asignadoA } = req.body;
        
        const nuevaTarea = await Tarea.create({
            titulo,
            descripcion,
            estado: 'Pendiente',
            asignadoA //
        });

        res.status(201).json({ mensaje: 'Tarea creada con éxito', tarea: nuevaTarea });
    } catch (error) {
        console.error('Error al crear tarea:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al crear la tarea.' });
    }
};

// READ
export const obtenerTareasPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const tareas = await Tarea.findAll({
            where: { asignadoA: usuarioId }
        });

        res.status(200).json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener las tareas.' });
    }
};

// UPDATE
export const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        tarea.estado = estado;
        await tarea.save(); 

        res.status(200).json({ mensaje: 'Tarea actualizada con éxito', tarea });
    } catch (error) {
        console.error('Error al actualizar tarea:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la tarea.' });
    }
};

// 4. DELETE
export const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        await tarea.destroy();
        res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar tarea:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al eliminar la tarea.' });
    }
};