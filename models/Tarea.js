import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './Usuario.js';

const Tarea = sequelize.define('Tarea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendiente'
    }
}, {
    tableName: 'tareas',
    timestamps: true
});


Usuario.hasMany(Tarea, { foreignKey: 'asignadoA', onDelete: 'CASCADE' });
Tarea.belongsTo(Usuario, { foreignKey: 'asignadoA' });

export default Tarea;