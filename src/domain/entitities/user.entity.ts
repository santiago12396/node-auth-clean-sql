export class UserEntity {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string | undefined,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}