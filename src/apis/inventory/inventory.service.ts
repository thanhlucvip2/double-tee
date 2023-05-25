import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { EntityManager, Repository } from 'typeorm';
import { PaginationDto } from '@/shared/pagination.dto';
import { ResponsePagination } from '@/shared/response.pagination';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    private entityManager: EntityManager,
  ) {}

  async findAll(pagination: PaginationDto) {
    const {
      // fromDate = new Date(),
      // toDate = new Date(),
      pageIndex = 0,
      pageSize = 10,
    } = pagination;

    // const sqlFromDate = convertDateTimeToDateString(fromDate);
    // const sqlToDate = convertDateTimeToDateString(adddate(toDate, 1)); // tặng thêm 1 ngày cho date hiện tại

    const queryBuilder = await this.entityManager
      .createQueryBuilder(InventoryEntity, 'inventory')
      // .andWhere('receive.created >= :sqlFromDate', { sqlFromDate })
      // .andWhere('receive.created <= :sqlToDate', { sqlToDate })
      .orderBy({ 'inventory.createAt': 'ASC' })
      .limit(pageSize)
      .offset(pageIndex * pageSize);

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    const result = new ResponsePagination<InventoryEntity>({
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total,
      items,
    });
    return result;
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

  async createInventory(data: CreateInventoryDto) {
    return data;
  }
}
