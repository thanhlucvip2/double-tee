import { Module } from '@nestjs/common';
import { ProductsTypeService } from './products-type.service';
import { ProductsTypeController } from './products-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsTypeEntity } from './entities/products-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsTypeEntity])],
  controllers: [ProductsTypeController],
  providers: [ProductsTypeService],
})
export class ProductsTypeModule {}
