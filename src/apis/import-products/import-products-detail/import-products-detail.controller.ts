import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ImportProductsDetailService } from './import-products-detail.service';
import { CreateImportProductsDetailDto } from './dto/create-import-products-detail.dto';

@Controller('import-products-detail')
export class ImportProductsDetailController {
  constructor(
    private readonly importProductsDetailService: ImportProductsDetailService,
  ) {}

  @Post()
  create(@Body() createImportProductsDetailDto: CreateImportProductsDetailDto) {
    return this.importProductsDetailService.create(
      createImportProductsDetailDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importProductsDetailService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importProductsDetailService.remove(+id);
  }
}
