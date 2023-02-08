import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ErrorsService } from 'src/errors/errors.service';
import { GoogleUser } from 'src/auth/types/google-user.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity, UserEntityLike } from './entities/user.entity';
import { CreatePasswordDto } from './dto/create-password.dto';
import { encryptPassword } from 'src/auth/utils/encrypt-password.util';
import { UserWithoutPassword } from 'src/auth/types/auth-user.type';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly errorsService: ErrorsService,
  ) {}

  async create(createUserDto: CreateUserDto | GoogleUser): Promise<UserEntity> {
    const user: UserEntity = this.usersRepository.create(createUserDto);
    try {
      return await this.usersRepository.save(user);
    } catch (err) {
      this.logger.error(err);
      this.errorsService.handleDbError(err);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(email: string) {
    return (await this.usersRepository.findOneBy({
      email,
    })) as UserWithoutPassword;
  }

  async findOneWithPassword(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        password: true,
        photo: true,
      },
    });
  }

  async updateUser(
    newUserData: UserEntityLike,
    currentUser: UserWithoutPassword,
  ) {
    const userToBeUpdated = {
      ...currentUser,
      ...newUserData,
    };
    return await this.usersRepository.save(userToBeUpdated);
  }

  async setPassword(
    createPasswordDto: CreatePasswordDto,
    user: UserWithoutPassword,
  ) {
    const encryptedPassword: string = await encryptPassword(
      createPasswordDto.newPassword,
    );
    createPasswordDto.newPassword = encryptedPassword;
    return await this.updateUser(
      { password: createPasswordDto.newPassword },
      user,
    );
  }
}
