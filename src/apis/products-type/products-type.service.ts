import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductsTypeDto } from './dto/create-products-type.dto';
import { UpdateProductsTypeDto } from './dto/update-products-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductsTypeEntity } from './entities/products-type.entity';
import { PaginationDto } from '@/shared/pagination.dto';

@Injectable()
export class ProductsTypeService {
  constructor(
    @InjectRepository(ProductsTypeEntity)
    private readonly productRepository: Repository<ProductsTypeEntity>,
    private entityManager: EntityManager,
  ) {}
  async create(createProductsTypeDto: CreateProductsTypeDto) {
    const sku = await this.productRepository.findOne({
      where: { sku: createProductsTypeDto.sku },
    });
    if (sku) {
      throw new HttpException(
        'Mã hàng đã tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newProduct = this.productRepository.create(createProductsTypeDto);

    return await this.productRepository.save(newProduct);
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
      .createQueryBuilder(ProductsTypeEntity, 'product')
      .limit(pageSize)
      .offset(pageIndex);
    // .andWhere('product.created >= :sqlFromDate', { sqlFromDate })
    // .andWhere('product.created <= :sqlToDate', { sqlToDate })

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    return {
      pageIndex,
      pageSize,
      total,
      items,
    };
  }

  async findOne(id: string) {
    const productType = await this.productRepository.findOne({
      where: { id },
    });
    if (!productType) {
      throw new HttpException(
        'Loại hàng không tồn tại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return productType;
  }

  update(id: string, updateProductsTypeDto: UpdateProductsTypeDto) {
    return `This action updates a #${id} productsType`;
  }

  async remove(id: string) {
    const productType = await this.productRepository.findOne({
      where: { id },
    });
    if (!productType) {
      throw new HttpException(
        'Loại hàng không tồn tại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.productRepository.delete({ id });
    return {
      message: 'Xóa loại hàng thành công!',
    };
  }
}
