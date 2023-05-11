import { Module } from '@nestjs/common';
import { ReceiveService } from './receive.service';
import { ReceiveController } from './receive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiveEntity } from './entities/receive.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceiveEntity])],
  controllers: [ReceiveController],
  providers: [ReceiveService],
})
export class ReceiveModule {}
