import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ExportProductsOrderService } from './export-products-order.service';
import { CreateExportProductsOrderDto } from './dto/create-export-products-order.dto';
import { AuthGuard } from '@/guard/auth.guard';
import { AdminRoleGuard } from '@/guard/admin_role.guard';

@UseGuards(AuthGuard, AdminRoleGuard)
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
