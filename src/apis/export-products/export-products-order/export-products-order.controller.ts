import { Controller, Post, Body } from '@nestjs/common';
import { ExportProductsOrderService } from './export-products-order.service';
import { CreateExportProductsOrderDto } from './dto/create-export-products-order.dto';

@Controller('export-products-order')
export class ExportProductsOrderController {
  constructor(
    private readonly exportProductsOrderService: ExportProductsOrderService,
  ) {}

  @Post()
  create(@Body() createExportProductsOrderDto: CreateExportProductsOrderDto) {
    return this.exportProductsOrderService.create(createExportProductsOrderDto);
  }
}
