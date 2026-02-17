import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();

    // Токен socket handshake'тен алынат
    const token =
      client.handshake?.auth?.token ||
      client.handshake?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const payload = this.jwtService.verify(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // socketке user кошобуз
    client.user = payload;

    return true;
  }
}
