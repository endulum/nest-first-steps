import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { type User, type Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async findUser(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async authUser(username: string, password: string): Promise<string> {
    const user = await this.findUser(username);
    if (!user || user.password !== password)
      throw new BadRequestException({
        message: 'Incorrect username or password.',
      });
    return 'token';
  }
}
