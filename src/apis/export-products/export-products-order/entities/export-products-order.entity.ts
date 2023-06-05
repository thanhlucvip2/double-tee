import { Entity } from 'typeorm';

import { BaseEntity } from '@/systems/base.entity';

@Entity('tb_export_product_order')
export class ExportProductsOrderEntity extends BaseEntity {}
