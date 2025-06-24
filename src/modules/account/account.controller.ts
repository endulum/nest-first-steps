import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  CreateAccountDto,
  createAccountSchema,
} from './dto/create-account.dto';
import { AccountService } from './account.service';
import { UsernameUniquePipe } from 'src/shared/pipes/username-unique.pipe';
import { AuthAccountDto, authAccountSchema } from './dto/auth-account.dto';
import { AuthGuard } from './auth.guard';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(createAccountSchema), UsernameUniquePipe)
  async signup(@Body() { data }: { data: CreateAccountDto }) {
    const user = await this.accountService.createUser({
      username: data.username,
      password: data.password,
    });
    return {
      message: 'Account successfully created.',
      data: { id: user.id, username: user.username },
    };
  }

  @Post('/login')
  @UsePipes(new ZodValidationPipe(authAccountSchema))
  async login(@Body() { data }: { data: AuthAccountDto }) {
    const token = await this.accountService.authUser(
      data.username,
      data.password,
    );
    return {
      message: `Successfully logged in.`,
      token,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  land(@Request() req: { user: { id: number; username: string } }) {
    return req.user;
  }
}
