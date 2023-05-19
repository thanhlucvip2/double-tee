import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportProductsDetailService } from './import-products-detail.service';
import { CreateImportProductsDetailDto } from './dto/create-import-products-detail.dto';
import { UpdateImportProductsDetailDto } from './dto/update-import-products-detail.dto';

@Controller('import-products-detail')
export class ImportProductsDetailController {
  constructor(private readonly importProductsDetailService: ImportProductsDetailService) {}

  @Post()
  create(@Body() createImportProductsDetailDto: CreateImportProductsDetailDto) {
    return this.importProductsDetailService.create(createImportProductsDetailDto);
  }

  @Get()
  findAll() {
    return this.importProductsDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importProductsDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportProductsDetailDto: UpdateImportProductsDetailDto) {
    return this.importProductsDetailService.update(+id, updateImportProductsDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importProductsDetailService.remove(+id);
  }
}
