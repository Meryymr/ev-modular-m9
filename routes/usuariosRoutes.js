import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/registro', registrarUsuario); 

export default router;