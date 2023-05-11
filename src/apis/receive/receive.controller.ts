import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceiveService } from './receive.service';
import { CreateReceiveDto } from './dto/create-receive.dto';
import { UpdateReceiveDto } from './dto/update-receive.dto';

@Controller('receive')
export class ReceiveController {
  constructor(private readonly receiveService: ReceiveService) {}

  @Post()
  create(@Body() createReceiveDto: CreateReceiveDto) {
    return this.receiveService.create(createReceiveDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiveService.findOne(id);
  }

  @Get()
  findAll() {
    return this.receiveService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiveDto: UpdateReceiveDto) {
    return this.receiveService.update(+id, updateReceiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiveService.remove(+id);
  }
}
