import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ImportProductsOrderService } from './import-products-order.service';
import { CreateImportProductsOrderDto } from './dto/create-import-products-order.dto';
import { PaginationDto } from '@/shared/pagination.dto';
import { AuthGuard } from '@/guard/auth.guard';
import { AdminRoleGuard } from '@/guard/admin_role.guard';

@Controller('import-products-order')
export class ImportProductsOrderController {
  constructor(
    private readonly importProductsOrderService: ImportProductsOrderService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, AdminRoleGuard)
  create(@Body() createImportProductsOrderDto: CreateImportProductsOrderDto) {
    return this.importProductsOrderService.create(createImportProductsOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard, AdminRoleGuard)
  findAll(@Query() pagination: PaginationDto) {
    return this.importProductsOrderService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importProductsOrderService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importProductsOrderService.remove(+id);
  }
}
