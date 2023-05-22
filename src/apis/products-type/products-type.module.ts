import { Module } from '@nestjs/common';
import { ProductsTypeService } from './products-type.service';
import { ProductsTypeController } from './products-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsTypeEntity } from './entities/products-type.entity';
import { ImportProductsDetailEntity } from '../import-products/import-products-detail/entities/import-products-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsTypeEntity, ImportProductsDetailEntity]),
  ],
  controllers: [ProductsTypeController],
  providers: [ProductsTypeService],
})
export class ProductsTypeModule {}
