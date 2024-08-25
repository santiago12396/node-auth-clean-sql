import { Router } from 'express';

import { AuthController } from './controller';
import { AuthDataSourceImpl } from '@/infrastructure/datasources';
import { AuthRepositoryImpl } from '@/infrastructure/repositories';



export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        
        const authDatasource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);
        const controller = new AuthController(authRepository);


        router.post('/login', controller.loginUser);

        router.post('/register', controller.registerUser);


        return router;
    }

}