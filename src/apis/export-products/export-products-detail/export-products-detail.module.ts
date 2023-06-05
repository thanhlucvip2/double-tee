import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExportProductsDetailService } from './export-products-detail.service';
import { ExportProductsDetailController } from './export-products-detail.controller';
import { ExportProductsDetailEntity } from './entities/export-products-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExportProductsDetailEntity])],
  controllers: [ExportProductsDetailController],
  providers: [ExportProductsDetailService],
})
export class ExportProductsDetailModule {}
