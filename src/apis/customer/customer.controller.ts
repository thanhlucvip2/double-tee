import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PaginationDto } from '@/shared/pagination.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from '@/guard/auth.guard';
import { AdminRoleGuard } from '@/guard/admin_role.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(AuthGuard, AdminRoleGuard)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @UseGuards(AuthGuard, AdminRoleGuard)
  findAll(@Query() pagination: PaginationDto) {
    return this.customerService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
