import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ImportProductsDetailService } from './import-products-detail.service';
import { CreateImportProductsDetailDto } from './dto/create-import-products-detail.dto';
import { AuthGuard } from '@/guard/auth.guard';
import { AdminRoleGuard } from '@/guard/admin_role.guard';

@Controller('import-products-detail')
export class ImportProductsDetailController {
  constructor(
    private readonly importProductsDetailService: ImportProductsDetailService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, AdminRoleGuard)
  create(@Body() createImportProductsDetailDto: CreateImportProductsDetailDto) {
    return this.importProductsDetailService.create(
      createImportProductsDetailDto,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  findOne(@Param('id') id: string) {
    return this.importProductsDetailService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  remove(@Param('id') id: string) {
    return this.importProductsDetailService.remove(id);
  }
}
