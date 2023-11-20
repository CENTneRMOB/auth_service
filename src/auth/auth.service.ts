import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'node:crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = pbkdf2Sync(`${dto.password}`, 'salt', 1000, 64, 'sha512');

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash.toString('hex'),
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new Error(error);
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new Error('Incorrect user email!');
    }

    const hash = pbkdf2Sync(`${dto.password}`, 'salt', 1000, 64, 'sha512');

    const isMatch = hash.toString('hex') === user.hash;

    if (!isMatch) {
      throw new Error('Incorrect credentials!');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret_jwt = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret_jwt,
    });

    return {
      access_token: token,
    };
  }
}
