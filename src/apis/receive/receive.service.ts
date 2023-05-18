import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreateReceiveDto } from './dto/create-receive.dto';
import { UpdateReceiveDto } from './dto/update-receive.dto';
import { ProductsTypeEntity } from '../products-type/entities/products-type.entity';
import { ReceiveEntity } from './entities/receive.entity';
import { PaginationDto } from '@/shared/pagination.dto';
import { ResponsePagination } from '@/shared/response.pagination';
import { SupplierEntity } from '../supplier/entities/supplier.entity';

@Injectable()
export class ReceiveService {
  constructor(
    private entityManager: EntityManager,
    @InjectRepository(ProductsTypeEntity)
    private readonly productTypeRepository: Repository<ProductsTypeEntity>,
    @InjectRepository(ReceiveEntity)
    private readonly receiveRepository: Repository<ReceiveEntity>,
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
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

    const supplier = await this.supplierRepository.findOne({
      where: { supplier_code: createReceiveDto.supplier_code },
    });

    if (!supplier) {
      throw new HttpException(
        'Mã nhà cung cấp không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }

    const receive = await this.receiveRepository.create({
      fee_shipping: createReceiveDto.fee_shipping,
      quantity: createReceiveDto.quantity,
      note: createReceiveDto.note,
      total_price: createReceiveDto.total_price,
      sku: createReceiveDto.sku,
      supplier,
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
      .createQueryBuilder(ReceiveEntity, 'receive')
      .leftJoinAndSelect('receive.products_type', 'products_type') // relation ship
      // .andWhere('receive.created >= :sqlFromDate', { sqlFromDate })
      // .andWhere('receive.created <= :sqlToDate', { sqlToDate })
      .orderBy({ 'receive.quantity': 'ASC' })
      .limit(pageSize)
      .offset(pageIndex * pageSize);

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    const result = new ResponsePagination<ReceiveEntity>({
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total,
      items,
    });

    return result;
  }

  async update(id: string, updateReceiveDto: UpdateReceiveDto) {
    const receive = await this.receiveRepository.findOne({
      where: { id },
    });

    if (!receive) {
      throw new HttpException(
        'Đơn nhập hàng không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }

    const products_type = await this.productTypeRepository.findOne({
      where: { sku: updateReceiveDto.sku },
    });

    if (!products_type) {
      throw new HttpException(
        'Mã hàng không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.receiveRepository.update(
      { id },
      {
        fee_shipping: updateReceiveDto.fee_shipping,
        quantity: updateReceiveDto.quantity,
        note: updateReceiveDto.note,
        total_price: updateReceiveDto.total_price,
        sku: updateReceiveDto.sku,
        products_type,
      },
    );

    return await this.receiveRepository.findOne({
      where: { id },
      relations: ['products_type'],
    });
  }

  async remove(id: string) {
    const receive: ReceiveEntity = await this.receiveRepository.findOne({
      where: { id },
    });

    if (!receive) {
      throw new HttpException(
        'Mã đơn nhập hàng không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.receiveRepository.delete({ id });

    return {
      message: 'Xóa đơn hàng thành công',
    };
  }
}
