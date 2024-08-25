import { Request, Response } from 'express';

import { CustomError } from '@/domain';
import { AuthRepository } from '@/domain/repositories';
import { LoginUserDto, RegisterUserDto } from '@/domain/dtos/auth';
import { LoginUser, RegisterUser } from '@/domain/use-cases/auth';

export class AuthController {

    constructor(private readonly authRepository: AuthRepository) {}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) 
            return res.status(error.statusCode).json({ error: error.message });

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = (req: Request, res: Response) => {
        const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({ error });

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [ error, loginUserDto ] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({ error });

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

}

