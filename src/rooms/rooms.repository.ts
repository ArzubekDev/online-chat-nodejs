import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.room.create({
      data: { name },
    });
  }
}
