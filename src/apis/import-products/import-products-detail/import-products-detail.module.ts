import { Module } from '@nestjs/common';
import { ImportProductsDetailService } from './import-products-detail.service';
import { ImportProductsDetailController } from './import-products-detail.controller';

@Module({
  controllers: [ImportProductsDetailController],
  providers: [ImportProductsDetailService]
})
export class ImportProductsDetailModule {}
