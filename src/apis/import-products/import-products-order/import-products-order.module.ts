import { Module } from '@nestjs/common';
import { ImportProductsOrderService } from './import-products-order.service';
import { ImportProductsOrderController } from './import-products-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportProductsOrderEntity } from './entities/import-products-order.entity';
import { SupplierEntity } from '@/apis/supplier/entities/supplier.entity';
import { InventoryModule } from '@/apis/inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImportProductsOrderEntity, SupplierEntity]),
    InventoryModule,
  ],
  controllers: [ImportProductsOrderController],
  providers: [ImportProductsOrderService],
})
export class ImportProductsOrderModule {}
