import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  CreateAccountDto,
  createAccountSchema,
} from './dto/create-account.dto';
import { AccountService } from './account.service';
import { UsernameUniquePipe } from 'src/shared/pipes/username-unique.pipe';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(createAccountSchema), UsernameUniquePipe)
  async create(@Body() { data }: { data: CreateAccountDto }) {
    return {
      message: 'Account successfully created.',
      data: await this.accountService.createUser({
        username: data.username,
        password: data.password,
      }),
    };
  }
}
