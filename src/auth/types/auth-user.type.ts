import { UserEntity } from 'src/users/entities/user.entity';

export type AuthUser = Omit<UserEntity, 'password'>;

export type UserWithoutPassword = AuthUser;
