import { Injectable, BadRequestException } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepo: RoomsRepository) {}

async createRoom(name: string, isGroup: boolean) {
  if (!name || !name.trim()) {
    throw new BadRequestException('Room name is required');
  }

  return this.roomsRepo.create(name, isGroup);
}

async getRooms() {
  return this.roomsRepo.findAll();
}

  async deleteRoom(id: string) {
    if (!id) {
      throw new BadRequestException('Room id is required');
    }

    return this.roomsRepo.delete(id);
  }
}
