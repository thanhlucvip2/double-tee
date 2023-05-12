import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReceiveService } from './receive.service';
import { CreateReceiveDto } from './dto/create-receive.dto';
import { UpdateReceiveDto } from './dto/update-receive.dto';
import { AdminRoleGuard } from '@/guard/admin_role.guard';
import { AuthGuard } from '@/guard/auth.guard';

@Controller('receive')
export class ReceiveController {
  constructor(private readonly receiveService: ReceiveService) {}

  @Post()
  @UseGuards(AuthGuard, AdminRoleGuard)
  create(@Body() createReceiveDto: CreateReceiveDto) {
    return this.receiveService.create(createReceiveDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  findOne(@Param('id') id: string) {
    return this.receiveService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard, AdminRoleGuard)
  findAll() {
    return this.receiveService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  update(@Param('id') id: string, @Body() updateReceiveDto: UpdateReceiveDto) {
    return this.receiveService.update(id, updateReceiveDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminRoleGuard)
  remove(@Param('id') id: string) {
    return this.receiveService.remove(id);
  }
}
