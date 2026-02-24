// rooms.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { MessagesGateway } from 'src/messages/messages.gateway';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly messagesGateway: MessagesGateway, 
  ) {}

  @Post()
  async createRoom(@Body() body: { name: string; isGroup: boolean }) {
    const newRoom = await this.roomsService.createRoom(body.name, body.isGroup);

    this.messagesGateway.server.emit('room-created', newRoom);

    return newRoom;
  }

  @Get()
  getRooms() {
    return this.roomsService.getRooms();
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    const result = await this.roomsService.deleteRoom(id);
    
    this.messagesGateway.server.emit('room-deleted', id);
    
    return result;
  }
}