import { BaseEntity } from '@/systems/base.entity';
import { Entity, Column } from 'typeorm';
@Entity({ name: 'tb_products_type' })
export class ProductsTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  sku: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  // @OneToMany(() => ReceiveEntity, (receive) => receive.products_type)
  // receive: ReceiveEntity[];
}
