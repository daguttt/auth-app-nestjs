import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  lastName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
}
