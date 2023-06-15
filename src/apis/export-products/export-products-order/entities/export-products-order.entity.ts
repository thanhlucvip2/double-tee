import { Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/systems/base.entity';
import { CustomerEntity } from '@/apis/customer/entities/customer.entity';

@Entity('tb_export_product_order')
export class ExportProductsOrderEntity extends BaseEntity {}
