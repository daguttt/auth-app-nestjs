import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ErrorsService {
  handleDbError(err: any) {
    /**
     * '23505': Violate unique constraint. Attempt to register a user that already exists
     */
    const errorsMap = {
      '23505': new BadRequestException(err.detail),
    };
    const exception = errorsMap[err.code] ?? new InternalServerErrorException();
    throw exception;
  }
}
