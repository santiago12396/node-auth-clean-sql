import { LoginUserDto } from '@/domain/dtos/auth';
import { AuthRepository } from '@/domain/repositories/auth.repository';
import { CustomError } from '@/domain/errors/custom.error';


interface UserToken {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    }
}

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        
        const user = await this.authRepository.login(loginUserDto);
        const token = await this.authRepository.generateToken({ id: user.id }, '2h');

        if(!token) throw CustomError.internalServer('Error generating token');

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }

    }

}