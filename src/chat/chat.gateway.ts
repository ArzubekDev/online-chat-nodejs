import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtGuard)
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  handleConnection(socket: Socket) {
    const user = socket.data.user;
    console.log(`User connected: ${user.id}`);
  }

  handleDisconnect(socket: Socket) {
    const user = socket.data.user;
    console.log(`User disconnected: ${user.id}`);
  }

  @SubscribeMessage('join-room')
  async joinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.chatService.joinRoom(socket, roomId);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() data: { roomId: string; text: string },
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.sendMessage(socket, data);
  }
}
