import { ProductsTypeEntity } from '@/apis/products-type/entities/products-type.entity';
import { RECEIVE_STATUS } from '@/constants/receive-status';
import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @Column({ type: 'varchar', length: 20, nullable: false })
  sku: string;

  @Column({
    type: 'varchar',
    default: RECEIVE_STATUS.CREATE,
    nullable: true,
  })
  status: string;

  @ManyToOne(() => ProductsTypeEntity, (product_type) => product_type.receive)
  products_type: ProductsTypeEntity;
}
