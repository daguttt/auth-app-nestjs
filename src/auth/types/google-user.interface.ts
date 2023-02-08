import { CreateUserDto } from 'src/users/dto/create-user.dto';

export type GoogleUser = CreateUserDto & {
  photo: string;
};
