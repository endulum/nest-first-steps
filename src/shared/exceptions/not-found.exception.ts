import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(resourceName?: string) {
    super(
      {
        message: `The ${resourceName ?? 'resource'} you are looking for could not be found.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
