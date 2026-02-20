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

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  createRoom(@Body() body: { name: string; isGroup: boolean }) {
    return this.roomsService.createRoom(body.name, body.isGroup);
  }
  @Get() 
  getRooms() {
    return this.roomsService.getRooms();
  }
  @Delete(':id')
  deleteRoom(@Param('id') id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
