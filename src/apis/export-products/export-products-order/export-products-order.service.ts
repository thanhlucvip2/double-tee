import { Injectable } from '@nestjs/common';
import { CreateExportProductsOrderDto } from './dto/create-export-products-order.dto';
import { UpdateExportProductsOrderDto } from './dto/update-export-products-order.dto';

@Injectable()
export class ExportProductsOrderService {
  create(createExportProductsOrderDto: CreateExportProductsOrderDto) {
    return 'This action adds a new exportProductsOrder';
  }

  findAll() {
    return `This action returns all exportProductsOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exportProductsOrder`;
  }

  update(id: number, updateExportProductsOrderDto: UpdateExportProductsOrderDto) {
    return `This action updates a #${id} exportProductsOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportProductsOrder`;
  }
}
