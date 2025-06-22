import { Controller, All } from '@nestjs/common';
import { NotFoundException } from 'src/shared/exceptions/not-found.exception';

@Controller()
export class NotFoundController {
  @All('*')
  handleAll() {
    throw new NotFoundException();
  }
}
