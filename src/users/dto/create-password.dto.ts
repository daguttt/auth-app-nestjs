import { IsString, Matches } from 'class-validator';
import { passwordFormat } from '../constants/password-format';

export class CreatePasswordDto {
  @IsString()
  @Matches(passwordFormat)
  newPassword: string;

  @IsString()
  @Matches(passwordFormat)
  confirmPassword: string;
}
