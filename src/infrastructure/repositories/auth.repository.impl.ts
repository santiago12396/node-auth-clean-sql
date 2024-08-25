import { JwtAdapter } from '../adapters';
import { AuthDataSource } from '../datasources';

import { AuthRepository } from '@/domain/repositories';
import { LoginUserDto, RegisterUserDto } from '@/domain/dtos/auth';
import { UserEntity } from '@/domain/entitities';


export class AuthRepositoryImpl implements AuthRepository {

    constructor(private readonly authDatasource: AuthDataSource) {}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    
    generateToken(payload: Object, duration?: string): Promise<string | null> {
        return JwtAdapter.generateToken(payload, duration);
    }
}