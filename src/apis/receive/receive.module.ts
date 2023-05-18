import { Module } from '@nestjs/common';
import { ReceiveService } from './receive.service';
import { ReceiveController } from './receive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiveEntity } from './entities/receive.entity';
import { ProductsTypeEntity } from '../products-type/entities/products-type.entity';
import { SupplierEntity } from '../supplier/entities/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReceiveEntity,
      ProductsTypeEntity,
      SupplierEntity,
    ]),
  ],
  controllers: [ReceiveController],
  providers: [ReceiveService],
})
export class ReceiveModule {}
