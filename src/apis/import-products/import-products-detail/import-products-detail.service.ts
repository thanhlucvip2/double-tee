import { Injectable } from '@nestjs/common';
import { CreateImportProductsDetailDto } from './dto/create-import-products-detail.dto';
import { UpdateImportProductsDetailDto } from './dto/update-import-products-detail.dto';

@Injectable()
export class ImportProductsDetailService {
  create(createImportProductsDetailDto: CreateImportProductsDetailDto) {
    return 'This action adds a new importProductsDetail';
  }

  findAll() {
    return `This action returns all importProductsDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importProductsDetail`;
  }

  update(id: number, updateImportProductsDetailDto: UpdateImportProductsDetailDto) {
    return `This action updates a #${id} importProductsDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} importProductsDetail`;
  }
}
