import { Sequelize } from 'sequelize';
import User from './user.model';

export const initializeModels = (sequelize: Sequelize) => {
    User.initModel(sequelize);
}

export const syncModels = async (sequelize: Sequelize) => {
    await sequelize.sync({ alter: true });
}

export { PostgresDatabase } from './postgres-database';
export { User };