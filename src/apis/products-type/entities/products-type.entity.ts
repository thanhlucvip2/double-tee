import { ReceiveEntity } from '@/apis/receive/entities/receive.entity';
import { BaseEntity } from '@/systems/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
@Entity({ name: 'tb_products_type' })
export class ProductsTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  sku: string;

  @OneToMany((type) => ReceiveEntity, (receive) => receive.products_type)
  receive: ReceiveEntity[];
}
