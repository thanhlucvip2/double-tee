import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('tb_import_product_detail')
export class ImportProductsDetail extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  sku: string;

  @Column({ type: 'varchar', nullable: false })
  size: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'int', nullable: false })
  price: string;

  @Column({ type: 'int', nullable: false })
  quantity: string;

  @Column({ type: 'int', nullable: false })
  total_price: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  down_price: string;
}
