import { Sequelize } from 'sequelize';

interface Options {
    database: string;
    username: string;
    password: string;
    host: string;
}

export class PostgresDatabase {

    static #sequelize: Sequelize;

    static async connect(options: Options) {

        const { database, username, password, host } = options;
        
        this.#sequelize = new Sequelize(database, username, password, {
            host,
            dialect: 'postgres',
            logging: false,
        });

        try {
            await PostgresDatabase.#sequelize.authenticate();
            console.log('Postgres connected');
            return this.#sequelize;
        } catch (error) {
            console.log('Postgres connection error');
            throw error;
        }
    }

    static getInstance() {
        return this.#sequelize;
    }
}