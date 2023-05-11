import { ProductsTypeEntity } from '@/apis/products-type/entities/products-type.entity';
import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('tb_receive')
export class ReceiveEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  fee_shipping: number;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @ManyToOne(() => ProductsTypeEntity, (products_type) => products_type.receive)
  products_type: ProductsTypeEntity;
}
