import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateExportProductsOrderDto } from './dto/create-export-products-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportProductsOrderEntity } from './entities/export-products-order.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '@/apis/customer/entities/customer.entity';

@Injectable()
export class ExportProductsOrderService {
  constructor(
    @InjectRepository(ExportProductsOrderEntity)
    private readonly exportProductsOrderRepository: Repository<ExportProductsOrderEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create({ customer_code, note }: CreateExportProductsOrderDto) {
    const customerData = await this.customerRepository.findOne({
      where: { customer_code },
    });

    if (!customerData) {
      throw new HttpException(
        'Mã khách hàng không tồn tại trong hệ thống!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newExportPRoductsOrder =
      await this.exportProductsOrderRepository.create({
        customer_code,
        note,
        customer: customerData,
      });

    await this.exportProductsOrderRepository.save(newExportPRoductsOrder);

    return await this.exportProductsOrderRepository.findOne({
      where: { id: newExportPRoductsOrder.id },
      relations: ['customer'],
    });
  }
}
