import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { type User, type Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import {
  comparePasswords,
  hashPassword,
} from 'src/shared/helpers/password.helpers';
import { EditAccountDto } from './dto/edit-account.dto';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findUser(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<{ id: number; username: string }> {
    return await this.prisma.createUser({ ...data });
  }

  async authUser(username: string, password: string): Promise<string> {
    const user = await this.findUser(username);
    if (!user || !(await comparePasswords(user.password, password)))
      throw new BadRequestException({
        message: 'Incorrect username or password.',
      });

    const payload = { id: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async editUser(user: User, data: EditAccountDto): Promise<User> {
    if (
      data.password &&
      !(await comparePasswords(user.password, data.currentPassword ?? ''))
    )
      throw new BadRequestException({
        message: 'Incorrect password.',
      });

    return await prisma.user.update({
      where: { id: user.id },
      data: {
        username: data.username,
        ...(data.password && { password: await hashPassword(data.password) }),
      },
    });
  }
}
