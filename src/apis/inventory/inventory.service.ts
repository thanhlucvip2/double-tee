import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}
  async findAll() {
    const data = await this.inventoryRepository.create({
      sku: 'NO002',
      size: 'das',
      color: 'dasd',
      quantity: 1,
    });
    await this.inventoryRepository.save(data);
    return data;
  }

  async findOne(id: string) {
    const inventoryById = await this.inventoryRepository.findOne({
      where: {
        id,
      },
      relations: ['products_type'],
    });
    if (!inventoryById) {
      throw new HttpException(
        'Mã hàng không tồn tại trong tồn kho',
        HttpStatus.BAD_REQUEST,
      );
    }
    return inventoryById;
  }
}
