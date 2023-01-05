import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ErrorsService } from 'src/errors/errors.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly errorsService: ErrorsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
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

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }
}
