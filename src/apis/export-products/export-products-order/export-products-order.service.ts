import { Injectable } from '@nestjs/common';
import { CreateExportProductsOrderDto } from './dto/create-export-products-order.dto';

@Injectable()
export class ExportProductsOrderService {
  create(createExportProductsOrderDto: CreateExportProductsOrderDto) {
    return 'This action adds a new exportProductsOrder';
  }
}
