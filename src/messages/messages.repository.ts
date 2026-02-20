// messages.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByRoom(roomId: string) {
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true }, // Колдонуучунун аты, аватар үчүн
    });
  }

create(roomId: string, text: string, senderId: string) {
  return this.prisma.message.create({
    data: {
      text,
      roomId,
      senderId,
    },
    include: {
      sender: true, 
    },
  });
}
}