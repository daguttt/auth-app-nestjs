import { UserEntity } from 'src/users/entities/user.entity';

export type UserWithoutPassword = Omit<UserEntity, 'password'>;

export type AuthUser = UserWithoutPassword;
