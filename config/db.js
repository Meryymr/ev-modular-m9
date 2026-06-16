import { Sequelize } from "sequelize";

const sequelize = new Sequelize('gestor_datos', 
    'postgres',
    '2026Pos', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    }); 

    export default sequelize;