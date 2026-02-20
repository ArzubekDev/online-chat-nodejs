// import { Injectable, ForbiddenException } from '@nestjs/common';
// import { Socket } from 'socket.io';
// import { ChatRepository } from './chat.repository';

// @Injectable()
// export class ChatService {
//   constructor(private readonly chatRepo: ChatRepository) {}

//   async joinRoom(socket: Socket, roomId: string) {
//     // room барбы?
//     const roomExists = await this.chatRepo.roomExists(roomId);
//     if (!roomExists) {
//       throw new ForbiddenException('Room not found');
//     }

//     socket.join(roomId);

//     socket.to(roomId).emit('user-joined', {
//       userId: socket.data.user.id,
//     });
//   }

// async sendMessage(socket: Socket, data: { roomId: string; text: string }) {
//   const user = socket.data.user;

//   if (!user?.id) throw new ForbiddenException('Unauthorized');

//   if (!data.text || !data.text.trim()) {
//     throw new ForbiddenException('Message is empty');
//   }

//   const message = await this.chatRepo.saveMessage({
//     roomId: data.roomId,
//     senderId: user.id,
//     text: data.text,
//   });

//   socket.in(data.roomId).emit('new-message', message);

//   return message;
// }
// }
