import { CustomError } from '@/domain';
import { LoginUserDto, RegisterUserDto } from '@/domain/dtos/auth';
import { UserEntity } from '@/domain/entitities';

import { BcryptAdapter } from '../adapters';
import { User } from '../database/postgres';
import { UserMapper } from '../mappers';

type hashFunction = (password: string) => string;
type compareFunction = (password: string, hashed: string) => boolean;

export abstract class AuthDataSource {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
}

export class AuthDataSourceImpl implements AuthDataSource {

    constructor(
        private hashPassword: hashFunction = BcryptAdapter.hash, 
        private compareFunction: compareFunction = BcryptAdapter.compare
    ) {}
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDto;

        try {
            const userExist = await User.findOne( { where: { email } });
            if(userExist) throw CustomError.badRequest('User already exist');


            const user = await User.create({
                name,
                email,
                password: this.hashPassword(password),
            });

            return UserMapper.userEntityFromObject(user.toJSON());

        } catch (error) {

            if(error instanceof CustomError) throw error;

            throw CustomError.internalServer();

        }
    
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        
        const { email, password } = loginUserDto;

        try {
            const user = await User.findOne({ where: { email } });
            if(!user) throw CustomError.badRequest('User not exist');

            const correctPassw = this.compareFunction(password, user.password);
            if(!correctPassw) throw CustomError.badRequest('Email or password incorrect');

            return UserMapper.userEntityFromObject(user);

        } catch (error) {

            if(error instanceof CustomError) throw error;

            throw CustomError.internalServer();

        }
    
    }

}