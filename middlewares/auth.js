import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mi_clave_1234'; 

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token válido.' });
    }

    try {
        const verificado = jwt.verify(token, JWT_SECRET);
        req.usuario = verificado; 
        
        return next(); 
    } catch (error) {  
        console.error(' Error al verificar token:', error.message);
        return res.status(403).json({ error: 'Token inválido, alterado o expirado.' });
    }
};