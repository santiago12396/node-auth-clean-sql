import { UserEntity } from '@/domain/entitities';
import { RegisterUserDto } from '@/domain/dtos/auth';
import { AuthRepository } from '@/domain/repositories/auth.repository';
import { CustomError } from '@/domain/errors/custom.error';

interface UserToken {
    token: string;
    user: UserEntity
}

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        
        const user = await this.authRepository.register(registerUserDto);
        const token = await this.authRepository.generateToken({ id: user.id }, '2h');

        if(!token) throw CustomError.internalServer('Error generating token');

        return {
            token,
            user
        }

    }

}