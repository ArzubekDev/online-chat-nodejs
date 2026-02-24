import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtGuard)
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(private readonly messageService: MessagesService, private readonly jwtService: JwtService) {}

async handleConnection(client: Socket) {
  try {
    const token = client.handshake.auth.token;
    if (!token) return client.disconnect();

    const payload = this.jwtService.verify(token);

    client.data.user = {
      id: payload.sub, 
      email: payload.email,
    };

    console.log("Connected user:", client.data.user);

  } catch (error) {
    console.error('Connection error:', error);
    client.disconnect();
  }
}

handleDisconnect(socket: Socket) {
  const user = socket.data.user;

  if (user) {
    console.log(`User disconnected: ${user.id}`);
  }
}

@SubscribeMessage('join-room')
async joinRoom(
  @MessageBody() roomId: string,
  @ConnectedSocket() socket: Socket,
) {
  await this.messageService.joinRoom(socket, roomId);
}

@SubscribeMessage('send-message')
async handleMessage(
  @MessageBody() payload: { roomId: string; text: string },
  @ConnectedSocket() client: Socket,
) {
  const savedMessage = await this.messageService.sendMessage(client, payload);
  this.server.to(payload.roomId).emit('new-message', savedMessage);
  return savedMessage;
}


@SubscribeMessage('typing')
handleTyping(
  @MessageBody() data: { roomId: string; userId: string },
  @ConnectedSocket() client: Socket,
) {
  client.to(data.roomId).emit('user-typing', { userId: data.userId });
}

@SubscribeMessage('stop-typing')
handleStopTyping(
  @MessageBody() data: { roomId: string; userId: string },
  @ConnectedSocket() client: Socket,
) {
  client.to(data.roomId).emit('user-stop-typing', { userId: data.userId });
}

}
