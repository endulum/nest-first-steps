import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AccountService } from 'src/modules/account/account.service';

@Injectable()
export class UsernameUniquePipe implements PipeTransform {
  constructor(private accountService: AccountService) {}

  async transform(value: { data: { username: string } }) {
    const user = await this.accountService.findUser(value.data.username);
    if (user)
      throw new BadRequestException({
        message: 'Usernames must be unique. Please choose another.',
      });
    return value;
  }
}
