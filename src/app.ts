import { envs } from './config/envs';
import { initializeModels, PostgresDatabase, syncModels } from './infrastructure/database/postgres';

import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
    main();
})();

async function main () {

    const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } = envs;

    const sequelize = await PostgresDatabase.connect({
        database: POSTGRES_DB,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        host: POSTGRES_HOST,
    });

    initializeModels(sequelize);
    await syncModels(sequelize);

    new Server({ 
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start();
}
