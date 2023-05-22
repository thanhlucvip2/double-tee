import { Injectable } from '@nestjs/common';
import { CreateImportProductsDetailDto } from './dto/create-import-products-detail.dto';

@Injectable()
export class ImportProductsDetailService {
  create(createImportProductsDetailDto: CreateImportProductsDetailDto) {
    return 'This action adds a new importProductsDetail';
  }

  findOne(id: number) {
    return `This action returns a #${id} importProductsDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} importProductsDetail`;
  }
}
