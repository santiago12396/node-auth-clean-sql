import { LoginUserDto, RegisterUserDto } from '../dtos/auth';
import { UserEntity } from '../entitities/user.entity';



export abstract class AuthRepository {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
    abstract generateToken(payload: Object, duration?: string): Promise<string | null>
}