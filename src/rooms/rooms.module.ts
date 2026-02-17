import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomsRepository } from './rooms.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
})
export class RoomsModule {}
