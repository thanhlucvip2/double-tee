import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('tb_import_product_detail')
export class ImportProductsDetail extends BaseEntity {}
