import { Injectable, BadRequestException } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepo: RoomsRepository) {}

  async createRoom(name: string) {
    if (!name || !name.trim()) {
      throw new BadRequestException('Room name is required');
    }

    return this.roomsRepo.create(name);
  }
}
