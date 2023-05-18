import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierEntity } from './entities/supplier.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '@/shared/pagination.dto';
import { ResponsePagination } from '@/shared/response.pagination';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
    private entityManager: EntityManager,
  ) {}
  async create(createSupplierDto: CreateSupplierDto) {
    const newProduct = await this.supplierRepository.create(createSupplierDto);

    return await this.supplierRepository.save(newProduct);
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
      .createQueryBuilder(SupplierEntity, 'supplier')
      // .andWhere('receive.created >= :sqlFromDate', { sqlFromDate })
      // .andWhere('receive.created <= :sqlToDate', { sqlToDate })
      .orderBy({ 'supplier.createAt': 'ASC' })
      .limit(pageSize)
      .offset(pageIndex * pageSize);

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    const result = new ResponsePagination<SupplierEntity>({
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total,
      items,
    });
    return result;
  }

  async findOne(id: string) {
    const productType = await this.supplierRepository.findOne({
      where: { id },
      relations: ['receive'],
    });
    if (!productType) {
      throw new HttpException(
        'Nhà cung cấp hàng không tồn tại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return productType;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
    });

    if (!supplier) {
      throw new HttpException(
        'Nhà cung cấp không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.supplierRepository.update(
      { id },
      {
        ...updateSupplierDto,
      },
    );

    const newProductResult = await this.supplierRepository.findOne({
      where: { id },
      relations: ['receive'],
    });
    return newProductResult;
  }

  async remove(id: string) {
    const receive: SupplierEntity = await this.supplierRepository.findOne({
      where: { id },
    });

    if (!receive) {
      throw new HttpException(
        'Nhà cung cấp không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.supplierRepository.delete({ id });

    return {
      message: 'Xóa nhà cung cấp thành công',
    };
  }
}
