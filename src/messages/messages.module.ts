import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, WsJwtGuard, MessagesGateway],
  exports: [MessagesGateway]
})
export class MessagesModule {}

