import { BadRequestException, Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepo: MessagesRepository) {}

  async getMessagesByRoom(roomId: string) {
    if (!roomId) throw new BadRequestException('roomId is required');
    return this.messagesRepo.findByRoom(roomId);
  }

  async createMessage(roomId: string, text: string, senderId: string) {
    if (!text?.trim()) throw new BadRequestException('Message text is required');
    return this.messagesRepo.create(roomId, text, senderId);
  }

  async joinRoom(socket: Socket, roomId: string) {
    if (!roomId) throw new BadRequestException('roomId is required');
    socket.join(roomId);
    const messages = await this.getMessagesByRoom(roomId);
    socket.emit('room-messages', messages);
  }

async sendMessage(socket: Socket, payload: { roomId: string; text: string }) {
  const user = socket.data.user;

  if (!user || !user.sub) {
    console.error('User data missing in socket:', socket.data);
    throw new BadRequestException('User not authenticated');
  }

  return this.messagesRepo.create(
    payload.roomId,
    payload.text,
    user.sub
  );
}
}