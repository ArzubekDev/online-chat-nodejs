import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async roomExists(roomId: string): Promise<boolean> {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });
    return Boolean(room);
  }

  async saveMessage(data: {
    roomId: string;
    senderId: string;
    text: string;
  }) {
    return this.prisma.message.create({
      data: {
        roomId: data.roomId,
        senderId: data.senderId,
        text: data.text,
      },
    });
  }

  // ChatRepository ичине
async getMessages(roomId: string) {
  return this.prisma.message.findMany({
    where: { roomId },
    orderBy: { createdAt: 'asc' }, 
    include: { sender: { select: { email: true, id: true } } } 
  });
}
}
