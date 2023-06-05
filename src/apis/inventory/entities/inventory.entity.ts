import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductsTypeEntity } from '@/apis/products-type/entities/products-type.entity';
import { BaseEntity } from '@/systems/base.entity';
import { INVENTORY_STATUS } from '@/constants/inventory_status';

@Entity('tb_inventory')
export class InventoryEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: false })
  sku: string;

  @Column({ type: 'varchar', nullable: false })
  size: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(
    () => ProductsTypeEntity,
    (products_type) => products_type.inventory,
  )
  @Column({
    type: 'varchar',
    default: INVENTORY_STATUS.ACTIVE,
    nullable: true,
  })
  status: string;

  @JoinColumn({
    name: 'sku',
    referencedColumnName: 'sku',
  })
  products_type: ProductsTypeEntity;
}
