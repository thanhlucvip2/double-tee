import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductsTypeDto } from './dto/create-products-type.dto';
import { UpdateProductsTypeDto } from './dto/update-products-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductsTypeEntity } from './entities/products-type.entity';
import { PaginationDto } from '@/shared/pagination.dto';
import { ResponsePagination } from '@/shared/response.pagination';

@Injectable()
export class ProductsTypeService {
  constructor(
    @InjectRepository(ProductsTypeEntity)
    private readonly productTypeRepository: Repository<ProductsTypeEntity>,
    private entityManager: EntityManager,
  ) {}

  async create(createProductsTypeDto: CreateProductsTypeDto) {
    const sku = await this.productTypeRepository.findOne({
      where: { sku: createProductsTypeDto.sku },
    });
    if (sku) {
      throw new HttpException(
        'Mã hàng đã tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newProduct = await this.productTypeRepository.create(
      createProductsTypeDto,
    );

    return await this.productTypeRepository.save(newProduct);
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
      .createQueryBuilder(ProductsTypeEntity, 'products_type')
      // .andWhere('receive.created >= :sqlFromDate', { sqlFromDate })
      // .andWhere('receive.created <= :sqlToDate', { sqlToDate })
      .orderBy({ 'products_type.createAt': 'ASC' })
      .limit(pageSize)
      .offset(pageIndex * pageSize);

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    const result = new ResponsePagination<ProductsTypeEntity>({
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total,
      items,
    });
    return result;
  }

  async findOne(id: string) {
    const productType = await this.productTypeRepository.findOne({
      where: { id },
      relations: ['receive'],
    });
    if (!productType) {
      throw new HttpException(
        'Loại hàng không tồn tại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return productType;
  }

  async update(id: string, updateProductsTypeDto: UpdateProductsTypeDto) {
    const product = await this.productTypeRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(
        'Sản phẩm không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productTypeRepository.update({ id }, updateProductsTypeDto);

    const newProductResult = await this.productTypeRepository.findOne({
      where: { id },
    });
    return newProductResult;
  }

  async remove(id: string) {
    const productType = await this.productTypeRepository.findOne({
      where: { id },
    });
    if (!productType) {
      throw new HttpException(
        'Loại hàng không tồn tại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.productTypeRepository.delete({ id });
    return {
      message: 'Xóa loại hàng thành công!',
    };
  }
}
