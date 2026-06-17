import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';

//Handlebars solicitado en M6 
import { engine } from 'express-handlebars';
import fs from 'fs'; 
import path from 'path'

const app = express();
const PORT = 3000;

//Handlebars
app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars'); 
app.set('views', path.resolve('views'));

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes); 
app.use('/api/tareas', tareasRoutes);  

//Ruta de simulación, req. mod. 6
app.get('/modulo6/tareas', (req, res) => {
    try {
        const rutaArchivo = path.resolve('tareas_simuladas.json');
        
        if (!fs.existsSync(rutaArchivo)) {
            const tareasIniciales = [
                { id: 1, titulo: 'Simulación Módulo 6: Configurar Servidor', estado: 'Completado' },
                { id: 2, titulo: 'Simulación Módulo 6: Implementar Handlebars', estado: 'Pendiente' },
                { id: 3, titulo: 'Simulación Módulo 6: Persistencia Temporal JSON', estado: 'En Progreso' }
            ];
            fs.writeFileSync(rutaArchivo, JSON.stringify(tareasIniciales, null, 2));
        }

        const datosJson = fs.readFileSync(rutaArchivo, 'utf-8');
        const tareas = JSON.parse(datosJson);

        res.render('tareas_temporal', { layout: false, tareas });
    } catch (error) {
        console.error('❌ Error en simulación Módulo 6:', error.message);
        res.status(500).send('Error interno al renderizar la vista temporal.');
    }
});

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
