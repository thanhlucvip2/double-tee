import { Injectable } from '@nestjs/common';
import { CreateExportProductsDetailDto } from './dto/create-export-products-detail.dto';
import { UpdateExportProductsDetailDto } from './dto/update-export-products-detail.dto';

@Injectable()
export class ExportProductsDetailService {
  create(createExportProductsDetailDto: CreateExportProductsDetailDto) {
    return 'This action adds a new exportProductsDetail';
  }

  findAll() {
    return `This action returns all exportProductsDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exportProductsDetail`;
  }

  update(
    id: number,
    updateExportProductsDetailDto: UpdateExportProductsDetailDto,
  ) {
    return `This action updates a #${id} exportProductsDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportProductsDetail`;
  }
}
