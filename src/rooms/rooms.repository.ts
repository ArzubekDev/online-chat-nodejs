import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string, isGroup: boolean) {
    return this.prisma.room.create({
      data: { name, isGroup },
    });
  }

  findAll() {
    return this.prisma.room.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
  delete(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}
