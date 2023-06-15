import { Injectable } from '@nestjs/common';
import { CreateExportProductsDetailDto } from './dto/create-export-products-detail.dto';

@Injectable()
export class ExportProductsDetailService {
  create(createExportProductsDetailDto: CreateExportProductsDetailDto) {
    return 'This action adds a new exportProductsDetail';
  }
}
