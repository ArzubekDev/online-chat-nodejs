import { Injectable, BadRequestException } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepo: MessagesRepository) {}

  getMessagesByRoom(roomId: string) {
    if (!roomId) {
      throw new BadRequestException('roomId is required');
    }

    return this.messagesRepo.findByRoom(roomId);
  }
}
