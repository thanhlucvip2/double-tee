import { Entity } from 'typeorm';

import { BaseEntity } from '@/systems/base.entity';

@Entity('tb_export_product_detail')
export class ExportProductsDetailEntity extends BaseEntity {}
