import { Injectable } from '@nestjs/common';
import { CreateReceiveDto } from './dto/create-receive.dto';
import { UpdateReceiveDto } from './dto/update-receive.dto';

@Injectable()
export class ReceiveService {
  create(createReceiveDto: CreateReceiveDto) {
    return 'This action adds a new receive';
  }

  findAll() {
    return `This action returns all receive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receive`;
  }

  update(id: number, updateReceiveDto: UpdateReceiveDto) {
    return `This action updates a #${id} receive`;
  }

  remove(id: number) {
    return `This action removes a #${id} receive`;
  }
}
