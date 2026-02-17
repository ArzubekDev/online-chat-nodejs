import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ChatGateway, ChatService, ChatRepository, WsJwtGuard,],
})
export class ChatModule {}
