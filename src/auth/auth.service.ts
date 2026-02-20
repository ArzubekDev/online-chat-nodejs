import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
     private readonly jwtService: JwtService,
  ) {}

public async register(dto: CreateAuthDto) {
  const existing = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (existing) {
    throw new BadRequestException('Пользователь существует');
  }

  const hashed = await bcrypt.hash(dto.password, 10);

  const newUser = await this.prisma.user.create({
    data: {
      email: dto.email,
      password: hashed,
    },
  });

  const token = this.jwtService.sign({
    sub: newUser.id,
    email: newUser.email,
  });

  const { password, ...userData } = newUser;
  return { user: userData, token };
}


public async login(dto: CreateAuthDto) {
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (!user) {
    throw new UnauthorizedException('Неверные учетные данные');
  }

  const match = await bcrypt.compare(dto.password, user.password);
  if (!match) {
    throw new UnauthorizedException('Неверные учетные данные');
  }

  const token = this.jwtService.sign({
    sub: user.id,
    email: user.email,
  });

  const { password, ...userData } = user;
  return { accessToken: token, user: userData };
}

}
