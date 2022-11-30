import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    console.log();
    console.log({ createUserDto, createUserDtoType: typeof createUserDto });

    return 'This method creates an user';
  }
}
