import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AccountService } from './account.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  CreateAccountDto,
  createAccountSchema,
} from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  create(@Body() createAccountDto: CreateAccountDto) {
    return createAccountDto;
  }
}
