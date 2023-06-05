import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportProductsOrderService } from './export-products-order.service';
import { CreateExportProductsOrderDto } from './dto/create-export-products-order.dto';
import { UpdateExportProductsOrderDto } from './dto/update-export-products-order.dto';

@Controller('export-products-order')
export class ExportProductsOrderController {
  constructor(private readonly exportProductsOrderService: ExportProductsOrderService) {}

  @Post()
  create(@Body() createExportProductsOrderDto: CreateExportProductsOrderDto) {
    return this.exportProductsOrderService.create(createExportProductsOrderDto);
  }

  @Get()
  findAll() {
    return this.exportProductsOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportProductsOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportProductsOrderDto: UpdateExportProductsOrderDto) {
    return this.exportProductsOrderService.update(+id, updateExportProductsOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportProductsOrderService.remove(+id);
  }
}
