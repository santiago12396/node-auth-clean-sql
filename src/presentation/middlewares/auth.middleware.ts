import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '@/infrastructure/adapters';
import { User } from '@/infrastructure/database/postgres';

export class AuthMiddleware {
    
    static async validateToken(req: Request, res: Response, next: NextFunction) {

        const authorization = req.header('Authorization');

        if(!authorization) return res.status(401).json({ error: 'No token provided' });
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid bearer token' });

        const token = authorization.split(' ').at(-1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if(!payload) return res.status(401).json({ error: 'Invalid token' });

            const user = await User.findByPk(payload.id);
            if(!user) return res.status(401).json({ error: 'Invalid token' });

            req.body.payload = payload;

            next();
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

}