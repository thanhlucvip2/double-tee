import { BaseEntity } from '@/systems/base.entity';
import { Entity, Column } from 'typeorm';
@Entity({ name: 'tb_products_type' })
export class ProductsTypeEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'text', nullable: false })
  color: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  sku: string;
}
