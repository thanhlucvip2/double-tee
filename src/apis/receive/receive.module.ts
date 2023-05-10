import { Module } from '@nestjs/common';
import { ReceiveController } from './receive.controller';

@Module({
  controllers: [ReceiveController]
})
export class ReceiveModule {}
