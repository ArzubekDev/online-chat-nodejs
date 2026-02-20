// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   MessageBody,
//   ConnectedSocket,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Socket, Server } from 'socket.io';
// import { UseGuards } from '@nestjs/common';
// import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';
// import { ChatService } from './chat.service';
// import { JwtService } from '@nestjs/jwt';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// @UseGuards(WsJwtGuard)
// export class ChatGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer()
//   server: Server;
//   constructor(private readonly chatService: ChatService, private readonly jwtService: JwtService) {}

// async handleConnection(client: Socket) {
//   try {
//     const token = client.handshake.auth.token;

//     if (!token) {
//       return client.disconnect();
//     }

//     const payload = this.jwtService.verify(token);

//     client.data.user = {
//       id: payload.sub,
//       email: payload.email,
//     };

//     console.log("Connected user:", payload.sub);

//   } catch (error) {
//     client.disconnect();
//   }
// }

// handleDisconnect(socket: Socket) {
//   const user = socket.data.user;

//   if (user) {
//     console.log(`User disconnected: ${user.id}`);
//   }
// }

//   @SubscribeMessage('join-room')
//   async joinRoom(
//     @MessageBody() roomId: string,
//     @ConnectedSocket() socket: Socket,
//   ) {
//     await this.chatService.joinRoom(socket, roomId);
//   }

// @SubscribeMessage('send-message')
// async handleMessage(
//   @MessageBody() payload: { roomId: string; text: string },
//   @ConnectedSocket() client: Socket,
// ) {
//   // Service'ке болгону roomId жана text жиберебиз
//   const savedMessage = await this.chatService.sendMessage(client, { 
//     roomId: payload.roomId,
//     text: payload.text,
//   });

//   // БӨЛМӨНҮН БААРДЫК МҮЧӨЛӨРҮНӨ (анын ичинде сизге да) ЖӨНӨТҮҮ:
//   this.server.to(payload.roomId).emit('new-message', savedMessage);
  
//   return savedMessage;
// }
// }
