import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateImportProductsOrderDto } from './dto/create-import-products-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImportProductsOrderEntity } from './entities/import-products-order.entity';
import { EntityManager, Repository } from 'typeorm';
import { SupplierEntity } from '@/apis/supplier/entities/supplier.entity';
import { PaginationDto } from '@/shared/pagination.dto';
import { ResponsePagination } from '@/shared/response.pagination';

@Injectable()
export class ImportProductsOrderService {
  constructor(
    @InjectRepository(ImportProductsOrderEntity)
    private readonly importProductsOrderRepository: Repository<ImportProductsOrderEntity>,
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
    private entityManager: EntityManager,
  ) {}

  async create({ supplier_code, note }: CreateImportProductsOrderDto) {
    const supplierData = await this.supplierRepository.findOne({
      where: { supplier_code },
    });
    if (!supplierData) {
      throw new HttpException(
        'Mã nhà cung cấp không tồn tại trong hệ thống!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newImportPRoductsOrder =
      await this.importProductsOrderRepository.create({
        supplier_code,
        note,
        supplier: supplierData,
      });
    await this.importProductsOrderRepository.save(newImportPRoductsOrder);
    return await this.importProductsOrderRepository.findOne({
      where: { id: newImportPRoductsOrder.id },
      relations: ['supplier'],
    });
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
      .createQueryBuilder(ImportProductsOrderEntity, 'import_products_order')
      // .andWhere('receive.created >= :sqlFromDate', { sqlFromDate })
      // .andWhere('receive.created <= :sqlToDate', { sqlToDate })
      .orderBy({ 'import_products_order.createAt': 'ASC' })
      .limit(pageSize)
      .offset(pageIndex * pageSize);

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    const result = new ResponsePagination<ImportProductsOrderEntity>({
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total,
      items,
    });
    return result;
  }

  async findOne(id: string) {
    const importProductsOrder =
      await this.importProductsOrderRepository.findOne({
        where: { id },
        relations: ['supplier', 'import_product_detail'],
      });
    if (!importProductsOrder) {
      throw new HttpException(
        'Đơn nhập hàng không tồn tại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return importProductsOrder;
  }

  //TODO chưa remove được
  remove(id: string) {
    return `This action removes a #${id} importProductsOrder`;
  }
}
