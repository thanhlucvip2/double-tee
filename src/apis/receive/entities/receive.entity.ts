import { ProductsTypeEntity } from '@/apis/products-type/entities/products-type.entity';
import { SupplierEntity } from '@/apis/supplier/entities/supplier.entity';
import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('tb_receive')
export class ReceiveEntity extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  fee_shipping: number;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @ManyToOne(() => ProductsTypeEntity, (product_type) => product_type.receive)
  @JoinColumn({ name: 'products_type_id' })
  products_type: ProductsTypeEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.receive)
  @JoinColumn({ name: 'supplier_id' })
  supplier: SupplierEntity;
}
