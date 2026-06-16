import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes); 
app.use('/api/tareas', tareasRoutes);   
sequelize.sync({ force: false }) 
    .then(() => {
        console.log('🐘 Conexión exitosa a PostgreSQL y tablas sincronizadas.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos PostgreSQL:', err);
    });