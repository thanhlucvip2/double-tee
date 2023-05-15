import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/systems/base.entity';
import { ProductsTypeEntity } from '@/apis/products-type/entities/products-type.entity';
@Entity('tb_inventory')
export class Inventory extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  sku: string;

  @ManyToOne(() => ProductsTypeEntity, (product_type) => product_type.receive)
  products_type: ProductsTypeEntity;
}
