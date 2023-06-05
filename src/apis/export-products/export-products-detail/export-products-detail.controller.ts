import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportProductsDetailService } from './export-products-detail.service';
import { CreateExportProductsDetailDto } from './dto/create-export-products-detail.dto';
import { UpdateExportProductsDetailDto } from './dto/update-export-products-detail.dto';

@Controller('export-products-detail')
export class ExportProductsDetailController {
  constructor(private readonly exportProductsDetailService: ExportProductsDetailService) {}

  @Post()
  create(@Body() createExportProductsDetailDto: CreateExportProductsDetailDto) {
    return this.exportProductsDetailService.create(createExportProductsDetailDto);
  }

  @Get()
  findAll() {
    return this.exportProductsDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportProductsDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportProductsDetailDto: UpdateExportProductsDetailDto) {
    return this.exportProductsDetailService.update(+id, updateExportProductsDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportProductsDetailService.remove(+id);
  }
}
