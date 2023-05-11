import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReceiveDto } from './dto/create-receive.dto';
import { UpdateReceiveDto } from './dto/update-receive.dto';
import { ProductsTypeEntity } from '../products-type/entities/products-type.entity';
import { ReceiveEntity } from './entities/receive.entity';

@Injectable()
export class ReceiveService {
  constructor(
    @InjectRepository(ProductsTypeEntity)
    private readonly productTypeRepository: Repository<ProductsTypeEntity>,
    @InjectRepository(ReceiveEntity)
    private readonly receiveRepository: Repository<ReceiveEntity>,
  ) {}

  async create(createReceiveDto: CreateReceiveDto) {
    const products_type = await this.productTypeRepository.findOne({
      where: { sku: createReceiveDto.sku },
    });

    if (!products_type) {
      throw new HttpException(
        'Mã hàng không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    const receive = await this.receiveRepository.create({
      fee_shipping: createReceiveDto.fee_shipping,
      quantity: createReceiveDto.quantity,
      note: createReceiveDto.note,
      total_price: createReceiveDto.total_price,
      sku: createReceiveDto.sku,
      products_type,
    });
    await this.receiveRepository.save(receive);
    return receive;
  }

  async findOne(id: string) {
    const receive = await this.receiveRepository.findOne({
      where: { id },
      relations: ['products_type'],
    });
    if (!receive) {
      throw new HttpException(
        'Mã đơn nhập hàng không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    return receive;
  }

  findAll() {
    return `This action returns all receive`;
  }

  update(id: number, updateReceiveDto: UpdateReceiveDto) {
    return `This action updates a #${id} receive`;
  }

  remove(id: number) {
    return `This action removes a #${id} receive`;
  }
}
