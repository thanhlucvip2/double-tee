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
import { PaymentOrderDto } from './dto/payment-import-products-order.dto';

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

  @Post('payment-order')
  @UseGuards(AuthGuard, AdminRoleGuard)
  paymentOrder(@Body() paymentOrder: PaymentOrderDto) {
    return this.importProductsOrderService.paymentOrder(paymentOrder);
  }

  @Get()
  @UseGuards(AuthGuard, AdminRoleGuard)
  findAll(@Query() pagination: PaginationDto) {
    return this.importProductsOrderService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  findOne(@Param('id') id: string) {
    return this.importProductsOrderService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  remove(@Param('id') id: string) {
    return this.importProductsOrderService.remove(id);
  }
}
