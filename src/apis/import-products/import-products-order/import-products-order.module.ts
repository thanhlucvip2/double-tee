import { Module } from '@nestjs/common';
import { ImportProductsOrderService } from './import-products-order.service';
import { ImportProductsOrderController } from './import-products-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportProductsOrderEntity } from './entities/import-products-order.entity';
import { SupplierEntity } from '@/apis/supplier/entities/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImportProductsOrderEntity, SupplierEntity]),
  ],
  controllers: [ImportProductsOrderController],
  providers: [ImportProductsOrderService],
})
export class ImportProductsOrderModule {}
