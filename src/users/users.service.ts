import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findById(id: string) {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async create(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepo.create(email, hashedPassword);
  }
}
