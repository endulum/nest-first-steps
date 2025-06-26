import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

type Payload = { id: number; username: string };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async extractPayloadFromToken(
    token: string,
  ): Promise<Payload | null> {
    try {
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return payload;
    } catch {
      return null;
    }
  }

  private async findUserFromPayload(payload: Payload): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    const payload = await this.extractPayloadFromToken(token);
    if (!payload) throw new UnauthorizedException();

    const user = await this.findUserFromPayload(payload);
    if (!user) throw new UnauthorizedException();

    request['user'] = user;
    return true;
  }
}
