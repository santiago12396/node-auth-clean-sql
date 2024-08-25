import { CustomError } from '@/domain';
import { UserEntity } from '@/domain/entitities';

export class UserMapper {
    
    static userEntityFromObject(object: { [key: string]: any }): UserEntity {

        const { id, name, email, password, created_at, updated_at } = object;

        if(!id) throw CustomError.badRequest('Missing id');
        if(!name) throw CustomError.badRequest('Missing name');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!created_at) throw CustomError.badRequest('Missing createdAt');
        if(!updated_at) throw CustomError.badRequest('Missing updatedAt');

        return new UserEntity(
            id,
            name,
            email,
            password,
            created_at,
            updated_at
        )
    }
}