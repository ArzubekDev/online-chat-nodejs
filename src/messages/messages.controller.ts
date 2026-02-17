import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  getRoomMessages(@Query('roomId') roomId: string) {
    return this.messagesService.getMessagesByRoom(roomId);
  }
}
