import { ReceiveEntity } from '@/apis/receive/entities/receive.entity';
import { BaseEntity } from '@/systems/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
@Entity({ name: 'tb_products_type' })
export class ProductsTypeEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  size: string;

  @OneToMany((type) => ReceiveEntity, (receive) => receive.products_type)
  receive: ReceiveEntity[];

  @OneToMany((type) => ReceiveEntity, (receive) => receive.products_type)
  inventory: ReceiveEntity[];
}
