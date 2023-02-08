import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePasswordDto } from 'src/users/dto/create-password.dto';

@Injectable()
export class ArePasswordsEqualPipe implements PipeTransform {
  transform(value: CreatePasswordDto) {
    if (value.newPassword !== value.confirmPassword)
      throw new BadRequestException('Passwords are not equal');
    return value;
  }
}
