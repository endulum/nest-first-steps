import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  CreateAccountDto,
  createAccountSchema,
} from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  create(@Body() { data }: { data: CreateAccountDto }) {
    return {
      message: 'Account successfully created.',
      data,
    };
  }
}
