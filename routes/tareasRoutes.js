import express from 'express';
import { 
    crearTarea, 
    obtenerTareasPorUsuario, 
    actualizarTarea, 
    eliminarTarea 
} from '../controllers/tareasController.js';

import { verificarToken } from '../middlewares/auth.js'

const router = express.Router();

router.post('/', verificarToken, crearTarea);                          
router.get('/usuario/:usuarioId', obtenerTareasPorUsuario); 
router.put('/:id', actualizarTarea);              
router.delete('/:id', eliminarTarea); 

export default router;